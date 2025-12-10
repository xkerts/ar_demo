# Quick Start Guide

Get the WebAR Product Viewer running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

```bash
# Navigate to project directory
cd C:\k\dev\ar\ar_demo

# Install dependencies (if not already done)
npm install
```

## First Run

### 1. Start Development Server

```bash
npm run dev
```

You'll see output like:
```
Nuxt 3.x.x with Nitro 2.x.x

  ➜ Local:    https://localhost:3000/
  ➜ Network:  https://192.168.1.x:3000/
```

### 2. Open Browser

Navigate to: **https://localhost:3000**

### 3. Accept Certificate Warning

You'll see a security warning because we're using a self-signed certificate (required for WebXR).

**Chrome/Edge**: Click "Advanced" → "Proceed to localhost (unsafe)"
**Firefox**: Click "Advanced" → "Accept the Risk and Continue"
**Safari**: Click "Show Details" → "visit this website"

### 4. Explore the App

- Browse the product catalog
- Click on any product to view details
- Click "View in AR" (placeholder for Phase 3)

## That's It!

You now have a fully functional Nuxt 3 product catalog running with HTTPS.

## Mobile Testing (Optional)

### Find Your Local IP

**Windows**:
```bash
ipconfig
# Look for "IPv4 Address" under your network adapter
```

**macOS/Linux**:
```bash
ifconfig
# Look for "inet" address (usually starts with 192.168)
```

### Start Server with Network Access

```bash
npm run dev:https
```

### Access from Mobile

1. Connect mobile device to same WiFi network
2. Open browser on mobile
3. Navigate to: `https://YOUR_IP:3000`
4. Accept certificate warning

## Common Issues

### Port 3000 Already in Use

Edit `nuxt.config.ts` and change the port:
```typescript
devServer: {
  port: 3001  // Use any available port
}
```

### Certificate Warning Every Time

This is normal with self-signed certificates. To trust the certificate permanently:

**Windows**: See `certificates/README.md` → Windows section
**macOS**: See `certificates/README.md` → macOS section
**Linux**: See `certificates/README.md` → Linux section

### Page Shows "Cannot GET /"

Make sure you're using **https://** not **http://**

### Blank Page or Errors

1. Check browser console for errors (F12)
2. Ensure all dependencies are installed: `npm install`
3. Clear Nuxt cache: `rm -rf .nuxt` then restart

## Next Steps

- **Add Product Images**: Place images in `public/images/`
- **Customize Products**: Edit `composables/useProductData.ts`
- **Styling**: Modify `assets/styles/main.css`
- **Phase 2**: Implement Three.js integration

## Project Structure at a Glance

```
Key Files:
├── pages/index.vue              → Product catalog page
├── pages/products/[id].vue      → Product detail page
├── components/ProductCard.vue   → Product card component
├── composables/useProductData.ts → Product data & logic
├── assets/styles/main.css       → Global styles
└── nuxt.config.ts               → Nuxt configuration
```

## Development Commands

```bash
# Start dev server
npm run dev

# Start dev server with network access
npm run dev:https

# Build for production
npm run build

# Preview production build
npm run preview
```

## Getting Help

- Check `README.md` for comprehensive documentation
- Review `PHASE_1_COMPLETE.md` for what's implemented
- See `coding_prompt.md` for full project requirements
- Consult Nuxt 3 docs: https://nuxt.com/docs

## Need to Add Real Data?

### Add Product Images

1. Download/create product images
2. Place in `public/images/` directory
3. Name them: `armchair.jpg`, `coffee-table.jpg`, etc.
4. Refresh browser

### Add 3D Models (Phase 2+)

1. Download GLB models from Sketchfab or similar
2. Place in `public/models/` directory
3. Name them: `armchair.glb`, `coffee-table.glb`, etc.
4. Models will be loaded in Phase 2

## Troubleshooting Checklist

- [ ] Node.js 18+ installed? Check: `node --version`
- [ ] Dependencies installed? Run: `npm install`
- [ ] Using HTTPS? URL should start with `https://`
- [ ] Port 3000 available? Change port if needed
- [ ] Browser console clear? Press F12 to check
- [ ] Certificate accepted? Follow browser prompts

## Success!

If you can see the product catalog with 6 products, everything is working perfectly!

**Phase 1 Status**: ✅ Complete
**Phase 2 Status**: ⏳ Ready to start
**Phase 3 Status**: ⏳ Pending

Happy coding! 🚀
