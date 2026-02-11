import * as THREE from "three";

/**
 * Adds an invisible hitbox to `target` and returns the hitbox mesh.
 * Raycasting hits the hitbox, and we route the click to `target`.
 */
export function addHitbox(target, { padding = 1.2, minY = 1 } = {}) {
    // Compute bounds based on current children (placeholder or loaded model)
    const box = new THREE.Box3().setFromObject(target);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // If target has no geometry yet, create a default hitbox
    if (!isFinite(size.x) || size.length() === 0) {
        size.set(2, 1, 2);
        center.copy(target.getWorldPosition(new THREE.Vector3()));
    }

    size.multiplyScalar(padding);
    size.y = Math.max(size.y, minY);

    const hitbox = new THREE.Mesh(
        new THREE.BoxGeometry(size.x, size.y, size.z),
        new THREE.MeshBasicMaterial({ visible: false })
    );

    hitbox.name = `${target.name}_Hitbox`;
    hitbox.userData.clickTarget = target;

    // Put hitbox at target's bounds center (convert world → local)
    const localCenter = target.worldToLocal(center.clone());
    hitbox.position.copy(localCenter);

    target.add(hitbox);
    return hitbox;
}