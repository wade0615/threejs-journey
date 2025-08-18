# Three.js 基礎建置完整指南 🎯

> 這篇文章將帶您了解 Three.js 的基礎建置流程，從專案設定到完整的 3D 場景渲染。

## 📋 目錄

- [專案結構與依賴](#專案結構與依賴)
- [HTML 基礎結構](#html-基礎結構)
- [JavaScript 核心建置步驟](#javascript-核心建置步驟)
- [關鍵概念總結](#關鍵概念總結)
- [完整程式碼範例](#完整程式碼範例)

---

## 專案結構與依賴

### 專案結構

```
threejs-project/
├── package.json
├── src/
│   ├── index.html
│   ├── script.js
│   └── style.css
└── static/
    ├── fonts/
    └── textures/
```

### 核心依賴設定

```json
{
  "name": "threejs-journey-exercise",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "three": "^0.174.0", // Three.js 核心庫
    "lil-gui": "^0.20.0" // 除錯介面
  },
  "devDependencies": {
    "vite": "^6.2.2" // 開發伺服器
  }
}
```

---

## HTML 基礎結構

HTML 結構非常簡潔，主要需要一個 `canvas` 元素作為 Three.js 的渲染目標：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Three.js 3D Scene</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <!-- 關鍵：Three.js 渲染目標 -->
    <canvas class="webgl"></canvas>

    <!-- 使用 ES6 模組語法 -->
    <script type="module" src="./script.js"></script>
  </body>
</html>
```

**重要提醒：**

- `canvas` 元素是 Three.js 的渲染容器
- 使用 `type="module"` 支援 ES6 模組導入
- 確保 viewport meta 標籤設定正確

---

## JavaScript 核心建置步驟

### 步驟 1：導入必要模組

```javascript
// 導入 Three.js 核心
import * as THREE from "three";

// 導入軌道控制器（用於滑鼠互動）
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 導入除錯介面
import GUI from "lil-gui";
```

### 步驟 2：初始化基礎設定

```javascript
// 建立除錯介面
const gui = new GUI();

// 獲取 canvas 元素
const canvas = document.querySelector("canvas.webgl");

// 建立場景（3D 世界的容器）
const scene = new THREE.Scene();

// 設定視窗尺寸
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
```

### 步驟 3：建立幾何體與材質

```javascript
// 建立幾何體 (Geometry) - 定義形狀
const geometry = new THREE.IcosahedronGeometry();

// 建立材質 (Material) - 定義外觀
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff, // 白色
  wireframe: true, // 線框模式
});

// 建立網格 (Mesh) - 幾何體 + 材質的組合
const mesh = new THREE.Mesh(geometry, material);

// 將網格加入場景
scene.add(mesh);
```

### 步驟 4：設定相機 (Camera)

```javascript
// 建立透視相機
const camera = new THREE.PerspectiveCamera(
  75, // 視野角度 (FOV)
  window.innerWidth / window.innerHeight, // 寬高比
  0.1, // 近平面
  100 // 遠平面
);

// 設定相機位置
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;

// 將相機加入場景
scene.add(camera);
```

### 步驟 5：建立渲染器 (Renderer)

```javascript
// 建立 WebGL 渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// 設定渲染器尺寸
renderer.setSize(sizes.width, sizes.height);

// 設定像素比例（優化高解析度螢幕）
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

### 步驟 6：加入控制器 (Controls)

```javascript
// 建立軌道控制器
const controls = new OrbitControls(camera, canvas);

// 啟用阻尼效果（更流暢的互動）
controls.enableDamping = true;
```

### 步驟 7：建立動畫迴圈

```javascript
// 建立時鐘物件（用於動畫）
const clock = new THREE.Clock();

// 動畫迴圈函數
const tick = () => {
  // 獲取經過的時間
  const elapsedTime = clock.getElapsedTime();

  // 更新控制器
  controls.update();

  // 渲染場景
  renderer.render(scene, camera);

  // 請求下一幀
  window.requestAnimationFrame(tick);
};

// 開始動畫迴圈
tick();
```

### 步驟 8：響應式設計

```javascript
// 監聽視窗大小變化
window.addEventListener("resize", () => {
  // 更新尺寸
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // 更新相機寬高比
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

---

## 關鍵概念總結

### 🎯 核心流程

```
Scene (場景) → Camera (相機) → Renderer (渲染器)
```

### 🔧 重要組件

1. **Scene** - 3D 世界的容器，包含所有物件
2. **Camera** - 決定如何觀察 3D 世界
3. **Renderer** - 將 3D 場景轉換為 2D 影像
4. **Geometry** - 定義物件的形狀
5. **Material** - 定義物件的外觀
6. **Mesh** - 幾何體與材質的組合
7. **Controls** - 提供使用者互動

### ⚡ 動畫原理

- 使用 `requestAnimationFrame` 建立 60fps 的動畫迴圈
- `THREE.Clock` 提供精確的時間控制
- 每幀更新控制器並重新渲染場景

### 📱 響應式設計

- 監聽 `resize` 事件
- 動態更新相機寬高比
- 調整渲染器尺寸和像素比例

---

## 完整程式碼範例

```javascript
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// 初始化
const gui = new GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// 建立物件
const geometry = new THREE.IcosahedronGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 尺寸設定
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// 相機設定
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 2);
scene.add(camera);

// 渲染器設定
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 控制器設定
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// 響應式處理
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 動畫迴圈
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
```

---

## 🚀 下一步

有了這個基礎建置，您可以：

1. **添加光源** - 使用 `DirectionalLight`、`PointLight` 等
2. **載入 3D 模型** - 使用 `GLTFLoader` 載入外部模型
3. **添加材質** - 使用 `MeshStandardMaterial` 等進階材質
4. **實現動畫** - 使用 `gsap` 或自定義動畫
5. **優化效能** - 使用 `LOD`、`FrustumCulling` 等技術

---

## 📚 參考資源

- [Three.js 官方文檔](https://threejs.org/docs/)
- [Three.js 範例](https://threejs.org/examples/)
- [Three.js Journey](https://threejs-journey.com/)

---

_這篇文章涵蓋了 Three.js 的基礎建置流程，希望對您的 3D 網頁開發有所幫助！_
