# CGHDS Website

**Centre for Gender, Humanitarian and Development Studies**  
Redeemer's University, Nigeria

Built with React + Vite + Supabase. Deployed on Netlify.

---

## What's New in This Version

### New Pages
- **Gallery** (`/gallery`) — Masonry photo gallery with lightbox, category filtering
- **Current Executives** (`/staff/executives`)
- **Current Staff** (`/staff/current`)
- **Past Executives** (`/staff/past-executives`)
- **Past Staff** (`/staff/past`)
  - All staff cards show the person's photo by default
  - Hovering reveals their role, tenure, and key achievements

### Updated Navbar
- Real CGHDS logo in navbar and footer
- **Staff** dropdown with 4 sub-pages
- **Gallery** nav link
- **Research** dropdown (unchanged)

### Admin Portal (`/admin`)
- **Publications** tab — add/edit/delete publications
- **Staff & Executives** tab — add/edit/delete staff for any of the 4 categories
- **Gallery** tab — add/remove event photos with caption and category
- **Overview** tab — stats dashboard

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Create a `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run the SQL
Open `supabase-setup.sql` in your Supabase SQL editor and run it.  
This creates 3 tables: `publications`, `staff`, `gallery`.

### 4. Create admin user
In Supabase Dashboard → Authentication → Users → Add User:
- Email: `admin@cghds.run.edu.ng`
- Password: `CGHDS@Admin2025!`

### 5. Run locally
```bash
npm run dev
```

### 6. Deploy to Netlify
```bash
npm run build
```
Then push to your connected Netlify repo or drag the `dist/` folder to Netlify.

---

## Logo
The CGHDS logo (`CGHDS_LOGO.png`) is served from the `public/` folder.  
It appears in both the navbar and footer automatically.
