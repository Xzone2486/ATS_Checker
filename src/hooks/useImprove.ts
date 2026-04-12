import { useState, useEffect } from 'react';
import { mockCompanies, mockSubmissions } from '@/lib/mockImproveData';

// Types
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

// In-memory state for the session to simulate DB mutability
let currentSubmissions: Submission[] = [...mockSubmissions];
let currentCompanies: Company[] = [...mockCompanies];

export function useImprove() {
  const [loading, setLoading] = useState(false);

  // Fetch company by slug
  const getCompanyBySlug = async (slug: string): Promise<Company | null> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const company = currentCompanies.find(c => c.slug.toLowerCase() === slug.toLowerCase() && c.isActive);
        setLoading(false);
        resolve(company || null);
      }, 500);
    });
  };

  const getCompanyById = async (id: string): Promise<Company | null> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const company = currentCompanies.find(c => c.id === id);
        setLoading(false);
        resolve(company || null);
      }, 500);
    });
  }

  // Submit candidate resume
  const submitResume = async (data: Omit<Submission, 'id' | 'submittedAt' | 'status' | 'atsScore' | 'isImproved' | 'flaggedAs' | 'reviewNotes' | 'reviewedBy' | 'reviewedAt'>): Promise<{success: boolean, error?: string}> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check for duplicates
        const isDuplicate = currentSubmissions.some(
          sub => sub.companySlug === data.companySlug && sub.email.toLowerCase() === data.email.toLowerCase()
        );

        if (isDuplicate) {
          setLoading(false);
          resolve({ success: false, error: 'You have already submitted a resume for this company. Duplicate submissions are not allowed.' });
          return;
        }

        const newSubmission: Submission = {
          ...data,
          id: `sub-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          status: 'pending',
          atsScore: null,
          isImproved: false,
          flaggedAs: null,
        };

        currentSubmissions = [newSubmission, ...currentSubmissions];
        setLoading(false);
        resolve({ success: true });
      }, 1500); // simulate upload delay
    });
  };

  // Get submissions for a company (Company Dashboard)
  const getCompanySubmissions = async (companyId: string): Promise<Submission[]> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(currentSubmissions.filter(sub => sub.companyId === companyId));
      }, 800);
    });
  };

  // Get all submissions globally (Admin Dashboard)
  const getAllSubmissions = async (): Promise<Submission[]> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve([...currentSubmissions]);
      }, 800);
    });
  };

  // Get all companies globally
  const getAllCompanies = async (): Promise<Company[]> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve([...currentCompanies]);
      }, 500);
    });
  };

  const updateSubmissionStatus = async (id: string, updates: Partial<Submission>): Promise<boolean> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        currentSubmissions = currentSubmissions.map(sub => 
          sub.id === id ? ({ ...sub, ...updates } as Submission) : sub
        );
        setLoading(false);
        resolve(true);
      }, 300);
    });
  };

  const createCompany = async (data: Omit<Company, 'id' | 'createdAt' | 'isActive'>): Promise<boolean> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCompany: Company = {
          ...data,
          id: `comp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          isActive: true,
        };
        currentCompanies = [newCompany, ...currentCompanies];
        setLoading(false);
        resolve(true);
      }, 500);
    });
  };

  return {
    loading,
    getCompanyBySlug,
    getCompanyById,
    submitResume,
    getCompanySubmissions,
    getAllSubmissions,
    getAllCompanies,
    updateSubmissionStatus,
    createCompany,
  };
}
