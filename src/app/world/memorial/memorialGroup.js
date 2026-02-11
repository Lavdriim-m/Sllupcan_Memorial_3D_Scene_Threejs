import * as THREE from "three";
import { createMonumentPlaceholder } from "./monumentPlaceholder";
import { createCemeteryPlaceholder } from "./cemeteryPlaceholder";
import { createMuseumPlaceholder } from "./museumPlaceholder";
import { loadGLB } from "../../systems/loader";
import { createGraveSlope } from "./graveSlope";
import { createStairs } from "./stairs";
import { createGraveCluster } from "./graves/graveCluster";

export function createMemorialGroup() {
    const group = new THREE.Group();
    group.name = "MemorialGroup";

    // MONUMENTI
    const monumentAnchor = new THREE.Group();
    monumentAnchor.name = "MonumentAnchor";
    monumentAnchor.position.set(0, 4.6, 0);
    monumentAnchor.scale.set(10, 10, 10);

    // Placeholder goes INSIDE anchor
    const monumentPlaceholder = createMonumentPlaceholder();
    monumentAnchor.add(monumentPlaceholder);
    group.add(monumentAnchor);

    //Pllakata
    const plaque = createGraveCluster({
        id: "Plaque1",
        label: "Plaque (scan)",
        url: "/models/plaque.glb",
        position: [0, 1.92, 37],
        rotationY: THREE.MathUtils.degToRad(220),
        rotationX: 0,
        scale: 1,
    });
    group.add(plaque);

    //STAIRS
    const stairs = createStairs();

    stairs.position.set(0, -0.65, 25);
    stairs.rotation.y = Math.PI / 2;
    stairs.scale.set(1, 1, 1); 

    group.add(stairs);

    //grave ground
    const graveSlope = createGraveSlope();
    graveSlope.position.set(0, 3.27, 51.87);
    group.add(graveSlope);

    //graves
    //TOP
    const graveTop1 = createGraveCluster({
        id: "Top1",
        label: "Grave Top 1 (scan)",
        url: "/models/graves/grave_top1.glb",
        position: [18, 5.5, 55],
        rotationY: THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(0),
        scale: 1,
    });

    const graveTop2 = createGraveCluster({
        id: "Top2",
        label: "Grave Top 2 (scan)",
        url: "/models/graves/grave_top2.glb",
        position: [1, 3.2, 56],
        rotationY: Math.PI + THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(1.5),
        scale: 1.4,
    });
    
    //BOTTOM
    const graveBottom1 = createGraveCluster({
        id: "Bottom1",
        label: "Grave Bottom 1 (scan)",
        url: "/models/graves/grave_bottom1.glb",
        position: [14, 2.1, 46],
        rotationY: THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(1.5),
        scale: 1.2,
    });

    const graveBottom2 = createGraveCluster({
        id: "Bottom2",
        label: "Grave Bottom 2 (scan)",
        url: "/models/graves/grave_bottom1.glb",
        position: [7.5, 2.1, 46],
        rotationY: THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(1.5),
        scale: 1.2,
    });

    const graveBottom3 = createGraveCluster({
        id: "Bottom3",
        label: "Grave Bottom 3 (scan)",
        url: "/models/graves/grave_bottom1.glb",
        position: [1, 2.1, 46],
        rotationY: THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(1.5),
        scale: 1.2,
    });

    const graveBottom4 = createGraveCluster({
        id: "Bottom4",
        label: "Grave Bottom 4 (scan)",
        url: "/models/graves/grave_bottom1.glb",
        position: [-5.5, 2.1, 46],
        rotationY: THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(1.5),
        scale: 1.2,
    });

    const graveBottom5 = createGraveCluster({
        id: "Bottom5",
        label: "Grave Bottom 5 (scan)",
        url: "/models/graves/grave_bottom1.glb",
        position: [-12, 2.1, 46],
        rotationY: THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(1.5),
        scale: 1.2,
    });

    group.add(graveTop1, graveTop2, graveBottom1, graveBottom2, graveBottom3, graveBottom4, graveBottom5);

    const cemetery = createCemeteryPlaceholder();
    cemetery.position.set(-10, 0, -6);

    //

    //museum
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