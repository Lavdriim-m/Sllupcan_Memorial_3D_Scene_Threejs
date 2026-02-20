import * as THREE from "three";

export function createRenderer(canvas, sizes) {
    const isMobile =
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
    
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
    });

    renderer.setSize(sizes.width, sizes.height);

    const dprCap = isMobile ? 1.25 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));

    // Shadows
    renderer.shadowMap.enabled = !isMobile;
    if (!isMobile) {
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    // Slightly nicer output
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1.0;

    // ✅ Helps with mobile memory pressure (fewer buffers)
    renderer.setClearColor(0x000000, 1);
    renderer.info.autoReset = true;

    // Optional: handle WebGL context loss (common on iOS under pressure)
    renderer.domElement.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        console.warn("⚠️ WebGL context lost (likely GPU/memory pressure on mobile).");
    });
    renderer.domElement.addEventListener("webglcontextrestored", () => {
        console.warn("✅ WebGL context restored.");
    });

    return renderer;
}
