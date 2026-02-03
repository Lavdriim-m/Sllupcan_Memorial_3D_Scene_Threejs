import * as THREE from "three";

export function setupEnvironment(scene) {
    // Ground plane (placeholder for terrain)
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = new THREE.MeshStandardMaterial({
        color: "#8fbf86",
        roughness: 1.0,
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.userData.info = "Ground / Terrain";
    scene.add(ground);

    // Light fog for atmosphere (optional but nice)
    scene.fog = new THREE.Fog("#d8e3e8", 40, 160);
}
