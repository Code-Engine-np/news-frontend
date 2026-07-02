# DESIGN.md

Source: Stitch project `projects/9466405615770555715` (`Emerald & Ember News`)

## Design Rules

- Keep the layout light, spacious, and editorial.
- Use a 1280px max content width.
- Prefer a strong brand accent for primary actions and navigation.
- Use rounded but restrained surfaces; the system is based on a 4px rounding scale.
- Keep hierarchy clear: large headlines, readable body copy, compact labels.
- Use high-contrast text on soft neutral surfaces.
- Reserve orange for secondary highlights and alerts.
- Treat the page as a bilingual news portal, so labels and nav items can mix English and Nepali.

## Color Palette

### Core Surfaces

- `surface`: `#f9f9f9`
- `surface-dim`: `#dadada`
- `surface-bright`: `#f9f9f9`
- `surface-container-lowest`: `#ffffff`
- `surface-container-low`: `#f3f3f3`
- `surface-container`: `#eeeeee`
- `surface-container-high`: `#e8e8e8`
- `surface-container-highest`: `#e2e2e2`
- `surface-variant`: `#e2e2e2`

### Primary

- `primary`: `#006c4b`
- `primary-container`: `#00a676`
- `primary-fixed`: `#7afac3`
- `primary-fixed-dim`: `#5bdda8`
- `on-primary`: `#ffffff`
- `on-primary-container`: `#003221`
- `on-primary-fixed`: `#002114`
- `on-primary-fixed-variant`: `#005138`
- `inverse-primary`: `#5bdda8`

### Secondary

- `secondary`: `#a33e00`
- `secondary-container`: `#fe6500`
- `secondary-fixed`: `#ffdbcd`
- `secondary-fixed-dim`: `#ffb596`
- `on-secondary`: `#ffffff`
- `on-secondary-container`: `#541d00`
- `on-secondary-fixed`: `#360f00`
- `on-secondary-fixed-variant`: `#7c2e00`

### Tertiary / Neutral

- `tertiary`: `#5f5e5e`
- `tertiary-container`: `#939191`
- `tertiary-fixed`: `#e5e2e1`
- `tertiary-fixed-dim`: `#c8c6c5`
- `on-tertiary`: `#ffffff`
- `on-tertiary-container`: `#2b2a2a`
- `on-tertiary-fixed`: `#1c1b1b`
- `on-tertiary-fixed-variant`: `#474746`

### Text, Outline, and Utility

- `on-surface`: `#1a1c1c`
- `on-surface-variant`: `#3d4a42`
- `on-background`: `#1a1c1c`
- `outline`: `#6d7a72`
- `outline-variant`: `#bccac0`
- `inverse-surface`: `#2f3131`
- `inverse-on-surface`: `#f1f1f1`
- `error`: `#ba1a1a`
- `error-container`: `#ffdad6`
- `on-error`: `#ffffff`
- `on-error-container`: `#93000a`

## Typography

### Type Families

- Headline font: `Hanken Grotesk`
- Body font: `Noto Sans`
- Label font: `Work Sans`

### Type Scale

- `display-lg`: 48px / 56px, `800`, Hanken Grotesk
- `headline-lg`: 32px / 40px, `700`, Hanken Grotesk
- `headline-lg-mobile`: 24px / 30px, `700`, Hanken Grotesk
- `headline-md`: 24px / 32px, `600`, Hanken Grotesk
- `body-lg`: 18px / 28px, `400`, Noto Sans
- `body-md`: 16px / 24px, `400`, Noto Sans
- `label-md`: 14px / 20px, `500`, Work Sans, `0.02em` tracking
- `label-sm`: 12px / 16px, `600`, Work Sans, `0.05em` tracking

## Spacing and Layout

- Base spacing: 8px
- Grid gutter: 24px
- Desktop margin: 64px
- Mobile margin: 16px
- Max width: 1280px
- Spacing scale: 2

## Roundness

- Roundness token: `ROUND_FOUR`
- Use subtle rounded corners for cards, pills, and panels.

## Implementation Notes

- Use the primary green for nav bars, emphasis blocks, and core brand surfaces.
- Use the orange secondary color for breaking-news highlights and strong accents.
- Keep hero-style content and top-level messaging large and bold.
- Prefer airy sections with consistent gutters instead of dense content columns.
- Preserve the bilingual presentation style when adding navigation or footer copy.
