import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createInteraction({ camera, scene, rendererDomElement, onPick, onClear }) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const controls = new OrbitControls(camera, rendererDomElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.5, 0);

    function onClick(event) {
        const rect = rendererDomElement.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

        raycaster.setFromCamera(mouse, camera);

        // pick everything in the scene
        const hits = raycaster.intersectObjects(scene.children, true);

        if (hits.length > 0) {
        onPick?.(hits[0]);
        } else {
        onClear?.();
        }
    }

    window.addEventListener("click", onClick);

    return {
        update() {
        controls.update();
        },
    };
}
