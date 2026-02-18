import * as THREE from "three";
import { TextureLoader, RepeatWrapping } from "three";

export function setupEnvironment(scene) {
    // Ground plane (placeholder for terrain)
    const loader = new TextureLoader();

    const baseColor = loader.load("/textures/grass/grass_basecolor5.jpg");
    const normalMap = loader.load("/textures/grass/grass_normal.jpg");
    const roughnessMap = loader.load("/textures/grass/grass_roughness.jpg");

    baseColor.wrapS = baseColor.wrapT = RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
    roughnessMap.wrapS = roughnessMap.wrapT = RepeatWrapping;

    // Tile size control
    baseColor.repeat.set(5, 5);
    normalMap.repeat.set(5, 5);
    roughnessMap.repeat.set(5, 5);

    const groundGeo = new THREE.PlaneGeometry(
        80,
        80,
        10,
        6
    );
    const groundMat = new THREE.MeshStandardMaterial({
        map: baseColor,
        normalMap,
        roughnessMap,
        roughness: 10,
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.userData.info = "Ground / Terrain";
    scene.add(ground);

    // Light fog for atmosphere (optional but nice)
    scene.fog = new THREE.Fog("#d8e3e8", 40, 160);
}
