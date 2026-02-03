import * as THREE from "three";
import { createMonumentPlaceholder } from "./monumentPlaceholder";
import { createCemeteryPlaceholder } from "./cemeteryPlaceholder";
import { createMuseumPlaceholder } from "./museumPlaceholder";

export function createMemorialGroup() {
    // Hierarchy requirement:
    // memorialGroup (parent) contains monument + cemetery + museum as children.
    const group = new THREE.Group();
    group.name = "MemorialGroup";

    const monument = createMonumentPlaceholder();
    const cemetery = createCemeteryPlaceholder();
    const museum = createMuseumPlaceholder();

    group.add(monument);
    group.add(cemetery);
    group.add(museum);

    // place them roughly
    monument.position.set(0, 0, 0);
    cemetery.position.set(-10, 0, -6);
    museum.position.set(10, 0, -6);

    return {
        group,
        update(dt) {
        // subtle animation placeholder: slowly “breathing” the accent of the center,
        // later we replace with real animation (flag, light flicker, etc.)
        monument.rotation.y += dt * 0.15;
        },
    };
}
