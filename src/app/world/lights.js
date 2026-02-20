import * as THREE from "three";

export function setupLights(scene) {
    // Ambient (soft fill)
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    // Sun (directional) - casts shadows
    const sun = new THREE.DirectionalLight(0xffffff, 1.0);
    sun.position.set(20, 30, 10);
    sun.castShadow = true;

    sun.shadow.bias = -0.0002;
    sun.shadow.normalBias = 0.02;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 120;
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 40;
    sun.shadow.camera.bottom = -40;
    sun.shadow.camera.updateProjectionMatrix();

    scene.add(sun);

    // Accent light (for monument area later)
    const accent = new THREE.PointLight(0xfff2cc, 5, 35);
    accent.position.set(0, 22, 10);
    scene.add(accent);
}
