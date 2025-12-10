# 3D Models

Place GLTF/GLB 3D models here with the following naming convention:
- armchair.glb
- coffee-table.glb
- floor-lamp.glb
- bookshelf.glb
- plant-pot.glb
- office-desk.glb

## Model Requirements
- Format: GLB (binary GLTF) or GLTF
- Polygon count: < 50,000 triangles for mobile performance
- Texture resolution: 1024x1024 or 2048x2048 max
- File size: < 5MB per model (smaller is better for mobile)
- Scale: Models should be created at real-world scale (meters)

## Optimization Tips
1. Use Draco compression for smaller file sizes
2. Reduce polygon count using decimation
3. Compress textures (JPG for color maps, PNG for alpha)
4. Remove unnecessary materials and nodes
5. Bake lighting when possible

## Free 3D Model Sources
- Sketchfab (https://sketchfab.com) - Many free models available
- Poly Haven (https://polyhaven.com) - CC0 models
- Google Poly Archive (via community mirrors)
- TurboSquid - Free section
- CGTrader - Free models section

## Tools for Model Optimization
- Blender (free) - Can export optimized GLB files
- gltf-pipeline - CLI tool for model optimization
- glTF-Transform - Model optimization library
- Draco encoder - For geometry compression

## Testing Models
Before deployment, test models at:
- https://gltf-viewer.donmccurdy.com/
- https://sandbox.babylonjs.com/
- Blender's glTF viewer

## Phase 2 Implementation
These models will be loaded using Three.js GLTFLoader in Phase 2 of the project.
