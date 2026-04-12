import { getCompanyByEmail } from './mockImproveData';

// Dummy Supabase client mapping roughly to @supabase/supabase-js for UI Demo purposes.
// Used until real Supabase project is attached.
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password?: string }) => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const company = await getCompanyByEmail(email);

      if (company && company.dashPassword === password) {
        // Return structured user metadata mapped to company logic
        return {
          data: {
            user: {
              id: 'mock-user-id-' + company.id,
              email: company.email,
              user_metadata: {
                companyId: company.id,
                companyName: company.name
              }
            }
          },
          error: null
        };
      }

      return {
        data: { user: null },
        error: { message: 'Invalid login credentials' }
      };
    },
    signOut: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { error: null };
    }
  }
};
