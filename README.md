# WebAR Product Viewer

A full-featured Nuxt 3 application with WebXR integration for viewing products in augmented reality using Three.js.

## Project Status

### Phase 1: Basic Setup ✅ COMPLETED

- ✅ Nuxt 3 initialized with TypeScript
- ✅ HTTPS development server configured with self-signed certificates
- ✅ Project structure created (types, composables, components, pages)
- ✅ TypeScript type definitions for Product and AR interfaces
- ✅ Product data composable with mock data
- ✅ Responsive ProductCard and ProductList components
- ✅ Product listing page (index.vue)
- ✅ Product detail page with dynamic routing
- ✅ Global CSS styles with design system
- ✅ Placeholder AR view page

### Phase 2: Three.js Integration (NEXT)

- ⏳ Install Three.js and set up basic scene
- ⏳ Implement GLTF model loading
- ⏳ Create 3D viewer component (non-AR preview)
- ⏳ Add lighting and camera controls

### Phase 3: WebXR Core Functionality

- ⏳ Implement WebXR support detection
- ⏳ Request and initialize AR session
- ⏳ Set up hit-testing for surface detection
- ⏳ Implement placement reticle

### Phase 4: AR Interactions

- ⏳ Implement object placement on tap
- ⏳ Add rotation controls (drag gesture)
- ⏳ Add scale controls (pinch gesture)
- ⏳ Create AR session UI overlay

### Phase 5: Polish and Optimization

- ⏳ Add loading states and error handling
- ⏳ Optimize 3D models and performance
- ⏳ Implement QR code functionality (optional)
- ⏳ Add user instructions and onboarding
- ⏳ Cross-device testing and bug fixes

## Tech Stack

- **Framework**: Nuxt 3 (latest)
- **Runtime**: Vue 3 with Composition API
- **Language**: TypeScript
- **3D Rendering**: Three.js
- **AR Technology**: WebXR Device API
- **Build Tool**: Vite (included with Nuxt 3)
- **Styling**: Custom CSS with CSS variables

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Modern browser with WebXR support (Chrome/Edge on Android, Safari on iOS)
- Mobile device for AR testing

## Installation

1. **Clone the repository** (or initialize as shown above)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Trust the SSL certificates** (Required for HTTPS):

   See `certificates/README.md` for platform-specific instructions.

4. **Add product images** (Optional):

   Place product images in `public/images/` directory. See `public/images/README.md` for requirements.

5. **Add 3D models** (Required for Phase 2+):

   Place GLTF/GLB models in `public/models/` directory. See `public/models/README.md` for requirements.

## Development

### Start development server with HTTPS:

```bash
npm run dev
```

The application will be available at `https://localhost:3000`

**Note**: You'll need to accept the security warning for the self-signed certificate.

### For mobile device testing:

```bash
npm run dev:https
```

This starts the server on `0.0.0.0`, making it accessible from your local network.
Access from mobile at `https://YOUR_LOCAL_IP:3000`

### Build for production:

```bash
npm run build
```

### Preview production build:

```bash
npm run preview
```

## Project Structure

```
ar_demo/
├── .nuxt/                    # Auto-generated Nuxt files
├── assets/
│   └── styles/
│       └── main.css         # Global styles and design system
├── certificates/            # SSL certificates for HTTPS
│   ├── localhost.pem
│   ├── localhost-key.pem
│   └── README.md
├── components/
│   ├── ProductCard.vue      # Product card component
│   └── ProductList.vue      # Product list grid component
├── composables/
│   └── useProductData.ts    # Product data management composable
├── pages/
│   ├── index.vue            # Product listing page
│   ├── ar-view.vue          # AR viewer page (Phase 3)
│   └── products/
│       └── [id].vue         # Product detail page
├── public/
│   ├── images/              # Product thumbnail images
│   └── models/              # GLTF/GLB 3D models
├── types/
│   ├── product.ts           # Product type definitions
│   ├── ar.ts                # AR-related type definitions
│   └── index.ts             # Type exports
├── app.vue                  # Root app component
├── nuxt.config.ts           # Nuxt configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Features

### Current Features (Phase 1)

- ✅ Responsive product catalog with grid layout
- ✅ Product detail pages with specifications
- ✅ Mobile-first design with breakpoints
- ✅ TypeScript type safety throughout
- ✅ HTTPS development server for WebXR compatibility
- ✅ Mock product data with composable pattern
- ✅ Category filtering (prepared)
- ✅ Accessible UI components
- ✅ Loading and error states
- ✅ SEO-friendly meta tags

### Upcoming Features

- 3D model preview viewer (Phase 2)
- WebXR AR mode with hit-testing (Phase 3)
- Touch gesture controls for rotation/scaling (Phase 4)
- Object placement in real-world space (Phase 4)
- QR code scanning (Phase 5)
- Performance optimizations (Phase 5)

## Browser Support

### AR Features (WebXR)
- ✅ Chrome 79+ on Android
- ✅ Edge 79+ on Android
- ⚠️ Safari on iOS (limited, may need AR Quick Look fallback)
- ❌ Desktop browsers (no AR, 3D preview only)

### General Application
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Base URL for the application
BASE_URL=https://localhost:3000

# Path to 3D models
MODELS_PATH=/models
```

### Nuxt Configuration

Edit `nuxt.config.ts` to customize:
- HTTPS certificate paths
- Development server port
- Runtime config
- Meta tags and SEO
- CSS imports

## Development Guidelines

### Adding New Products

Edit `composables/useProductData.ts` and add to the `mockProducts` array:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Product description',
  imageUrl: '/images/product.jpg',
  modelUrl: '/models/product.glb',
  scale: 1.0,
  dimensions: {
    width: 1.0,  // meters
    height: 1.0, // meters
    depth: 1.0   // meters
  },
  category: 'Category',
  price: 999
}
```

### Styling

The project uses CSS variables for theming. Edit `assets/styles/main.css` to customize:
- Color palette
- Typography scale
- Spacing system
- Border radius
- Shadows and transitions

### TypeScript Types

All types are defined in the `types/` directory:
- `product.ts` - Product-related types
- `ar.ts` - AR session and WebXR types
- `index.ts` - Re-exports for easy imports

## Troubleshooting

### HTTPS Certificate Issues

If you see certificate warnings:
1. Trust the certificate in your browser
2. Follow platform-specific instructions in `certificates/README.md`
3. For mobile testing, you may need to accept the warning on each device

### Port Already in Use

Change the port in `nuxt.config.ts`:
```typescript
devServer: {
  port: 3001 // Change to any available port
}
```

### Module Not Found Errors

Run `npm install` to ensure all dependencies are installed.

### WebXR Not Working

1. Ensure you're using HTTPS
2. Test on a WebXR-compatible device (Android with Chrome)
3. Check browser console for specific errors
4. Verify camera permissions are granted

## Next Steps

To continue development with Phase 2 (Three.js Integration):

1. **Install Three.js** (already done via package.json)
2. **Create `useThreeScene.ts` composable** for scene setup
3. **Implement GLTF model loading** in a composable
4. **Build a 3D preview component** for product detail pages
5. **Add lighting and camera controls**

See `coding_prompt.md` for detailed implementation requirements.

## Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Three.js Documentation](https://threejs.org/docs/)
- [WebXR Device API](https://immersive-web.github.io/webxr/)
- [GLTF Format Specification](https://www.khronos.org/gltf/)

## License

This project is for demonstration and educational purposes.

## Contributing

This is a demo project following the specifications in `coding_prompt.md`.

## Support

For questions or issues, refer to the comprehensive requirements in `coding_prompt.md`.
