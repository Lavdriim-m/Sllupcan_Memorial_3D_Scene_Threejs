import * as THREE from "three";
import { createMonumentPlaceholder } from "./monumentPlaceholder";
import { createMuseumPlaceholder } from "./museumPlaceholder";
import { loadGLB } from "../../systems/loader";
import { createGraveSlope } from "./graveSlope";
import { createStairs } from "./stairs";
import { createGraveCluster } from "./graves/graveCluster";
import { createRepeatedFenceLine } from "./fenceRepeat";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export async function createMemorialGroup() {
    const group = new THREE.Group();
    group.name = "MemorialGroup";

    const mixers = [];

    // MONUMENTI
    const monumentAnchor = new THREE.Group();
    monumentAnchor.name = "MonumentAnchor";
    monumentAnchor.position.set(0, 4.6, 5);
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
        position: [0.5, 1.92, 37],
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


    //FENCE
    try {

        // TOP FENCE
        const fenceTop = await createRepeatedFenceLine({
            url: "/models/fence_segment.glb", 
            start: new THREE.Vector3(-30, 4.7, 70),
            end: new THREE.Vector3(14, 4.7, 70),
            groundMeshes: [graveSlope],
            heightOffset: 0.03,
            // lengthAxis: "x", // set if you know it
            overlap: 0.1,
        });

        const fenceNorth = await createRepeatedFenceLine({
            url: "/models/fence_segment.glb", 
            start: new THREE.Vector3(-24.442, 4.5, 57),
            end: new THREE.Vector3(-24.25, 1.9, 19.5),
            groundMeshes: [graveSlope],
            heightOffset: 0.03,
            // lengthAxis: "x", // set if you know it
            overlap: 0.1,
        });

        const fenceSouth = await createRepeatedFenceLine({
            url: "/models/fence_segment.glb", 
            start: new THREE.Vector3(21.1, 4.5, 57),
            end: new THREE.Vector3(21.1, 1.9, 19.5),
            groundMeshes: [graveSlope],
            heightOffset: 0.03,
            // lengthAxis: "x", // set if you know it
            overlap: 0.1,
        });

        //BOTTOM FENCE
        const fenceBottom = await createRepeatedFenceLine({
            url: "/models/fence_segment.glb", 
            start: new THREE.Vector3(-30, 0.3, -10),
            end: new THREE.Vector3(14, 0.3, -10),
            groundMeshes: [graveSlope],
            heightOffset: 0.03,
            // lengthAxis: "x", // set if you know it
            overlap: 0.1,
        });

        const fenceBottomNorth = await createRepeatedFenceLine({
            url: "/models/fence_segment.glb", 
            start: new THREE.Vector3(-21.52, 0.3, 0),
            end: new THREE.Vector3(-21.3, 0.3, 32.8),
            groundMeshes: [graveSlope],
            heightOffset: 0.03,
            // lengthAxis: "x", // set if you know it
            overlap: 0.1,
        });

        const fenceBottomSouth = await createRepeatedFenceLine({
            url: "/models/fence_segment.glb", 
            start: new THREE.Vector3(24, 0.3, 0),
            end: new THREE.Vector3(24, 0.3, 32.8),
            groundMeshes: [graveSlope],
            heightOffset: 0.03,
            // lengthAxis: "x", // set if you know it
            overlap: 0.1,
        });

        group.add(fenceTop, fenceNorth, fenceSouth, fenceBottom, fenceBottomNorth, fenceBottomSouth);
        
        console.log("✅ Fence added");
    } catch (err) {
        console.error("❌ Fence failed to load/create", err);
    }

    // MUSEUM (anchor + placeholder)
    const museumAnchor = new THREE.Group();
    museumAnchor.name = "MuseumAnchor";

    museumAnchor.position.set(15, -0.35, -4);
    museumAnchor.rotation.y = THREE.MathUtils.degToRad(50);
    museumAnchor.scale.set(1, 1, 1);

    // Placeholder inside anchor (temporary)
    const museumPlaceholder = createMuseumPlaceholder();
    museumAnchor.add(museumPlaceholder);

    group.add(museumAnchor);

    loadGLB("/models/museum.glb")
    .then((gltf) => {
        const model = gltf.scene;
        model.name = "MuseumModel";

        model.traverse((obj) => {
        if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
        }
        });

        model.userData.type = "Museum";
        model.userData.info = "Museum Building";

        // swap placeholder -> real model
        museumAnchor.clear();
        museumAnchor.add(model);

        console.log("✅ Museum loaded into museumAnchor");
    })
    .catch((err) => {
        console.error("❌ Failed to load museum.glb", err);
    });

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

        model.userData.type = "lapidari";
        model.userData.info = "Lapidari Monument";

        // Remove placeholder, add real model
        monumentAnchor.clear();
        monumentAnchor.add(model);

        console.log("✅ Lapidari loaded into monumentAnchor");
        })
        .catch((err) => {
        console.error("❌ Failed to load lapidari.glb", err);
        });
    
    // CAR RELIC

    loadGLB("/models/carRelic.glb")
        .then((gltf) => {
            const car_Relic = gltf.scene;
            car_Relic.name = "Car Relic";

            car_Relic.traverse((obj) => {
                if (obj.isMesh) {
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                }
            });
        
        car_Relic.position.set(20, -0.15, 8);
        car_Relic.rotation.x = THREE.MathUtils.degToRad(1);
        car_Relic.scale.set(1, 1, 1);

        car_Relic.userData.type = "car";
        car_Relic.userData.info = "Car Relic";

        group.add(car_Relic);
        console.log("✅ Extra model loaded");
    })
    .catch((err) => {
        console.log("❌ Failed to load extra model", err);
    });

    // LIGHT POLES
    loadGLB("/models/light_pole.glb")
        .then((gltf) => {
            const template = gltf.scene;
            template.name = "LightPoleTemplate";

            template.traverse((obj) => {
                if (obj.isMesh) {
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                }
            });
        
        // Set positions
        const poles = [
            { pos: [-2.2, 1.6, 27.55], rotY: 0, scale: 0.35 },
            { pos: [2.7, 1.6, 27.55], rotY: 0, scale: 0.35 },
            { pos: [2.7, 2, 34], rotY: 0, scale: 0.35 },
            { pos: [-2.2, 2, 34], rotY: 0, scale: 0.35 },
            { pos: [2.8, 2.5, 41], rotY: 0, scale: 0.35 },
            { pos: [9.2, 2.5, 41], rotY: 0, scale: 0.35 },
            { pos: [15.7, 2.5, 41], rotY: 0, scale: 0.35 },
            { pos: [-3.7, 2.5, 41], rotY: 0, scale: 0.35 },
            { pos: [-10.2, 2.5, 41], rotY: 0, scale: 0.35 },
            { pos: [-10.8, 3.88, 60.7], rotY: 0, scale: 0.35 },
            { pos: [-17.3, 3.88, 60.7], rotY: 0, scale: 0.35 },
            { pos: [-4.3, 3.88, 60.7], rotY: 0, scale: 0.35 },
            { pos: [2.3, 3.88, 60.7], rotY: 0, scale: 0.35 },
            { pos: [8.8, 3.88, 60.7], rotY: 0, scale: 0.35 },
            { pos: [15.5, 3.5, 58.8], rotY: 0, scale: 0.35 },
            { pos: [-17.45, 1.6, 27.55], rotY: 0, scale: 0.35 },
            { pos: [17.2, 1.6, 27.55], rotY: 0, scale: 0.35 },
        ];

        const polesGroup = new THREE.Group();
        polesGroup.name = "LightPoles";

        for (let i = 0; i < poles.length; i++) {
            const p = poles[i];

            const pole = template.clone(true);
            pole.name = `LightPole_${i + 1}`;

            pole.position.set(p.pos[0], p.pos[1], p.pos[2]);
            pole.rotation.y = p.rotY ?? 0;
            pole.scale.setScalar(p.scale ?? 1);

            polesGroup.add(pole);
        }

        group.add(polesGroup);
        console.log("✅ Light poles added");
    })
    .catch((err) => {
        console.error("❌ Failed to load light_pole.glb", err);
    });

    //TREES
    loadGLB("/models/trees/tree1.glb")
    .then((gltf) => {
        const template = gltf.scene;
        template.name = "TreeTemplate";

        // 🔥 Performance: disable shadows for trees (big win)
        template.traverse((obj) => {
        if (obj.isMesh) {
            obj.castShadow = false;
            obj.receiveShadow = false;

            // 🔥 Performance: avoid expensive material features if present
            if (obj.material) {
            // keep it simple / consistent
            obj.material.transparent = true;
            obj.material.depthWrite = true;
            }
        }
        });

        // Your tree placements (same as before, no modelKey needed)
        // const treeInstances = [
        // { pos: [-15.7, 1, 25.4], rotY: 20, scale: 0.15 },
        // { pos: [-12.7, 1, 25.2], rotY: 140, scale: 0.15 },
        // { pos: [-9, 1, 25.2], rotY: 220, scale: 0.15 },
        // { pos: [-4, 1, 25.2], rotY: 330, scale: 0.15 },
        // ];

        const treesGroup = new THREE.Group();
        treesGroup.name = "Trees";

        // Optional small variation (set to 0 to disable)
        const randomYawDeg = 10;
        const randomScale = 0.08;
        const randomPos = 0.25;

        for (let i = 0; i < treeInstances.length; i++) {
        const t = treeInstances[i];

        // NOTE: clone(true) is fine here, but trees are heavy → keep count low
        const tree = template.clone(true);
        tree.name = `Tree_${i + 1}`;

        // Position (tiny jitter)
        const x = t.pos[0] + (Math.random() * 2 - 1) * randomPos;
        const y = t.pos[1];
        const z = t.pos[2] + (Math.random() * 2 - 1) * randomPos;
        tree.position.set(x, y, z);

        // Rotation (yaw)
        const yaw =
            THREE.MathUtils.degToRad(t.rotY ?? 0) +
            THREE.MathUtils.degToRad((Math.random() * 2 - 1) * randomYawDeg);
        tree.rotation.y = yaw;

        // Scale
        const s = (t.scale ?? 1) * (1 + (Math.random() * 2 - 1) * randomScale);
        tree.scale.setScalar(s);

        // Optional: clickable label
        tree.userData.type = "tree";
        tree.userData.info = `Tree ${i + 1}`;

        treesGroup.add(tree);
        }

        group.add(treesGroup);
        console.log("✅ Trees added:", treeInstances.length);
    })
    .catch((err) => {
        console.error("❌ Failed to load tree1.glb", err);
    });

    //ANIMATED FLAGS
    loadGLB("/models/albanian_flag.glb")
        .then((gltf) => {
            const template = gltf.scene;
            template.name = "FlagTemplate";

            template.traverse((obj) => {
                if (obj.isMesh) {
                    obj.castShadow = true;
                    obj.receiveShadow = false;
                }
            });

            const clip = gltf.animations?.[0];
            if (!clip) {
                console.warn("⚠️ Flag GLB has no animations.");
                group.add(template);
                return;
            }

            const flags = [
                { pos: new THREE.Vector3(-11.8, 1.15, 29), rotY: THREE.MathUtils.degToRad(0), scale: 0.1 },
                { pos: new THREE.Vector3(-13, 1.15, 29), rotY: THREE.MathUtils.degToRad(0), scale: 0.1 },
                { pos: new THREE.Vector3(-14.2, 1.15, 29), rotY: THREE.MathUtils.degToRad(0), scale: 0.1 },
            ];

            const flagsGroup = new THREE.Group();
            flagsGroup.name = "Flags";

            for (let i = 0; i < flags.length; i++) {
                const f = flags[i];

                const flag = SkeletonUtils.clone(template);
                flag.name = `Flag_${i + 1}`;

                flag.position.copy(f.pos);
                flag.rotation.y = f.rotY;
                flag.scale.setScalar(f.scale);

                flagsGroup.add(flag);

                const mixer = new THREE.AnimationMixer(flag);
                const action = mixer.clipAction(clip);
                action.setLoop(THREE.LoopRepeat, Infinity);
                action.play();
                
                const phase = (i / flags.length) * clip.duration;
                action.time = phase;
                mixer.update(0);

                mixers.push(mixer);
            }

            group.add(flagsGroup);
            console.log("✅ Flags added:", flags.length);
        })
        .catch((err) => {
            console.error("❌ Failed to load animated flag", err);
        });
    
    

    /* -------------------------
        UPDATE LOOP
    -------------------------- */
    return {
        group,
        update(dt) {
            for (let i = 0; i < mixers.length; i++) {
                mixers[i].update(dt);
            }
        },
    };
}