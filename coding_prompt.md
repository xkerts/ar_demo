# Coding Prompt for WebAR Nuxt Application with Three.js

## Project Overview
Build a fully responsive Nuxt 3 application with WebAR functionality using the WebXR Device API and Three.js for rendering 3D models. The application should allow users to scan QR codes, browse products, and view them in AR at real-world scale on their mobile devices.

## Technical Requirements

### Framework and Core Dependencies
- Nuxt 3 (latest stable version)
- Vue 3 with Composition API
- Three.js (latest version) for 3D rendering
- @types/three for TypeScript support
- GLTFLoader from three/examples/jsm/loaders/GLTFLoader for loading 3D models

### Development Environment
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Vite as build tool (included with Nuxt 3)
- HTTPS development server (required for WebXR)

## Application Structure

### Directory Organization
```
/pages
  - index.vue (product list)
  - products/[id].vue (product detail page)
  - ar-view.vue (AR viewer page)
/components
  - ProductCard.vue
  - ProductList.vue
  - ARViewer.vue
  - QRScanner.vue (optional)
/composables
  - useWebXR.ts
  - useThreeScene.ts
  - useProductData.ts
/assets
  - styles/
  - models/ (GLTF/GLB files)
/public
  - models/ (alternative location for 3D models)
/types
  - product.ts
  - ar.ts
```

## Core Functionality Requirements

### 1. Product Data Management

#### Product Interface
Create a TypeScript interface for products with the following properties:
- id: unique identifier
- name: product name
- description: product description
- imageUrl: thumbnail image path
- modelUrl: path to GLTF/GLB file
- scale: real-world scale factor (meters)
- dimensions: object with width, height, depth

#### Data Storage
- Use static JSON file or API endpoint for product data
- Implement composable for fetching and managing product data
- Support for loading product list and individual product details
- Include error handling for failed data fetches

### 2. Responsive Layout

#### Product List Page (index.vue)
- Grid layout that adapts to screen size using CSS Grid or Flexbox
- Responsive breakpoints: mobile (1 col), tablet (2 cols), desktop (3-4 cols)
- Product cards displaying image, name, and "View in AR" button
- Click on product card navigates to detail page
- Implement lazy loading for product images

#### Product Detail Page (products/[id].vue)
- Display full product information
- Large product image
- Product specifications including dimensions
- Prominent "View in AR" button
- Button should check WebXR support before navigating
- Pass product data to AR viewer page via route params or store

### 3. WebXR Implementation

#### WebXR Support Detection
Create a composable (useWebXR.ts) that:
- Checks if navigator.xr is available
- Detects if 'immersive-ar' mode is supported
- Returns support status and error messages
- Provides method to request AR session

#### AR Session Configuration
- Request AR session with required features:
  - 'hit-test': for detecting real-world surfaces
  - 'dom-overlay': for showing UI during AR session
- Handle session start, end, and error events
- Implement proper cleanup on session end

### 4. Three.js Scene Setup

#### Scene Initialization (useThreeScene.ts)
Create a composable that sets up:
- WebGLRenderer with alpha and antialias enabled
- Scene with appropriate background (transparent for AR)
- PerspectiveCamera with appropriate FOV
- Ambient and directional lighting for model visibility
- Handle window resize events
- Implement animation loop using requestAnimationFrame

#### GLTF Model Loading
- Use GLTFLoader to load 3D models
- Implement loading progress tracking (percentage)
- Display loading indicator while model loads
- Handle loading errors gracefully
- Scale models to real-world size based on product data
- Center model at origin for proper placement

### 5. AR Viewer Component (ARViewer.vue)

#### Component Requirements
- Mount Three.js renderer to canvas element
- Initialize WebXR session when component mounts
- Load appropriate 3D model based on product selection
- Implement hit-testing for surface detection
- Show placement reticle indicating where object will be placed
- Place 3D model on surface when user taps screen

#### Hit Test Implementation
- Use XRSession.requestHitTestSource with 'viewer' reference space
- Perform hit test every frame in animation loop
- Update reticle position based on hit test results
- Show reticle only when valid surface is detected
- Hide reticle after object is placed

#### Object Placement
- On screen tap/touch, place 3D model at reticle position
- Apply hit test pose (position and orientation) to model
- Allow only one object placement, or implement multi-placement
- Provide visual feedback when object is placed

#### AR Controls
- Exit AR button (overlay UI) to end session
- Rotate object: implement touch drag to rotate around Y-axis
- Scale object: implement pinch-to-zoom gesture
- Reset button: remove placed object and restart placement
- All controls should use DOM overlay for UI during AR session

### 6. Interaction Handling

#### Touch Gestures
- Single tap: place or select object
- Drag (one finger): rotate object around Y-axis
- Pinch (two fingers): scale object up/down
- Calculate touch delta for smooth rotation
- Limit scale range (min/max values)

#### Raycasting for Object Selection
- Implement raycasting to detect when user taps on placed object
- Distinguish between "place new object" and "select existing object" taps
- Highlight selected object (optional: outline or color change)

### 7. QR Code Integration

#### QR Code Generation (optional)
- Generate QR codes for each product linking to product detail or AR view page
- Use a library like qrcode or generate server-side
- Display QR codes on desktop version for mobile scanning

#### QR Code Scanning (optional)
- Implement camera-based QR scanning using html5-qrcode or similar
- Scan QR code to navigate directly to AR view with product loaded
- Provide fallback manual URL entry

### 8. State Management

#### Product State
- Use Nuxt 3 useState or Pinia store for product data
- Store currently selected product for AR view
- Persist AR session state (if needed)

#### AR Session State
- Track AR session status (inactive, starting, active, ending)
- Track object placement state (searching, ready, placed)
- Store placed object transforms for session persistence

### 9. Error Handling and Fallbacks

#### Browser Compatibility
- Detect browsers without WebXR support
- Show friendly error message with browser recommendations
- Provide fallback 3D viewer without AR for unsupported browsers
- Consider using Model-Viewer as fallback for iOS

#### Permission Handling
- Request camera permissions explicitly
- Handle permission denied scenarios
- Show clear instructions for granting permissions
- Provide link to browser settings if needed

#### Network and Loading Errors
- Handle failed model loads with retry mechanism
- Show error messages for network issues
- Implement timeout for slow-loading models
- Provide fallback placeholder or error state

### 10. Performance Optimization

#### Model Optimization
- Use Draco compression for GLTF models (if applicable)
- Limit polygon count for mobile performance
- Optimize texture sizes (use compressed formats)
- Implement level-of-detail (LOD) if needed

#### Lazy Loading
- Lazy load Three.js library only on AR viewer page
- Dynamically import GLTFLoader when needed
- Preload 3D models on product detail page (optional)

#### Memory Management
- Dispose Three.js geometries, materials, and textures on component unmount
- Clear WebXR session properly
- Remove event listeners on cleanup
- Monitor memory usage during AR sessions

### 11. HTTPS and Development Setup

#### Development Server
- Configure Nuxt dev server to use HTTPS (required for WebXR)
- Generate self-signed certificates for local development
- Add certificates to nuxt.config.ts devServer options
- Test on actual mobile devices using local network IP

#### Environment Configuration
- Use environment variables for API endpoints and asset URLs
- Configure base URL for 3D model assets
- Set up different configs for dev, staging, production

### 12. TypeScript Type Definitions

#### XR Types
- Install @types/webxr for WebXR Device API types
- Create custom type definitions for XR-specific objects if needed
- Define interfaces for AR session state
- Type all Three.js objects properly

#### Product Types
- Define Product interface with all required properties
- Define ARPlacement interface for object transforms
- Type all component props and composable returns

### 13. Nuxt Configuration

#### nuxt.config.ts Setup
- Enable SSR for product list pages (SEO benefits)
- Disable SSR for AR viewer component (client-only)
- Configure meta tags for PWA support
- Set up proper head management for each page
- Configure HTTPS for dev server

#### CSS and Styling
- Use Tailwind CSS, UnoCSS, or custom CSS
- Ensure mobile-first responsive design
- Use CSS Grid/Flexbox for layouts
- Include CSS for AR overlay UI

### 14. Testing Requirements

#### Manual Testing Checklist
- Test on Chrome/Edge Android (primary WebXR support)
- Test Safari iOS (fallback to AR Quick Look if needed)
- Test various screen sizes and orientations
- Test with different 3D models
- Test touch gestures (tap, drag, pinch)
- Test error states (no camera, no WebXR, failed model load)

#### Device Testing
- Test on at least 2-3 different Android devices
- Test on at least 1-2 iOS devices
- Test on low-end and high-end devices
- Monitor performance (FPS, memory usage)

### 15. Documentation Requirements

#### Code Documentation
- Comment complex AR logic clearly
- Document WebXR session lifecycle
- Explain hit-testing implementation
- Document touch gesture calculations

#### User-Facing Instructions
- Add first-time user tutorial overlay in AR view
- Include help text for surface detection
- Provide gesture hints for rotation/scaling
- Add troubleshooting tips for common issues

## Implementation Priority

### Phase 1: Basic Setup
1. Initialize Nuxt 3 project with TypeScript
2. Set up HTTPS development server
3. Create product data structure and mock data
4. Build responsive product list and detail pages

### Phase 2: Three.js Integration
1. Install Three.js and set up basic scene
2. Implement GLTF model loading
3. Create 3D viewer component (non-AR preview)
4. Add lighting and camera controls

### Phase 3: WebXR Core Functionality
1. Implement WebXR support detection
2. Request and initialize AR session
3. Set up hit-testing for surface detection
4. Implement placement reticle

### Phase 4: AR Interactions
1. Implement object placement on tap
2. Add rotation controls (drag gesture)
3. Add scale controls (pinch gesture)
4. Create AR session UI overlay

### Phase 5: Polish and Optimization
1. Add loading states and error handling
2. Optimize 3D models and performance
3. Implement QR code functionality (optional)
4. Add user instructions and onboarding
5. Cross-device testing and bug fixes

## Key Technical Considerations

### WebXR Session Lifecycle
- Properly initialize and terminate AR sessions
- Handle session interruptions (phone calls, app switching)
- Clean up resources on session end

### Coordinate Systems
- Understand XR reference spaces (viewer, local, local-floor)
- Transform between Three.js world space and XR space
- Apply hit test poses correctly to placed objects

### Mobile Performance
- Target 30-60 FPS during AR session
- Monitor memory usage (stay under 100MB for models)
- Reduce draw calls and geometry complexity
- Use efficient shaders and materials

### Cross-Browser Compatibility
- Primary: Chrome/Edge on Android (WebXR support)
- Secondary: Safari on iOS (fallback to AR Quick Look or Model-Viewer)
- Fallback: Show 3D viewer without AR on desktop browsers

## Success Criteria
- Application loads quickly on mobile devices (< 3 seconds)
- AR session starts smoothly without crashes
- Object placement is accurate and responsive
- Touch gestures work intuitively
- Performance maintains 30+ FPS during AR
- Works on at least 80% of modern mobile devices
- Graceful degradation for unsupported browsers
