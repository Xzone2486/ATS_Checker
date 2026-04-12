import inttrvu_logo from '@/components/improve/inttrvu_logo.png';
import tcs_logo from '@/components/improve/tcs_logo.png';

// Map of company slug -> imported logo URL
// Add new company slugs here when onboarding new clients
export const companyLogoMap: Record<string, string> = {
  inttrvu: inttrvu_logo,
  tcs: tcs_logo,
};

export function getCompanyLogo(slug: string): string | null {
  return companyLogoMap[slug.toLowerCase()] ?? null;
}
