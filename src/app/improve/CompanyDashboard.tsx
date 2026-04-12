import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useImprove, Company, Submission } from '@/hooks/useImprove';
import { StatsCard } from '@/components/improve/StatsCard';
import { ImproveCharts } from '@/components/improve/ImproveCharts';
import { SubmissionTable } from '@/components/improve/SubmissionTable';
import { exportToCSV } from '@/utils/improveHelpers';
import { Users, Clock, CheckCircle2, XCircle, Activity, Sparkles, LogOut, Download } from 'lucide-react';
import companyLogo from '@/components/improve/company logo.png';

export default function CompanyDashboard() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const { getCompanyBySlug, getCompanySubmissions, updateSubmissionStatus } = useImprove();

  const [company, setCompany] = useState<Company | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dummy Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    if (!companySlug) return;
    const comp = await getCompanyBySlug(companySlug);
    setCompany(comp);
    if (comp) {
      const subs = await getCompanySubmissions(comp.slug);
      setSubmissions(subs);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [companySlug, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password123') {
      setLoading(true);
      setIsAuthenticated(true);
    }
  };

  const handleExport = () => {
    exportToCSV(submissions, `${company?.slug}-candidates`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 selection:bg-teal-500/30">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/50 border border-zinc-200 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Company Dashboard</h2>
            <p className="text-sm text-zinc-500 mt-2">Enter your password to access candidate data</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password (try 'password123')"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-center p-6">
        <h1 className="text-6xl font-bold text-zinc-800 mb-4">404</h1>
        <p className="text-xl text-zinc-600 max-w-md">
          This dashboard link is inactive or does not exist.
        </p>
      </div>
    );
  }

  const kpis = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    denied: submissions.filter(s => s.status === 'denied').length,
    scanned: submissions.filter(s => s.atsScore !== null).length,
    improved: submissions.filter(s => s.isImproved).length,
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors">
      {/* Sidebar/Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={companyLogo} alt="Inttrvu Logo" className="h-8 object-contain" />
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900">
            <span className="hidden sm:block">Logout</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatsCard title="Total Candidates" value={kpis.total} icon={<Users className="w-6 h-6" />} delay={0.1} />
          <StatsCard title="Pending Review" value={kpis.pending} icon={<Clock className="w-6 h-6" />} delay={0.2} />
          <StatsCard title="Approved" value={kpis.approved} icon={<CheckCircle2 className="w-6 h-6" />} delay={0.3} />
          <StatsCard title="Denied" value={kpis.denied} icon={<XCircle className="w-6 h-6" />} delay={0.4} />
          <StatsCard title="ATS Scanned" value={kpis.scanned} icon={<Activity className="w-6 h-6" />} delay={0.5} />
          <StatsCard title="Resumes Improved" value={kpis.improved} icon={<Sparkles className="w-6 h-6" />} delay={0.6} />
        </div>

        {/* Charts */}
        <section>
          <ImproveCharts submissions={submissions} />
        </section>

        {/* Table */}
        <section className="bg-white/50 p-6 rounded-2xl border border-zinc-200 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-xl font-bold">Candidates</h3>
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-sm font-medium transition-colors">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
          <SubmissionTable 
            submissions={submissions}
            onApprove={async (id) => {
              await updateSubmissionStatus(id, { status: 'approved' });
              fetchData();
            }}
            onDeny={async (id) => {
              await updateSubmissionStatus(id, { status: 'denied' });
              fetchData();
            }}
          />
        </section>
      </main>

      <footer className="w-full pb-8 text-center text-sm text-zinc-500">
        Powered by Rozgar24x7
      </footer>
    </div>
  );
}
