# Lekha Rathnam — Premium Photography Portfolio Website

## Project Brief

Build a luxury photography portfolio website for **Lekha Rathnam**, an editorial & fine-art photographer based in India. The site must feel like a curated gallery exhibition—not a traditional portfolio. It should showcase her distinctive visual language: intimate model portraiture, saturated color work, cinematic compositions, and strong editorial sensibility.

**Reference aesthetic**: Readymag designs (especially the immersive, full-screen, typography-forward editorial style). This is NOT a corporate site—it's a creative statement.

---

## Visual Direction

### Color & Mood
- **Dominant palette**: Deep, rich earth tones from her work (terracottas, dusty pinks, olive greens, warm golds, deep burgundy)
- **Accent**: Cream/off-white for text on dark sections; deep charcoal/black for high contrast
- **Typography**: Modern serif (Fraunces, Playfair, or Crimson) for headings + minimal sans (Inter, Sora) for UI
- **Texture**: Subtle paper/canvas texture overlays on gallery sections; no plastic shine
- **Dark mode ready**: Site should feel premium in both light and dark modes

### Spatial Design
- Generous whitespace—breathing room between sections
- Full-width hero images that feel cinematic
- Minimal UI chrome—navigation should whisper, not shout
- No obvious grids initially—let images reveal their layout through interaction

---

## Core Pages & Features

### 1. Hero/Home
- **Full-screen immersive entry**: One of her strongest images as video background or static hero (with subtle parallax)
- **Minimal navigation**: Logo (top-left) + "Work" / "About" / "Contact" (subtle, top-right)
- **Single hero text line**: Just her name + subtitle ("Editorial & Fine Art Photography")
- **Scroll prompt**: Subtle arrow or text indicating scroll-to-explore
- **No CTA buttons initially**—the site itself is the call-to-action

### 2. Work / Gallery Section
**Grid Gallery (Immersive Masonry)**
- Irregular masonry layout (varying image sizes) inspired by Readymag reference
- Images load with staggered fade-in animation
- **Hover interaction**: 
  - Overlay appears with metadata: series name, year, location, "View project"
  - Subtle scale-up on hover (1.02x)
  - Text label appears in serif font over a semi-transparent dark overlay
- **Click to expand**: Clicking image opens full-screen lightbox modal with:
  - High-res image
  - Left/right arrows to navigate series
  - Series title, description, camera/technique notes
  - Close button (X top-right)
- **Filter/sort (optional but premium)**:
  - Toggle to filter by series/theme (e.g., "Portraits" / "Editorial" / "Color Studies")
  - No page reload—instant filter transition

### 3. Project/Series Pages (Nested Routes)
- Each series gets its own page (e.g., `/work/[series]`)
- Full-width cinematic layout
- Series intro text in serif font (editorial style)
- 3-5 high-res images in varied layout (2-column, 1-column, full-width mixes)
- Behind-the-scenes narrative: "Inspiration," "Process," brief series statement
- Related series suggestion at bottom (3-4 thumbnail cards linking to other projects)

### 4. About Section
- Single column, text-heavy (serif typography)
- Optional: small circular or square portrait of Lekha (tasteful, editorial style)
- Brief bio emphasizing editorial work, publications, collaborative approach
- Clients/publications she's worked with (logo grid or text list)
- Credentials, approach statement

### 5. Contact / Inquire
- Minimal contact form (name, email, brief message, inquiry type dropdown: "Commercial Shoot" / "Editorial Collaboration" / "Licensing")
- Success state with elegant confirmation
- Alternatively: simple email link + social links (Instagram, email)

---

## Technical Requirements (Next.js + React)

### Framework & Libs
- **Next.js 14+** (App Router preferred)
- **React 18+**
- **TypeScript** (strongly recommended)
- **Tailwind CSS** for styling (or CSS Modules if preferred)
- **Framer Motion** for animations (scroll-triggered, hover effects, staggered reveals)
- **next/image** for optimized image loading + LQIP blur effect
- **React Hook Form** for contact form (lightweight, accessible)
- **Zustand** or **React Context** for filter/modal state (keep it simple)

### Performance
- Image optimization: WebP with JPEG fallback, responsive srcset
- Lazy loading for gallery images (IntersectionObserver)
- Skeleton/blur placeholder during image load
- Code splitting for modal/lightbox components
- CSS animations (GPU-accelerated) preferred over JS where possible

### UX/Interaction
- **Smooth scrolling** throughout
- **Staggered gallery reveals**: Images fade in with slight scale-up as they enter viewport
- **Lightbox transitions**: Smooth zoom-in on open, fade-out on close
- **Keyboard navigation**: Arrow keys in lightbox, Esc to close, Tab-accessible menu
- **Mobile-first responsive**: Gallery adapts from irregular masonry on desktop to 2-column on tablet, 1-column on mobile

---

## Design Systems & Components

### Color Tokens
```
Primary Background: #faf8f3 (warm off-white, light mode) / #0f0e0a (charcoal, dark mode)
Text Primary: #1a1612 (dark brown) / #f5f3f0 (cream)
Text Secondary: #6b6459 (muted brown) / #a9a398 (muted tan)
Accent (Hover/Borders): varies by context—pull dominant color from each image series
```

### Typography
- **Headings** (H1-H3): Fraunces, 500-700 weight, warm black
- **Body text**: Inter or Sora, 400 weight, line-height 1.7
- **Caption/metadata**: Sans, 12-14px, uppercase letter-spacing

### Components to Build
1. **Hero** – Full-screen, fixed background image + text overlay
2. **Gallery Grid** – Masonry layout with lazy-load + hover overlay
3. **Lightbox Modal** – Full-screen image viewer + navigation
4. **Navigation Bar** – Fixed/sticky, minimal, logo + links
5. **Image Card** – Single gallery item with metadata on hover
6. **Filter Toggle** – Button group for series filtering
7. **Project Card** – Thumbnail for related projects section
8. **Contact Form** – Accessible form with validation

---

## Animation & Interaction Guidelines

### Page Load
- Hero image fades in over 800ms
- Navigation slides in from top-left (200ms delay)
- Hero text fades in (400ms delay)

### Scroll Interactions
- Gallery images fade + slide in (staggered, 100-200ms between each)
- Parallax on hero section (subtle, 0.3 factor)
- Text sections reveal on scroll (fade-in)

### Hover States
- Gallery images: Subtle scale (1.02x) + overlay fade-in (300ms)
- Links: Color shift to accent color, no underline unless explicitly styled
- Buttons: Color shift + slight scale on hover

### Modal/Lightbox
- Open: Image zooms in from thumbnail position + background fades to black (300ms)
- Close: Image zooms out + fade (200ms)
- Navigate arrows: Smooth cross-fade between images (200ms)

---

## Content Structure

### Gallery Data Format (JSON/Frontmatter)
```json
{
  "id": "monsoon-studies",
  "title": "Monsoon Studies",
  "year": 2024,
  "location": "Bangalore",
  "description": "An intimate exploration of texture and color during the monsoon season...",
  "images": [
    {
      "src": "/gallery/monsoon/01.jpg",
      "alt": "Woman in green sari, window light",
      "width": 1200,
      "height": 1600,
      "aspectRatio": 0.75
    },
    ...
  ],
  "relatedSeries": ["editorial-noir", "color-palette"]
}
```

### Metadata per Image
- Camera/lens (optional, shown in lightbox)
- Location/conditions
- Inspiration or story (1-2 sentences)

---

## Deliverables

1. **Fully responsive Next.js site** (mobile, tablet, desktop)
2. **Home page** with immersive hero
3. **Gallery page** with masonry layout + lightbox
4. **Series/project pages** (dynamic routes)
5. **About page**
6. **Contact form** (functional—integrate with Nodemailer or Formspree)
7. **Navigation** (persistent, minimal)
8. **Dark mode toggle** (optional but premium)
9. **SEO optimization** (metadata, Open Graph, schema markup)
10. **Analytics-ready** (Plausible or similar lightweight tracker)

---

## Inspiration References

- **Readymag gallery sites**: Full-screen, editorial typography, generous spacing
- **Editorial photography sites** (Rankin, Tom Ford studios): Minimal UI, portfolio-first
- **Premium portfolio trends**: Dark mode support, fluid animations, image quality paramount

---

## Key Principles

1. **Let the images breathe**: Whitespace is a design element
2. **Typography as hierarchy**: Serif for editorial feel, sans for clarity
3. **No flash or noise**: Every animation should feel intentional and smooth
4. **Mobile-first but desktop-ready**: Gallery masonry should shine on large screens
5. **Professional, not corporate**: This is a creative statement, not a business brochure
6. **Performance is premium**: Fast load times, smooth scrolling, instant interactions

---

## Success Metrics

- ✅ Users spend 3+ minutes on site (engagement)
- ✅ Gallery loads images smoothly with no jank
- ✅ Mobile gallery is as compelling as desktop
- ✅ Lightbox opens/closes in <150ms (feels instant)
- ✅ Contact inquiries flow easily (low friction)
- ✅ Passes Core Web Vitals (LCP <2.5s, CLS <0.1, FID <100ms)

---

## Prompt for Claude Sonnet

You are building a luxury photography portfolio website for **Lekha Rathnam**, an editorial & fine-art photographer. The site should feel like a curated gallery exhibition—cinematic, editorial, premium.

**Design inspiration**: Readymag editorial sites (full-screen, serif typography, generous whitespace, immersive imagery).

**Key aesthetic**: Warm, earthy color palette pulled from her work (terracotta, dusty pink, olive, gold, burgundy). Serif typography (Fraunces or Playfair) for headings. Minimal UI—navigation whispers, images dominate.

**Core features**:
1. **Hero**: Full-screen immersive image with minimal text overlay
2. **Gallery masonry**: Irregular grid, lazy-loaded, hover reveals metadata, click opens lightbox
3. **Series pages**: Nested routes showing related images + narrative
4. **About**: Editorial bio, approach statement
5. **Contact form**: Simple inquiry form

**Tech stack**: Next.js 14+, React 18, TypeScript, Tailwind CSS, Framer Motion (for scroll/hover animations), next/image.

**Animation principles**: Smooth scroll-triggered fades, staggered gallery reveals, fluid lightbox transitions, GPU-accelerated transforms only.

**Deliverables**: Full responsive site (mobile-first), all pages built, optimized images, dark mode ready, SEO setup, production-ready code.

Build this with the craftsmanship of a luxury brand—every interaction should feel intentional and premium. The site itself should feel like a photography book brought to life.
