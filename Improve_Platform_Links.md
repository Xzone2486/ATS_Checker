# 🔗 Rozgar24x7 Improve Platform - Live Access Links

Use this file to quickly navigate to the different modules of the hidden "Improve" platform on the production environment.

---

## 🛠 Admin Dashboard
- **URL:** [https://ats-checker-tau.vercel.app/improve/admin](https://ats-checker-tau.vercel.app/improve/admin)

- **Purpose:** Manage all companies, view global submissions, and flag candidates.
- **Login Credentials:**
  - **Password:** `admin123`

---

## 🏢 Company HR Dashboard
- **URL:** [https://ats-checker-tau.vercel.app/improve/dashboard](https://ats-checker-tau.vercel.app/improve/dashboard)

- **Purpose:** Recruitment portal for specific companies to manage their own talent pipeline.
- **Login Credentials (Email + Password):**
  - **Inttrvu:** `hr@inttrvu.com` / `password123`
  - **TCS:** `hr@tcs.com` / `password123`
  - *(Add new companies via Admin Dashboard — credentials are stored in mockImproveData.ts)*

---

## 📤 Candidate Upload Page (Public, Slug-Based)
- **Inttrvu:** [https://ats-checker-tau.vercel.app/improve/inttrvu](https://ats-checker-tau.vercel.app/improve/inttrvu)
- **TCS:** [https://ats-checker-tau.vercel.app/improve/tcs](https://ats-checker-tau.vercel.app/improve/tcs)

- **Purpose:** Unique per-company URL for candidates to submit resumes. No code required — just share the link!
- **URL Format:** `https://ats-checker-tau.vercel.app/improve/:companySlug`
- Invalid or inactive slugs show a clean 404-style error page.

---

## 🎨 Logo Management
To display a custom company logo in the Navbar and Hero section:
1.  **Upload Logo:** Place the logo file (PNG/JPG) in `src/components/improve/`.
2.  **Register Logo:** Import it in `src/lib/companyLogos.ts` and add it to the `companyLogoMap`.
    ```typescript
    import my_logo from '@/components/improve/my_logo.png';
    export const companyLogoMap = {
      'my-company-slug': my_logo,
      // ...
    };
    ```
3.  **Slug Match:** Ensure the company **Slug** you create in the Admin Dashboard exactly matches the key used in the map.

---

## 🔑 Access Credentials Summary

| Portal | ID / Email | Password |
|---|---|---|
| **Admin Dashboard** | (Any) | `admin123` |
| **Inttrvu (HR)** | `hr@inttrvu.com` | `password123` |
| **TCS (HR)** | `hr@tcs.com` | `password123` |
