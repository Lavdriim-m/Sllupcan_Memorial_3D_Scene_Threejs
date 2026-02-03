import * as THREE from "three";

export function createRenderer(canvas, sizes) {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Shadows (requirement)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Slightly nicer output
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    return renderer;
}
