# Listx — Complete Product Design Specification
### Version 1.0 | Product Designer Blueprint


## DESIGN PRINCIPLES

1. **Zero Ambiguity** — Every screen has one primary action. User never guesses what to do next.
2. **Operational Density** — SaaS users need data-dense screens. Use compact spacing, not spacious marketing layouts.
3. **Progressive Disclosure** — Show only what's needed. Advanced options hidden in drawers/accordions.
4. **Error Resilience** — Every form, every action has error, loading, and empty states.
5. **Platform Context** — Color-code platforms consistently: Amazon=Orange, Flipkart=Yellow, Shopify=Green, ONDC=Purple.

---

# SECTION 1 — AUTH & ONBOARDING

---

## Screen 1: Landing / Marketing Page

**Purpose:** Convert visitors into sign-ups. First impression of the product.

### Layout Structure
- **Navbar** — Fixed top, blur backdrop
  - Logo (Listx wordmark + icon, left)
  - Nav links: Features, Pricing, About, Blog (center)
  - CTA buttons: "Login" (ghost) + "Start Free Trial" (primary filled) (right)
  - Mobile: hamburger menu → slide-down drawer

### Hero Section
- **Headline:** Large display text (Sora, 64px, bold) — "The Operating System for Online Sellers"
- **Sub-headline:** DM Sans, 20px, muted — one-liner value prop
- **CTA Row:** "Start Free — No Credit Card" (primary button, large) + "Watch Demo" (ghost with play icon)
- **Trust badges row:** "10,000+ Sellers" | "Amazon Certified Partner" | "Flipkart Integrated" — small pill badges with icons
- **Hero visual:** Animated dashboard mockup / product screenshot floating with subtle shadow + gradient glow underneath

### Platform Logos Strip
- Section: "Works with your platforms"
- Logos: Amazon, Flipkart, Shopify, ONDC, Meesho, WooCommerce — grayscale, hover to color
- Infinite scroll marquee animation

### Feature Highlights (3-column grid)
Each card:
- Icon (Lucide, 24px, colored)
- Feature name (Sora, 18px, semibold)
- 2-line description (DM Sans, 14px, muted)
- Cards: subtle border, hover lifts with shadow

Feature cards:
1. Automated Product Listing
2. Smart Logistics Routing
3. Unified Order Management
4. AI Content Generation
5. Real-Time Inventory Sync
6. Analytics & Insights

### How It Works Section
- 3-step horizontal timeline
- Step 1: Connect Platforms → Step 2: Upload Products → Step 3: Manage Everything
- Each step: number badge, icon, title, description

### Social Proof Section
- 3 testimonial cards (seller quotes, name, business type, avatar)
- Star rating display
- "Trusted by sellers on" + platform logos

### Pricing Section (Preview)
- 3 plan cards: Starter / Growth / Enterprise
- Highlighted plan: Growth (most popular badge)
- Each card: plan name, price/month, feature list (checkmarks), CTA button
- Annual/Monthly toggle switch at top

### Footer
- Logo + tagline left
- Links columns: Product, Company, Resources, Legal
- Social icons row (Twitter/X, LinkedIn, Instagram)
- Copyright line
- Cookie consent banner (bottom, slide-up)

---

## Screen 2: Sign Up — Step 1 (Email + Password)

**Purpose:** Create account. Minimal friction, fast entry.

### Layout
- Split layout: Left = brand visual/illustration (40%), Right = form (60%)
- OR: Centered card on gradient background (mobile-first approach)

### Header
- Listx logo (top-left or centered)
- Page title: "Create your account" (Sora, 28px)
- Sub-text: "Start your 14-day free trial. No credit card required."
- Progress indicator: Step 1 of 2 (dots or step bar)

### Form Fields
1. **Full Name**
   - Label: "Full Name"
   - Placeholder: "Rohan Sharma"
   - Type: text
   - Validation: required, min 2 chars
   - Error state: red border + "Please enter your full name" below

2. **Email Address**
   - Label: "Work Email"
   - Placeholder: "you@yourbusiness.com"
   - Type: email
   - Validation: required, valid email format
   - Error: "Please enter a valid email address"
   - Info note: "We'll send a verification link here"

3. **Password**
   - Label: "Password"
   - Placeholder: "Min 8 characters"
   - Type: password (toggle show/hide eye icon — Lucide `Eye` / `EyeOff`)
   - Password strength meter: 4-bar indicator below field (weak/fair/good/strong)
   - Strength label text changes: "Too weak" → "Fair" → "Good" → "Strong"
   - Validation rules hint: small text "Must include uppercase, number, special character"

4. **Confirm Password**
   - Label: "Confirm Password"
   - Placeholder: "Re-enter password"
   - Real-time match check: green checkmark when matches

### Social Auth
- Divider: "— or continue with —"
- Google sign-up button (white, border, Google logo)
- Note: No Facebook (target audience = business sellers)

### Legal
- Checkbox: "I agree to the Terms of Service and Privacy Policy" (links underlined)
- Checkbox must be checked to submit

### Submit Button
- "Create Account" — full-width primary button
- Loading state: spinner inside button, text changes to "Creating account..."
- Success: button turns green briefly, then redirect

### Footer link
- "Already have an account? Log in" — link below button

---

## Screen 3: Sign Up — Step 2 (Business Info)

**Purpose:** Gather seller context for personalized onboarding.

### Header
- Progress: Step 2 of 2
- Title: "Tell us about your business"
- Sub-text: "This helps us set up Listx perfectly for you"
- Back button (top-left)

### Form Fields
1. **Business/Store Name**
   - Label: "Business Name"
   - Placeholder: "e.g. Krishna Enterprises"
   - Type: text, required

2. **Business Type** (Select dropdown or segmented radio)
   - Options: "Individual Seller" | "Small Business" | "Brand / Company" | "Agency / Consultant"

3. **Primary Selling Platforms** (Multi-select chip group)
   - Options with platform logos: Amazon | Flipkart | Shopify | ONDC | Meesho | Own Website | Other
   - Selected state: filled chip with color, unselected: outlined
   - At least 1 required

4. **Monthly Order Volume** (Dropdown)
   - Options: "Just starting (0–50)" | "51–500 orders" | "501–2000 orders" | "2000+ orders"

5. **Primary Phone Number**
   - Country code selector (default +91 for India)
   - Phone number input
   - Used for OTP verification / support

6. **GST Number** (Optional)
   - Label: "GST Number (Optional)"
   - Placeholder: "22AAAAA0000A1Z5"
   - Small badge: "Optional"

### Submit Button
- "Complete Setup →" — full width primary
- Loading + redirect to onboarding welcome

---

## Screen 4: Email Verification Screen

**Purpose:** Confirm email before accessing dashboard.

### Layout
- Centered card, minimal background with subtle pattern

### Content
- Icon: Large email/envelope icon (Lucide `Mail`, 64px, indigo colored, subtle animated pulse)
- Title: "Verify your email"
- Body text: "We've sent a 6-digit code to **rohan@example.com**. Check your inbox."
- Email shown is masked/truncated

### OTP Input
- 6 individual input boxes in a row
- Auto-focus next box on digit entry
- Auto-submit on last digit entry
- Paste support (pastes all 6 at once)
- Error state: all boxes turn red + shake animation + "Invalid code. Try again."
- Success state: all boxes turn green, spinner, redirect

### Actions
- "Resend Code" link (disabled for 60s after send, countdown timer: "Resend in 0:47")
- "Change email address" link (goes back to step 1)

### Bottom
- Support note: "Didn't get it? Check spam or contact support"

---

## Screen 5: Login Screen

**Purpose:** Fast, secure re-entry for existing users.

### Layout
- Similar to signup: split or centered card

### Header
- Logo
- Title: "Welcome back"
- Sub-text: "Log in to your Listx dashboard"

### Form Fields
1. **Email**
   - Label: "Email Address"
   - Autofill supported
   - Remember last email used (localStorage)

2. **Password**
   - Label: "Password"
   - Show/hide toggle
   - "Forgot password?" link aligned right of label

### Remember Me
- Checkbox: "Keep me logged in for 30 days"

### Submit
- "Log In" button — full width primary
- Loading state: spinner

### Social Auth
- Google login button (same as signup)

### Footer
- "Don't have an account? Sign up free" link
- "Having trouble? Contact Support" link

### Error States
- Wrong password: red inline alert "Incorrect email or password. Try again."
- Account not found: "No account found with this email. Sign up?"
- Account locked (5 attempts): "Account temporarily locked. Reset your password or try in 30 minutes."

---

## Screen 6: Forgot Password Screen

**Purpose:** Initiate password reset via email.

### Layout: Centered card, narrow (max 420px)

### Header
- Back arrow (→ Login)
- Icon: Lucide `KeyRound` (large, indigo)
- Title: "Forgot your password?"
- Sub-text: "Enter your email and we'll send reset instructions"

### Form
- Email field (same as login)
- "Send Reset Link" button — full width primary

### Success State (same screen, content swaps)
- Icon changes to `MailCheck` (green)
- Title: "Check your inbox"
- Body: "Reset link sent to **email@example.com**. Valid for 15 minutes."
- Button changes to "Open Gmail" (deep link) / "Back to Login"

---

## Screen 7: Reset Password Screen

**Purpose:** Set a new password after clicking email link.

### Header
- Title: "Create new password"
- Sub-text: "Must be different from your previous password"

### Form
1. **New Password** — with strength meter
2. **Confirm New Password** — with match indicator

### Submit
- "Update Password" button
- Success: redirect to login with toast "Password updated. Please log in."

### Error states
- Link expired: full-page message "This reset link has expired. Request a new one." with button

---

## Screen 8: Onboarding Welcome Screen

**Purpose:** Celebrate sign-up, set expectations, begin guided setup.

### Layout
- Full-screen, branded background (gradient or pattern)
- Centered content, large and airy

### Content
- Animated celebration: confetti particles or subtle sparkle animation (CSS keyframes)
- Large emoji or illustration: 🎉
- Title (Sora, 36px): "Welcome to Listx, [First Name]!"
- Sub-text: "Let's get you set up in under 3 minutes. We'll connect your platforms and you'll be ready to go."
- Progress checklist preview (3 items):
  - ✓ Account created
  - → Connect selling platforms
  - → Connect logistics
- Primary CTA: "Let's Begin →"
- Skip link: "Skip for now, take me to dashboard" (small, muted)

---

## Screen 9: Onboarding — Connect Platforms

**Purpose:** Link marketplace accounts via OAuth.

### Header
- Step indicator: Step 1 of 2 — "Connect your selling platforms"
- Sub-text: "Select the platforms you sell on to get started"

### Platform Grid (2x3 or 3x2 card grid)
Each platform card contains:
- Platform logo (color)
- Platform name (semibold)
- "Connect" button (outlined) → triggers OAuth flow
- Status chip: "Not Connected" (grey) → "Connecting..." (yellow spinner) → "Connected ✓" (green)

Platforms shown:
1. Amazon Seller Central
2. Flipkart Seller Hub
3. Shopify
4. ONDC
5. Meesho
6. WooCommerce

Each card:
- When clicked: opens OAuth popup/redirect OR credential input modal
- Connected state: card border turns green, button changes to "Connected" with checkmark + "Disconnect" link (small)
- Error state: card border red, "Connection failed — Retry" button

### Info note
- "Don't worry — you can connect more platforms later in Settings"

### Bottom
- "Continue →" button (enabled if at least 1 platform connected)
- Disabled state tooltip: "Connect at least one platform to continue"

---

## Screen 10: Onboarding — Connect Logistics Partners

**Purpose:** Link courier/logistics accounts.

### Header
- Step: Step 2 of 2 — "Connect logistics partners"
- Sub-text: "Listx will auto-assign the best courier for every order"

### Logistics Partner Cards (same card pattern as platforms)
Partners:
1. Delhivery
2. Shiprocket
3. Blue Dart
4. Ecom Express
5. XpressBees
6. Shadowfax

Each card:
- Logo, name, brief one-liner (e.g., "Best for pan-India delivery")
- Connect button → modal asking for API key / account ID
- Connected status indicator

### API Key Input Modal (inline or small modal)
- Field: API Key / Token
- Field: Account ID (if required)
- "Save & Connect" button
- Link: "How to find my API key?" → opens tooltip or help article

### Bottom
- "Go to Dashboard →" button
- "Skip — I'll connect later" link

---

# SECTION 2 — MAIN DASHBOARD

---

## Screen 11: Main Dashboard — Overview

**Purpose:** Single-pane operational snapshot. The seller's daily command center.

### Top Bar (Global Navbar — present on all authenticated screens)
- **Left:** Listx logo + sidebar collapse toggle (hamburger icon)
- **Center:** Global search bar (Cmd+K shortcut shown) — searches orders, products, SKUs
- **Right:**
  - Notification bell (Lucide `Bell`) + unread count badge
  - Help icon (Lucide `CircleHelp`)
  - Avatar dropdown (name, email, Settings, Logout)

### Left Sidebar (Collapsible)
Navigation items with Lucide icons:
- Dashboard (`LayoutDashboard`)
- Products (`Package`)
- Orders (`ShoppingCart`)
- Logistics (`Truck`)
- Inventory (`Boxes`)
- Analytics (`BarChart3`)
- Integrations (`Plug2`)
- AI Studio (`Sparkles`)
- Settings (`Settings`)

Bottom sidebar:
- Plan indicator (e.g., "Growth Plan · 14 days left")
- Upgrade button (if on free tier)

### Date Range Selector (top of content area)
- Preset buttons: Today | Yesterday | Last 7 Days | Last 30 Days | Custom
- Custom: opens date picker

### KPI Cards Row (4 cards)
Each card:
- Icon (colored, Lucide)
- Metric label
- Large number (Sora, bold)
- Change indicator: ↑ 12% vs last period (green) or ↓ 3% (red)
- Sparkline mini-chart (optional)

Cards:
1. Total Orders (Today/Period)
2. Total Revenue (₹)
3. Pending Shipments
4. Active Listings

### Platform Performance Mini-Cards Row
Per connected platform:
- Platform logo + name
- Orders today
- Revenue today
- Sync status dot (green = live, yellow = delayed, red = error)

### Charts Section (2-column)
Left: Orders Over Time (line chart, 7/30 day)
Right: Revenue by Platform (donut/pie chart)

### Recent Orders Table
Columns: Order ID | Customer | Platform | Items | Amount | Status | Action
- Status chips: Pending / Processing / Shipped / Delivered / Cancelled (color-coded)
- "View All Orders" button below table

### Alerts & Actions Panel (right sidebar or inline section)
- Pending items needing attention:
  - "12 orders awaiting courier assignment" → CTA: Assign Now
  - "3 products with low stock" → CTA: Update Stock
  - "Amazon API sync delayed 2h" → CTA: Reconnect
- Each alert: icon + message + action link

### Quick Actions Row
Icon buttons:
- Upload Products
- Create Manual Order
- Check Inventory
- View Reports

---

## Screen 12: Dashboard — Empty State

**Purpose:** Guide a new seller who has no data yet.

### Layout: Same sidebar + topbar

### Center Content
- Illustration: Empty dashboard SVG (abstract, branded)
- Title: "Your dashboard is ready"
- Sub-text: "Start by connecting your platforms and uploading your first products"
- Checklist cards (3 horizontal cards):
  1. "Connect a Platform" — with Connect button
  2. "Upload Your Products" — with Upload button
  3. "Your First Order Will Appear Here" — greyed out/locked

---

## Screen 13: Dashboard — Notification Panel

**Purpose:** View all system notifications in a slide-in drawer.

### Trigger: Bell icon in top bar

### Drawer (slides from right, 380px wide)
- Header: "Notifications" + "Mark all read" link + Close button (X)
- Tabs: All | Unread | Orders | System

### Notification Item (per notification)
- Icon (contextual: order icon, warning icon, etc.)
- Title (bold, 14px)
- Body text (muted, 13px, 2-line max)
- Timestamp (relative: "2 min ago", "Yesterday")
- Read/Unread indicator (blue dot on left for unread)
- Click → navigates to relevant screen

### Notification Types with Icons
- New order received (`ShoppingCart`, green)
- Courier assigned (`Truck`, blue)
- Low stock warning (`AlertTriangle`, orange)
- Platform sync error (`XCircle`, red)
- Listing published (`CheckCircle`, green)
- Payment received (`IndianRupee`, green)
- API disconnected (`Unplug`, red)
- System maintenance (`Info`, grey)

### Empty State
- Icon: `BellOff`
- Text: "You're all caught up!"

---

# SECTION 3 — PRODUCT MANAGEMENT

---

## Screen 14: Products — All Products List View

**Purpose:** Master list of all products in Listx catalog.

### Page Header
- Title: "Products" (Sora, 24px)
- Count badge: "1,240 products"
- Action buttons (right):
  - "Upload Products" (primary button, `Upload` icon)
  - "Add Manually" (outline button, `Plus` icon)
  - View toggle: List view / Grid view icon buttons

### Filter & Search Bar
- Search input: "Search by name, SKU, ASIN..." (full-width or 320px)
- Filter button → opens filter panel (Screen 16)
- Sort dropdown: "Sort by: Recently Added ↓"
- Active filter chips row (shows applied filters with X to remove)

### Products Table (List View)
Columns:
- Checkbox (bulk select)
- Product Image (40x40px thumbnail)
- Product Name + SKU (two-line cell)
- Category
- Platforms (platform logo chips showing where it's listed)
- Status (chip: Active / Draft / Inactive / Error)
- Stock (number, red if low)
- Price (₹)
- Last Updated (relative date)
- Actions column: `...` overflow menu (Edit, View, Duplicate, Delete, Unpublish)

### Table Features
- Sticky header
- Row hover: subtle highlight
- Sortable columns (click header to sort)
- Pagination: "Showing 1–50 of 1240" + prev/next + per-page selector (25/50/100)
- "Select All on page" vs "Select all 1240" option when checkbox clicked

### Bulk Action Bar (appears on row selection)
- "X products selected" text
- Actions: Publish to Platform | Update Inventory | Export | Delete
- Clear selection button

---

## Screen 15: Products — Grid View

**Purpose:** Visual product catalog view.

### Layout
- 4-column grid (desktop) / 2-column (tablet) / 1-column (mobile)
- Same header and filter bar as list view

### Product Card
- Square image (fills card top, ~200px)
- Product Name (2-line clamp, semibold)
- SKU (small, mono font, muted)
- Price (₹ value)
- Platform chips row (small logos)
- Status badge (top-right overlay on image: Active / Draft)
- Stock indicator (bottom: "In Stock 45" or "Low Stock 3" in red)
- Hover state: overlay appears with quick actions (Edit, View, Publish)

---

## Screen 16: Products — Filter/Sort Panel

**Purpose:** Slice the product catalog by multiple dimensions.

### Implementation: Slide-in drawer from right (480px)

### Header
- "Filter Products" title
- "Clear All" link (right)
- Close button (X)

### Filter Sections (each collapsible accordion)

**Platform**
- Checkbox list: Amazon | Flipkart | Shopify | ONDC | Meesho | Not Listed (No Platform)

**Listing Status**
- Checkbox: Active | Draft | Inactive | Error | Pending Review

**Stock Status**
- Radio: All | In Stock | Low Stock (< threshold) | Out of Stock

**Price Range**
- Dual-handle range slider: ₹0 — ₹100,000
- Min / Max input fields below

**Category**
- Searchable dropdown (categories tree)

**Last Updated**
- Date range picker

**Platform Sync Status**
- Synced | Sync Pending | Sync Failed

### Bottom Actions
- "Apply Filters" button (primary, full width)
- Count preview: "Showing 234 results" (updates live as filters change)

---

## Screen 17: Products — Bulk Action Bar

**Purpose:** Perform actions on multiple selected products.

### Implementation: Sticky bar at bottom of screen (slides up when items selected)

### Content
- Left: "48 products selected" (with clear X icon)
- Right action buttons:
  - "Publish to Platform" (dropdown button with platform options)
  - "Update Price" (opens inline price edit popover)
  - "Update Stock" (opens inline stock edit popover)
  - "Export CSV"
  - "Delete" (destructive, with confirm modal)

---

## Screen 18: Product Upload — Method Selection Screen

**Purpose:** Choose how to upload products.

### Layout: Centered, 3 option cards

### Header
- Back button
- Title: "How would you like to add products?"
- Sub-text: "Choose the method that works best for you"

### Option Cards (3 large cards, horizontal layout)
Each card (clickable, hover lifts):

**Card 1: Upload Spreadsheet**
- Icon: `FileSpreadsheet` (Lucide, large, indigo)
- Title: "Upload Spreadsheet"
- Description: "Upload your product data via CSV or Excel. Best for bulk uploads."
- Badge: "Recommended" (if seller has 10+ products)

**Card 2: Enter Manually**
- Icon: `PenLine`
- Title: "Add Manually"
- Description: "Fill in product details one by one. Best for single products."

**Card 3: Import from Platform**
- Icon: `ArrowDownCircle`
- Title: "Import from Platform"
- Description: "Pull existing listings directly from Amazon, Flipkart, or Shopify."
- Platform logos row below description

---

## Screen 19: Product Upload — CSV/Excel Import Screen

**Purpose:** Upload and map spreadsheet to Listx product format.

### Layout: Multi-step within page

### Step 1: File Upload
- Drop zone (dashed border, large, centered):
  - Icon: `CloudUpload` (large)
  - Text: "Drag & drop your file here"
  - Sub-text: "Supports CSV, XLS, XLSX — Max 50MB"
  - "Browse Files" button (secondary)
- Download template link: "📥 Download sample template"
- Accepted format: CSV, XLS, XLSX

### Step 2: Column Mapping (after file selected)
- File summary: "✓ your_products.xlsx — 324 rows detected"
- Mapping table:
  - Left column: Listx field name (required/optional label)
  - Right column: Dropdown to select which column from uploaded file maps to it
  - Auto-mapped fields shown with green checkmark
  - Unmapped required fields shown with red warning
- Preview table (first 5 rows of uploaded file)

### Step 3: Validation Summary (before confirming)
- "Ready to import: 318 products"
- "Issues found: 6 rows" → expandable: shows row numbers + issue description
- Option: "Import valid rows only" or "Fix issues first"

### Bottom
- "Start Import →" button
- Progress bar appears inline (Screen 20)

---

## Screen 20: Product Upload — Progress Screen

**Purpose:** Show AI processing progress during bulk import.

### Layout: Centered, progress-focused

### Content
- Animated illustration: spinning gears or flowing data particles (CSS animation)
- Title: "Listx is processing your products..."
- Progress bar (animated, indigo fill)
- Progress text: "Processed 124 of 318 products"
- Sub-steps checklist (each checks off as completed):
  - ✓ Parsing spreadsheet
  - ✓ Validating product data
  - → Generating AI titles & descriptions
  - ○ Mapping platform formats
  - ○ Preparing for review
- Estimated time remaining: "~2 minutes remaining"
- Cancel button (secondary, small)

### Completion State
- Checkmark animation (large, green)
- "All 318 products processed!"
- "View & Review Products →" button

---

## Screen 21: Product Upload — Manual Entry Form

**Purpose:** Add a single product with full details.

### Layout: Wide form, 2-column on desktop

### Header
- "Add New Product"
- Breadcrumb: Products > Add Product

### Form Sections (Accordion / Tab based)

**Section 1: Basic Information**
- Product Name: text input, required, 150 char limit with counter
- SKU: text input (auto-generate toggle available) — Lucide `RefreshCw` icon to generate
- Brand: text input with autocomplete (from past entries)
- Category: searchable cascading dropdown (e.g., Electronics > Computers > Laptops)
- Sub-category: auto-populated based on category

**Section 2: Description**
- Short Description: textarea, 250 char max
- Full Description: rich text editor (bold, italic, bullet list, numbered list) — TipTap-like
- Bullet Points (USP): up to 5 inputs labelled "Feature 1", "Feature 2"...
- AI Generate button (✨): opens AI generation for title/description in-place

**Section 3: Pricing**
- MRP (₹): number input
- Selling Price (₹): number input
- Cost Price (₹): number input (for margin calculation)
- Margin % shown (auto-calculated, read-only): "35.2% margin"
- Tax/GST rate: dropdown (0%, 5%, 12%, 18%, 28%)

**Section 4: Inventory**
- Current Stock: number input
- Low Stock Alert Threshold: number input (default 10)
- Stock Management: toggle (Listx manages / Platform manages)
- Fulfillment Type per platform: dropdown per connected platform (FBA / Easy Ship / Self Ship)

**Section 5: Images**
- Image upload grid (up to 9 images)
- First image = primary/main
- Drag to reorder
- Per-image: crop, zoom controls
- AI Enhance toggle per image
- Min resolution warning: < 1000px shows warning

**Section 6: Variants (if applicable)**
- Toggle: "This product has variants"
- When enabled: variant builder
  - Attribute row: Size / Color / Material + values (chips)
  - Variant table (auto-generated): each variant row has own price, stock, SKU

**Section 7: Platform-Specific Details**
- Tabs per connected platform: Amazon | Flipkart | Shopify
- Each tab shows platform-specific fields (e.g., ASIN, FNSKU for Amazon | FSN for Flipkart)
- Required fields highlighted in yellow
- Platform attribute mapping (filled from master product, editable)

### Sidebar (sticky right)
- Publish Options:
  - "Save as Draft" button
  - "Publish Now" button (primary)
  - Platform selector: checkboxes for which platforms to publish to
- Product health score: 0–100% (completeness meter)
  - Shows what's missing to improve score

---

## Screen 22: AI Processing Screen

**Purpose:** Visual feedback during AI content generation.

### Layout: Full-screen or large modal

### Animated Header
- Title: "AI is writing your listings..." 
- Subtitle: "Generating optimized titles, SEO descriptions, and keywords"

### Processing Cards (one per product, scrollable)
Each card shows:
- Product name (original)
- Status: Queued → Processing → Done
- When Processing: animated shimmer/skeleton on text areas
- When Done: actual generated title and description preview

### Stats Bar
- "42 products complete | 156 in progress | 120 queued"

### Cancel option
- "Cancel and Review What's Done" button

---

## Screen 23: AI Generated Preview Screen

**Purpose:** Review and approve AI-generated product content before publishing.

### Header
- "Review AI-Generated Listings" title
- Bulk action buttons: "Approve All" | "Regenerate All" | "Export for Review"
- Filter: "Show: All | Needs Review | Approved | Rejected"

### Product Review Cards (list or table)
Each product row/card:
- Product thumbnail
- Original name (small, muted)
- AI Generated Title (highlighted, editable inline)
- AI Generated Description (truncated, "Expand" link)
- Keywords (chips, editable)
- Platform previews (tab: "How it looks on Amazon" / "On Flipkart")
- Action: "Approve" (green button) | "Regenerate" (icon button) | "Edit" (pencil)
- Approved indicator: green badge

### Inline Edit
- Click on AI title/description → becomes editable textarea
- Character counter appears
- AI regenerate suggestion button (✨) stays visible

### Bottom
- Count: "234 of 318 approved"
- "Publish Approved Products →" button (active when at least 1 approved)

---

## Screen 24: Product — Edit Single Product Screen

**Same layout as Screen 21 (Manual Entry Form) but pre-filled.**

### Differences from Add:
- Header: "Edit Product" with product name in breadcrumb
- "Last edited: 2 hours ago by Rohan" (timestamp + user)
- "View Live on Amazon" link (if published) — opens in new tab
- "View Change History" button → slide-in panel with diff view
- Delete Product button (bottom, destructive, requires confirmation)
- Unpublish from Platform option (per platform tab)

---

## Screen 25: Product — Platform Mapping Screen

**Purpose:** Show and edit how product fields map to each platform's required format.

### Header
- "Platform Mapping — [Product Name]"
- Platform tabs: Amazon | Flipkart | Shopify | ONDC

### Per-Platform View
- Two-column mapping table:
  - Left: Platform field name + required/optional badge
  - Right: Current mapped value (editable inline) + source label (e.g., "From: Product Name")
- Missing required fields: orange row highlight + warning icon
- Auto-filled rows: green indicator
- Manual override: pencil icon to edit, "Reset to Auto" link

### Category Mapping
- Platform-specific category selector (cascading dropdown matching that platform's taxonomy)
- "Suggested: Electronics > Computers" with confirm/change option

---

## Screen 26: Product — Publish to Platforms Screen

**Purpose:** Select targets and confirm publishing action.

### Modal or full-page view

### Header
- "Publish Products" title
- Sub-text: "Select platforms to publish [X] products"

### Platform Selection
- Large cards per platform (logo + name)
- Toggle or checkbox to include/exclude
- Per platform: status summary "12 ready | 2 missing required fields"
- Clicking "2 missing required fields" → highlights which products have issues

### Pre-flight Checklist (per platform)
- ✓ Titles under character limit
- ✓ All required fields filled
- ✗ 2 products missing brand field → Fix Now link

### Publishing Options
- Publish Immediately (default)
- Schedule: date/time picker (optional)

### Bottom
- "Publish to Selected Platforms" button (primary, shows count)
- "Save as Draft" alternative

---

## Screen 27: Post-Publish Confirmation Screen

**Purpose:** Success feedback after publishing products.

### Layout: Centered, celebratory but functional

### Content
- Success icon: large animated checkmark (green)
- Title: "Products Published Successfully!"
- Stats: "318 products published to 3 platforms"
- Platform breakdown:
  - Amazon: 318 products ✓ Live
  - Flipkart: 316 products ✓ Live | 2 Pending Review
  - Shopify: 318 products ✓ Live
- Warnings (if any): "2 products on Flipkart are in review — usually takes 24–48 hours"

### Next Steps Suggestions
- "View All Products" link
- "Upload More Products" button
- "View Analytics" link

---

# SECTION 4 — ORDER MANAGEMENT

---

## Screen 28: Orders — All Orders List

**Purpose:** Unified view of every order from every platform.

### Page Header
- Title: "Orders"
- Order count: "3,420 orders"
- Live sync indicator: "Last synced: 2 minutes ago" with refresh button (`RefreshCw`)

### Top Bar
- Search: "Search by Order ID, Customer name, SKU..."
- Date range selector
- Filter button → Filter panel (Screen 29)
- Export button (CSV/Excel)

### Platform Filter Tabs
- All Orders | Amazon | Flipkart | Shopify | ONDC (with count badges per tab)

### Orders Table
Columns:
- Order ID (monospace font, copy-on-click icon)
- Platform logo (small icon)
- Customer Name
- Date & Time (relative + absolute on hover)
- Items (count + preview: "2 items — Wireless Earphones...")
- Order Value (₹, bold)
- Payment Status (chip: Paid | COD | Partial)
- Order Status (chip: New / Processing / Packed / Shipped / Delivered / Returned / Cancelled)
- Courier (logo + AWB number if assigned)
- Actions: `...` overflow (View, Assign Courier, Print Label, Cancel)

### Row Color Coding
- New orders: subtle left border accent (indigo)
- Urgent/SLA at risk: subtle red left border
- Cancelled: greyed out text

### Inline Actions
- Hover on row: quick action buttons appear (View Details, Assign Courier)

### Pagination
- Page controls + items-per-page selector
- "Load more" infinite scroll option (toggle in settings)

---

## Screen 29: Orders — Filter Panel

### Slide-in drawer (same pattern as product filter)

### Filter Options

**Order Status** — Multi-select checkboxes:
New | Processing | Packed | Shipped | Delivered | Returned | Cancelled

**Platform** — Multi-select with logos

**Payment Type**
Prepaid | COD | Partial

**Fulfillment Type**
Platform Fulfilled (FBA/Ekart) | Self Ship | Dropship

**Courier**
Dropdown: All | Delhivery | Shiprocket | BlueDart | etc.

**Date Range**
Date picker (from–to)

**Order Value**
Range slider (₹0 — ₹50,000+)

**SLA Risk**
Toggle: "Show only at-risk orders"

### Bottom
- Apply button + result count preview
- Clear All link

---

## Screen 30: Order Detail Page

**Purpose:** Complete information and actions for a single order.

### Layout: Master-detail, 2-column

### Left Column (Order Summary)
**Order Header Card**
- Order ID (large, mono) + Copy button
- Platform badge (color-coded chip with logo)
- Order date + time
- Status badge (large, colored)
- SLA Deadline indicator: "Ship by: Dec 24, 2:00 PM" (red if < 2 hours)

**Customer Information Card**
- Customer name
- Phone number (masked: ****1234, click to reveal)
- Email (masked similarly)
- Delivery address (full formatted)
- Google Maps link (address → opens in new tab)
- Address copy button

**Order Items Card**
- Table: Image | Product Name | SKU | Qty | Unit Price | Total
- Each row: product thumbnail, linked name (opens product page)
- Sub-totals, discount applied, tax breakdown, grand total
- "View Product" link per item

**Payment Card**
- Payment method
- Amount
- Status: Paid / Pending
- Transaction ID
- Payment date

### Right Column (Operations Panel)
**Order Status Timeline**
- Vertical stepper: Order Placed → Confirmed → Processing → Shipped → Delivered
- Each step: timestamp, actor (system/seller/platform), icon
- Current step highlighted

**Logistics Card**
- If not assigned: "Assign Courier" button (primary) + "Auto-Assign" link
- If assigned: Courier logo + name, AWB/tracking number (copy button), Pickup time, Estimated delivery
- Track button: opens tracking screen (Screen 46)
- "Change Courier" link (if pickup not yet done)

**Notes & Tags**
- Internal notes textarea (not visible to customer)
- Tags (add custom tags for filtering)

**Actions Panel**
Buttons:
- Print Shipping Label (`Printer` icon)
- Print Invoice
- Cancel Order (destructive, requires reason)
- Raise Issue (opens support form)

---

## Screen 31: Orders — Bulk Action Bar

(Same pattern as Product Bulk Actions — Screen 17)

### Actions specific to Orders:
- "Assign Courier" (auto or manual)
- "Print Shipping Labels" (batch PDF)
- "Print Invoices" (batch)
- "Mark as Packed"
- "Export Selected"
- "Cancel Orders" (destructive)

---

## Screen 32–36: Orders — Filtered Views

**Screens 32–36 are the same Orders list (Screen 28) with pre-applied filters:**

- Screen 32: Platform-Filtered View (tabs: Amazon / Flipkart / Shopify)
- Screen 33: Pending Action View — courier unassigned, needs attention
- Screen 34: Processing View — packed, awaiting pickup
- Screen 35: Completed/Delivered View
- Screen 36: Cancelled/Failed View

Each uses same table component. Differences:
- Empty state illustration and message specific to that state
- Quick actions contextual to that state (e.g., "Reorder" on Delivered)

---

## Screen 37: Order — Manual Edit / Override Screen

**Purpose:** Correct errors in order details.

### Header: "Edit Order #ORD-2024-0432"
### Warning banner: "Editing orders will log an audit trail. Changes may affect platform records."

### Editable Fields
- Delivery address (with validation)
- Customer phone / email
- Items (add/remove only for manual/D2C orders; platform orders locked with note)
- Internal notes
- Tags

### Non-editable fields shown greyed:
- Order ID, platform, payment amount (shown read-only with lock icon)
- Tooltip on hover: "This field is managed by [Platform Name]"

---

## Screen 38: Order — Timeline / History View

**Purpose:** Full audit trail for an order (within Order Detail Page as expandable section or slide panel)

### Content
- Vertical timeline (newest first)
- Each entry:
  - Timestamp (exact)
  - Event type (icon)
  - Event description
  - Actor (System / Seller Name / Platform / Customer)
- Event types: Order placed, Payment confirmed, Label generated, Status updated, Courier changed, Note added, Cancellation requested, etc.

---

# SECTION 5 — LOGISTICS & SHIPPING

---

## Screen 39: Logistics — Overview Dashboard

### KPI Cards Row
- Total Shipments (today/period)
- On-Time Delivery %
- Average Delivery Days
- Pending Pickups

### Chart: Courier Distribution (donut)
Shows % breakdown by courier partner

### Chart: Delivery Performance Trend (line chart)
On-time vs delayed over time

### Pending Actions Table
Orders needing courier assignment — abbreviated table with "Assign" quick action

### Courier Status Cards
Per connected courier:
- Courier logo + name
- Status: Active / Degraded / Down
- Today's shipments
- Avg delivery days (last 30d)
- Cost per shipment (avg)
- "View Details" link

---

## Screen 40: Logistics — Smart Courier Recommendation

**Purpose:** AI-powered courier selection for a specific order.

### Trigger: From Order Detail → "Auto-Assign Courier" OR from bulk assign

### Layout: Modal or full-panel

### Order Summary (top)
- Order ID, destination city/pincode, weight, dimensions, order value
- Delivery preference (if captured): Standard / Express

### Recommendation Card (highlighted, top)
- "Recommended by Listx" badge (indigo)
- Courier logo + name
- Reasons: ✓ Best for this pincode | ✓ Lowest cost | ✓ 95% on-time rate
- Price: ₹ estimate
- ETA: "2–3 business days"
- "Assign This Courier" button (primary)

### Alternative Options (comparison table below)
(Links to Screen 41 for full comparison)

---

## Screen 41: Logistics — Courier Comparison Table

### Full-screen or large modal

### Order Info Banner (top)
Pincode | Weight | Value | Required by date

### Comparison Table
Columns: Courier | Transit Days | Price | COD Available | Pincode Serviceable | On-Time % | Rating
Rows: Each connected courier partner

Features:
- Sortable columns
- Best value highlighted (green row)
- Fastest highlighted (blue badge)
- "Not serviceable" rows greyed out with tooltip

### Select & Assign
- Row-level "Assign" button
- Clicking shows confirmation step before booking

---

## Screen 42: Logistics — Assign Courier Screen

**Purpose:** Confirm courier booking.

### Modal

### Summary card
- Order ID + items
- Selected courier (logo, name, price, ETA)

### Additional Options
- Preferred pickup date/slot selector
- Special instructions textarea (optional)
- COD collection amount (if COD order)
- Insurance: toggle + value

### Confirm Button
- "Book Pickup — ₹[price]" (primary)
- Cancel link

### Success State (screen transition)
- "Pickup Booked!" with AWB number
- Copy AWB button
- "Print Label" button
- "View in Tracking" button

---

## Screen 43: Logistics — Bulk Assign Courier

**Purpose:** Assign couriers to many orders at once.

### Header: "Bulk Courier Assignment — 48 Orders"

### Options:
**Option A: Auto-Assign All**
- "Let Listx auto-select best courier for each order"
- "Auto-Assign 48 Orders" button
- Preview: table showing which courier will be assigned to each order
- Confirm button

**Option B: Assign Same Courier to All**
- Dropdown: Select one courier for all
- Warning: "X orders may not be serviceable — they'll be flagged"

**Option C: Manual Assignment**
- Full table: each order row with courier dropdown
- Bulk "Apply to Similar Pincodes" smart button

### Bottom
- Summary: "48 orders, est. total shipping: ₹3,240"
- "Confirm All Assignments" button

---

## Screen 44: Logistics — Pickup Scheduling Screen

**Purpose:** Schedule courier pickup for assigned orders.

### Content
- Grouped by courier: "Delhivery — 32 orders" / "Blue Dart — 16 orders"
- Per group: calendar date picker + time slot selector
- Available slots shown as chips: "10:00 AM – 12:00 PM ✓" / "2:00 PM – 4:00 PM ✓"
- Pickup address (warehouse address, editable per shipment)
- Contact person + phone for pickup

---

## Screen 45: Logistics — Active Shipments List

**Purpose:** Monitor all shipments currently in transit.

### Table
Columns: AWB | Order ID | Courier | Origin | Destination | Current Location | Status | ETA | Last Update

### Status chips:
Pickup Pending | Picked Up | In Transit | Out for Delivery | Delivered | Delivery Attempted | Exception

### Exception Alerts
- Red-highlighted rows with exception type: "Address Not Found" / "Customer Unavailable" / "Package Damaged"
- Quick action: "Reattempt Delivery" | "Initiate RTO"

---

## Screen 46: Logistics — Single Shipment Live Tracker

**Purpose:** Detailed tracking view for one shipment.

### Left Panel: Tracking Timeline
- Vertical timeline with checkpoints
- Each checkpoint: city, facility, status, timestamp
- Current location: highlighted with animated pulse dot
- Upcoming steps (greyed): "Out for Delivery → Delivered"

### Right Panel: Info + Map
- Map view: route visualization (static map or embedded Google Maps)
- Delivery address highlighted
- Expected delivery date (bold)
- Delivery attempt count

### Actions
- "Share Tracking" → generates shareable link for customer
- "Raise Issue" → flags problem with courier
- "Contact Courier" → phone number link

---

## Screen 47: Logistics — Returns Management List

**Purpose:** All return requests in one view.

### Tabs: All | Requested | Approved | Picked Up | Received | Refunded | Rejected

### Table
Columns: Return ID | Original Order | Customer | Return Reason | Items | Courier | Status | Requested Date | Action

### Quick filters
- Platform filter
- Reason filter (Damaged / Wrong Item / Not Required / Quality Issue / Late Delivery)

---

## Screen 48: Logistics — Return Detail Screen

**Purpose:** Process a single return request.

### Header
- Return ID + Original Order ID
- Status badge + current step in return flow

### Customer Return Request Card
- Customer name, contact
- Return reason (selected by customer)
- Customer description / note
- Uploaded images (if any) — thumbnail gallery

### Return Items
- Table: Product | SKU | Qty | Return Reason | Condition

### Seller Actions Panel
**Options:**
- Approve Return → selects courier for reverse pickup
- Reject Return → requires reason + message to customer
- Request More Info → message form to customer

**If Approved:**
- Select reverse pickup courier
- Schedule pickup date
- Refund method: Original Payment Method / Wallet Credit / Store Credit

### Status Timeline (right)
- Full history of return events

---

## Screen 49: Logistics — Failed Delivery Screen

**Purpose:** Handle undelivered shipments.

### Grouped list of failed deliveries

### Per Shipment Card
- Order ID + AWB + Courier
- Failure reason: "Customer Unavailable" / "Wrong Address" / "Refused Delivery"
- Attempts made: "2 of 3 attempts"
- Actions:
  - "Reattempt Delivery" → schedule new attempt
  - "Update Address" → edit delivery address
  - "Initiate RTO" → return to origin
  - "Contact Customer" → phone number

---

## Screen 50: Logistics — Courier Performance Report

**(Covered in Analytics Section — Screen 69 for report format)**

---

# SECTION 6 — INVENTORY MANAGEMENT

---

## Screen 51: Inventory — Master Inventory List

### Header
- Title: "Inventory"
- Last sync time + Sync button

### Summary Cards Row
- Total SKUs
- In Stock (SKUs)
- Low Stock (SKUs — red badge with count)
- Out of Stock (SKUs)

### Inventory Table
Columns:
- Product Image + Name + SKU
- Total Stock (Listx master)
- Per-Platform Stock (one column per connected platform)
- Reserved (orders being processed)
- Available
- Low Stock Threshold
- Status chip: Healthy / Low / Out of Stock
- Actions: Update Stock | View History

### Inline Stock Edit
- Click on stock number → becomes editable input
- Save on Enter or blur
- Unsaved changes badge on row

---

## Screen 52: Inventory — Per-Platform Stock View

**Purpose:** See exactly how much stock is allocated per platform.

### Toggle: "Platform View"

### Table changes to:
- Columns: Product | Amazon Stock | Flipkart Stock | Shopify Stock | ONDC Stock | Buffer Stock | Total
- Color coding: Red cells = 0 stock, Orange = low, Green = healthy
- Sync status per cell: checkmark (synced) or orange clock (sync pending)

---

## Screen 53: Inventory — Low Stock Alert List

**Purpose:** Action items for seller — products needing restock.

### Header: "Low Stock Alerts — 34 Products Need Attention"

### Priority Levels
- Critical (Out of Stock): red
- Warning (< threshold): orange
- Advisory (< 2x threshold): yellow

### Each product row
- Product name + thumbnail
- Current stock
- Threshold
- Platforms affected
- "Estimated days until OOS" (calculated from avg daily sales)
- Actions: "Update Stock" | "Pause Listing" | "Dismiss Alert"

### Bulk Actions
- "Update All via CSV"
- "Pause All Critical Listings" (prevents overselling)

---

## Screen 54: Inventory — Update Stock Screen

**Purpose:** Manually adjust inventory for a product.

### Modal or slide panel

### Header: "Update Stock — [Product Name]"

### Current Stock summary (per platform)
- Visual: platform logo + current count

### Adjustment Form
- Update Type: radio → "Set to" / "Add" / "Subtract"
- New quantity input
- Reason dropdown: Restock | Manual Correction | Damaged | Audit | Other
- Notes field (optional)
- Apply to: checkboxes per platform (which platforms to update)

### Confirmation
- Preview of change: "Amazon: 45 → 120 (+75)"
- Confirm & Update button

---

## Screen 55: Inventory — Bulk Stock Update

### CSV upload approach (same as Product Upload — Screens 19–20)
Columns expected: SKU | New Stock | Platform (optional)

### Manual table approach
- Editable table: all products, all stock fields editable
- Save All button

---

## Screen 56: Inventory — Stock History / Log Screen

### Per-Product or All Products view

### Timeline/Table
Columns: Date | Product | SKU | Change | Reason | New Value | Platform | Actor (User/System)

### Filters: Date range, Product, Platform, Reason, Actor

---

## Screen 57: Inventory — Overselling Risk Alert Screen

**Purpose:** Alert seller before a listing creates oversell risk.

### Alert Banner (also shown inline on Dashboard)
- "Warning: Overselling Risk Detected"
- "3 products may sell beyond available stock based on current platform stock levels"

### Product List
Each item:
- Product + SKU
- Available stock: 5
- Orders in processing using this stock: 4
- Buffer remaining: 1
- Risk level: High
- Immediate actions: "Pause Listing" (quick action) | "Update Stock" | "View Orders"

---

# SECTION 7 — PLATFORM INTEGRATIONS

---

## Screen 58: Integrations — Overview

### Header: "Integrations"

### Connected Platforms Section
#### Per-Platform Status Card:
- Platform logo + name
- Connection status: "Connected" (green) / "Needs Reauth" (orange) / "Disconnected" (red)
- Last synced timestamp
- Auto-sync frequency (e.g., "Every 15 minutes")
- Quick stats: X products synced | X orders today
- Actions: Manage Settings | Sync Now | Disconnect

### Add More Platforms Section
- "Connect More Platforms" heading
- Grid of unconnected platforms (greyed logo, "Connect" button)
- "Don't see your platform? Request Integration" link

### Logistics Partners Section (same card pattern)

---

## Screen 59–62: Connect Platform Screens (Amazon / Flipkart / Shopify / ONDC)

**Each follows same pattern but platform-specific:**

### Header: "Connect [Platform Name]"
- Platform logo (large, colored)
- Connection method note: "Uses official [Platform] API — read-only for orders, read/write for listings"

### Benefits / What Gets Synced
- Checklist: Orders sync | Inventory sync | Listings sync | Returns sync

### Connection Steps (numbered)
- Step 1: "Click Connect — you'll be redirected to [Platform]'s authorization page"
- Step 2: "Log in and grant Listx permission"
- Step 3: "You'll be brought back here automatically"

### Connect Button
- "Connect [Platform]" (large primary button)
- On click: opens OAuth popup (new window) OR redirects

### Post-Connection
- Success: green card, "Connected as [Seller ID / Store Name]"
- Sync settings: toggle for what to sync, sync frequency selector
- "Begin Initial Sync" button — triggers first pull of all existing data

---

## Screen 63: Connect Logistics Partner (Generic)

### Same structure but uses API key method

### Form:
- API Key field (with show/hide toggle, Lucide `Eye`)
- Client ID / Secret fields (if required by partner)
- Account ID field
- Pickup address pre-fill option

### Help section
- Accordion: "How to find my API credentials on [Partner]"
- Link: "Open [Partner] Developer Console"

---

## Screen 64: Integration — Platform Health Status

### Header: "Platform Health & Sync Status"

### Grid of status cards
Per integration:
- Status indicator: `●` Operational / `●` Degraded / `●` Down
- Last successful sync: timestamp
- Error log (expandable): last 3 errors with timestamp + message
- "Retry Sync" button
- "Reconnect" button (if auth expired)

### System Status Banner (if Listx internal issue)
- Yellow/red banner: "Listx is experiencing connectivity issues with [Platform]. Operations may be delayed."

---

## Screen 65: Integration — Disconnect / Reauthorize

### Modal

#### Disconnect Flow
- Warning: "Disconnecting Amazon will stop order sync and listing updates. Existing data will be preserved."
- Confirmation checkbox: "I understand the implications"
- "Disconnect" button (destructive)

#### Reauthorize Flow (token expired)
- Info: "Your [Platform] authorization has expired. Reconnect to resume sync."
- "Reconnect" button (primary)
- Timeline of what was missed: "Last 4 hours of orders may need manual review"

---

# SECTION 8 — ANALYTICS & REPORTS

---

## Screen 66: Analytics — Overview Dashboard

### Header
- "Analytics" + date range selector
- Export button (PDF/CSV)

### KPI Row (6 cards)
- Total Revenue (₹)
- Total Orders
- Avg Order Value
- Return Rate %
- Active Listings
- Delivery Success Rate %

### Charts Grid (2x2)
1. Revenue Over Time (area chart, by platform — multi-series)
2. Orders by Platform (bar chart)
3. Top Selling Products (horizontal bar)
4. Order Status Distribution (donut)

### Performance Table
- Top 10 products by revenue in selected period
- Columns: Product | Orders | Revenue | Returns | Net Revenue

---

## Screen 67: Analytics — Sales by Platform

### Platform selector tabs or segmented control
- Revenue breakdown: platform side-by-side bars
- Order count comparison
- AOV per platform
- Growth % vs prior period

### Drill-down table
Per platform: orders, revenue, returns, avg delivery days

---

## Screen 68: Analytics — Product Performance Report

### Search & filter by category/platform

### Product Table
- Rank | Product | SKUs sold | Revenue | Views (if available) | Conversion Rate | Returns
- Sortable columns

### Performance segments
- Top Performers (green)
- Average
- Underperformers (red — candidates for price change or delisting)

### Charts
- Revenue by category (treemap or stacked bar)

---

## Screen 69: Analytics — Logistics Performance Report

### Courier Comparison Cards
Per courier:
- On-time delivery %
- Avg transit days
- Return/RTO %
- Cost per shipment (avg)
- Exception rate
- Rating (stars)

### Charts
- Delivery time distribution (histogram)
- On-time % trend over time

---

## Screen 70: Analytics — Inventory Turnover Report

### Table
Product | Avg Stock | Units Sold | Turnover Rate | Days in Stock | Dead Stock Flag

### Filters: Category | Platform | Date Range

---

## Screen 71: Analytics — Returns & Cancellations Report

### Summary cards: Return rate % | Cancellation rate % | RTO %

### Charts
- Returns by reason (pie)
- Returns by platform (bar)
- Trend over time (line)

### Drill-down table: Order-level returns data

---

## Screen 72: Analytics — SEO & Listing Quality Score

### Per-product listing health scores
- Score: 0–100 (donut per product)
- Breakdown: Title quality | Description length | Image count | Keyword density | Category match
- Benchmark: "Your avg score: 74 | Industry avg: 68"
- Recommendations: "Add 2 more images to improve score"

---

## Screen 73: Analytics — Custom Date Range Picker

**Implementation: Dropdown panel attached to date range selector button**

### Calendar component
- Dual calendar (start month + end month)
- Range selection (click start → click end, range highlighted)
- Preset shortcuts: Today | Yesterday | Last 7 | Last 30 | Last 90 | This Month | Last Month | Custom

### Apply button + Cancel

---

## Screen 74: Analytics — Export Report Screen

### Modal

### Options
- Report type: dropdown (Revenue | Orders | Logistics | Inventory | Custom)
- Date range
- Platforms (multi-select)
- Format: CSV | Excel | PDF
- Include charts: toggle (PDF only)
- Email report to: pre-filled with user email, editable

### Generate button
- Loading state: "Generating report..."
- Success: download starts + "Report emailed to you" toast

---

# SECTION 9 — AI STUDIO

---

## Screen 75: AI Studio — Content Generator

### Header: "AI Studio" with ✨ sparkle icon

### Layout: Split — Input form (left) | Live Preview (right)

### Input Section
- Product Name: text input
- Category: dropdown
- Key Features: textarea (bullet points)
- Target Audience: optional text
- Tone: select (Professional | Friendly | Persuasive | Minimal)
- Target Platform: select (Generic | Amazon | Flipkart | Shopify)

### Generate Button
- "Generate Content ✨" (primary)
- Loading: shimmer animation on preview side

### Output Preview (right side — live updates)
- **Generated Title** (editable inline)
  - Character count / limit per platform
  - "Regenerate" icon
- **Generated Description** (editable rich text)
  - Word count
  - "Regenerate" icon
- **Keywords** (chips, removable, can add more)
- **Bullet Points / Features** (list, editable)
- Platform preview tabs: "How it looks on Amazon" / "Flipkart" — rendered simulation

### Actions
- "Copy All" button
- "Apply to Product" button (if coming from product page)
- "Save to Library" button

---

## Screen 76: AI Studio — Bulk Regenerate Screen

### Header: "Bulk Content Regeneration"

### Product selector
- Table: checkbox | product name | current title score | "Regenerate" toggle per row
- "Select All Low Score Products" smart button (selects products with score < 60)

### Regeneration Options
- Tone selector (applies to all selected)
- Platform target (applies to all)
- "Preserve existing approved content" toggle

### "Start Bulk Regeneration" button
- Shows progress (Screen 22 pattern)

---

## Screen 77: AI Studio — Image Enhancement Screen

### Upload section
- Single or bulk image upload
- Drag & drop zone

### Enhancement Options (checkboxes)
- Remove background
- Auto-brightness/contrast correction
- Add white background
- Resize to platform standard (Amazon 1000x1000, etc.)
- Compress without quality loss

### Preview (before/after slider)
- Before: original image
- After: enhanced image
- Slider divider to compare

### Apply to Products
- Dropdown: which product to apply to
- "Upload Enhanced Images" button

---

## Screen 78: AI Studio — SEO Keyword Suggestion

### Input
- Product name + category
- Current keywords (if any)
- Competitor ASINs (optional, for Amazon)

### Output
- Keyword suggestions table:
  - Keyword | Search Volume (est.) | Competition | Relevance Score
- Top 10 highlighted in green (recommended to include)
- Already-used keywords shown with ✓
- Click to add to product keywords

---

# SECTION 10 — SETTINGS

---

## Screen 79: Settings — Profile & Business Info

### Layout: Settings sidebar + content area

### Settings Sidebar Navigation
- Profile & Business
- Team Members
- Billing & Subscription
- Notification Preferences
- API Keys & Webhooks
- Data & Privacy

### Profile Form
- Avatar: upload (circular, drag to upload)
- Full Name
- Email (with "Change" flow: verify new email)
- Phone number
- Business Name
- Business Type
- GST Number
- Business Address (warehouse/origin address)
- "Save Changes" button

---

## Screen 80: Settings — Team Members & Roles

### Header: "Team Members" + "Invite Member" button (primary)

### Current Members Table
Columns: Avatar + Name | Email | Role | Status | Last Active | Actions (Edit Role, Remove)

### Roles
- Owner (full access, non-removable)
- Admin (all features, can manage team)
- Manager (orders, products, logistics)
- Viewer (read-only analytics/reports)
- Custom Role (on higher plans)

---

## Screen 81: Settings — Invite Team Member

### Modal

### Form
- Email address
- Role selector (dropdown with role descriptions)
- Optional personal message
- "Send Invite" button

### Post-send
- "Invite sent to email@example.com"
- Pending invites list (with revoke option)

---

## Screen 82: Settings — Role & Permissions Manager

### Layout: Role cards + permission matrix

### Permission Matrix Table
Rows: Feature areas (Products, Orders, Logistics, Inventory, Analytics, Settings, Billing)
Columns: View | Create | Edit | Delete | Export
Each cell: toggle (on/off per role)

### Custom Role creator (on applicable plans)
- Name your role
- Set permissions via matrix
- Save Role button

---

## Screen 83: Settings — Billing & Subscription

### Current Plan Card
- Plan name (e.g., Growth)
- Billing cycle: Monthly / Annual
- Next billing date + amount
- Usage meter: "4,240 / 5,000 orders this month"
- "Upgrade Plan" button | "Change Billing Cycle" link

### Payment Method Card
- Card: ****4242 Visa | Expiry | Edit | Remove
- Add Payment Method button

### Invoices table:
Date | Amount | Status | Download PDF icon

---

## Screen 84: Settings — Plan Upgrade Screen

### Header: "Upgrade Your Plan"

### Plan comparison cards (3 tiers)
Each card:
- Plan name, price/month
- Order limit
- Platform connections limit
- Team members limit
- Feature list (checkmarks vs X marks)
- "Current Plan" / "Upgrade" / "Contact Sales" button

### Annual discount callout
- "Save 20% with annual billing" banner + toggle

---

## Screen 85: Settings — Invoice & Payment History

### Table
Date | Invoice # | Amount | Plan | Status (Paid / Failed) | Actions (View PDF / Download)

---

## Screen 86: Settings — Notification Preferences

### Grouped toggles

**Order Notifications**
- New order received: Email | Push | SMS toggles per row
- Order status change
- Cancellation received
- Return requested

**Inventory**
- Low stock alert
- Out of stock alert

**Logistics**
- Courier pickup confirmed
- Shipment delivered
- Delivery failed / exception

**Platform**
- API sync error
- Listing rejected

**System**
- Billing / payment
- Team member invites

### Channels at top: Master toggles for Email | Push | SMS

---

## Screen 87: Settings — API Keys & Webhooks

### API Keys Section
- Generated keys table: Name | Key (masked) | Created | Last Used | Actions (Revoke)
- "Generate New API Key" button
- Key creation modal: name, permission scope, expiry

### Webhooks Section
- Active webhooks table: Event | URL | Status | Last triggered
- "Add Webhook" button
- Webhook form: Event type dropdown, URL input, Secret key
- Test Webhook button

---

## Screen 88: Settings — Data Export & Privacy

### Data Export
- Export all data: "Request Complete Data Export" → generates ZIP (products, orders, inventory, analytics)
- Partial export options by category

### Privacy
- Account deletion (dangerous zone — red section)
- Data retention policy summary
- GDPR/DPDP compliance note (India)

---

# SECTION 11 — NOTIFICATIONS & SYSTEM SCREENS

---

## Screen 89: Notification Center (Full Page)

### Layout: Left nav context — full-width content

### Header: "Notifications" + "Mark All as Read" + Settings gear (→ Screen 86)

### Tabs: All | Orders | Inventory | Logistics | System | Promotions

### Notification List (grouped by date: Today / Yesterday / Earlier)
Each item same as Screen 13 pattern but with more space
- Full notification message (no truncation)
- Related entity link (e.g., "View Order #4523")
- Dismiss button (X, appears on hover)

---

## Screen 90: Notification Dropdown (Header Panel)

### Implementation: Popover below bell icon, 380px wide, max 480px tall, scrollable

### Header
- "Notifications" title (left)
- "View All" link (right)
- "Mark all read" link

### List: Latest 10 notifications (condensed format from Screen 13)

### Footer
- "See all notifications →" link

---

## Screen 91: System Status / API Health Banner

### Implementation: Top-of-page inline banner (above main content, below topbar)

### States:
**Warning (yellow):**
"Amazon API sync is experiencing delays. Orders may take up to 30 mins to appear. [View Status]"

**Error (red):**
"Flipkart connection lost. Order sync paused. [Reconnect Now]"

**Info (blue):**
"Scheduled maintenance on Dec 24, 11 PM–1 AM IST. Brief downtime expected."

Dismissable (X button) — but re-appears if issue persists

---

## Screen 92: Maintenance / Downtime Screen

### Full-page, branded

### Content
- Listx logo
- Illustration: tool/wrench graphic or abstract maintenance animation
- Title: "We'll be back shortly"
- Message: "Listx is undergoing scheduled maintenance to improve your experience. Expected back at 1:00 AM IST."
- Countdown timer (if end time known)
- "Follow @ListxStatus for updates" link
- Auto-refresh: "Page will refresh automatically every 60 seconds"

---

## Screen 93: Error 404 Screen

### Full-page

### Content
- Large "404" (Sora, display size, indigo)
- Illustration: subtle abstract lost/confused graphic
- Title: "Page not found"
- Sub-text: "The page you're looking for doesn't exist or has moved."
- Search bar: "Try searching for what you need"
- CTA buttons: "Back to Dashboard" (primary) | "Go to Home" (outline)
- Navigation shortcuts: Quick links to Orders, Products, Analytics

---

# SECTION 12 — MODALS, POPUPS & MICRO-INTERACTIONS

---

## Screen 94: Confirm Delete Product Modal

### Standard confirmation modal (centered, overlay background)

### Content
- Icon: `Trash2` (Lucide, red, 32px)
- Title: "Delete Product?"
- Body: "This will permanently delete **Wireless Earphones Pro**. This action cannot be undone."
- Warning note: "If this product is listed on platforms, it will be unpublished first."
- Input confirmation: type-to-confirm (type "DELETE" field) — for extra safety
- Buttons row: "Cancel" (ghost) | "Delete Product" (destructive red)

---

## Screen 95: Confirm Unpublish from Platform Modal

### Icon: `EyeOff` (orange)
- Title: "Unpublish from Amazon?"
- Body: "This listing will be deactivated on Amazon. The product data in Listx will be preserved."
- Checkbox: "Also pause inventory sync"
- Buttons: "Cancel" | "Unpublish" (orange primary)

---

## Screen 96: Confirm Disconnect Integration Modal

### Icon: `Unplug` (red)
- Title: "Disconnect Shopify?"
- Impact list:
  - Orders from Shopify will no longer sync
  - Inventory updates will stop
  - Existing data preserved in Listx
- Checkbox: "I understand the sync will stop"
- Buttons: "Cancel" | "Disconnect" (destructive)

---

## Screen 97: Confirm Cancel Order Modal

### Icon: `XCircle` (red)

### Fields:
- Order ID shown (read-only)
- Cancellation Reason: required dropdown
  - Customer Requested | Out of Stock | Payment Issue | Incorrect Order | Other
- Notes to Customer: optional textarea
- Refund handling note (if prepaid): "Refund of ₹1,240 will be initiated within 5–7 business days"

### Buttons: "Cancel" (go back, don't cancel) | "Cancel Order" (destructive)

---

## Screen 98: Courier Booking Confirmation Modal

### Icon: `CheckCircle2` (green, large)
- Title: "Pickup Booked!"
- AWB Number (large, monospace, copy button)
- Courier: [Logo + Name]
- Pickup: [Date + Time slot]
- Estimated Delivery: [Date]

### Actions:
- "Print Shipping Label" (primary)
- "Done" (secondary)

---

## Screen 99: Bulk Publish Confirmation Modal

### Summary table (compact):
Platform | Products | Status
Amazon  | 318 | Ready ✓
Flipkart | 316 | Ready ✓ | 2 with warnings ⚠
Shopify | 318 | Ready ✓

### Warning expand: "2 products have missing fields on Flipkart — they'll be skipped"

### Checkbox: "Skip products with errors and publish the rest"

### Buttons: "Back" | "Publish [number] Products" (primary)

---

## Screen 100: Upload Successful Toast / Banner

### Implementation: Toast notification (bottom-right, auto-dismiss 5s)

### Content:
- Green checkmark icon
- Title: "Products uploaded successfully"
- Body: "318 products ready for review"
- Action link: "Review Now →"
- Progress bar (countdown to auto-dismiss)
- X to dismiss early

---

## Screen 101: Upload Failed Error Modal

### Icon: `AlertCircle` (red)
- Title: "Upload Failed"
- Error details: file issue or parsing error message
- Expandable: "View technical details" (for power users)
- Retry options:
  - "Try Again" (reopen file picker)
  - "Download Error Report" (CSV of failed rows)
- "Contact Support" link

---

## Screen 102: AI Processing In-Progress Modal

### Content:
- Animated sparkle / gradient pulse animation
- Title: "AI is working..."
- Sub-text: "Generating optimized content for your products"
- Indeterminate progress bar (animated, shimmering)
- Estimated time: "~2 minutes"
- "Working in background" option: "Continue using Listx — we'll notify you when done"

---

## Screen 103: Product Already Exists Warning Modal

### Icon: `AlertTriangle` (orange)
- Title: "Duplicate Product Detected"
- Body: "A product with SKU **WE-PRO-001** already exists in Listx."
- Comparison table: Existing vs New (key fields side by side)

### Options (radio):
- Overwrite existing product
- Create as new (add suffix to SKU)
- Skip this product

---

## Screen 104: Platform Sync Error Alert Modal

### Icon: `WifiOff` (red)
- Title: "[Platform] Sync Failed"
- Error: specific API error message (friendly format)
- Impact: "Last successful sync: 2 hours ago. X orders may be missing."

### Actions:
- "Retry Sync" (primary)
- "View Error Log" link
- "Reconnect Account" button

---

## Screen 105: Low Stock Warning Popup

### Implementation: Inline notification bar OR non-modal alert

### Content:
- Icon: `AlertTriangle` (orange)
- "Low Stock Alert — 12 products are running low"
- Quick list: top 3 most critical products
- "View All Low Stock →" link
- Dismiss button

---

## Screen 106: Overselling Blocked Alert Popup

### Implementation: Blocking modal (cannot dismiss easily — action required)

### Icon: `ShieldAlert` (red, large)
- Title: "Overselling Prevented"
- Body: "Listx blocked an order on Flipkart — you only have 2 units of **Product Name** but 5 were requested."
- Recommended action: "Update stock or the listing will be paused"
- Buttons: "Update Stock Now" (primary) | "View Order" | "Pause Listing"

---

## Screen 107: Session Expired / Re-login Modal

### Blocks the whole screen (cannot close)

### Content:
- Icon: `Lock` (grey)
- Title: "Session Expired"
- Body: "For your security, you've been logged out after inactivity."
- Email (pre-filled, read-only)
- Password input
- "Log Back In" button

---

## Screen 108: First-Time Feature Tooltip / Spotlight

### Implementation: Coachmark overlay (dark overlay + highlighted element + tooltip bubble)

### Components:
- Dark semi-transparent overlay (covers full screen)
- Target element: glows/highlighted with bright ring
- Tooltip bubble with arrow pointing to element
  - Feature name (bold)
  - 1-line description
  - "Got it" button
  - "Skip all tips" link

### Sequence:
1. Highlight sidebar nav on first login
2. Highlight Dashboard stats
3. Highlight "Upload Products" CTA
4. Highlight Notifications bell
Steps tracked in user profile

---

## Screen 109: Platform Authorization Expired Banner

### Implementation: Persistent yellow banner below topbar

### Content:
- Icon: `AlertTriangle` (yellow)
- "Amazon authorization expired — sync paused"
- "Reconnect Now" button (inline)
- Dismiss temporarily (X — re-appears in 24h)

---

## Screen 110: Return Approval Confirmation Modal

### Summary:
- Return ID + Customer name
- Items being returned
- Refund amount: ₹XXXX
- Refund method: Original Payment / Wallet Credit

### Confirmation:
- "Approve Return" button (green)
- "Reject Return" button (destructive)

---

## Screen 111: Courier Failed Popup

### Trigger: When auto-assigned courier rejects pickup or returns error

### Content:
- Icon: `TruckOff` (red)
- Title: "[Courier] could not process this shipment"
- Reason: specific message from courier
- Fallback options:
  - Auto-assign next best courier (shows recommendation)
  - Manual select different courier
- "Reassign Courier" primary CTA

---

## Screen 112: Plan Limit Reached Modal

### Icon: `Zap` (indigo/yellow, sparkle feel)
- Title: "You've hit your plan limit"
- Body: "Your Growth plan includes 5,000 orders/month. You've reached 5,000."
- Usage bar: 5000/5000 (full, red)
- Feature list: what you get on next tier

### Buttons:
- "Upgrade to Pro" (primary gradient)
- "I'll upgrade later" (muted link)

---

## Screen 113: Onboarding Progress Checklist Widget

### Implementation: Floating widget (bottom-right, or collapsible sidebar section)

### Expanded state:
- Progress: "3 of 5 steps complete" + progress bar
- Checklist:
  - ✓ Create account
  - ✓ Connect a platform
  - ✓ Upload first product
  - → Fulfill your first order
  - ○ View your analytics
- Completion: "You're doing great! 60% done"

### Collapsed state: progress circle percentage badge

---

## Screen 114: Keyboard Shortcut Help Modal

### Trigger: "?" key or help icon

### Layout: Two-column list of shortcuts

### Shortcuts listed:
- Navigation: Cmd+K (search), G then D (dashboard), G then O (orders), G then P (products)
- Actions: N (new product), F (filter), E (export)
- Orders: A (assign courier), R (refresh)
- General: ? (this help), Esc (close modal), / (search)

---

## Screen 115: Quick Add Product Slide-over Panel

### Trigger: "+" button in top bar or keyboard shortcut

### Implementation: Slide from right (480px), overlay — does not navigate away

### Compact version of Screen 21 (Manual Entry)
Fields shown:
- Product Name
- SKU (auto-generate option)
- Price
- Stock
- Category
- Image upload (single)
- Platform publish toggles

### Buttons:
- "Save as Draft" (outline)
- "Save & Publish" (primary)
- "Full Editor" link (opens Screen 21 in full)

---

# DESIGN TOKENS SUMMARY

## Spacing Scale
`4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96 | 128`px

## Typography Scale
| Role | Font | Size | Weight |
|------|------|------|--------|
| Display H1 | Sora | 48–64px | 700 |
| Page Title H2 | Sora | 28–32px | 600 |
| Section H3 | Sora | 20–24px | 600 |
| Card Title | DM Sans | 16–18px | 600 |
| Body Default | DM Sans | 14px | 400 |
| Body Small | DM Sans | 13px | 400 |
| Caption | DM Sans | 12px | 400 |
| Monospace | JetBrains Mono | 13px | 400 |

## Status Color System
| State | Color | Usage |
|-------|-------|-------|
| Success | `#10B981` | Delivered, connected, published |
| Warning | `#F59E0B` | Low stock, pending, sync lag |
| Destructive | `#EF4444` | Errors, delete, disconnect, OOS |
| Info | `#3B82F6` | Informational alerts, in-progress |
| Neutral | `#6B7280` | Drafts, disabled, inactive |

## Platform Color System
| Platform | Color |
|----------|-------|
| Amazon | `#FF9900` |
| Flipkart | `#F9A825` |
| Shopify | `#96BF48` |
| ONDC | `#6C48C5` |
| Meesho | `#9B27AF` |
| Delhivery | `#E01B23` |
| Shiprocket | `#FF6200` |

## Component States
Every interactive component has these states designed:
- `default` — resting state
- `hover` — cursor interaction
- `focus` — keyboard focus (accessible ring)
- `active` — pressed / click
- `loading` — async action pending
- `disabled` — not interactable
- `error` — validation failure
- `success` — action confirmed

## Animation Guidelines
| Animation | Duration | Easing |
|-----------|----------|--------|
| Page transition | 200ms | ease-out |
| Modal open | 250ms | spring |
| Drawer slide | 300ms | ease-in-out |
| Toast appear | 300ms | ease-out |
| Shimmer/skeleton | 1.5s | linear infinite |
| Hover lifts | 150ms | ease-out |
| List stagger | 40ms delay per item | ease-out |

---

*Document End — Total: 115 screens fully specified*  
*Listx Product Design Specification v1.0*