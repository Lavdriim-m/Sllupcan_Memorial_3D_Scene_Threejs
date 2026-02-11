import * as THREE from "three";

export function createCameraFocusController(camera, controls) {
    const state = {
        active: false,
        fromPos: new THREE.Vector3(),
        toPos: new THREE.Vector3(),
        fromTarget: new THREE.Vector3(),
        toTarget: new THREE.Vector3(),
        progress: 0,
        duration: 0.8, // seconds
    };

    function focusOn(object, {
        distanceMultiplier = 1.6,
        heightBias = 0.6,
        duration = 0.8,
    } = {}) {
        object.updateWorldMatrix(true, true);

        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const radius = Math.max(size.x, size.y, size.z) * distanceMultiplier;
        const direction = new THREE.Vector3(1, heightBias, 1).normalize();
        const targetPos = center.clone().add(direction.multiplyScalar(radius));

        state.fromPos.copy(camera.position);
        state.fromTarget.copy(controls.target);

        state.toPos.copy(targetPos);
        state.toTarget.copy(center);

        state.progress = 0;
        state.duration = duration;
        state.active = true;
    }

    function cancel() { state.active = false; }

    function update(dt) {
        if (!state.active) return;

        state.progress += dt;
        const t = Math.min(state.progress / state.duration, 1);

        // smoothstep easing (feels natural)
        const eased = t * t * (3 - 2 * t);

        camera.position.lerpVectors(state.fromPos, state.toPos, eased);
        controls.target.lerpVectors(state.fromTarget, state.toTarget, eased);
        controls.update();

        if (t >= 1) {
        state.active = false;
        }
    }    

    return { focusOn, update, cancel };
}