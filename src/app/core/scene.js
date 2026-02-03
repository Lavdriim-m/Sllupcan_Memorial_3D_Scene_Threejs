import * as THREE from "three";

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#d8e3e8");
    return scene;
}
