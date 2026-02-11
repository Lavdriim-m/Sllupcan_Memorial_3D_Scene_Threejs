import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createInteraction({
    camera,
    scene,
    rendererDomElement,
    onPick,
    onClear,
    onControlStart, // optional: call this to cancel camera animation when user drags
    }) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const controls = new OrbitControls(camera, rendererDomElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.5, 0);

    // If user starts dragging controls, let App cancel any ongoing focus animation
    controls.addEventListener("start", () => onControlStart?.());

    // --- Drag detection to avoid "click" firing after orbit drag ---
    let pointerDown = null;
    const DRAG_PX = 6; // increase if you still get accidental clicks

    function resolvePickedEntity(hitObject) {
        // If hitbox points to a target, use it
        if (hitObject.userData?.clickTarget) {
        return hitObject.userData.clickTarget;
        }

        // Otherwise climb parents until we find something meaningful
        let current = hitObject;
        while (current) {
        if (current.userData?.info || current.userData?.type) {
            return current;
        }
        current = current.parent;
        }

        return null;
    }

    function computeMouseAndRay(event) {
        const rect = rendererDomElement.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

        raycaster.setFromCamera(mouse, camera);
    }

    function pickEntity(event) {
        computeMouseAndRay(event);

        const hits = raycaster.intersectObjects(scene.children, true);
        if (!hits.length) return null;

        return resolvePickedEntity(hits[0].object);
    }

    function isDrag(event) {
        if (!pointerDown) return false;
        const dx = event.clientX - pointerDown.x;
        const dy = event.clientY - pointerDown.y;
        return dx * dx + dy * dy > DRAG_PX * DRAG_PX;
    }

    // Track press position
    rendererDomElement.addEventListener("pointerdown", (event) => {
        pointerDown = { x: event.clientX, y: event.clientY };
    });

    // Single click behavior (on pointer up, only if it wasn't a drag)
    rendererDomElement.addEventListener("pointerup", (event) => {
        const dragged = isDrag(event);
        pointerDown = null;

        // If it was a drag, ignore (prevents refocus on release)
        if (dragged) return;

        const entity = pickEntity(event);
        if (entity) {
        onPick?.(entity, { focus: false });
        } else {
        onClear?.();
        }
    });

    // Double click behavior (focus)
    rendererDomElement.addEventListener("dblclick", (event) => {
        const entity = pickEntity(event);
        if (entity) {
        onPick?.(entity, { focus: true });
        } else {
        onClear?.();
        }
    });

    return {
        controls,
        update() {
        controls.update();
        },
    };
}