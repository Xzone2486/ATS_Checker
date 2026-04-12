import { useState, useEffect } from 'react';
import { mockCompanies, mockSubmissions } from '@/lib/mockImproveData';

// Types
export type Company = typeof mockCompanies[0];
export type Submission = typeof mockSubmissions[0];

// In-memory state for the session to simulate DB mutability
let currentSubmissions = [...mockSubmissions];

export function useImprove() {
  const [loading, setLoading] = useState(false);

  // Fetch company by slug
  const getCompanyBySlug = async (slug: string): Promise<Company | null> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const company = mockCompanies.find(c => c.slug === slug);
        setLoading(false);
        resolve(company || null);
      }, 500);
    });
  };

  const getCompanyById = async (id: string): Promise<Company | null> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const company = mockCompanies.find(c => c.id === id);
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
  const getCompanySubmissions = async (companySlug: string): Promise<Submission[]> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(currentSubmissions.filter(sub => sub.companySlug === companySlug));
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
        resolve([...mockCompanies]);
      }, 500);
    });
  };

  const updateSubmissionStatus = async (id: string, updates: Partial<Submission>): Promise<boolean> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        currentSubmissions = currentSubmissions.map(sub => 
          sub.id === id ? { ...sub, ...updates } : sub
        );
        setLoading(false);
        resolve(true);
      }, 300);
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
  };
}
