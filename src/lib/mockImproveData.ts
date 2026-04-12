export const mockCompanies = [
  {
    id: "comp-1",
    name: "Acme Corp",
    slug: "acme-corp",
    email: "hr@acmecorp.com",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "comp-2",
    name: "TechNova",
    slug: "technova",
    email: "careers@technova.io",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

export const mockSubmissions = [
  {
    id: "sub-1",
    companyId: "comp-1",
    companyName: "Acme Corp",
    companySlug: "acme-corp",
    candidateName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    resumeUrl: "https://example.com/resume.pdf",
    fileName: "John_Doe_Resume.pdf",
    fileType: "application/pdf",
    fileSize: 1024 * 1024 * 2, // 2MB
    submittedAt: new Date().toISOString(),
    status: "pending",
    atsScore: null,
    isImproved: false,
    flaggedAs: null,
  },
  {
    id: "sub-2",
    companyId: "comp-1",
    companyName: "Acme Corp",
    companySlug: "acme-corp",
    candidateName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 87654 32109",
    resumeUrl: "https://example.com/jane_smith.pdf",
    fileName: "Jane_Smith_Resume.pdf",
    fileType: "application/pdf",
    fileSize: 1024 * 500, // 500KB
    submittedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: "approved",
    atsScore: 85,
    isImproved: true,
    flaggedAs: null,
  },
  {
    id: "sub-3",
    companyId: "comp-2",
    companyName: "TechNova",
    companySlug: "technova",
    candidateName: "Bob Johnson",
    email: "bob.j@example.com",
    phone: "+91 76543 21098",
    resumeUrl: "https://example.com/bob_resume.docx",
    fileName: "Bob_Resume_Final.docx",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileSize: 1024 * 1024 * 1.5, // 1.5MB
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    status: "denied",
    atsScore: 45,
    isImproved: false,
    flaggedAs: "Fake Resume",
  },
];
