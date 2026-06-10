# Kfeteria Design Guide

## How Codex should use this document

Future development tasks must read and follow this document before doing UI or UX work unless the user explicitly instructs otherwise. This file is a permanent source of truth for visual direction, component styling, layout behavior, and UI consistency across mobile and web.

This document should be used together with:

- `docs/PROJECT_CONTEXT.md` for product and business rules
- `docs/DEVELOPMENT_RULES.md` for implementation and architecture rules

## Purpose

This guide defines the permanent UI and visual language for Kfeteria. The product should feel like a premium operations dashboard for a real cafeteria business, not a generic consumer mobile app.

Kfeteria should communicate:

- Modern structure
- Formal presentation
- Premium finish
- Warm hospitality
- Trustworthy financial clarity
- Business-management focus

## Primary visual reference

Primary reference:

- `design-references/dashboard mock up.png`

This reference image is the main stylistic anchor for the application. New screens should follow its overall character:

- Dark premium brand areas
- Warm gold highlights
- Clean ivory workspace surfaces
- White information cards
- Structured dashboard composition
- Elegant contrast between hospitality warmth and operational seriousness

## Brand personality

- Modern
- Formal
- Premium
- Warm
- Trustworthy
- Cafeteria and business-management focused
- Dashboard oriented

The product should feel like the operating system of a food business. It should be visually polished, operationally clear, and credible enough for owners making real financial and inventory decisions.

## Color palette

- Carbon / near black: `#1C1C1E`
- Coffee dark brown: `#3B2F2A`
- Gold primary: `#D4AF37`
- Beige surface: `#F5E9D6`
- Ivory background: `#FAF7F2`
- White cards: `#FFFFFF`
- Muted text: `#6B625A`
- Success green: `#16A34A`
- Warning amber: `#F59E0B`
- Danger red: `#DC2626`

## Color usage rules

- Gold is for primary CTAs, active tabs, highlights, icons, charts, and key financial values.
- Carbon is for headers, sidebar or dark surfaces, and high-emphasis text.
- Ivory and beige are for app backgrounds and large content surfaces.
- White is for cards and content containers.
- Brown is secondary and should be used as a premium accent, not a dominant replacement for carbon.
- Success, warning, and danger colors are reserved for semantic status.
- Avoid random colors outside the palette unless a semantic state requires them.
- Never hardcode one-off colors inside UI components when a theme token should exist.

## Typography

Typography should feel clear, modern, and formal.

- Headlines should be bold, confident, and readable on small screens.
- Body text should prioritize clarity over decorative styling.
- Muted supporting text should remain readable and never fade into low-contrast gray.
- Numeric KPI values should feel prominent and easy to scan.
- Financial values should visually stand out using scale, weight, and sometimes gold emphasis.

Typography usage guidance:

- Screen title: strong, high-emphasis, usually on carbon or white surfaces
- Section title: clear and medium-large
- KPI value: large and bold
- Supporting label: muted but readable
- Metadata: smaller text, never below practical mobile readability

## Spacing and rhythm

- Use consistent spacing tokens from the theme.
- Prefer generous spacing over cramped density.
- Separate sections clearly so dashboard content is easy to scan.
- Avoid overcrowding cards with too many small elements.
- Maintain visual breathing room between KPI areas, action groups, and list sections.

## Radius

- Rounded corners are part of the visual identity.
- Cards should feel refined, not sharp or overly playful.
- Primary content cards should use medium to large radius values.
- Pills and badges may use full rounding.

## Shadows

- Use soft shadows for elevation.
- Shadows should create subtle premium depth, not heavy floating layers.
- Cards should lift slightly from ivory or beige backgrounds.
- Dark hero surfaces can use stronger shadows than white cards.

## Card style

Cards are a core pattern in Kfeteria.

- Use white cards for content and KPI modules.
- Use rounded corners and soft shadows.
- Keep card headers clear and structured.
- Avoid excessive borders when shadow and spacing already define the surface.
- KPIs should be concise and prominent.
- Lists inside cards should be easy to scan and aligned consistently.

## Layout rules

- Mobile-first is mandatory.
- Design for narrow screens first, then expand cleanly for tablet and web.
- Use a clear hierarchy: hero or summary first, then actions, then details.
- Prefer stacked layouts on mobile.
- Prefer balanced grid layouts on tablet and desktop.
- Avoid wide empty spaces on web by constraining content width.
- Keep important actions reachable without excessive scrolling when possible.

## Sidebar and navigation rules

Main navigation structure:

- Inicio
- Ventas
- Inventario
- Menú
- Finanzas
- Más

Responsive navigation behavior:

- Desktop should use a sidebar.
- Mobile should use bottom navigation.

Sidebar styling:

- Carbon should be the dominant sidebar surface.
- Gold should indicate the active destination.
- Icons should be simple, clean, and consistent.
- Navigation should feel operational and not overly decorative.

Bottom navigation styling:

- Keep labels readable.
- Use gold for the active tab.
- Ensure touch targets are comfortable on mobile.

## Dashboard rules

The dashboard is the visual center of the app and should represent business health at a glance.

It should prominently show:

- Sales today
- Estimated profit
- Expenses today
- Expected cash
- Low inventory alerts
- Recent activity
- Quick actions

When relevant, it may also show:

- Inventory alerts
- Report shortcuts
- Profit summaries
- Sales trends
- Cash closing reminders

Dashboard layout guidance:

- Top area should establish brand and day context.
- KPI cards should appear near the top.
- Quick actions should be highly visible.
- Recent operational events should appear in a dedicated section.
- Inventory warnings should be visible without dominating the screen.
- The dashboard should feel like a professional command center.

## Forms and data entry

- Forms should feel calm and structured.
- Related fields should be grouped logically.
- Labels should always be explicit.
- Required actions should be obvious.
- Primary submit actions should use gold.
- Destructive actions should use danger only when appropriate.

## Tables and lists

- Use clean alignment and explicit labels.
- Financial, inventory, and quantity values must be easy to scan.
- Never show raw numbers without business meaning or unit context.
- Use muted metadata and stronger primary values.

## Charts and metrics

- Gold should be the default emphasis color for primary chart series.
- Brown can be used for secondary chart accents.
- Use semantic colors only where meaning is clear.
- Avoid rainbow chart palettes.
- Charts should support the dashboard rather than dominate it.

## Icons and imagery

- Prefer clean, modern icons.
- Avoid playful or cartoon-like icon styles.
- Icons should support comprehension, not decorate empty space.
- Food or hospitality imagery should be used sparingly and professionally.

## Internationalization rules

- The app supports Spanish and English.
- Spanish is the default language.
- All visible user-facing text must use i18n keys.
- Never hardcode text directly in JSX.
- Add translations to both Spanish and English locale files for every new UI string.
- Visual layouts must handle longer translations gracefully.

## Accessibility rules

- Maintain readable contrast across text, cards, and actions.
- Buttons must have clear labels.
- Text sizes must stay readable on mobile.
- Avoid relying on color alone to communicate important state.
- Interactive elements should remain easy to distinguish.
- KPI and financial text should be readable at a glance.

## UI quality bar

Avoid:

- Childish styling
- Bright random colors
- Crowded cards
- Weak contrast
- Generic placeholder dashboard layouts
- UI that looks like a demo instead of a product

Prefer:

- Structured hierarchy
- Calm premium surfaces
- Strong business readability
- Warm but serious branding
- High-signal KPI presentation
- Reusable visual patterns
