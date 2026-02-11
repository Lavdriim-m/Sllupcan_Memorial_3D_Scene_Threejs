import * as THREE from "three";
import { loadGLB } from "../../../systems/loader";

/**
 * Creates a single clickable grave cluster entity from a scanned GLB.
 * - anchor holds transform (pos/rot/scale)
 * - scan is swapped in async
 * - hitbox makes clicking easy
 */
export function createGraveCluster({
    id,
    label,
    url,                 // "/models/graves/cluster_A1.glb"
    position = [0, 0, 0],
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    scale = 1,
    } = {}) {
    const anchor = new THREE.Group();
    anchor.name = `GraveCluster_${id ?? "X"}`;

    anchor.userData.type = "graveCluster";
    anchor.userData.id = id ?? anchor.name;
    anchor.userData.label = label ?? anchor.name;
    anchor.userData.info = anchor.userData.label;
    anchor.userData.url = url;

    anchor.position.set(position[0], position[1], position[2]);
    anchor.rotation.x = rotationX;
    anchor.rotation.y = rotationY;
    anchor.rotation.z = rotationZ;
    anchor.scale.set(scale, scale, scale);

    // Optional placeholder while loading
    const placeholder = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.4, 1.2),
        new THREE.MeshStandardMaterial({ color: "#999", roughness: 1 })
    );
    placeholder.receiveShadow = true;
    placeholder.castShadow = true;
    anchor.add(placeholder);

    // Load scan + replace placeholder
    loadGLB(url)
        .then((gltf) => {
        const model = gltf.scene;
        model.name = "Scan";

        model.traverse((o) => {
            if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;

            // Optional: stabilize scan materials (often helps photogrammetry)
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach((m) => {
                if (!m) return;
                m.metalness = 0;
                // keep roughness realistic, but don’t force if you already tuned it
                // m.roughness = 1;
                m.needsUpdate = true;
            });
            }
        });

        // Replace placeholder with real scan
        anchor.clear();
        anchor.add(model);

        // Add/refresh clickable hitbox
        addClickableHitbox(anchor);

        console.log(`✅ Loaded grave cluster: ${anchor.userData.id}`);
        })
        .catch((err) => {
        console.error(`❌ Failed to load grave cluster ${id}:`, err);
        });

    // Create hitbox now too (works even before model loads)
    addClickableHitbox(anchor);

    return anchor;
}

/** Adds an invisible padded hitbox to the anchor to make clicking easy. */
function addClickableHitbox(anchor) {
    // Remove old hitbox if it exists
    const old = anchor.getObjectByName("Hitbox");
    if (old) old.removeFromParent();

    // Compute bounds from whatever exists inside anchor (placeholder or scan)
    const box = new THREE.Box3().setFromObject(anchor);
    if (!isFinite(box.min.x) || !isFinite(box.max.x)) return;

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Pad it so clicks are forgiving
    size.multiplyScalar(1.25);
    size.y = Math.max(size.y, 1); // ensure some height

    const hitbox = new THREE.Mesh(
        new THREE.BoxGeometry(size.x, size.y, size.z),
        new THREE.MeshBasicMaterial({ visible: false })
    );
    hitbox.name = "Hitbox";
    hitbox.position.copy(anchor.worldToLocal(center.clone()));

    // Raycaster will hit this; we route selection to the anchor
    hitbox.userData.clickTarget = anchor;
    hitbox.userData.info = anchor.userData.info;
    hitbox.name = anchor.name; // so even name fallback looks good

    anchor.add(hitbox);
}