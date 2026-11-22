# Joshva Construction - Dindigul, Tamil Nadu

A modern, responsive, high-performance website with a full-featured **Admin Control Panel** for **Joshva Construction**, a premier civil engineering and turnkey construction company based in **Dindigul, Tamil Nadu**, directed by **Er. M. Joshva Priyan, B.E. (Civil)**. Built using **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🏗️ Project Overview

- **Company Name**: Joshva Construction
- **Head Engineer**: Er. M. Joshva Priyan, B.E. (Civil)
- **Location**: Palani Road, Near Collectorate, Dindigul, Tamil Nadu - 624004
- **Track Record**: 126+ Projects Handed Over across Dindigul, Madurai, Trichy, and Tamil Nadu
- **Specializations**: Residential Duplex Villas, Commercial Towers, Industrial PEB Warehouses, and Seismic IS 456 / 1893 Retrofitting

---

## 🔐 Admin Control Panel (`/admin`)

The website includes a dedicated, secure Admin Panel allowing full management and modification of the entire website:

### **Default Admin Credentials:**
- **URL**: `http://localhost:3000/admin` (or `/admin/login`)
- **Username**: `admin`
- **Password**: `adminpassword123`
*(Username and password can be customized directly inside Admin > Security)*

### **Admin Features:**
1. **Executive Dashboard (`/admin`)**:
   - High-level KPIs: Total projects, active services, new enquiry leads, and milestone numbers.
   - Quick tools to add projects, upload photos, and view live site.
   - Recent leads with 1-click WhatsApp and phone call buttons.
2. **Projects Portfolio Management (`/admin/projects`)**:
   - Add new projects with custom slug, title, category, year, duration, area, scope bullets, and outcome.
   - Upload cover photos and on-site gallery images.
   - Edit and delete existing projects with instant updates on the live website.
3. **Civil Services Management (`/admin/services`)**:
   - Reorder and modify services (title, description, image, and bullet points).
   - Add new services or remove obsolete services.
4. **Key Metrics & Counters (`/admin/stats`)**:
   - Modify the 4 dynamic count-up figures on the homepage (Projects Completed, Years of Experience, Satisfied Clients, On-Time Delivery).
5. **Company & Site Settings (`/admin/site-settings`)**:
   - Update company name, head engineer name, tagline, description, working hours.
   - Change contact phone, WhatsApp number, email, physical office address.
   - Update Google Maps embed iframe.
6. **Leads & Enquiries Inbox (`/admin/enquiries`)**:
   - Automatically captures every enquiry submitted on the website contact form.
   - Filter by status (`New`, `Contacted`, `In Progress`, `Closed`).
   - One-click reply via WhatsApp or direct phone call.
   - Export all client leads to CSV spreadsheet.
7. **Media Library (`/admin/media`)**:
   - Upload new site images and blueprints to `/public/uploads`.
   - 1-click "Copy Path" to easily paste image URLs into projects and services.
8. **Data Backup & Restore (`/admin/backup`)**:
   - Download complete site data as a single JSON backup.
   - Restore website contents from a backup JSON file.
   - Factory reset to initial defaults.
9. **Admin Security (`/admin/security`)**:
   - Update administrator username and password with PBKDF2 salt hashing and secure cookie sessions.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build & run production server
npm run build
npm run start
```
- Public Website: [http://localhost:3000](http://localhost:3000)
- Admin Portal: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🛠️ Build & Verification

```bash
# Run ESLint
npm run lint

# Run Production Build
npm run build
```
Both commands pass cleanly with 0 errors and 0 warnings.
