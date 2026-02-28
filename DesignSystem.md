# Listx Design System
### The Complete Visual Language for Listx — v1.0

> **Stack:** ShadCN UI · Tailwind CSS · Lucide Icons · Framer Motion  
> **Principle:** Data-dense, operationally clear, energetically branded — never boring, never cluttered.

---

## TABLE OF CONTENTS

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Iconography](#iconography)
4. [Spacing & Layout](#spacing--layout)
5. [Border Radius](#border-radius)
6. [Shadows & Elevation](#shadows--elevation)
7. [Component Tokens](#component-tokens)
8. [Loading & Skeleton States](#loading--skeleton-states)
9. [Animation System](#animation-system)
10. [ShadCN Theme Config](#shadcn-theme-config)
11. [Tailwind Config Extension](#tailwind-config-extension)
12. [Platform Color Identities](#platform-color-identities)
13. [Dark Mode Mapping](#dark-mode-mapping)
14. [Usage Rules & Do/Don't](#usage-rules--dodont)

---

## COLOR SYSTEM

### Brand Palette — Named Colors

All colors sourced from the official Listx brand palette.

| Name | Hex | RGB | Role |
|------|-----|-----|------|
| **Saffron** | `#FF4C46` | 255, 76, 70 | Primary accent, CTA, alerts |
| **White** | `#FFFFFF` | 255, 255, 255 | Backgrounds, cards (light) |
| **Tea** | `#DFFFDE` | 223, 255, 222 | Success tint, hover bg, light surface |
| **Nocturn** | `#012B3A` | 1, 43, 58 | Primary dark, text, headers, sidebar |
| **Mint** | `#B2FFC6` | 178, 255, 198 | Success light bg, low-emphasis badges |
| **Spring** | `#87F8AE` | 135, 248, 174 | Success secondary, progress fills |
| **Jade** | `#42D49C` | 66, 212, 156 | Primary brand green, interactive |
| **Cedar** | `#00A68A` | 0, 166, 138 | Hover state for Jade, confirmed actions |
| **Spruce** | `#007978` | 0, 121, 120 | Deep action color, sidebar active item |
| **Lake** | `#004963` | 0, 73, 99 | Dark bg alternative, footer, deep surfaces |

---

### Semantic Color Tokens

Semantic tokens map brand palette names to UI roles. Use these everywhere in components — never raw hex.

```css
/* === LIGHT MODE === */
:root {
  /* --- Brand --- */
  --color-brand-primary:       #42D49C;   /* Jade — main interactive color */
  --color-brand-primary-hover: #00A68A;   /* Cedar */
  --color-brand-primary-deep:  #007978;   /* Spruce */
  --color-brand-accent:        #FF4C46;   /* Saffron — CTAs, highlights */
  --color-brand-dark:          #012B3A;   /* Nocturn */
  --color-brand-lake:          #004963;   /* Lake */

  /* --- Backgrounds --- */
  --color-bg-page:             #FFFFFF;   /* White */
  --color-bg-subtle:           #F7FFFE;   /* Near-white with green tint */
  --color-bg-muted:            #DFFFDE;   /* Tea — section bg, hover, tag */
  --color-bg-card:             #FFFFFF;   /* White */
  --color-bg-card-hover:       #F5FFFB;   /* Very light jade tint on hover */
  --color-bg-sidebar:          #012B3A;   /* Nocturn */
  --color-bg-sidebar-hover:    #023346;   /* Slightly lighter Nocturn */
  --color-bg-sidebar-active:   #007978;   /* Spruce */
  --color-bg-overlay:          rgba(1,43,58,0.6); /* Nocturn at 60% */

  /* --- Text --- */
  --color-text-primary:        #012B3A;   /* Nocturn — headings, labels */
  --color-text-secondary:      #2D5A6E;   /* Mid-dark, body text */
  --color-text-muted:          #5A8A9B;   /* Captions, placeholders */
  --color-text-disabled:       #A8C8D4;   /* Disabled fields */
  --color-text-inverse:        #FFFFFF;   /* On dark backgrounds */
  --color-text-on-accent:      #FFFFFF;   /* On Saffron buttons */
  --color-text-on-brand:       #012B3A;   /* On Jade/Cedar buttons */
  --color-text-link:           #00A68A;   /* Cedar for links */
  --color-text-link-hover:     #007978;   /* Spruce for hovered links */

  /* --- Borders --- */
  --color-border-default:      #D4EDE9;   /* Soft teal border */
  --color-border-subtle:       #EAF9F6;   /* Near-invisible divider */
  --color-border-strong:       #42D49C;   /* Jade — focused/active inputs */
  --color-border-error:        #FF4C46;   /* Saffron — error fields */
  --color-border-sidebar:      rgba(66,212,156,0.15); /* Faint jade lines in sidebar */

  /* --- Status Colors --- */
  --color-status-success:      #42D49C;   /* Jade */
  --color-status-success-bg:   #DFFFDE;   /* Tea */
  --color-status-success-text: #007978;   /* Spruce */

  --color-status-warning:      #F59E0B;   /* Amber — external, not in palette */
  --color-status-warning-bg:   #FFFBEB;
  --color-status-warning-text: #92400E;

  --color-status-error:        #FF4C46;   /* Saffron */
  --color-status-error-bg:     #FFF0F0;
  --color-status-error-text:   #B91C1C;

  --color-status-info:         #004963;   /* Lake */
  --color-status-info-bg:      #E8F4FA;
  --color-status-info-text:    #004963;

  --color-status-neutral:      #5A8A9B;
  --color-status-neutral-bg:   #F0F7FA;
  --color-status-neutral-text: #2D5A6E;

  /* --- Interactive States --- */
  --color-focus-ring:          rgba(66,212,156,0.4);  /* Jade focus ring */
  --color-selection-bg:        #B2FFC6;   /* Mint — text selection */
}
```

---

### Color Usage Quick Reference

```
Saffron   #FF4C46  →  Primary CTA buttons, error alerts, delete actions, urgent badges
Jade      #42D49C  →  Brand primary, interactive elements, success indicators, checkmarks
Cedar     #00A68A  →  Hover states, active links, confirmed state
Spruce    #007978  →  Sidebar active, deep interactive, secondary buttons
Lake      #004963  →  Dark card bg, footer, deep surfaces in dark mode
Nocturn   #012B3A  →  All headings, sidebar bg, modal overlay tint, body text
Tea       #DFFFDE  →  Page bg tint, badge bg, hover row bg, section dividers
Mint      #B2FFC6  →  Success light badges, tag backgrounds, chip highlights
Spring    #87F8AE  →  Progress bar fills, sparkline positives, animated indicators
White     #FFFFFF  →  Card surfaces, inputs, modals
```

---

## TYPOGRAPHY

### Font Stack

```css
/* Import in globals.css or index.html */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Role | Family | Variable |
|------|--------|----------|
| **Display & Headings** | `Sora` | `--font-display` |
| **UI & Body** | `DM Sans` | `--font-body` |
| **Code & Monospace** | `JetBrains Mono` | `--font-mono` |

```css
:root {
  --font-display: 'Sora', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

---

### Why These Fonts?

**Sora** — Geometric, modern, confident. Round terminals feel approachable but structured. Excellent at display sizes (48px+). The "brand voice" of Listx.

**DM Sans** — Highly legible at small sizes, optimized for screen reading. Slightly humanist — reduces fatigue in data-dense views. Perfect for table text, labels, body.

**JetBrains Mono** — Purpose-built for code/data display. Used for Order IDs, SKUs, AWB numbers, API keys. Has ligatures but also stays crisp without them.

---

### Type Scale

```css
:root {
  /* Display — Sora, bold weights */
  --text-display-2xl: 4rem;       /* 64px — Hero headlines */
  --text-display-xl:  3rem;       /* 48px — Section heroes */
  --text-display-lg:  2.25rem;    /* 36px — Page titles on marketing */
  --text-display-md:  1.875rem;   /* 30px — Modal titles, large headers */

  /* Headings — Sora, semibold */
  --text-h1:  1.75rem;   /* 28px — Page H1 in app */
  --text-h2:  1.375rem;  /* 22px — Section titles */
  --text-h3:  1.125rem;  /* 18px — Card headers, group labels */
  --text-h4:  1rem;      /* 16px — Table column headers, accordion headers */

  /* Body — DM Sans */
  --text-body-lg:   1rem;      /* 16px — Primary reading text */
  --text-body-md:   0.9375rem; /* 15px — Default UI text */
  --text-body-sm:   0.875rem;  /* 14px — Secondary text, descriptions */
  --text-body-xs:   0.8125rem; /* 13px — Captions, timestamps, muted info */

  /* Labels — DM Sans, medium weight */
  --text-label-lg:  0.875rem;  /* 14px — Form labels */
  --text-label-md:  0.8125rem; /* 13px — Table labels, chip text */
  --text-label-sm:  0.75rem;   /* 12px — Badges, super small labels */

  /* Mono — JetBrains Mono */
  --text-mono-md:   0.875rem;  /* 14px — Order IDs, AWB numbers */
  --text-mono-sm:   0.8125rem; /* 13px — SKUs, short codes */
  --text-mono-xs:   0.75rem;   /* 12px — API keys */

  /* Line Heights */
  --leading-tight:   1.2;
  --leading-snug:    1.35;
  --leading-normal:  1.5;
  --leading-relaxed: 1.65;
  --leading-loose:   1.8;

  /* Letter Spacing */
  --tracking-tight:   -0.02em;
  --tracking-normal:  0em;
  --tracking-wide:    0.03em;
  --tracking-wider:   0.06em;    /* Uppercase labels */
  --tracking-widest:  0.1em;     /* ALL CAPS micro labels */
}
```

---

### Typography Usage Examples

```
DISPLAY 2XL  (Sora 700, 64px, tracking-tight)
→ Landing page hero headline

DISPLAY MD   (Sora 600, 30px)
→ "Welcome back, Rohan!" on dashboard header

H1           (Sora 600, 28px, Nocturn)
→ "Orders" — page title in app

H3           (Sora 600, 18px)
→ Card section headers: "Recent Orders", "Platform Status"

BODY MD      (DM Sans 400, 15px)
→ Order detail descriptions, form help text

BODY XS      (DM Sans 400, 13px, muted)
→ "Last synced 2 minutes ago", timestamps

LABEL SM     (DM Sans 500, 12px, tracking-wider, uppercase)
→ Table column headers: "ORDER ID", "STATUS", "PLATFORM"

MONO MD      (JetBrains Mono 500, 14px)
→ #ORD-2024-04523, AWB numbers, API keys

MONO XS      (JetBrains Mono 400, 12px, muted)
→ SKU: WE-PRO-001 — inline in product lists
```

---

## ICONOGRAPHY

### Library: Lucide Icons

**Package:** `lucide-react`  
**Version:** Always latest stable  
**Style:** Stroke-based, 2px default stroke, perfectly geometric  
**Why Lucide:** Matches the clean geometric feel of Sora + DM Sans. Large icon set (1,400+). Consistent visual weight. Tree-shakeable for performance.

```bash
npm install lucide-react
```

---

### Icon Sizes

```css
:root {
  --icon-xs:  12px;   /* Inline text icons, badge decorations */
  --icon-sm:  16px;   /* Button icons, table action icons */
  --icon-md:  20px;   /* Default UI icons, nav icons */
  --icon-lg:  24px;   /* Section icons, card icons */
  --icon-xl:  32px;   /* Feature icons on cards */
  --icon-2xl: 48px;   /* Illustration-level icons in empty states */
  --icon-3xl: 64px;   /* Hero icons in onboarding, modals */
}
```

---

### Icon Stroke Width

```
Default UI icons:        stroke-width="1.75"   →  balanced, clean
Navigation icons:        stroke-width="1.5"    →  slightly lighter for sidebar
CTA / emphasis icons:    stroke-width="2"      →  stronger presence in buttons
Empty state icons:       stroke-width="1.25"   →  delicate at large sizes
Alert / warning icons:   stroke-width="2"      →  needs to command attention
```

---

### Icon-to-Feature Mapping

#### Navigation

| Screen | Icon | Lucide Name |
|--------|------|-------------|
| Dashboard | `LayoutDashboard` | LayoutDashboard |
| Products | `Package` | Package |
| Orders | `ShoppingCart` | ShoppingCart |
| Logistics | `Truck` | Truck |
| Inventory | `Boxes` | Boxes |
| Analytics | `BarChart3` | BarChart3 |
| Integrations | `Plug2` | Plug2 |
| AI Studio | `Sparkles` | Sparkles |
| Settings | `Settings` | Settings |
| Notifications | `Bell` | Bell |
| Search | `Search` | Search |
| Help | `CircleHelp` | CircleHelp |

#### Actions

| Action | Icon |
|--------|------|
| Upload file | `CloudUpload` |
| Add new | `Plus` or `PlusCircle` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| Duplicate | `Copy` |
| Download | `Download` |
| Export | `FileDown` |
| Import | `FileUp` |
| Refresh/Sync | `RefreshCw` |
| Filter | `SlidersHorizontal` |
| Sort | `ArrowUpDown` |
| View details | `ChevronRight` |
| Expand | `ChevronDown` |
| Close | `X` |
| Confirm | `Check` |
| Back | `ArrowLeft` |
| Print | `Printer` |
| Share | `Share2` |
| Copy to clipboard | `Clipboard` |
| More options | `MoreHorizontal` |
| Settings | `Settings2` |
| Lock | `Lock` |
| Unlock | `LockOpen` |
| Visibility toggle on | `Eye` |
| Visibility toggle off | `EyeOff` |
| AI generate | `Wand2` |
| Generate/sparkle | `Sparkles` |
| Schedule | `CalendarClock` |
| Bulk action | `ListChecks` |

#### Status & Alerts

| State | Icon | Color Token |
|-------|------|-------------|
| Success | `CheckCircle2` | --color-status-success |
| Warning | `AlertTriangle` | --color-status-warning |
| Error | `XCircle` | --color-status-error |
| Info | `Info` | --color-status-info |
| Loading | `Loader2` (animated spin) | --color-brand-primary |
| Blocked | `ShieldAlert` | --color-status-error |
| Locked | `Lock` | --color-text-muted |
| Syncing | `RefreshCw` (animated spin) | --color-brand-primary |
| Disconnected | `Unplug` | --color-status-error |
| Connected | `PlugZap` | --color-status-success |
| Courier | `Truck` | contextual |
| Return | `RotateCcw` | --color-status-warning |
| Star / rated | `Star` | #F59E0B |

#### Order Statuses

| Status | Icon | Color |
|--------|------|-------|
| New | `ShoppingBag` | Jade |
| Processing | `Package` | Lake |
| Packed | `PackageCheck` | Spruce |
| Shipped | `Truck` | Cedar |
| Delivered | `PackageCheck` | Jade |
| Returned | `RotateCcw` | Saffron |
| Cancelled | `Ban` | muted grey |

#### Platform Icons

> Platforms use their official logos (SVG), not Lucide icons.  
> Fall back to `Store` (Lucide) if logo unavailable.

---

### Icon Color Rules

```
On white/light bg:    Use --color-text-primary (Nocturn) or semantic status color
On dark/sidebar bg:   Use white (#FFFFFF) at 80% opacity default, 100% on active
In buttons:           Inherit button text color
Status icons:         Always use matching status color token
Disabled:             --color-text-disabled (#A8C8D4)
Brand icons:          --color-brand-primary (Jade)
Destructive icons:    --color-status-error (Saffron)
```

---

## SPACING & LAYOUT

### Spacing Scale

Based on 4px grid. All spacing values are multiples of 4px.

```css
:root {
  --space-0:  0px;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-14: 56px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

### Component Spacing Conventions

```
Card padding:              --space-5 (20px) or --space-6 (24px)
Card inner sections:       --space-4 (16px) gap
Table cell padding:        --space-3 (12px) vertical, --space-4 (16px) horizontal
Form field gap:            --space-5 (20px) between fields
Form section gap:          --space-8 (32px) between groups
Button horizontal padding: --space-5 (20px) default, --space-3 (12px) compact
Button vertical padding:   --space-2.5 (10px) default, --space-1.5 (6px) compact
Icon + label gap:          --space-2 (8px)
Sidebar nav item padding:  --space-3 (12px) vertical, --space-4 (16px) horizontal
Modal padding:             --space-6 (24px)
Page header margin bottom: --space-6 (24px)
Section gap:               --space-8 (32px)
KPI card gap:              --space-4 (16px)
```

### Layout Grid

```
App layout:        Sidebar (240px fixed) + Main content area (flex-1)
Sidebar collapsed: 60px width (icon-only mode)
Content max-width: 1440px centered
Content padding:   24px left/right, 24px top
Grid columns:      12-column grid with 24px gutter
Dashboard cards:   4 cols on desktop, 2 on tablet, 1 on mobile
Breakpoints:
  sm:   640px
  md:   768px
  lg:   1024px
  xl:   1280px
  2xl:  1536px
```

---

## BORDER RADIUS

```css
:root {
  --radius-none:    0px;
  --radius-sm:      4px;   /* Subtle rounding — table cells, chips text */
  --radius-md:      8px;   /* Default inputs, small buttons */
  --radius-lg:      12px;  /* Cards, primary buttons */
  --radius-xl:      16px;  /* Feature cards, large containers */
  --radius-2xl:     20px;  /* Modals, drawers */
  --radius-3xl:     24px;  /* Large showcase cards */
  --radius-full:    9999px; /* Pills, badges, avatar, toggle */
}
```

### Radius Usage by Component

```
Buttons (default):        --radius-lg   (12px)
Buttons (compact):        --radius-md   (8px)
Input fields:             --radius-md   (8px)
Cards:                    --radius-xl   (16px)
KPI cards:                --radius-xl   (16px)
Modals:                   --radius-2xl  (20px)
Drawers/panels:           --radius-2xl  top corners only
Dropdown menus:           --radius-lg   (12px)
Tooltips:                 --radius-md   (8px)
Badges/chips:             --radius-full (pill)
Status indicators (dot):  --radius-full (circle)
Avatar:                   --radius-full (circle)
Toast notifications:      --radius-xl   (16px)
Sidebar nav active item:  --radius-lg   (12px)
Progress bars:            --radius-full
Table:                    --radius-xl   (outer wrapper)
Image thumbnails:         --radius-md   (8px)
Platform cards:           --radius-xl   (16px)
```

---

## SHADOWS & ELEVATION

### Shadow Scale

```css
:root {
  /* Flat — no shadow */
  --shadow-none: none;

  /* Level 1 — Subtle depth, cards at rest */
  --shadow-sm:
    0 1px 2px rgba(1,43,58,0.04),
    0 1px 4px rgba(1,43,58,0.06);

  /* Level 2 — Default card shadow */
  --shadow-md:
    0 2px 4px rgba(1,43,58,0.05),
    0 4px 12px rgba(1,43,58,0.08);

  /* Level 3 — Hovered card, active state */
  --shadow-lg:
    0 4px 8px rgba(1,43,58,0.06),
    0 8px 24px rgba(1,43,58,0.12);

  /* Level 4 — Dropdowns, popovers */
  --shadow-xl:
    0 8px 16px rgba(1,43,58,0.08),
    0 16px 40px rgba(1,43,58,0.14);

  /* Level 5 — Modals, drawers */
  --shadow-2xl:
    0 16px 32px rgba(1,43,58,0.10),
    0 32px 64px rgba(1,43,58,0.18);

  /* Brand glow — Jade highlight on focus/active */
  --shadow-brand-glow:
    0 0 0 3px rgba(66,212,156,0.25);

  /* Error glow — Saffron on invalid inputs */
  --shadow-error-glow:
    0 0 0 3px rgba(255,76,70,0.20);

  /* Jade card accent — featured cards */
  --shadow-jade-card:
    0 4px 20px rgba(66,212,156,0.20),
    0 1px 4px rgba(1,43,58,0.06);
}
```

---

## COMPONENT TOKENS

### Buttons

#### Primary Button (Jade)
```css
.btn-primary {
  background:       var(--color-brand-primary);    /* Jade */
  color:            var(--color-brand-dark);        /* Nocturn text on Jade */
  font-family:      var(--font-body);
  font-size:        var(--text-body-sm);            /* 14px */
  font-weight:      600;
  border-radius:    var(--radius-lg);
  padding:          10px 20px;
  border:           none;
  box-shadow:       var(--shadow-md);
  transition:       all 150ms ease-out;
}
.btn-primary:hover {
  background:       var(--color-brand-primary-hover); /* Cedar */
  box-shadow:       var(--shadow-lg);
  transform:        translateY(-1px);
}
.btn-primary:focus-visible {
  box-shadow:       var(--shadow-brand-glow);
  outline:          none;
}
.btn-primary:active {
  background:       var(--color-brand-primary-deep); /* Spruce */
  transform:        translateY(0);
  box-shadow:       var(--shadow-sm);
}
.btn-primary:disabled {
  background:       #B2FFC6;                  /* Mint — desaturated */
  color:            #5A8A9B;
  cursor:           not-allowed;
  transform:        none;
  box-shadow:       none;
}
```

#### Accent Button (Saffron — Primary CTAs)
```css
.btn-accent {
  background:       var(--color-brand-accent);  /* Saffron */
  color:            #FFFFFF;
  /* Same sizing/radius/font as btn-primary */
}
.btn-accent:hover {
  background:       #E03A35;  /* Darker saffron */
}
```

#### Secondary Button (Outline Jade)
```css
.btn-secondary {
  background:       transparent;
  color:            var(--color-brand-primary-hover);  /* Cedar */
  border:           1.5px solid var(--color-brand-primary); /* Jade */
  border-radius:    var(--radius-lg);
  padding:          9px 20px; /* 1px less to account for border */
}
.btn-secondary:hover {
  background:       var(--color-bg-muted);  /* Tea */
  border-color:     var(--color-brand-primary-hover); /* Cedar */
}
```

#### Ghost Button
```css
.btn-ghost {
  background:       transparent;
  color:            var(--color-text-secondary);
  border:           none;
}
.btn-ghost:hover {
  background:       var(--color-bg-muted);  /* Tea tint */
  color:            var(--color-text-primary);
}
```

#### Destructive Button (Saffron-destructive context)
```css
.btn-destructive {
  background:       var(--color-status-error);    /* Saffron */
  color:            #FFFFFF;
}
.btn-destructive:hover {
  background:       #D43C37;
}
```

#### Button Sizes
```
size="lg":  padding 12px 28px, font 15px, radius 14px — for hero CTAs
size="md":  padding 10px 20px, font 14px, radius 12px — DEFAULT
size="sm":  padding 7px 14px,  font 13px, radius 8px  — compact/table actions
size="xs":  padding 4px 10px,  font 12px, radius 6px  — chip-like inline buttons
icon:       padding 10px,      square    — icon-only buttons
```

---

### Badges & Chips

```css
/* Base chip */
.chip {
  display:         inline-flex;
  align-items:     center;
  gap:             4px;
  font-family:     var(--font-body);
  font-size:       var(--text-label-md);  /* 13px */
  font-weight:     500;
  border-radius:   var(--radius-full);
  padding:         3px 10px;
  white-space:     nowrap;
}

/* Status variants */
.chip-success  { background: #DFFFDE; color: #007978; }  /* Tea bg, Spruce text */
.chip-warning  { background: #FFFBEB; color: #92400E; }
.chip-error    { background: #FFF0F0; color: #B91C1C; }  /* Saffron tint bg */
.chip-info     { background: #E8F4FA; color: #004963; }  /* Lake bg, Lake text */
.chip-neutral  { background: #F0F7FA; color: #2D5A6E; }
.chip-brand    { background: #B2FFC6; color: #007978; }  /* Mint bg, Spruce text */
.chip-accent   { background: rgba(255,76,70,0.1); color: #FF4C46; } /* Saffron */
```

#### Order Status Chips
```
New:          chip-brand    (Mint bg, Spruce text)
Processing:   chip-info     (Lake family)
Packed:       chip-info     (darker Lake tint)
Shipped:      background #DFFFDE color #007978   (Tea + Spruce)
Delivered:    chip-success  (Tea + Spruce, + CheckCircle2 icon)
Returned:     chip-warning
Cancelled:    chip-neutral
```

---

### Input Fields

```css
.input {
  font-family:      var(--font-body);
  font-size:        var(--text-body-sm);
  color:            var(--color-text-primary);
  background:       var(--color-bg-card);
  border:           1.5px solid var(--color-border-default);
  border-radius:    var(--radius-md);
  padding:          10px 14px;
  height:           40px;
  transition:       border 150ms ease, box-shadow 150ms ease;
  outline:          none;
}
.input::placeholder {
  color:            var(--color-text-muted);
}
.input:hover {
  border-color:     #A0D4C8;  /* Slightly darker default border */
}
.input:focus {
  border-color:     var(--color-brand-primary);  /* Jade */
  box-shadow:       var(--shadow-brand-glow);
}
.input.error {
  border-color:     var(--color-status-error);  /* Saffron */
  box-shadow:       var(--shadow-error-glow);
}
.input:disabled {
  background:       #F5F9FA;
  color:            var(--color-text-disabled);
  cursor:           not-allowed;
}
```

#### Input Label
```css
.input-label {
  font-family:     var(--font-body);
  font-size:       var(--text-label-lg);  /* 14px */
  font-weight:     500;
  color:           var(--color-text-primary);
  margin-bottom:   var(--space-2);
  display:         flex;
  align-items:     center;
  gap:             var(--space-1);
}
.input-label .required-dot {
  color:           var(--color-status-error);  /* Saffron asterisk */
}
```

#### Helper & Error Text
```css
.input-helper { font-size: 12px; color: var(--color-text-muted); margin-top: 4px; }
.input-error  { font-size: 12px; color: var(--color-status-error); margin-top: 4px; }
```

---

### Cards

```css
.card {
  background:      var(--color-bg-card);
  border:          1px solid var(--color-border-subtle);
  border-radius:   var(--radius-xl);
  box-shadow:      var(--shadow-sm);
  padding:         var(--space-6);
  transition:      box-shadow 150ms ease, transform 150ms ease;
}
.card:hover {
  box-shadow:      var(--shadow-md);
  transform:       translateY(-1px);
}

/* Featured / highlighted card */
.card-featured {
  border-color:    var(--color-brand-primary);  /* Jade border */
  box-shadow:      var(--shadow-jade-card);
}

/* KPI metric card */
.card-kpi {
  background:      linear-gradient(135deg, #FFFFFF 0%, #F7FFFE 100%);
  border-left:     3px solid var(--color-brand-primary); /* Jade accent left border */
}

/* Dark / lake surface card */
.card-dark {
  background:      var(--color-brand-lake);   /* Lake */
  color:           #FFFFFF;
  border-color:    rgba(66,212,156,0.2);
}
```

---

### Tables

```css
.table-wrapper {
  background:      var(--color-bg-card);
  border:          1px solid var(--color-border-subtle);
  border-radius:   var(--radius-xl);
  overflow:        hidden;
  box-shadow:      var(--shadow-sm);
}

.table thead {
  background:      #F7FFFE;  /* Very light jade-tinted surface */
  border-bottom:   1.5px solid var(--color-border-default);
}

.table th {
  font-family:     var(--font-body);
  font-size:       var(--text-label-sm);   /* 12px */
  font-weight:     600;
  color:           var(--color-text-muted);
  letter-spacing:  var(--tracking-wider);
  text-transform:  uppercase;
  padding:         12px 16px;
  white-space:     nowrap;
}

.table td {
  font-family:     var(--font-body);
  font-size:       var(--text-body-sm);   /* 14px */
  color:           var(--color-text-primary);
  padding:         12px 16px;
  border-bottom:   1px solid var(--color-border-subtle);
  vertical-align:  middle;
}

.table tbody tr:hover td {
  background:      #F5FFFB;  /* Very light jade tint */
}

.table tbody tr:last-child td {
  border-bottom:   none;
}

/* Row states */
.table tr.row-urgent  td { border-left: 3px solid var(--color-status-error); } /* Saffron */
.table tr.row-new     td { border-left: 3px solid var(--color-brand-primary); } /* Jade */
.table tr.row-muted   td { opacity: 0.55; }
```

---

## LOADING & SKELETON STATES

### Principle
> Never show a blank screen. Every async operation has a defined visual state.

---

### Skeleton Shimmer (Base)

```css
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #EAF9F6 25%,       /* Tea tint */
    #DFFFDE 50%,       /* Tea */
    #EAF9F6 75%        /* Tea tint */
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
  border-radius: var(--radius-md);
}

/* Sizes */
.skeleton-text-line { height: 14px; border-radius: 4px; }
.skeleton-title     { height: 22px; border-radius: 4px; }
.skeleton-h1        { height: 32px; border-radius: 6px; }
.skeleton-avatar    { width: 36px; height: 36px; border-radius: 50%; }
.skeleton-thumbnail { width: 40px; height: 40px; border-radius: 8px; }
.skeleton-button    { height: 38px; border-radius: 12px; }
.skeleton-badge     { height: 24px; width: 80px; border-radius: 9999px; }
.skeleton-card      { height: 120px; border-radius: 16px; }
```

---

### Skeleton Patterns by Screen

#### Dashboard KPI Cards — Loading
```
[Card 1]                  [Card 2]                 [Card 3]                [Card 4]
┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐  ┌────────────────────┐
│ ████ (icon 20px)   │   │ ████               │   │ ████               │  │ ████               │
│                    │   │                    │   │                    │  │                    │
│ ████████████       │   │ ████████████       │   │ ████████████       │  │ ████████████       │
│ (number — 32px h)  │   │                    │   │                    │  │                    │
│                    │   │                    │   │                    │  │                    │
│ ████████           │   │ ████████           │   │ ████████           │  │ ████████           │
│ (label — 14px h)   │   │                    │   │                    │  │                    │
└────────────────────┘   └────────────────────┘   └────────────────────┘  └────────────────────┘
```

#### Table — Loading
```
Each row: thumbnail skeleton | text skeleton (70%) | text (50%) | chip skeleton | text (40%)
Render 8 skeleton rows with slight width variation to feel natural (not robotic)
```

#### Product Card (Grid) — Loading
```
Full-width image area skeleton (200px height)
Two text lines (80% + 50% width)
Price skeleton (40% width)
Badge row (2 small pill skeletons)
```

---

### Spinner (Inline Loading Indicator)

```css
/* Use Lucide Loader2 icon with rotation animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation:    spin 0.75s linear infinite;
  color:        var(--color-brand-primary); /* Jade */
  flex-shrink:  0;
}

/* Size variants (match icon sizes) */
.spinner-sm  { width: 16px; height: 16px; }
.spinner-md  { width: 20px; height: 20px; }  /* Default */
.spinner-lg  { width: 28px; height: 28px; }
.spinner-xl  { width: 40px; height: 40px; }
```

---

### Button Loading State

```
Button text replaced with spinner + "Loading..." OR just spinner
Button width locked (prevent layout shift — set min-width on button before loading)
Button disabled during loading (pointer-events: none)

Examples:
  "Publish Products"  →  [spinner] "Publishing..."
  "Save Changes"      →  [spinner] "Saving..."
  "Assign Courier"    →  [spinner] "Booking..."
  "Connect Amazon"    →  [spinner] "Connecting..."
  "Log In"            →  [spinner] "Signing in..."
```

---

### Full-Page Loading (App Init / Route Transition)

```css
/* Center of screen, above sidebar and nav */
.page-loader {
  position:   fixed;
  inset:      0;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(4px);
  display:    flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index:    9999;
}

.page-loader__logo {
  /* Listx logo, 40px */
  margin-bottom: 20px;
  opacity: 0.6;
}

.page-loader__spinner {
  /* Lucide Loader2, 32px, Jade, spinning */
}

.page-loader__text {
  margin-top:  12px;
  font-family: var(--font-body);
  font-size:   13px;
  color:       var(--color-text-muted);
}
```

---

### AI Processing Animation

Used on: AI content generation, bulk upload processing, platform sync.

```css
@keyframes pulse-jade {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(66,212,156,0);
    opacity: 1;
  }
  50% {
    box-shadow: 0 0 0 12px rgba(66,212,156,0.15);
    opacity: 0.85;
  }
}

@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.ai-processing-orb {
  width:         64px;
  height:        64px;
  border-radius: 50%;
  background:    linear-gradient(135deg, #42D49C, #B2FFC6, #87F8AE, #42D49C);
  background-size: 300% 300%;
  animation:
    gradient-shift 2s ease infinite,
    pulse-jade 2s ease-in-out infinite;
}

/* Progress bar fill — animated gradient */
.progress-bar-ai {
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #42D49C, #87F8AE, #42D49C);
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}
```

---

### Sync Indicator (Live Status Dot)

```css
@keyframes sync-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.85); }
}

.status-dot {
  width:         8px;
  height:        8px;
  border-radius: 50%;
  display:       inline-block;
  flex-shrink:   0;
}

.status-dot--live     { background: var(--color-brand-primary); /* Jade */ animation: sync-pulse 2s ease-in-out infinite; }
.status-dot--warning  { background: var(--color-status-warning); animation: sync-pulse 1.5s ease-in-out infinite; }
.status-dot--error    { background: var(--color-status-error); /* Saffron */ }
.status-dot--offline  { background: var(--color-text-disabled); }
```

---

## ANIMATION SYSTEM

### Core Easing Curves

```css
:root {
  --ease-out:        cubic-bezier(0.16, 1, 0.3, 1);    /* Most UI transitions */
  --ease-in-out:     cubic-bezier(0.45, 0, 0.55, 1);   /* Drawers, slides */
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* Modals, popups — slight bounce */
  --ease-linear:     linear;                             /* Spinners, skeleton */
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);        /* Exit animations only */
}
```

---

### Duration Scale

```css
:root {
  --duration-instant: 75ms;   /* Immediate feedback: toggles, checkboxes */
  --duration-fast:    150ms;  /* Hover states, color changes */
  --duration-base:    200ms;  /* Default: most transitions */
  --duration-smooth:  300ms;  /* Drawers, dropdown open */
  --duration-slow:    400ms;  /* Modals, page transitions */
  --duration-xslow:   600ms;  /* Onboarding, celebratory moments */
  --duration-long:    1000ms; /* Complex entry animations */
}
```

---

### Animation Catalog

#### Enter / Exit Patterns

```css
/* Fade in — notifications, toasts, overlays */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Fade up — cards, content sections, list items */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Fade down — dropdowns, tooltips */
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Scale in — modals, popovers (with spring easing) */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

/* Slide in right — drawers, filter panels */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

/* Slide in left — secondary drawers */
@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}

/* Slide up — mobile sheets, bulk action bars */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
```

#### Stagger Lists (Framer Motion pattern)

```javascript
// Framer Motion — stagger children on mount
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,        // 40ms between each child
      delayChildren: 0.05,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
  }
};

// Use on: Product cards grid, order table rows, KPI cards, notification list
```

#### Component-Specific Timings

| Component | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| Modal open | scaleIn + fadeIn | 250ms | --ease-spring |
| Modal close | fadeOut + scale(0.97) | 200ms | --ease-in |
| Drawer open | slideInRight | 300ms | --ease-in-out |
| Drawer close | slideOutRight | 250ms | --ease-in |
| Dropdown open | fadeDown + scaleIn (subtle) | 150ms | --ease-out |
| Toast enter | slideUp + fadeIn | 300ms | --ease-spring |
| Toast exit | fadeOut | 200ms | --ease-in |
| Page transition | fadeUp | 200ms | --ease-out |
| Card hover lift | translateY(-1px) | 150ms | --ease-out |
| Button hover | translateY(-1px) + shadow | 150ms | --ease-out |
| Button press | translateY(0) + shadow reduce | 75ms | --ease-out |
| List stagger | fadeUp per item | 200ms | --ease-out (40ms stagger) |
| Skeleton shimmer | gradient move | 1500ms | linear (infinite) |
| AI orb pulse | scale + shadow | 2000ms | ease-in-out (infinite) |
| Sync dot pulse | opacity + scale | 2000ms | ease-in-out (infinite) |
| Progress bar | width | 400ms | --ease-out |
| Confetti (welcome) | physics-based | 1500ms | gravity |
| Checkmark (success) | stroke-dashoffset draw | 400ms | --ease-out |
| Accordion expand | height + fadeIn | 200ms | --ease-out |
| Coachmark spotlight | fadeIn | 300ms | --ease-out |
| Sidebar collapse | width | 250ms | --ease-in-out |
| Tab active indicator | translateX (underline) | 200ms | --ease-out |

---

### Hover Micro-interactions

```
Card hover:         translateY(-1px) + box-shadow increase + border-color → Jade
Button hover:       translateY(-1px) + background darken (Cedar/Spruce)
Table row hover:    bg → #F5FFFB (jade tint)
Nav item hover:     bg → --color-bg-sidebar-hover + text → white (full opacity)
Nav item active:    bg → Spruce + left border accent (Jade, 3px)
Link hover:         color → Cedar + underline offset 2px
Platform logo:      grayscale(100%) → grayscale(0%) transition 200ms
Chip hover:         background slightly darker
Icon button hover:  bg → Tea tint
Image hover:        scale(1.02) with overflow hidden on parent
```

---

## SHADCN THEME CONFIG

### `globals.css` — Complete CSS Variables

```css
@layer base {
  :root {
    /* ShadCN required tokens — mapped to Listx palette */
    --background:           0 0% 100%;              /* White */
    --foreground:           207 96% 11%;             /* Nocturn #012B3A */

    --card:                 0 0% 100%;
    --card-foreground:      207 96% 11%;

    --popover:              0 0% 100%;
    --popover-foreground:   207 96% 11%;

    --primary:              160 57% 55%;             /* Jade #42D49C */
    --primary-foreground:   207 96% 11%;             /* Nocturn on Jade */

    --secondary:            150 100% 93%;            /* Tea #DFFFDE */
    --secondary-foreground: 178 100% 24%;            /* Spruce #007978 */

    --muted:                150 100% 93%;            /* Tea */
    --muted-foreground:     200 35% 45%;             /* Mid-teal text */

    --accent:               2 100% 63%;              /* Saffron #FF4C46 */
    --accent-foreground:    0 0% 100%;               /* White on Saffron */

    --destructive:          2 100% 63%;              /* Saffron #FF4C46 */
    --destructive-foreground: 0 0% 100%;

    --border:               168 30% 87%;             /* Soft teal #D4EDE9 */
    --input:                168 30% 87%;
    --ring:                 160 57% 55%;             /* Jade focus ring */

    --radius: 0.75rem;                               /* 12px */

    /* Chart colors — using Listx palette */
    --chart-1: 160 57% 55%;   /* Jade */
    --chart-2: 165 100% 33%;  /* Cedar */
    --chart-3: 2 100% 63%;    /* Saffron */
    --chart-4: 204 100% 19%;  /* Lake */
    --chart-5: 145 100% 84%;  /* Mint */
  }

  .dark {
    --background:           207 96% 9%;              /* Near-Nocturn #011F2B */
    --foreground:           150 100% 93%;            /* Tea text on dark */

    --card:                 207 96% 13%;             /* Slightly lighter dark */
    --card-foreground:      150 100% 93%;

    --popover:              207 96% 11%;             /* Nocturn */
    --popover-foreground:   150 100% 93%;

    --primary:              160 57% 55%;             /* Jade — same */
    --primary-foreground:   207 96% 11%;

    --secondary:            204 100% 19%;            /* Lake */
    --secondary-foreground: 150 100% 93%;            /* Tea text on Lake */

    --muted:                207 80% 16%;             /* Dark muted */
    --muted-foreground:     200 25% 65%;

    --accent:               2 100% 63%;              /* Saffron — same */
    --accent-foreground:    0 0% 100%;

    --destructive:          2 100% 55%;
    --destructive-foreground: 0 0% 100%;

    --border:               207 60% 20%;             /* Dark border */
    --input:                207 60% 20%;
    --ring:                 160 57% 55%;             /* Jade */
  }
}
```

---

## TAILWIND CONFIG EXTENSION

### `tailwind.config.js`

```javascript
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {

      /* ── Colors ── */
      colors: {
        brand: {
          jade:    '#42D49C',
          cedar:   '#00A68A',
          spruce:  '#007978',
          lake:    '#004963',
          nocturn: '#012B3A',
          saffron: '#FF4C46',
          tea:     '#DFFFDE',
          mint:    '#B2FFC6',
          spring:  '#87F8AE',
        },
      },

      /* ── Fonts ── */
      fontFamily: {
        display: ['Sora', ...fontFamily.sans],
        body:    ['DM Sans', ...fontFamily.sans],
        mono:    ['JetBrains Mono', ...fontFamily.mono],
        sans:    ['DM Sans', ...fontFamily.sans],
      },

      /* ── Font Sizes ── */
      fontSize: {
        'display-2xl': ['4rem',    { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl':  ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg':  ['2.25rem', { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-md':  ['1.875rem',{ lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h1':          ['1.75rem', { lineHeight: '1.3',  fontWeight: '600' }],
        'h2':          ['1.375rem',{ lineHeight: '1.35', fontWeight: '600' }],
        'h3':          ['1.125rem',{ lineHeight: '1.4',  fontWeight: '600' }],
        'h4':          ['1rem',    { lineHeight: '1.4',  fontWeight: '600' }],
        'body-lg':     ['1rem',    { lineHeight: '1.6' }],
        'body-md':     ['0.9375rem',{ lineHeight: '1.55' }],
        'body-sm':     ['0.875rem',{ lineHeight: '1.5' }],
        'body-xs':     ['0.8125rem',{ lineHeight: '1.5' }],
        'label-lg':    ['0.875rem',{ lineHeight: '1.4', fontWeight: '500' }],
        'label-md':    ['0.8125rem',{ lineHeight: '1.4', fontWeight: '500' }],
        'label-sm':    ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }],
        'mono-md':     ['0.875rem',{ lineHeight: '1.5' }],
        'mono-sm':     ['0.8125rem',{ lineHeight: '1.4' }],
        'mono-xs':     ['0.75rem', { lineHeight: '1.4' }],
      },

      /* ── Border Radius ── */
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        '2xl':'20px',
        '3xl':'24px',
      },

      /* ── Box Shadows ── */
      boxShadow: {
        sm:         '0 1px 2px rgba(1,43,58,0.04), 0 1px 4px rgba(1,43,58,0.06)',
        md:         '0 2px 4px rgba(1,43,58,0.05), 0 4px 12px rgba(1,43,58,0.08)',
        lg:         '0 4px 8px rgba(1,43,58,0.06), 0 8px 24px rgba(1,43,58,0.12)',
        xl:         '0 8px 16px rgba(1,43,58,0.08), 0 16px 40px rgba(1,43,58,0.14)',
        '2xl':      '0 16px 32px rgba(1,43,58,0.10), 0 32px 64px rgba(1,43,58,0.18)',
        'brand-glow': '0 0 0 3px rgba(66,212,156,0.25)',
        'error-glow': '0 0 0 3px rgba(255,76,70,0.20)',
        'jade-card':  '0 4px 20px rgba(66,212,156,0.20), 0 1px 4px rgba(1,43,58,0.06)',
      },

      /* ── Spacing ── */
      spacing: {
        '4.5':  '18px',
        '5.5':  '22px',
        '13':   '52px',
        '15':   '60px',
        '18':   '72px',
        '22':   '88px',
        '26':   '104px',
      },

      /* ── Animations ── */
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseJade: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(66,212,156,0)', opacity: '1' },
          '50%':       { boxShadow: '0 0 0 12px rgba(66,212,156,0.15)', opacity: '0.85' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        syncPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.4', transform: 'scale(0.85)' },
        },
      },
      animation: {
        shimmer:       'shimmer 1.5s linear infinite',
        fadeUp:        'fadeUp 0.2s cubic-bezier(0.16,1,0.3,1) both',
        fadeIn:        'fadeIn 0.2s ease-out both',
        scaleIn:       'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
        slideInRight:  'slideInRight 0.3s cubic-bezier(0.45,0,0.55,1) both',
        slideUp:       'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
        pulseJade:     'pulseJade 2s ease-in-out infinite',
        gradientShift: 'gradientShift 2s ease infinite',
        syncPulse:     'syncPulse 2s ease-in-out infinite',
        spin:          'spin 0.75s linear infinite',
      },

    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};
```

---

## PLATFORM COLOR IDENTITIES

These are used consistently throughout: badges, platform filter tabs, integration cards, analytics charts.

```css
:root {
  /* Marketplace Platforms */
  --platform-amazon:   #FF9900;
  --platform-amazon-bg: rgba(255,153,0,0.10);

  --platform-flipkart:  #F9A825;
  --platform-flipkart-bg: rgba(249,168,37,0.10);

  --platform-shopify:  #96BF48;
  --platform-shopify-bg: rgba(150,191,72,0.10);

  --platform-ondc:     #6C48C5;
  --platform-ondc-bg:  rgba(108,72,197,0.10);

  --platform-meesho:   #9B27AF;
  --platform-meesho-bg: rgba(155,39,175,0.10);

  --platform-woocommerce: #7F54B3;
  --platform-woocommerce-bg: rgba(127,84,179,0.10);

  /* Logistics Partners */
  --courier-delhivery:  #E01B23;
  --courier-shiprocket: #FF6200;
  --courier-bluedart:   #1A237E;
  --courier-ecom:       #00897B;
  --courier-xpressbees: #FFA000;
  --courier-shadowfax:  #1565C0;
}
```

---

## DARK MODE MAPPING

| Token | Light | Dark |
|-------|-------|------|
| Page background | White `#FFFFFF` | Deep `#011F2B` (darker Nocturn) |
| Card background | White `#FFFFFF` | `#01283A` (Nocturn) |
| Card border | `#D4EDE9` (soft teal) | `rgba(66,212,156,0.12)` (faint Jade) |
| Primary text | Nocturn `#012B3A` | Tea `#DFFFDE` |
| Secondary text | `#2D5A6E` | `#87C5B8` |
| Muted text | `#5A8A9B` | `#4A7A8A` |
| Input bg | White | `#01283A` |
| Input border | `#D4EDE9` | `rgba(66,212,156,0.20)` |
| Input text | Nocturn | Tea |
| Table header bg | `#F7FFFE` | `#012232` |
| Table row hover | `#F5FFFB` | `rgba(66,212,156,0.06)` |
| Sidebar bg | Nocturn `#012B3A` | `#010F14` (deeper) |
| Sidebar active | Spruce `#007978` | Spruce `#007978` (same) |
| Jade (primary) | `#42D49C` | `#42D49C` (same — self-illuminated) |
| Saffron (accent) | `#FF4C46` | `#FF6560` (slightly lighter on dark) |
| Success chip bg | Tea `#DFFFDE` | `rgba(66,212,156,0.15)` |
| Modal bg | White | `#012232` |
| Modal overlay | `rgba(1,43,58,0.6)` | `rgba(0,0,0,0.75)` |
| Skeleton gradient | Tea tones | Dark Lake tones |

---

## USAGE RULES & DO/DON'T

### ✅ DO

- **Do** use Jade (`#42D49C`) as the primary interactive color for all success states, checkmarks, active toggles, progress bars, and primary buttons in non-critical flows.
- **Do** use Saffron (`#FF4C46`) exclusively for CTAs that require urgency or confirmation: "Publish Now", "Start Trial", critical errors, destructive actions.
- **Do** use Nocturn (`#012B3A`) for all headings, labels, and body text in light mode — never use pure black.
- **Do** use Tea (`#DFFFDE`) as the default page background tint, row hover backgrounds, and low-emphasis badge fills.
- **Do** apply Spruce (`#007978`) for active sidebar states — it provides contrast against the Nocturn sidebar without being too bright.
- **Do** use the platform color system consistently — Amazon always orange, Flipkart always yellow — this becomes a learned visual grammar for the user.
- **Do** use `JetBrains Mono` for every piece of data that is machine-generated: Order IDs, AWB numbers, SKUs, API keys, transaction IDs.
- **Do** show a skeleton state for every async data fetch. Never show an empty content area while loading.
- **Do** add a `--shadow-brand-glow` (Jade glow) to every focused input field.
- **Do** use `fadeUp` animation for list items and cards entering the viewport.
- **Do** maintain 4px grid discipline for all spacing.

### ❌ DON'T

- **Don't** use Saffron for success states — it reads as error/warning. That role belongs to Jade.
- **Don't** use Jade as a text color on white backgrounds below 16px — insufficient contrast ratio. Use Cedar or Spruce for text.
- **Don't** mix platform colors — never use Amazon orange for a non-Amazon UI element.
- **Don't** use pure black (`#000000`) anywhere in the UI — always use Nocturn (`#012B3A`) as the darkest tone.
- **Don't** apply shadows larger than `--shadow-md` to cards at rest — heavy shadows feel dated.
- **Don't** animate more than 3 elements simultaneously — it creates visual noise.
- **Don't** use Inter, Roboto, or system-ui fonts — the type system is fixed as Sora + DM Sans.
- **Don't** use `border-radius` values outside the defined scale.
- **Don't** use opacity hacks for disabled states — use the defined disabled color tokens.
- **Don't** show raw error codes or API responses to users — translate all errors to human-readable messages.
- **Don't** use Mint (`#B2FFC6`) or Spring (`#87F8AE`) as text colors — they are background/fill only.
- **Don't** use Lake (`#004963`) for body text on white — it's for dark surfaces and backgrounds only.

---

### Accessibility Minimums

| Combination | Contrast | Use |
|-------------|----------|-----|
| Nocturn on White | 15.8:1 | ✅ AAA — body text |
| Jade on White | 2.4:1 | ⚠️ AA Large only — decorative, not body text |
| Cedar on White | 4.8:1 | ✅ AA — links, interactive text |
| Spruce on White | 7.1:1 | ✅ AAA — small text |
| White on Saffron | 3.5:1 | ✅ AA Large — button text OK |
| White on Nocturn | 15.8:1 | ✅ AAA — sidebar text |
| Nocturn on Tea | 13.2:1 | ✅ AAA — content on Tea bg |
| White on Spruce | 4.7:1 | ✅ AA — badge text |
| White on Cedar | 3.7:1 | ✅ AA Large — button text |

> **Rule:** Never use Jade as a text color on white backgrounds for functional text. Use Cedar or Spruce instead.  
> **Focus rings:** Always visible. Use `--shadow-brand-glow` (Jade) — 3px ring at 25% opacity.

---

*Listx Design System v1.0 — Complete*  
*Color Palette: Official Listx Brand (Saffron, Tea, Nocturn, Mint, Spring, Jade, Cedar, Spruce, Lake)*  
*Framework: ShadCN UI + Tailwind CSS + Lucide Icons + Framer Motion*