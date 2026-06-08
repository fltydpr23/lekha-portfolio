# 3D Universe Portfolio - Development Summary

## Architecture Overview
The core portfolio experience was built using **raw Three.js** wrapped within a Next.js React component (`Universe3D.tsx`). We avoided heavy wrapper libraries like `@react-three/fiber` to maintain absolute, low-level control over the WebGL render loop, shader compilation, and performance optimizations.

## Core Features & Mechanics

### 1. Endless Runner & Spatial Distribution
- **Infinite Scroll Engine**: Instead of moving the objects, scrolling pushes the `PerspectiveCamera` backward and forward along the Z-axis.
- **Dynamic Recycling**: A continuous loop checks the relative position of the 60 plane meshes against the camera. Once a mesh falls behind the camera, it is instantly teleported 250 units forward with new random X/Y coordinates. This creates the illusion of an infinite, sprawling universe using a highly optimized, fixed number of geometries.
- **Sparse Distribution**: To maintain an editorial, high-end gallery feel, the meshes are given a massive bounding volume (100 units wide, 60 tall) so the photography has room to breathe without overlapping or stacking aggressively.

### 2. Custom WebGL Shaders (Dynamic Depth of Field)
Instead of relying on expensive post-processing passes, we wrote custom GLSL **Vertex** and **Fragment Shaders** attached directly to the `ShaderMaterial` of every card.
- **9-Tap Box Blur**: The fragment shader samples surrounding texture pixels based on how far the card is from a dynamic `uFocusDistance`.
- **Focal Plane Lock**: When the user hovers or flies to an image, the global focal distance interpolates to that specific card's depth, rendering it perfectly sharp while beautifully blurring out the foreground and background cards in real-time.
- **Dimming Interaction**: Unfocused cards elegantly wash out and blend into the background color (via `uDim` uniform) to direct the user's attention.

### 3. Interaction Model
- **"Scroll to Explore. Hover to Focus. Click to Fly."**
- **Raycasting**: A `THREE.Raycaster` continually translates 2D mouse coordinates into 3D space to detect exact intersections with the cards.
- **Fly-To Camera (GSAP)**: Clicking a card triggers a seamless `gsap.to()` animation that physically flies the camera to a perfect viewing distance in front of the active card, temporarily disabling scroll and drag inputs.
- **Elegant Rotation**: The specific card that is clicked slowly and elegantly rotates on its Y-axis. When the user scrolls away or clicks another card, custom math ensures it smoothly unwinds to a perfectly flat 0-degree state (avoiding violent multi-spin resets).
- **OrbitControls Restraints**: The user can click and drag to look around the space laterally and vertically. We clamped the `maxAzimuthAngle` and `maxPolarAngle` so the user can look sideways but is prevented from accidentally turning completely backwards or upside down.
- **Double-Click Reset**: If the user looks sideways and double-clicks any empty space, a GSAP animation flawlessly centers the camera's X and Y coordinates back to zero, resetting their view straight down the infinite gallery.

### 4. Brutalist & Editorial Aesthetics
- **Flat Rigid Cards**: Deliberately avoiding wobbly or distorted vertex shaders to maintain the structural integrity of the high-end photography.
- **Greige Premium Background**: Transitioned the stark white background to a softer, warmer "Greige" (`#e2e2e0`). This mimics premium matte paper and prevents digital glare from overpowering the moody, high-contrast photography.
