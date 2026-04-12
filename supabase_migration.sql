-- Migration to roll back to URL slugs for ATS Improve functionality

-- 1. COMPANIES TABLE CHANGES
ALTER TABLE public.companies 
  ADD COLUMN slug VARCHAR(50) UNIQUE NOT NULL,
  ADD COLUMN logoUrl TEXT DEFAULT NULL,
  ADD COLUMN email TEXT UNIQUE NOT NULL;

-- Remove older columns
ALTER TABLE public.companies DROP COLUMN IF EXISTS "companyCode";
ALTER TABLE public.companies DROP COLUMN IF EXISTS "dashPassword";

-- 2. SUBMISSIONS TABLE CHANGES
ALTER TABLE public.submissions 
  ADD COLUMN companySlug VARCHAR(50) NOT NULL;

ALTER TABLE public.submissions DROP COLUMN IF EXISTS "companyCode";

-- 3. RLS POLICIES (Assuming standard row-level security structure)

-- Enable RLS if not actively enabled
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Submissions access policy:
-- Company HRs can SELECT, UPDATE where the DB companyId matches the auth.uid() metadata
CREATE POLICY "Company HRs have restricted access to their candidates" 
ON public.submissions
FOR ALL
USING (
  "companyId" = (auth.jwt() -> 'user_metadata' ->> 'companyId')::uuid
)
WITH CHECK (
  "companyId" = (auth.jwt() -> 'user_metadata' ->> 'companyId')::uuid
);

-- Note: Depending on authentication architecture, Admin accounts using the 
-- service_role key will implicitly bypass RLS natively.
