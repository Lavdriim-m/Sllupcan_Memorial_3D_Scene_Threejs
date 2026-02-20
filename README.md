# Sllupcan Memorial — Three.js Computer Graphics Project

A 3D interactive memorial/cemetery scene built with **Three.js** and **Vite** for the **Computer Graphics** course.  
The project features imported 3D assets, hierarchical object grouping, lighting + shadows, animations, and interactive picking with an information UI panel for grave sets.

**Made by:** Lavdrim Mustafi & Vjosa Abazi

---

## Features

### 3D Scene (Three.js)
- Multiple **externally imported models** (`.glb`) such as:
  - Monument / Lapidari
  - Museum building
  - Graves (top and bottom rows)
  - Plaque
  - Fences (repeated segment line)
  - Car relic
  - Light poles
- **Hierarchical composition** using anchors (e.g., `MonumentAnchor`, `MuseumAnchor`) so placeholders can be swapped with real models while keeping transforms consistent.
- **Lighting** setup to enhance the scene (ambient + direct/spot/point depending on scene configuration).
- **Shadows** enabled on desktop builds for realism.

### Interactivity
- **Raycasting picking**:
  - Single click: selection (no camera focus)
  - Double click: camera focuses on selected object (e.g., grave set)
- **Grave info panel** (responsive UI):
  - Desktop: right-side panel
  - Mobile: bottom sheet
  - Supports **grave sets** containing **2–4 people** (or any number) per grave cluster
  - Expand/Collapse UI
  - Per-person “More/Less” biography toggles

### Animation
- **Animated flags** using GLB animation clips (via `THREE.AnimationMixer`)
- Natural look using **phase offsets** so flags are not perfectly synchronized.

### Deployment
- Designed for deployment on **Vercel** (Vite build output: `dist`).

---

## Controls

- **Orbit / Navigate**: mouse drag / touch drag (OrbitControls)
- **Zoom**: mouse wheel / pinch
- **Select**: click
- **Focus**: double click (camera moves to the selected object)
- **Close panel**: `X`
- **Expand/Collapse panel**: button in the panel

---

## Project Structure (important files)

> Your structure may have additional files/folders, but these are the key ones used in the build.

- `index.html`  
  - Contains the always-visible credits overlay
  - Contains the grave info panel markup + styles

- `src/main.js`  
  - App entry point (scene creation, update loop, renderer, etc.)

- `src/world/memorialGroup.js` (or similar path)  
  - Builds the memorial scene group and loads models
  - Defines anchors (`MonumentAnchor`, `MuseumAnchor`)
  - Creates graves, slopes, stairs, fences, poles, etc.
  - Returns `{ group, update(dt) }` pattern

- `src/systems/loader.js`  
  - GLB loading utility (`loadGLB`)

- `src/interaction.js`  
  - Raycasting + picking logic
  - Single click vs double click
  - Calls `openGravePanel(graveSetId)` when a grave set is focused

- `src/ui/gravePanel.js`  
  - UI logic for rendering grave set information and people cards

- `src/ui/gravesData.js`  
  - Data source for grave sets and the people resting there

---

## Models & Assets

All `.glb` models should be placed under:
- `public/models/...`

Because the scene loads them via absolute paths like:
- `/models/lapidari.glb`
- `/models/graves/grave_top1.glb`
...


✅ This is the recommended approach for Vite + static hosting.

---

## Setup & Run Locally

### 1) Install dependencies
```bash
npm install
```
### 2) Run dev server
```bash
npm run dev
```
Open the local URL shown in terminal (usually `http://localhost:5173`).

### 3) Build for production
```bash
npm run build
```
### 4) Preview production build
```bash
npm run preview
```

---

## Deploy on Vercel
This is a **Vite** project.

Recommended settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## Adding / Editing Grave Information

Graves are organized in grave sets (e.g., `Top1`, `Top2`, `Bottom3`), where each set cam contain **2-4 people** (or more).

Edit:
```bash
src/app/systems/graveData.js
```

Example structure:
```javascript
export const GRAVE_SETS = {
  Top1: {
    label: "Top Row – Set 1",
    people: [
        { name: "Person 1", born: "1912", died: "1944", bio: "..." },
        { name: "Person 2", born: "1918", died: "1990", bio: "..." },
    ],
  },
};
```
### Important: Linking data to a grave set
Each grave set object in the scene must have:
```javascript
graveSet.userData.type = "graveCluster";
graveSet.userData.graveSetId = "Top1";
```
The interaction system will open the UI panel using that `graveClusterId`.

---

### Performance Notes (Mobile Safari)
Some iOS Safari devices have strict GPU/memory limits, especially with large scan models + textures.
To keep the experience stable:
- **Lower pixel ratio on mobile**
- **Disable shadows on mobile**
- Prefer loading heavy assets carefully (and consider mobile-optimized assets if needed)

Desktop is the primary target for best visual quality.

---
## Credits

**Project by**: Lavdrim Mustafi & Vjosa Abazi\
**Tools**: Three.js, Vite, Blender\
**Models**: External sources + modified assets (e.g., flag texture customization in Blender)

---
## License
This project is for educational use in the Computer Graphics course. If you plan to reuse third-party models, check their individual licenses and attribution requirements.