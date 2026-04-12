# Design System Specification: The Kinetic Horizon

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Horizon."** 

WebsUp.nl is not just about code; it’s about momentum and the fluid scaling of digital enterprises. This design system moves away from the static, "boxed" nature of traditional web templates. Instead, we embrace a high-end editorial feel characterized by **Intentional Asymmetry**, **Kinetic Depth**, and **Atmospheric Color**. 

The goal is to create an interface that feels liquid and premium. We achieve this by using massive amounts of whitespace (breathing room), sophisticated type scales that command attention, and a layering logic that mimics physical sheets of glass and light rather than flat digital rectangles.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in deep indigos and vibrant purples, designed to evoke a sense of "The Future of Finance and Tech."

### Color Roles
- **Primary (#493ee5):** Our lead interactive color. Use it for core actions and primary brand moments.
- **Surface & Containers:** We use a logic of "Tonal Stepping."
    - `surface`: The base canvas.
    - `surface-container-low`: Used for secondary sections or grouping content.
    - `surface-container-highest`: Reserved for floating elements or interactive cards.
- **The Mesh Gradient:** The "soul" of the brand. Use a mix of `primary`, `tertiary` (#502cfb), and the brand source colors (#5433FF, #6977FF) to create large, soft, animated background sweeps.

### The Rules of Engagement
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, shift the background color (e.g., transitioning from a `surface` hero to a `surface-container-low` feature grid).
- **Glass & Gradient:** To elevate a component (like a pricing card or navigation bar), use Glassmorphism. Apply a semi-transparent `surface-container-lowest` with a 20px-40px `backdrop-blur`.
- **Signature Textures:** For high-impact CTAs, use a subtle linear gradient from `primary` to `tertiary`. This adds a "jewel-like" depth that flat colors lack.

---

## 3. Typography: The Editorial Voice
We use typography to establish an immediate hierarchy of "The Hook" vs. "The Detail."

### The Font Pairing
- **Plus Jakarta Sans (Display & Headlines):** This is our "Editorial Voice." It is ultra-clean but has character. 
    - **Display-LG (3.5rem):** Reserved for hero headlines. Use tight letter-spacing (-0.02em) to give it a premium, compressed feel.
- **Inter (Body, Title, Labels):** This is our "Utility Voice." It provides maximum readability for complex data or long-form descriptions.

### Hierarchy Logic
- **Headline-LG (2rem):** Used to introduce new concepts. Always paired with generous top-margin to let the idea breathe.
- **Label-MD (0.75rem):** Used for "Overlines" (small text above headlines). Always uppercase with +0.05em letter spacing to act as a sophisticated anchor.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a crutch for poor layout. In this system, we use **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking" surface tiers.
    - *Level 0:* `surface` (The floor)
    - *Level 1:* `surface-container-low` (The recessed area)
    - *Level 2:* `surface-container-lowest` (The elevated card)
- **Ambient Shadows:** When a card *must* float (e.g., a modal or a primary hover state), use an extra-diffused shadow:
    - `box-shadow: 0 20px 50px rgba(9, 29, 45, 0.05);`
    - The shadow color is a 5% opacity version of `on-surface`, never pure black.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `tertiary`), white text, `lg` (0.5rem) roundedness.
- **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
- **Tertiary:** Text-only with an arrow icon. On hover, a subtle `surface-container-low` background fades in.

### Input Fields
- **Container:** `surface-container-lowest` with a "Ghost Border."
- **Interaction:** On focus, the border opacity increases to 40% and a subtle `surface-tint` outer glow (4px) appears.
- **Labels:** Use `label-md` in `on-surface-variant` color, positioned 8px above the field.

### Cards & Lists
- **The Rule:** No dividers. Separate list items with 16px of vertical whitespace or a very subtle background shift on hover.
- **Cards:** Always use the `xl` (0.75rem) roundedness scale. Content should have at least 32px of internal padding (`p-8` in tailwind terms).

### Selection Chips
- **Style:** Pill-shaped (`full` roundedness).
- **Unselected:** `surface-container-high` background.
- **Selected:** `primary` background with `on-primary` text.

---

## 6. Do's and Don'ts

### Do:
- **Embrace White Space:** If you think there is enough padding, add 20px more. High-end design requires "room to breathe."
- **Use Intentional Asymmetry:** Align a headline to the left but place the supporting body text in a 6-column span on the right to create a sophisticated, editorial rhythm.
- **Tint Your Neutrals:** Always use `on-surface-variant` for secondary text; it carries a hint of blue that feels more "premium" than a standard grey.

### Don't:
- **Don't use 100% Black:** Pure black (#000000) kills the "Kinetic" vibe. Use `on-surface` (#091d2d).
- **Don't use Default Shadows:** Avoid the "dirty" look of high-opacity, small-radius shadows.
- **Don't use Center-Alignment for Long Form:** Keep it left-aligned for an authoritative, "Stripe-like" professional look.
- **Don't Box Everything:** Let images and gradients bleed to the edge of the viewport to create a sense of scale.