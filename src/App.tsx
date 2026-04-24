  import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
  import { Toaster } from 'sonner';
  import { AuthProvider } from '@/lib/auth-context';

  // Import pages
  import HomePage from '@/app/page';
  import AtsAnalysisPage from '@/app/ats-analysis/page';
  import PricingPage from '@/app/pricing/page';

  // Layouts
  import DashboardLayout from '@/app/dashboard/layout';

  // Dashboard content
  import DashboardPage from '@/app/dashboard/page';

  // Profile content
  import ProfilePage from '@/app/profile/page';

  // Improve feature
  import UploadPage from '@/app/improve/UploadPage';
  import CompanyDashboard from '@/app/improve/CompanyDashboard';
  import AdminDashboard from '@/app/improve/AdminDashboard';
  import { CompanyAuthProvider } from '@/hooks/useCompanyAuth';

  function DashboardLayoutWrapper() {
    return (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    );
  }

  export default function App() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ats-analysis" element={<AtsAnalysisPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            
            <Route element={<DashboardLayoutWrapper />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Improve Feature Routes */}
            <Route path="/improve/admin" element={<AdminDashboard />} />
            <Route path="/improve/dashboard" element={<CompanyAuthProvider><CompanyDashboard /></CompanyAuthProvider>} />
            <Route path="/improve/:companySlug" element={<UploadPage />} />
          </Routes>
        </Router>
        <Toaster
          position="bottom-right"
          toastOptions={{ className: 'border shadow-lg text-foreground bg-white' }}
        />
      </AuthProvider>
    );
  }
