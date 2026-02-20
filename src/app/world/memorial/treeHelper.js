import * as THREE from "three";

export function addInstancedGLTF(templateScene, placements) {
  templateScene.updateMatrixWorld(true);

  const count = placements.length;
  const instancedGroup = new THREE.Group();

  // Convert mesh world transforms into template-local transforms
  const rootInv = new THREE.Matrix4().copy(templateScene.matrixWorld).invert();

  const meshes = [];
  templateScene.traverse((obj) => {
    if (obj.isMesh) meshes.push(obj);
  });

  const instanceMat = new THREE.Matrix4();
  const meshLocalMat = new THREE.Matrix4();
  const finalMat = new THREE.Matrix4();

  const pos = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const scl = new THREE.Vector3();

  for (const m of meshes) {
    // meshLocalMat = (root^-1) * meshWorld  -> preserves original hierarchy transform
    meshLocalMat.multiplyMatrices(rootInv, m.matrixWorld);

    const material = m.material;

    // IMPORTANT: don't blindly kill transparency for leaves.
    const inst = new THREE.InstancedMesh(m.geometry, material, count);
    inst.castShadow = false;
    inst.receiveShadow = false;

    for (let i = 0; i < count; i++) {
      const t = placements[i];

      pos.set(t.pos[0], t.pos[1], t.pos[2]);
      quat.setFromEuler(
        new THREE.Euler(0, THREE.MathUtils.degToRad(t.rotY ?? 0), 0)
      );
      const s = t.scale ?? 1;
      scl.set(s, s, s);

      instanceMat.compose(pos, quat, scl);

      // final = instanceTransform * meshLocalMat
      finalMat.multiplyMatrices(instanceMat, meshLocalMat);

      inst.setMatrixAt(i, finalMat);
    }

    inst.instanceMatrix.needsUpdate = true;
    instancedGroup.add(inst);
  }

  return instancedGroup;
}