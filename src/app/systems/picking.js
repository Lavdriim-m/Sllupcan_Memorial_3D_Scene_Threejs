import * as THREE from "three";

export function setupPicking({ renderer, camera, pickables, onPick }) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function handleClick(ev) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // Only intersect the pickables (hitboxes), so ground doesn’t steal clicks
        const hits = raycaster.intersectObjects(pickables, true);
        if (!hits.length) return;

        const obj = hits[0].object;
        const target = obj.userData.clickTarget ?? obj;
        onPick(target, hits[0]);
    }

    renderer.domElement.addEventListener("click", handleClick);
    return () => renderer.domElement.removeEventListener("click", handleClick);
}