// These interfaces are duplicated here to avoid circular imports;
// the canonical definitions live in useImprove.ts
interface Company {
  id: string;
  name: string;
  slug: string;
  email: string;
  createdAt: string;
  isActive: boolean;
}

interface Submission {
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
    email: "hr@inttrvu.com",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

export const mockSubmissions: Submission[] = [
  {
    id: "sub-1",
    companyId: "comp-1",
    companyName: "Inttrvu",
    companySlug: "inttrvu",
    candidateName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
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
    phone: "+91 87654 32109",
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
    phone: "+91 76543 21098",
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
