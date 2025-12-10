# Next Steps: Phase 2 - Three.js Integration

Phase 1 is complete! Here's your roadmap for Phase 2.

## Phase 2 Overview: Three.js Integration

**Goal**: Add 3D model preview functionality to product detail pages using Three.js

**Estimated Time**: 3-4 hours

**Key Deliverables**:
- Three.js scene setup composable
- GLTF model loader composable
- 3D model viewer component
- Integration on product detail page
- Basic camera controls (orbit)

## Implementation Plan

### Step 1: Create Three.js Scene Composable

**File**: `composables/useThreeScene.ts`

**What to implement**:
- Initialize WebGLRenderer with alpha and antialias
- Create Scene with transparent background
- Set up PerspectiveCamera with appropriate FOV
- Add ambient and directional lighting
- Handle window resize events
- Implement animation loop
- Proper cleanup on unmount

**Key imports**:
```typescript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
```

**Return interface**:
```typescript
{
  renderer: Ref<THREE.WebGLRenderer | null>
  scene: Ref<THREE.Scene | null>
  camera: Ref<THREE.PerspectiveCamera | null>
  initScene: (canvas: HTMLCanvasElement) => void
  addToScene: (object: THREE.Object3D) => void
  removeFromScene: (object: THREE.Object3D) => void
  startAnimation: () => void
  stopAnimation: () => void
  dispose: () => void
}
```

### Step 2: Create GLTF Loader Composable

**File**: `composables/useGLTFLoader.ts`

**What to implement**:
- Import GLTFLoader from three/examples/jsm/loaders/GLTFLoader
- Optional: Import DRACOLoader for compressed models
- Track loading progress (0-100%)
- Handle loading errors
- Scale model based on product dimensions
- Center model at origin
- Return loaded model as THREE.Group

**Return interface**:
```typescript
{
  loading: Ref<boolean>
  progress: Ref<number>
  error: Ref<string | undefined>
  model: Ref<THREE.Group | null>
  loadModel: (url: string, scale: number) => Promise<THREE.Group>
}
```

### Step 3: Create ModelViewer Component

**File**: `components/ModelViewer.vue`

**What to implement**:
- Canvas element for Three.js rendering
- Integration with useThreeScene composable
- Integration with useGLTFLoader composable
- Loading progress bar
- Error display
- OrbitControls for mouse/touch interaction
- Responsive canvas sizing
- Proper cleanup on unmount

**Props**:
```typescript
interface Props {
  modelUrl: string
  scale?: number
  autoRotate?: boolean
  showGrid?: boolean
}
```

**Features**:
- Display loading spinner and percentage
- Show error message if model fails to load
- Orbit controls (rotate with mouse/touch)
- Auto-rotation option
- Grid helper (optional)
- Responsive to container size

### Step 4: Update Product Detail Page

**File**: `pages/products/[id].vue`

**Changes needed**:
1. Import ModelViewer component
2. Add toggle between 2D image and 3D model
3. Display ModelViewer when 3D mode is active
4. Pass product.modelUrl and product.scale as props
5. Add "View 3D Model" button
6. Optimize layout for both views

**Example structure**:
```vue
<div class="product-detail__media">
  <div class="product-detail__view-toggle">
    <button @click="viewMode = '2d'">2D Image</button>
    <button @click="viewMode = '3d'">3D Model</button>
  </div>

  <div v-if="viewMode === '2d'" class="product-detail__image-view">
    <!-- Existing image display -->
  </div>

  <ClientOnly v-else>
    <ModelViewer
      :model-url="product.modelUrl"
      :scale="product.scale"
      :auto-rotate="true"
    />
  </ClientOnly>
</div>
```

### Step 5: Acquire Test Models

**Where to get free 3D models**:
- [Sketchfab](https://sketchfab.com/features/download) - Filter by "Downloadable"
- [Poly Haven](https://polyhaven.com/models) - CC0 models
- [Free3D](https://free3d.com) - Free models section
- [CGTrader](https://www.cgtrader.com/free-3d-models) - Free models

**Requirements**:
- Format: GLB (preferred) or GLTF
- Polygon count: < 50,000 triangles
- Texture size: 1024x1024 or 2048x2048
- File size: < 5MB
- License: Free for commercial use or CC0

**Search terms**:
- "furniture chair glb"
- "coffee table 3d model"
- "floor lamp gltf"
- "bookshelf 3d"
- "plant pot model"
- "office desk glb"

**Optimization**:
1. Download model
2. Open in Blender (free)
3. Decimate geometry if needed (< 50k triangles)
4. Export as GLB with Draco compression
5. Test at https://gltf.report/

**Place models in**: `C:\k\dev\ar\ar_demo\public\models\`

**Naming convention**:
- armchair.glb
- coffee-table.glb
- floor-lamp.glb
- bookshelf.glb
- plant-pot.glb
- office-desk.glb

### Step 6: Add Product Images (Optional)

**Where to get free product images**:
- [Unsplash](https://unsplash.com) - High quality, free
- [Pexels](https://www.pexels.com) - Free stock photos
- [Pixabay](https://pixabay.com) - Free images

**Search terms**:
- "modern armchair"
- "coffee table top view"
- "floor lamp"
- "bookshelf"
- "plant pot ceramic"
- "office desk"

**Requirements**:
- Format: JPG or PNG
- Size: 800x600px (4:3 ratio)
- File size: < 500KB
- No watermarks

**Place images in**: `C:\k\dev\ar\ar_demo\public\images\`

**Naming convention**:
- armchair.jpg
- coffee-table.jpg
- floor-lamp.jpg
- bookshelf.jpg
- plant-pot.jpg
- office-desk.jpg

## Testing Checklist

Once Phase 2 is implemented:

### Desktop Testing
- [ ] ModelViewer component loads without errors
- [ ] 3D model appears in viewer
- [ ] Mouse drag rotates the model
- [ ] Mouse wheel zooms in/out
- [ ] Model is properly scaled and centered
- [ ] Loading progress bar appears during load
- [ ] Error message shows for invalid models
- [ ] Toggle between 2D and 3D views works
- [ ] Model doesn't cause memory leaks (check DevTools)
- [ ] Smooth 60 FPS rendering

### Mobile Testing
- [ ] Touch drag rotates model
- [ ] Pinch gesture zooms
- [ ] Model renders at acceptable FPS (30+)
- [ ] Loading time is acceptable (< 5 seconds)
- [ ] Canvas is responsive to screen size
- [ ] No performance issues on mid-range devices

### Performance Metrics
- [ ] Initial load: < 3 seconds
- [ ] Model load: < 5 seconds
- [ ] FPS: 60 on desktop, 30+ on mobile
- [ ] Memory usage: < 100MB
- [ ] Model file size: < 5MB

## Code Examples

### Basic useThreeScene.ts Structure
```typescript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const useThreeScene = () => {
  const renderer = ref<THREE.WebGLRenderer | null>(null)
  const scene = ref<THREE.Scene | null>(null)
  const camera = ref<THREE.PerspectiveCamera | null>(null)
  const controls = ref<OrbitControls | null>(null)
  let animationId: number | null = null

  const initScene = (canvas: HTMLCanvasElement) => {
    // Initialize renderer
    renderer.value = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })

    // Create scene
    scene.value = new THREE.Scene()

    // Set up camera
    camera.value = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      0.1,
      1000
    )
    camera.value.position.z = 5

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.value.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 7.5)
    scene.value.add(directionalLight)

    // Set up controls
    controls.value = new OrbitControls(camera.value, canvas)
    controls.value.enableDamping = true
  }

  // ... rest of implementation
}
```

### Basic useGLTFLoader.ts Structure
```typescript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type * as THREE from 'three'

export const useGLTFLoader = () => {
  const loading = ref(false)
  const progress = ref(0)
  const error = ref<string>()
  const model = ref<THREE.Group | null>(null)

  const loadModel = async (url: string, scale: number = 1) => {
    loading.value = true
    error.value = undefined
    progress.value = 0

    const loader = new GLTFLoader()

    return new Promise<THREE.Group>((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          const loadedModel = gltf.scene
          loadedModel.scale.setScalar(scale)

          // Center model
          const box = new THREE.Box3().setFromObject(loadedModel)
          const center = box.getCenter(new THREE.Vector3())
          loadedModel.position.sub(center)

          model.value = loadedModel
          loading.value = false
          progress.value = 100
          resolve(loadedModel)
        },
        (progressEvent) => {
          if (progressEvent.lengthComputable) {
            progress.value = (progressEvent.loaded / progressEvent.total) * 100
          }
        },
        (err) => {
          error.value = 'Failed to load 3D model'
          loading.value = false
          reject(err)
        }
      )
    })
  }

  return { loading, progress, error, model, loadModel }
}
```

## Common Issues and Solutions

### Issue: "Module not found: three/examples/jsm/..."
**Solution**: Ensure Three.js is installed: `npm install three @types/three`

### Issue: Model appears too large/small
**Solution**: Adjust the scale factor in product data or add auto-scaling logic

### Issue: Model appears black
**Solution**: Check lighting setup. Add more lights or increase intensity

### Issue: Performance is slow
**Solution**:
- Reduce model polygon count
- Compress textures
- Lower renderer pixel ratio on mobile
- Disable antialiasing on mobile

### Issue: Memory leak when navigating away
**Solution**: Ensure proper cleanup in composable dispose() method:
```typescript
const dispose = () => {
  if (animationId) cancelAnimationFrame(animationId)
  controls.value?.dispose()
  renderer.value?.dispose()
  // Dispose geometries and materials
}
```

## Resources

### Documentation
- [Three.js Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [GLTF Loader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [Orbit Controls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

### Tools
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/) - Test models
- [glTF Report](https://gltf.report/) - Optimize models
- [Blender](https://www.blender.org/) - 3D modeling and export
- [Three.js Editor](https://threejs.org/editor/) - Scene testing

### Learning Resources
- [Three.js Journey](https://threejs-journey.com/) - Comprehensive course
- [Three.js Fundamentals](https://threejs.org/manual/) - Official guide
- [Discover Three.js](https://discoverthreejs.com/) - Free book

## Success Criteria

Phase 2 will be complete when:

- ✅ Three.js scene initializes without errors
- ✅ GLTF models load and display correctly
- ✅ Orbit controls work on desktop and mobile
- ✅ Loading states provide user feedback
- ✅ Errors are handled gracefully
- ✅ Performance is acceptable (30+ FPS)
- ✅ Memory is properly cleaned up
- ✅ Product detail page shows 3D preview

## After Phase 2

Once Phase 2 is complete, you'll be ready for **Phase 3: WebXR Core Functionality**:
- WebXR session management
- Hit-testing for AR placement
- Reticle for surface indication
- Real AR mode on supported devices

---

Good luck with Phase 2! The foundation from Phase 1 makes this next step straightforward. 🚀

**Current Status**: Phase 1 ✅ | Phase 2 ⏳ | Phase 3 ⏳ | Phase 4 ⏳ | Phase 5 ⏳
