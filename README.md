# Construction Website - Civil Engineering Works

A modern, responsive, frontend-only website for a construction and structural engineering company built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🏗️ Project Overview

This website serves as a high-performance portfolio and client lead generator for **Civil Engineering Works** (headed by licensed civil engineer Er. Arjun Sharma). It showcases company services, construction methodologies, completed/active projects, key operational metrics, and allows visitors to directly dispatch detailed project enquiries without needing a backend server or database.

### Key Highlights
- **100% Frontend-Only:** Zero backend, zero database, zero API routes, zero server maintenance.
- **Serverless Enquiry Routing:** Interactive client-side enquiry validation with instant routing to pre-formatted WhatsApp chat (`wa.me`) or pre-filled `mailto:` email messages.
- **SEO & Performance Optimized:** Static site generation (`generateStaticParams`), dynamic sitemap (`sitemap.ts`), robots directives (`robots.ts`), and Open Graph metadata.
- **Responsive & Accessible:** Strict mobile-first design, keyboard accessible (`skip-to-content` link, visible focus rings, ARIA labels, semantic HTML tags).

---

## 💻 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, static rendering)
- **Language:** TypeScript 5 (Strict Mode enabled)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Typography:** `next/font/google` with Inter
- **Images:** `next/image` with responsive aspect ratios and zero layout shift
- **Deployment:** Vercel (Next.js preset)

---

## 📁 Folder Structure

```text
construction-website/
├── public/
│   └── images/                     # Project assets and media (site timelapses, banners)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, Inter font, skip link, Navbar, Footer, WhatsApp button
│   │   ├── globals.css             # Tailwind base styles and custom utilities
│   │   ├── page.tsx                # Homepage (Hero, Stats, Services, Process, Featured Projects, CTA)
│   │   ├── not-found.tsx           # Friendly 404 handler with redirection links
│   │   ├── sitemap.ts              # Search engine XML sitemap
│   │   ├── robots.ts               # Robots.txt directives
│   │   ├── projects/
│   │   │   ├── page.tsx            # Portfolio listing with client-side query filtering
│   │   │   └── [slug]/page.tsx     # Static project details page with generateStaticParams
│   │   └── contact/page.tsx        # Contact page with EnquiryForm, details aside, Google Maps
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky navigation with mobile menu and route-change listener
│   │   ├── Footer.tsx              # Footer with quick links, contacts, and copyright
│   │   ├── Hero.tsx                # High-contrast hero section with call-to-action buttons
│   │   ├── SectionHeading.tsx      # Reusable section header component
│   │   ├── Services.tsx            # Responsive 4-column services grid
│   │   ├── ProcessSteps.tsx        # 4-stage engineering methodology
│   │   ├── ProjectCard.tsx         # Responsive project preview card
│   │   ├── ProjectFilter.tsx       # Client-side category filter buttons (?category=...)
│   │   ├── StatsBar.tsx            # Key statistics display
│   │   ├── CallToAction.tsx        # Conversion banner
│   │   ├── WhatsAppButton.tsx      # Floating bottom-right WhatsApp quick action
│   │   └── EnquiryForm.tsx         # Accessible enquiry form with validation & dual submission
│   ├── data/
│   │   ├── site.ts                 # Central company configuration and metadata
│   │   └── projects.ts             # Typed database of all portfolio projects
│   └── lib/
│       ├── validation.ts           # Pure input validation, sanitization, and honeypot check
│       └── enquiry.ts              # URL compilers for WhatsApp and Mailto
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js**: v18.17.0 or newer
- **npm**: v9.0.0 or newer

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to view the site.

### 4. Production Build
Verify the production build locally:
```bash
npm run build
npm run start
```

---

## ✏️ How to Edit Content

All website content is strictly decoupled from component markup and managed inside the `src/data/` folder:

### 1. Company Profile (`src/data/site.ts`)
Edit this file to update:
- Company name, engineer name, tagline, description
- Contact phone number, email, physical office address
- WhatsApp number (`whatsappNumber`: numeric international format without `+`, e.g., `"919876543210"`)
- Business opening hours
- Google Maps embed iframe URL (`mapEmbedUrl`)
- Statistics counters (projects completed, experience years, etc.)
- Services list (titles, descriptions, images)

### 2. Projects Portfolio (`src/data/projects.ts`)
Each project record is strictly typed with the following structure:
```typescript
{
  slug: "unique-url-slug",
  title: "Project Name",
  category: "Residential" | "Commercial" | "Renovation",
  location: "City, Region",
  year: 2026,
  duration: "18 months",
  area: "45,000 sq ft",
  summary: "Brief description of the structure and objectives...",
  scope: [
    "Structural design & IS compliance",
    "Excavation and foundation engineering",
    // ...
  ],
  outcome: "Finished ahead of schedule with zero safety incidents.",
  cover: "https://... or /images/your-image.jpg",
  gallery: [
    "https://...",
    "https://..."
  ]
}
```

---

## 🖼️ How to Add Project Images

1. **Local Images:**
   - Place image files inside `public/images/` (e.g. `public/images/tower-1.jpg`).
   - Reference the image path in `projects.ts` as `/images/tower-1.jpg`.

2. **Remote Images (e.g., Unsplash, Cloudinary, AWS S3):**
   - Provide the complete HTTPS URL in `src/data/projects.ts` (e.g., `https://images.unsplash.com/...`).
   - If using a domain other than `images.unsplash.com`, register the hostname in `next.config.mjs` under `images.remotePatterns`:
     ```javascript
     images: {
       remotePatterns: [
         { protocol: 'https', hostname: 'images.unsplash.com' },
         { protocol: 'https', hostname: 'your-cdn-domain.com' },
       ],
     }
     ```

---

## 💬 How the Enquiry System Works

The contact form operates completely without a backend server, database, or email API:

1. **Client-side Sanitization & Validation (`src/lib/validation.ts`):**
   - Strips dangerous HTML tags to prevent cross-site scripting (XSS).
   - Validates that full name, phone number, project type, and message meet minimum length and format criteria.
   - Includes a hidden **honeypot field** (`hp_field`). Automated bots filling out this invisible field are silently discarded.
2. **Message Formatting (`src/lib/enquiry.ts`):**
   - Formats user input into a clean, legible plain-text brief.
3. **Dispatch Options:**
   - **Send via WhatsApp:** Encodes the message and launches `https://wa.me/<whatsappNumber>?text=<encoded_message>`, opening a direct chat with the company engineer.
   - **Send by Email:** Opens the visitor's default email client (`mailto:`) with a pre-filled subject line and formatted message body.
4. **Instant Feedback:**
   - Displays a success confirmation banner after the visitor triggers their chosen method.

---

## ☁️ Deploying to Vercel

This repository is optimized for deployment on **Vercel**:

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your repository (`Joshva2026/Construction-Website-`).
4. **Configuration Settings:**
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next` (default - do not change)
5. Click **Deploy**. Vercel will build and deploy the static site globally with automatic edge caching.

---

## 🛠️ Verification & Quality Checks

Run lint and build checks:
```bash
# Run ESLint checks
npm run lint

# Run Next.js static production build
npm run build
```
Both commands pass cleanly with 0 errors and 0 warnings.
