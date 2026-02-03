import * as THREE from "three";

export function createMuseumPlaceholder() {
    const group = new THREE.Group();
    group.name = "MuseumPlaceholder";
    group.userData.info = "Museum (placeholder)";

    const buildingMat = new THREE.MeshStandardMaterial({
        color: "#d8c7b0",
        roughness: 0.95,
    });

    const body = new THREE.Mesh(new THREE.BoxGeometry(4, 2.2, 3), buildingMat);
    body.position.y = 1.1;
    body.castShadow = true;
    body.receiveShadow = true;
    body.userData.info = "Museum building body (placeholder)";

    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.2, 1.4, 4),
        new THREE.MeshStandardMaterial({ color: "#a66f4a", roughness: 1.0 })
    );
    roof.position.y = 2.9;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    roof.receiveShadow = true;
    roof.userData.info = "Museum roof (placeholder)";

    group.add(body, roof);
    return group;
}
