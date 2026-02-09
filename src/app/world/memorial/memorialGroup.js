import * as THREE from "three";
import { createMonumentPlaceholder } from "./monumentPlaceholder";
import { createCemeteryPlaceholder } from "./cemeteryPlaceholder";
import { createMuseumPlaceholder } from "./museumPlaceholder";
import { loadGLB } from "../../systems/loader";
import { createGraveSlope } from "./graveSlope";

export function createMemorialGroup() {
    const group = new THREE.Group();
    group.name = "MemorialGroup";

    /* -------------------------
        MONUMENT ANCHOR (KEY)
    -------------------------- */
    const monumentAnchor = new THREE.Group();
    monumentAnchor.name = "MonumentAnchor";

    // This is where you control transform forever
    monumentAnchor.position.set(0, 4.6, 0);
    monumentAnchor.scale.set(10, 10, 10);

    // Placeholder goes INSIDE anchor
    const monumentPlaceholder = createMonumentPlaceholder();
    monumentAnchor.add(monumentPlaceholder);

    group.add(monumentAnchor);

    /* -------------------------
        OTHER STATIC PARTS
    -------------------------- */
    const graveSlope = createGraveSlope();
    graveSlope.position.set(1, 5, 50); // tweak later
    group.add(graveSlope);

    const cemetery = createCemeteryPlaceholder();
    cemetery.position.set(-10, 0, -6);

    const museum = createMuseumPlaceholder();
    museum.position.set(10, 0, -6);

    group.add(cemetery, museum);

    /* -------------------------
        LOAD REAL MONUMENT
    -------------------------- */
    loadGLB("/models/lapidari.glb")
        .then((gltf) => {
        const model = gltf.scene;
        model.name = "LapidariModel";

        model.traverse((obj) => {
            if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
            }
        });

        // Remove placeholder, add real model
        monumentAnchor.clear();
        monumentAnchor.add(model);

        console.log("✅ Lapidari loaded into monumentAnchor");
        })
        .catch((err) => {
        console.error("❌ Failed to load lapidari.glb", err);
        });

    /* -------------------------
        UPDATE LOOP
    -------------------------- */
    return {
        group,
        update(dt) {
        
        },
    };
}