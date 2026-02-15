import * as THREE from "three";
import { createMonumentPlaceholder } from "./monumentPlaceholder";
import { createCemeteryPlaceholder } from "./cemeteryPlaceholder";
import { createMuseumPlaceholder } from "./museumPlaceholder";
import { loadGLB } from "../../systems/loader";
import { createGraveSlope } from "./graveSlope";
import { createStairs } from "./stairs";
import { createGraveCluster } from "./graves/graveCluster";
import { createFence } from "./fenceModel";

export async function createMemorialGroup() {
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
        position: [16.5, 4.5, 56],
        rotationY: THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(0),
        scale: 1.1,
    });

    const graveTop2 = createGraveCluster({
        id: "Top2",
        label: "Grave Top 2 (scan)",
        url: "/models/graves/grave_top2.glb",
        position: [10.5, 2.6, 56],
        rotationY: Math.PI + THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(0),
        scale: 1.4,
    });

    const graveTop3 = createGraveCluster({
        id: "Top3",
        label: "Grave Top 3 (scan)",
        url: "/models/graves/grave_top2.glb",
        position: [4, 2.6, 56],
        rotationY: Math.PI + THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(0),
        scale: 1.4,
    });

    const graveTop4 = createGraveCluster({
        id: "Top4",
        label: "Grave Top 4 (scan)",
        url: "/models/graves/grave_top2.glb",
        position: [-2.5, 2.6, 56],
        rotationY: Math.PI + THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(0),
        scale: 1.4,
    });

    const graveTop5 = createGraveCluster({
        id: "Top5",
        label: "Grave Top 5 (scan)",
        url: "/models/graves/grave_top2.glb",
        position: [-9, 2.6, 56],
        rotationY: Math.PI + THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(0),
        scale: 1.4,
    });

    const graveTop6 = createGraveCluster({
        id: "Top6",
        label: "Grave Top 6 (scan)",
        url: "/models/graves/grave_top2.glb",
        position: [-15.5, 2.6, 56],
        rotationY: Math.PI + THREE.MathUtils.degToRad(-20),
        rotationX: THREE.MathUtils.degToRad(1.5),
        rotationZ: THREE.MathUtils.degToRad(0),
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

    group.add(graveTop1, graveTop2, graveTop3, graveTop4, graveTop5, graveTop6, graveBottom1, graveBottom2, graveBottom3, graveBottom4, graveBottom5);

    const cemetery = createCemeteryPlaceholder();
    cemetery.position.set(-10, 0, -6);

    //FENCE
    try {
        const fence = await createFence({
        // If your fenceModel.js expects the model url:
        url: "/models/fence.glb",

        // Boundary points (edit these as needed)
        points: [
            new THREE.Vector3(-18, 5, 80),
            new THREE.Vector3(18, 5, 80),
            new THREE.Vector3(18, 3, 35),
            new THREE.Vector3(-18, 3, 35),
        ],
        groundMeshes: [graveSlope],  // add platform mesh too if you have it
        heightOffset: 0.5,
        overlap: 1,
        ySampleEvery: 1,
        });

        group.add(fence);
        console.log("✅ Fence added");
    } catch (err) {
        console.error("❌ Fence failed to load/create", err);
    }

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