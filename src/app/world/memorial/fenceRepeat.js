import * as THREE from "three";
import { loadGLB } from "../../systems/loader";

/**
 * Repeats ONE fence segment model along a straight line.
 * - Auto-detects segment length from its bounds (X or Z).
 * - Places segments by distance accumulation (stable).
 * - Scales the last segment to fit the remaining distance.
 * - Optionally snaps Y to terrain via raycast.
 */
export async function createRepeatedFenceLine({
    url,
    start,
    end,
    groundMeshes = [],
    heightOffset = 0.02,
    castShadow = true,
    receiveShadow = true,

    // If your model's "length direction" is known, set it:
    // "x" or "z". If null, we auto-detect (largest of x/z).
    lengthAxis = null,

    // Slightly overlap to hide tiny seams (0.0 to 0.05)
    overlap = 0.05,

    // if model is rotated weird, add rotation tweak
    rotationYExtra = 0,
  } = {}) {
    const group = new THREE.Group();
    group.name = "FenceRepeatLine";

    const gltf = await loadGLB(url);
    const template = gltf.scene;

    template.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = castShadow;
        o.receiveShadow = receiveShadow;
      }
    });

    // Bounds / length
    template.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(template);
    const size = box.getSize(new THREE.Vector3());

    let axis = lengthAxis;
    if (!axis) axis = size.x >= size.z ? "x" : "z";

    const baseLen = Math.max(0.01, axis === "x" ? size.x : size.z);

    // Terrain raycast
    const raycaster = new THREE.Raycaster();
    const DOWN = new THREE.Vector3(0, -1, 0);
    const ORIGIN = new THREE.Vector3();
    function groundY(x, z, fallback = 0) {
      if (!groundMeshes?.length) return fallback;
      ORIGIN.set(x, 200, z);
      raycaster.set(ORIGIN, DOWN);
      const hits = raycaster.intersectObjects(groundMeshes, true);
      return hits.length ? hits[0].point.y : fallback;
    }

    const dir = new THREE.Vector3().subVectors(end, start);
    const totalLen = dir.length();
    if (totalLen < 0.01) return group;

    const forward = dir.clone().normalize();

    // Rotate segment to align with line direction.
    // If the model's length axis is X, face along X; if Z, face along Z.
    const angle =
      axis === "x"
        ? Math.atan2(forward.z, forward.x)   // model points +X
        : Math.atan2(forward.x, forward.z);  // model points +Z

    // Distance stepping
    const stepLen = Math.max(0.01, baseLen * (1 - overlap));
    let dist = 0;

    while (dist < totalLen - 0.001) {
      // segment start position along the line
      const p = start.clone().addScaledVector(forward, dist);

      // how much space remains
      const remaining = totalLen - dist;

      const seg = template.clone(true);
      seg.rotation.y = angle + rotationYExtra;

      // Snap Y (use midpoint for smoother slope)
      const mid = start.clone().addScaledVector(forward, dist + Math.min(stepLen, remaining) * 0.5);
      const yMid = groundY(mid.x, mid.z, mid.y) + heightOffset;

      seg.position.set(p.x, yMid, p.z);

      // Scale last segment to fit remaining distance
      // const desiredLen = Math.min(stepLen, remaining);
      // const scaleFactor = desiredLen / baseLen;

      // if (axis === "x") seg.scale.x *= scaleFactor;
      // else seg.scale.z *= scaleFactor;

      group.add(seg);

      dist += stepLen;
    }

    return group;
}