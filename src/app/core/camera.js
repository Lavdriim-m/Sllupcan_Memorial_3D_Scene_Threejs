import * as THREE from "three";

export function createCamera(sizes) {
  const camera = new THREE.PerspectiveCamera(
    60,
    sizes.width / sizes.height,
    0.1,
    300
  );
  camera.position.set(10, 8, 12);
  return camera;
}
