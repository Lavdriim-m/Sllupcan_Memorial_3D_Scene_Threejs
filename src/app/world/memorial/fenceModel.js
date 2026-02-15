import * as THREE from "three";
import { loadGLB } from "../../systems/loader";

/**
 * Repeats a fence segment model along a closed polyline.
 * points: array of THREE.Vector3 (x,z used as path; y can be 0 or approximate)
 * groundMeshes: optional array of meshes to raycast against (for slope fitting)
 */
export async function createFence({
  url,
  points,
  segmentLength = null,      // if null, we auto-detect from model bounds
  heightOffset = 0.02,       // lift fence slightly above ground
  groundMeshes = [],         // meshes to raycast against (graveSlope, platform, etc.)
  ySampleEvery = 1,          // sample terrain every N segments (1 = every segment)
  overlap = 0.98,            // <1 makes segments overlap slightly to avoid gaps
  castShadow = true,
  receiveShadow = true,
} = {}) {
  const group = new THREE.Group();
  group.name = "Fence_Model";

  const gltf = await loadGLB(url);
  const segmentTemplate = gltf.scene;
  segmentTemplate.name = "FenceSegmentTemplate";

  // Make meshes shadow-ready
  segmentTemplate.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = castShadow;
      o.receiveShadow = receiveShadow;
    }
  });

  // --- Detect segment length (world) ---
  let segLen = segmentLength;
  if (!segLen) {
    segmentTemplate.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(segmentTemplate);
    const size = box.getSize(new THREE.Vector3());

    // biggest horizontal extent (x or z)
    segLen = Math.max(size.x, size.z);

    // safety
    if (!isFinite(segLen) || segLen <= 0) segLen = 2;
  }

  // Raycast helpers
  const raycaster = new THREE.Raycaster();
  const DOWN = new THREE.Vector3(0, -1, 0);
  const ORIGIN = new THREE.Vector3();

  function sampleGroundY(x, z, fallbackY = 0) {
    if (!groundMeshes || groundMeshes.length === 0) return fallbackY;

    ORIGIN.set(x, 200, z);
    raycaster.set(ORIGIN, DOWN);

    const hits = raycaster.intersectObjects(groundMeshes, true);
    if (!hits.length) return fallbackY;

    return hits[0].point.y;
  }

  // Stamp segments along each path edge
  for (let i = 0; i < points.length; i++) {
    const a = points[i].clone();
    const b = points[(i + 1) % points.length].clone();

    const dir = new THREE.Vector3().subVectors(b, a);
    const edgeLen = dir.length();
    if (edgeLen < 1e-6) continue;

    const forward = dir.clone().normalize();

    // ✅ Use ceil + overlap so we cover the whole edge without gaps
    const effectiveLen = segLen * overlap; // slightly shorter -> overlap segments
    const count = Math.max(1, Math.ceil(edgeLen / effectiveLen));

    // Cache Y sampling to reduce raycasts if ySampleEvery > 1
    let lastSampleY = null;

    for (let s = 0; s < count; s++) {
      const t = (s + 0.5) / count;
      const p = new THREE.Vector3().lerpVectors(a, b, t);

      const seg = segmentTemplate.clone(true);

      // Terrain fit (height)
      let y = p.y;
      if (groundMeshes && groundMeshes.length) {
        if (ySampleEvery <= 1 || s % ySampleEvery === 0 || lastSampleY === null) {
          lastSampleY = sampleGroundY(p.x, p.z, p.y);
        }
        y = lastSampleY;
      }
      y += heightOffset;

      seg.position.set(p.x, y, p.z);

      // Rotation to face along edge direction
      // Your previous code implied the model's "forward" is +X
      const angle = Math.atan2(forward.z, forward.x);
      seg.rotation.y = angle;

      group.add(seg);
    }
  }

  return group;
}