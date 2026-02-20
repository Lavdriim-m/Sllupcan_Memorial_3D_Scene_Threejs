import * as THREE from "three";
import { createRenderer } from "./core/renderer";
import { createCamera } from "./core/camera";
import { createScene } from "./core/scene";
import { createSizes } from "./core/sizes";
import { startLoop } from "./core/loop";

import { setupLights } from "./world/lights";
import { setupEnvironment } from "./world/environment";
import { createMemorialGroup } from "./world/memorial/memorialGroup";

import { createUI } from "./systems/ui";
import { createInteraction } from "./systems/interaction";
import { createCameraFocusController } from "./core/cameraFocus";

export class App {
    constructor(containerEl) {
        this.containerEl = containerEl;

        // Canvas
        this.canvas = document.createElement("canvas");
        this.containerEl.appendChild(this.canvas);

        // Core
        this.sizes = createSizes();
        this.scene = createScene();
        this.camera = createCamera(this.sizes);
        this.renderer = createRenderer(this.canvas, this.sizes);

        // World
        setupEnvironment(this.scene);
        setupLights(this.scene, this.renderer);

        // Memorial placeholders (we’ll replace with scans/models later)
        createMemorialGroup().then((memorial) => {
            this.memorial = memorial;
            this.scene.add(this.memorial.group);
        });

        // UI + Interaction + Camera Focus
        this.ui = createUI(this.containerEl);
        this.interaction = createInteraction({
            camera: this.camera,
            scene: this.scene,
            rendererDomElement: this.renderer.domElement,
            onPick: (entity, meta) => {
                this.ui.show(entity.userData?.info || entity.name || "Object");

                if(meta?.focus){
                    this.cameraFocus.focusOn(entity, {
                    distanceMultiplier: entity.userData.type === "plaque" ? 2.2 : 1.5,
                    duration: 0.9,
                    });
                }
            },
            onClear: () => this.ui.hide(),
            onControlStart: () => this.cameraFocus?.cancel?.(),
        });
        this.cameraFocus = createCameraFocusController(
            this.camera,
            this.interaction.controls
        );

        // Resize handling
        window.addEventListener("resize", () => {
            this.sizes.update();
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        // Loop (animation requirement)
        this.clock = new THREE.Clock();
        this.stopLoop = startLoop(() => this.tick());
    }

    tick() {
        const dt = this.clock.getDelta();
        // update interaction (controls)
        this.interaction.update(dt);
        this.cameraFocus.update(dt);

        // small ambient animation placeholder
        if (this.memorial) this.memorial.update(dt);

        this.renderer.render(this.scene, this.camera);
    }
}
