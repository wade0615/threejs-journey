import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

/**
 * Debug
 */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: "#ffd800",
  wireframe: true,
});
const material2 = new THREE.MeshBasicMaterial({
  color: "#007bff",
  wireframe: false,
});
const material3 = new THREE.MeshBasicMaterial({
  color: "#ff0000",
  wireframe: false,
});

const meshPosition = [
  { x: -1, y: -1, z: -1 },
  { x: 1, y: -1, z: -1 },
  { x: -1, y: 1, z: -1 },
  { x: 1, y: 1, z: -1 },
  { x: 0, y: 0, z: 0 },
  { x: -1, y: -1, z: 1 },
  { x: 1, y: -1, z: 1 },
  { x: -1, y: 1, z: 1 },
  { x: 1, y: 1, z: 1 },
];

// 創建3x3x3的網格結構
const meshes = [];
for (let i = 0; i < meshPosition.length; i++) {
  const { x, y, z } = meshPosition[i];
  const mesh = new THREE.Mesh(
    geometry,
    z === 0 ? material : z === 1 ? material2 : material3
  );
  mesh.position.set(x, y, z);
  scene.add(mesh);
  meshes.push(mesh);
}

// 獲取中心mesh和右上角mesh用於GUI控制
const centerMesh = meshes[4];
const rightTopMesh = meshes[8];
// GUI控制
gui.add(centerMesh.position, "x", -5, 5, 0.01).name("Center Mesh X");
gui.add(centerMesh.position, "y", -5, 5, 0.01).name("Center Mesh Y");
gui.add(centerMesh.position, "z", -5, 5, 0.01).name("Center Mesh Z");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 6;
camera.position.y = 6;
camera.position.z = 12;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   centerMesh.rotation.y = elapsedTime;

  meshes[0].position.x = meshPosition[0].x + Math.cos(elapsedTime);
  meshes[0].position.y = meshPosition[0].y + Math.sin(elapsedTime);

  meshes[1].position.x = meshPosition[1].x + Math.sin(elapsedTime);
  meshes[1].position.y = meshPosition[1].y + Math.cos(elapsedTime);

  meshes[2].position.z = meshPosition[2].z + Math.sin(elapsedTime);
  meshes[2].position.y = meshPosition[2].y + Math.cos(elapsedTime);

  meshes[3].position.z = meshPosition[3].z + Math.sin(elapsedTime);
  meshes[3].position.x = meshPosition[3].x + Math.cos(elapsedTime);

  meshes[5].position.z = meshPosition[5].z + Math.sin(elapsedTime);
  meshes[5].position.x = meshPosition[5].x + Math.cos(elapsedTime);

  meshes[6].position.y = meshPosition[6].y + Math.tan(elapsedTime);
  meshes[6].position.x = meshPosition[6].x + Math.cos(elapsedTime);

  meshes[7].position.y = meshPosition[7].y + Math.sin(elapsedTime);
  meshes[7].position.x = meshPosition[7].x + Math.cos(elapsedTime);

  meshes[8].position.x = meshPosition[8].x + Math.cos(elapsedTime);
  meshes[8].rotation.y = elapsedTime;

  // Update camera position
  camera.position.x = Math.cos(elapsedTime + Math.PI / 4) * 12;
  camera.position.z = Math.sin(elapsedTime + Math.PI / 4) * 12;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
