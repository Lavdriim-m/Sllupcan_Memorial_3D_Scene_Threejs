import * as THREE from "three";
import { loadGLB } from "../../systems/loader";

export function createStairs() {
    // Anchor that always exists (stable reference)
    const stairsAnchor = new THREE.Group();
    stairsAnchor.name = "StairsAnchor";

    // Control stairs transform here (always)
    stairsAnchor.position.set(0, 0, 0);
    stairsAnchor.rotation.set(0, 0, 0);
    stairsAnchor.scale.set(1, 1, 1);

    // Temporary placeholder (optional)
    const placeholder = new THREE.Mesh(
        new THREE.BoxGeometry(6, 0.5, 2),
        new THREE.MeshStandardMaterial({ color: "#777", roughness: 1 })
    );
    placeholder.name = "StairsPlaceholder";
    placeholder.receiveShadow = true;
    placeholder.castShadow = true;
    stairsAnchor.add(placeholder);

    // Load GLB and replace placeholder
    loadGLB("/models/stairs.glb")
        .then((gltf) => {
        const model = gltf.scene;
        model.name = "StairsModel";

        model.traverse((obj) => {
            if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
            }
        });

        stairsAnchor.clear();
        stairsAnchor.add(model);

        console.log("✅ Stairs loaded");
        })
        .catch((e) => console.error("❌ Failed to load stairs.glb", e));

    return stairsAnchor;
}