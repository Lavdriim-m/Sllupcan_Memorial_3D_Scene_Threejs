import * as THREE from "three";

export function createMonumentPlaceholder() {
    const geo = new THREE.CylinderGeometry(1.2, 1.8, 5, 10);
    const mat = new THREE.MeshStandardMaterial({
        color: "#9aa3ad",
        roughness: 0.8,
        metalness: 0.05,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.info = "Lapidari (placeholder) — will be replaced by Polycam scan";
    mesh.name = "MonumentPlaceholder";

    return mesh;
}
