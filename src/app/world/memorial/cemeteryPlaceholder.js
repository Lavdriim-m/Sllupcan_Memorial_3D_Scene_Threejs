import * as THREE from "three";

export function createCemeteryPlaceholder() {
    const group = new THREE.Group();
    group.name = "CemeteryPlaceholder";
    group.userData.info = "Cemetery area (placeholder)";

    const stoneMat = new THREE.MeshStandardMaterial({
        color: "#c5c8cc",
        roughness: 0.9,
    });

    // simple repeated tombstones
    // for (let i = 0; i < 12; i++) {
    //     const geo = new THREE.BoxGeometry(0.6, 1.0, 0.2);
    //     const tomb = new THREE.Mesh(geo, stoneMat);
    //     tomb.position.set((i % 4) * 1.2, 0.5, Math.floor(i / 4) * 1.4);
    //     tomb.castShadow = true;
    //     tomb.receiveShadow = true;
    //     tomb.userData.info = `Tombstone ${i + 1} (placeholder)`;
    //     group.add(tomb);
    // }

    return group;
}
