import * as THREE from "three";
import { TextureLoader, RepeatWrapping } from "three";

export function createGraveSlope() {
    
    const loader = new TextureLoader();

    const baseColor = loader.load("/textures/ground/ground_basecolor.jpg");
    const normalMap = loader.load("/textures/ground/ground_normal.jpg");
    const roughnessMap = loader.load("/textures/ground/ground_roughness.jpg");

    baseColor.wrapS = baseColor.wrapT = RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
    roughnessMap.wrapS = roughnessMap.wrapT = RepeatWrapping;

    // Tile size control
    baseColor.repeat.set(25, 20);
    normalMap.repeat.set(25, 20);
    roughnessMap.repeat.set(25, 20);

    // Plane with enough segments to tilt smoothly
    const geometry = new THREE.PlaneGeometry(
        46,
        50,
        10,  // width segments
        6    // depth segments
    );

    const material = new THREE.MeshStandardMaterial({
        map: baseColor,
        normalMap,
        roughnessMap,
        roughness: 1,
    });
    material.color.set("#c0c0c0");

    const slope = new THREE.Mesh(geometry, material);
    slope.name = "GraveSlope";

    // Rotate plane to be horizontal
    slope.rotation.x = -Math.PI / 2 + THREE.MathUtils.degToRad(-4);

    // Tilt the slope slightly downward (adjust angle)
    // slope.rotation.y = THREE.MathUtils.degToRad(6);
    // slope.rotation.z = THREE.MathUtils.degToRad(180);

    slope.receiveShadow = true;
    slope.castShadow = false;

    return slope;
}