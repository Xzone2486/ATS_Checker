import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/dummySupabase';

interface CompanyAuthContextType {
  companyId: string | null;
  companyName: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const CompanyAuthContext = createContext<CompanyAuthContextType | undefined>(undefined);

export function CompanyAuthProvider({ children }: { children: ReactNode }) {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount (mocking session persistence)
    const storedAuth = localStorage.getItem('companyAuthSession');
    if (storedAuth) {
      try {
        const { id, name } = JSON.parse(storedAuth);
        setCompanyId(id);
        setCompanyName(name);
      } catch (e) {
        localStorage.removeItem('companyAuthSession');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        setIsLoading(false);
        return { success: false, error: error?.message || 'Invalid email or password.' };
      }
      
      const sessionData = {
        id: data.user.user_metadata.companyId,
        name: data.user.user_metadata.companyName
      };

      setCompanyId(sessionData.id);
      setCompanyName(sessionData.name);
      localStorage.setItem('companyAuthSession', JSON.stringify(sessionData));
      
      setIsLoading(false);
      return { success: true };
    } catch (e) {
      setIsLoading(false);
      return { success: false, error: 'Failed to login' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCompanyId(null);
    setCompanyName(null);
    localStorage.removeItem('companyAuthSession');
  };

  return (
    <CompanyAuthContext.Provider value={{ companyId, companyName, login, logout, isLoading }}>
      {children}
    </CompanyAuthContext.Provider>
  );
}

export function useCompanyAuth() {
  const context = useContext(CompanyAuthContext);
  if (context === undefined) {
    throw new Error('useCompanyAuth must be used within a CompanyAuthProvider');
  }
  return context;
}
