// These interfaces are duplicated here to avoid circular imports;
// the canonical definitions live in useImprove.ts
export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  dashPassword?: string;
  email: string;
  createdAt: string;
  isActive: boolean;
}

export interface Submission {
  id: string;
  companyId: string;
  companyName: string;
  companySlug: string;
  candidateName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  submittedAt: string;
  status: string;
  atsScore: number | null;
  isImproved: boolean;
  flaggedAs: string | null;
}

export const mockCompanies: Company[] = [
  {
    id: "comp-1",
    name: "Inttrvu",
    slug: "inttrvu",
    logoUrl: "",
    dashPassword: "password123",
    email: "hr@inttrvu.com",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "comp-2",
    name: "TCS",
    slug: "tcs",
    logoUrl: "",
    dashPassword: "password123",
    email: "hr@tcs.com",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "comp-general",
    name: "Improve",
    slug: "for_all",
    logoUrl: "",
    dashPassword: "general-access",
    email: "support@rozgar24x7.com",
    createdAt: new Date().toISOString(),
    isActive: true,
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: "sub-1",
    companyId: "comp-1",
    companyName: "Inttrvu",
    companySlug: "inttrvu",
    candidateName: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    resumeUrl: "https://example.com/resume.pdf",
    fileName: "John_Doe_Resume.pdf",
    fileType: "application/pdf",
    fileSize: 1024 * 1024 * 2,
    submittedAt: new Date().toISOString(),
    status: "pending",
    atsScore: null,
    isImproved: false,
    flaggedAs: null,
  },
  {
    id: "sub-2",
    companyId: "comp-1",
    companyName: "Inttrvu",
    companySlug: "inttrvu",
    candidateName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "8765432109",
    resumeUrl: "https://example.com/jane_smith.pdf",
    fileName: "Jane_Smith_Resume.pdf",
    fileType: "application/pdf",
    fileSize: 1024 * 500,
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "approved",
    atsScore: 85,
    isImproved: true,
    flaggedAs: null,
  },
  {
    id: "sub-3",
    companyId: "comp-1",
    companyName: "Inttrvu",
    companySlug: "inttrvu",
    candidateName: "Bob Johnson",
    email: "bob.j@example.com",
    phone: "7654321098",
    resumeUrl: "https://example.com/bob_resume.docx",
    fileName: "Bob_Resume_Final.docx",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileSize: 1024 * 1024 * 1.5,
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "denied",
    atsScore: 45,
    isImproved: false,
    flaggedAs: "Fake Resume",
  },
];

export const getCompanyByEmail = async (email: string): Promise<Company | undefined> => {
  // Try to find the company dynamically in the mock pool of current companies
  // Fallback to initial mock if current array is somehow out of sync (managed in hook usually)
  return mockCompanies.find(c => c.email === email && c.isActive);
};
