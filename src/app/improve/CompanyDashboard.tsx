import { useEffect, useState } from 'react';
import { useCompanyAuth } from '@/hooks/useCompanyAuth';
import { useImprove, Submission } from '@/hooks/useImprove';
import { StatsCard } from '@/components/improve/StatsCard';
import { ImproveCharts } from '@/components/improve/ImproveCharts';
import { SubmissionTable } from '@/components/improve/SubmissionTable';
import { exportToCSV } from '@/utils/improveHelpers';
import { getCompanyLogo } from '@/lib/companyLogos';
import { Users, Clock, CheckCircle2, XCircle, Activity, Sparkles, LogOut, Download, Building2 } from 'lucide-react';
import CompanyLogin from './CompanyLogin';

export default function CompanyDashboard() {
  const { companyId, companyName, isLoading: authLoading, logout } = useCompanyAuth();
  const { getCompanySubmissions, updateSubmissionStatus, getCompanyById } = useImprove();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!companyId) return;
    setLoading(true);
    const [subs, comp] = await Promise.all([
      getCompanySubmissions(companyId),
      getCompanyById(companyId)
    ]);
    setSubmissions(subs);
    setCompanyData(comp);
    setLoading(false);
  };

  useEffect(() => {
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const handleExport = () => {
    exportToCSV(submissions, `${companyName}-candidates`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!companyId) {
    return <CompanyLogin />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors selection:bg-teal-500/30">
      {/* Sidebar/Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {companyData?.slug && getCompanyLogo(companyData.slug) ? (
            <img
              src={getCompanyLogo(companyData.slug)!}
              alt={companyName || 'Company'}
              className="h-8 max-w-[140px] object-contain"
            />
          ) : (
            <span className="font-bold text-xl text-teal-800 flex items-center gap-2">
              <Building2 className="w-5 h-5" /> {companyName}
            </span>
          )}
          <span className="text-zinc-400 font-normal text-sm hidden sm:block">| Dashboard</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={logout} className="flex items-center gap-2 text-sm text-zinc-600 hover:text-teal-600 font-medium transition-colors">
            <span className="hidden sm:block">Logout</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {/* Teal styled cards matching the prompt logic from admin dashboard */}
          <StatsCard title="Total Submitted" value={kpis.total} icon={<Users className="w-6 h-6" />} delay={0.1} />
          <StatsCard title="Pending Review" value={kpis.pending} icon={<Clock className="w-6 h-6" />} delay={0.2} />
          <StatsCard title="Approved" value={kpis.approved} icon={<CheckCircle2 className="w-6 h-6" />} delay={0.3} />
          <StatsCard title="Denied" value={kpis.denied} icon={<XCircle className="w-6 h-6" />} delay={0.4} />
          <StatsCard title="ATS Scanned" value={kpis.scanned} icon={<Activity className="w-6 h-6" />} delay={0.5} />
          <StatsCard title="Improved" value={kpis.improved} icon={<Sparkles className="w-6 h-6" />} delay={0.6} />
        </div>

        {/* Charts */}
        <section>
          <ImproveCharts submissions={submissions} />
        </section>

        {/* Table */}
        <section className="bg-white/90 p-6 rounded-2xl border border-zinc-200 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-xl font-bold">Candidates</h3>
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-sm font-medium transition-colors text-zinc-800">
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
