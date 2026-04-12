# 🔗 Rozgar24x7 Improve Platform - Quick Access Links

Use this file to quickly navigate to the different modules of the hidden "Improve" platform during testing and deployment.

---

## 🛠 Admin Dashboard
**URL:** [http://localhost:5173/improve/admin](http://localhost:5173/improve/admin)  
(Or replace with your production domain)

- **Purpose:** Manage all companies, view global submissions, run ATS scans, and flag candidates.
- **Login Credentials:**
  - **Password:** `admin123`

---

## 🏢 Company HR Dashboard
**URL:** [http://localhost:5173/improve/inttrvu/dashboard](http://localhost:5173/improve/inttrvu/dashboard)  

- **Purpose:** Recruitment portal for specific companies to manage their own talent pipeline.
- **Dynamic Link Format:** `/improve/:companySlug/dashboard`
- **Login Credentials:**
  - **Password:** `password123`

---

## 📤 Candidate Upload Page (Public)
**URL:** [http://localhost:5173/improve/inttrvu](http://localhost:5173/improve/inttrvu)

- **Purpose:** The entry point for job seekers to submit their resumes to a specific company.
- **Dynamic Link Format:** `/improve/:companySlug`
- **Branding:** Automatically updates based on the slug.

---

> [!TIP]
> **Testing Tip:** You can create new companies in the **Admin Dashboard**. Once created, their unique Upload Link and Dashboard Link will be active immediately using the slug you provided.
