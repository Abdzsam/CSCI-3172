# Design Guidelines: React Portfolio Website

## Design Approach

**Selected Approach:** Hybrid - Reference-Based (Portfolio Industry Standards) + Material Design System

**Justification:** Portfolio sites require visual differentiation while maintaining professional credibility. Drawing inspiration from Dribbble, Behance, and modern developer portfolios (like Brittany Chiang's, Josh Comeau's) while using Material Design principles for interactive components ensures a polished, contemporary feel.

**Key Design Principles:**
- Content-first hierarchy with bold typography
- Breathing room through generous whitespace
- Smooth, purposeful transitions for theme switching
- Clear visual feedback for all interactive elements

---

## Core Design Elements

### A. Typography

**Font Families (Google Fonts):**
- Primary: 'Inter' (modern, highly legible sans-serif)
- Accent: 'Space Grotesk' (distinctive for headings and project titles)

**Type Scale:**
- Hero Heading: 3.5rem (56px) / Bold / Space Grotesk
- Section Headings: 2.5rem (40px) / Bold / Space Grotesk
- Subsection Headings: 1.75rem (28px) / Semibold / Inter
- Body Large: 1.125rem (18px) / Regular / Inter
- Body: 1rem (16px) / Regular / Inter
- Small/Caption: 0.875rem (14px) / Regular / Inter
- Skill Tags: 0.875rem / Medium / Inter

**Line Heights:**
- Headings: 1.2
- Body: 1.6
- Tight (for UI elements): 1.4

---

### B. Layout System

**Spacing Primitives (Tailwind units):** 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (gaps, padding): 2, 4
- Component spacing: 6, 8, 12
- Section spacing: 16, 20, 24

**Grid Structure:**
- Container: max-w-6xl mx-auto px-6
- Projects Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Skills Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Gap: gap-6 for cards, gap-4 for tight layouts

**Responsive Breakpoints:**
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

---

### C. Component Library

#### Navigation
- Sticky header with backdrop blur effect
- Logo/Name on left, nav links center-right
- Theme toggle icon (sun/moon) on far right
- Mobile: Hamburger menu slide-in overlay from right
- Nav items: subtle hover underline animation

#### Theme Switcher
- Circular icon button (40px diameter)
- Smooth rotation transition on toggle (0.3s)
- Sun icon for light mode, moon for dark mode
- Position: Fixed top-right corner of header

#### Hero Section (Home Page)
- Large, high-quality image: Professional developer workspace or abstract tech visualization
- Image treatment: Subtle gradient overlay (dark to transparent)
- Content positioning: Centered vertically, left-aligned text
- Hero content: Name (large, bold), tagline, CTA button
- Weather widget: Compact card in top-right corner with city, temperature, humidity icons
- Height: 85vh

#### Weather Widget
- Floating card design with subtle shadow
- Icon representation of weather condition
- Temperature (large), location and humidity (smaller)
- Size: 200px × 120px
- Position: Absolute top-right with margin

#### Skill Section
- Search bar: Full-width with icon, rounded corners, subtle shadow
- Filter buttons: Pill-shaped toggles (Frontend, Backend, Tools, etc.)
- Skill cards: Grid layout, rounded corners, hover lift effect
- Each card: Icon, skill name, optional proficiency indicator
- Active filter: Filled background, inactive: outline only

#### Project Cards
- Card design: Elevated appearance with shadow on hover
- Structure: Image thumbnail top, content bottom
- Content: Project name (bold), author, tech stack (pill badges), description
- Hover: Slight scale up (1.02), deeper shadow
- Loading state: Skeleton loader animation
- No project image: Use abstract gradient background

#### Footer
- Multi-column layout: About, Quick Links, Social Media, Contact
- Social icons: Circular with hover color fill
- Copyright and attribution text
- Background: Slightly darker than page background

---

### D. Spacing & Rhythm

**Section Padding:**
- Desktop: py-20
- Tablet: py-16
- Mobile: py-12

**Card Padding:** p-6
**Button Padding:** px-8 py-3
**Input Padding:** px-4 py-3

---

### E. Interactive States

**Buttons:**
- Primary CTA: Solid fill, rounded corners (8px)
- Hover: Slight brightness increase, subtle scale (1.02)
- Disabled: Reduced opacity (0.5)

**Inputs/Search:**
- Border: 1px solid, rounded (6px)
- Focus: Border emphasis, subtle glow shadow
- Filled state: Slightly darker background

**Cards:**
- Default: Subtle shadow
- Hover: Elevated shadow, transform translateY(-4px)
- Transition: all 0.2s ease

**Theme Toggle:**
- Rotation: 180deg on click
- Transition: transform 0.3s ease

---

## Images

### Hero Image
**Description:** Professional developer workspace with dual monitors, mechanical keyboard, notepad, and coffee. Alternatively, abstract geometric shapes with gradient tech aesthetic (blues, purples, teals).

**Placement:** Full-width hero section background with gradient overlay (rgba(0,0,0,0.3) to transparent) for text readability.

**Treatment:** 
- Aspect ratio: 16:9
- Object-fit: cover
- Blur backgrounds for CTA buttons using backdrop-filter: blur(8px) with semi-transparent background

### Project Card Images
**Description:** Screenshots of project interfaces, app mockups, or relevant technology illustrations.

**Placement:** Top portion of each project card (60% height).

**Treatment:**
- Aspect ratio: 16:10
- Object-fit: cover
- Rounded top corners to match card

---

## Error Handling UI

**404 Page:**
- Centered layout with large "404" typography
- Friendly message and "Return Home" CTA
- Minimal design with brand consistency

**Loading States:**
- Skeleton loaders for project cards (pulsing animation)
- Spinner for weather data fetch
- Disabled state for search while filtering

**Error Messages:**
- Toast notifications for API failures
- Inline error text below inputs (red accent)
- Retry buttons for failed network requests

---

## Notes

- All interactive elements must maintain clear hover/focus states for accessibility
- Maintain consistent spacing throughout using defined primitive units
- Theme switch should apply CSS class to root element, toggling color variables
- Skills filter should show live results as user types or clicks categories
- Projects should gracefully handle missing data with fallback UI
- Weather widget should update periodically and show last updated time