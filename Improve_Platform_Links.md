# 🔗 Rozgar24x7 Improve Platform - Quick Access Links

Use this file to quickly navigate to the different modules of the hidden "Improve" platform on both Local and Live environments.

---

## 🛠 Admin Dashboard
**Local:** [http://localhost:5173/improve/admin](http://localhost:5173/improve/admin)  
**Live:** [https://ats-checker-tau.vercel.app/improve/admin](https://ats-checker-tau.vercel.app/improve/admin)

- **Purpose:** Manage all companies, view global submissions, and flag candidates.
- **Login Credentials:**
  - **Password:** `admin123`

---

## 🏢 Company HR Dashboard
**Local:** [http://localhost:5173/improve/dashboard](http://localhost:5173/improve/dashboard)  
**Live:** [https://ats-checker-tau.vercel.app/improve/dashboard](https://ats-checker-tau.vercel.app/improve/dashboard)

- **Purpose:** Recruitment portal for specific companies to manage their own talent pipeline.
- **Login Credentials (Email + Password):**
  - Inttrvu → `hr@inttrvu.com` / `password123`
  - TCS → `hr@tcs.com` / `password123`
  - *(Add new companies via Admin Dashboard — credentials are stored in mockImproveData.ts)*

---

## 📤 Candidate Upload Page (Public, Slug-Based)
**Local Example:** [http://localhost:5173/improve/inttrvu](http://localhost:5173/improve/inttrvu)  
**Live Example:** [https://ats-checker-tau.vercel.app/improve/inttrvu](https://ats-checker-tau.vercel.app/improve/inttrvu)

- **Purpose:** Unique per-company URL for candidates to submit resumes. No code required — just share the link!
- **URL Format:** `/improve/:companySlug` (e.g. `/improve/tcs`, `/improve/google`)
- Invalid or inactive slugs show a clean 404-style error page.

---

> [!IMPORTANT]
> **To see these links live:** 
> 1. You must **Git Push** current changes to your connected repository.
> 2. Wait for the Vercel Build to complete.
> 3. Ensure `vercel.json` is included in your push to prevent 404 on refresh errors!
