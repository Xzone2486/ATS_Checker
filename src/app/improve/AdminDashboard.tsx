import { useEffect, useState } from 'react';
import { useImprove, Company, Submission } from '@/hooks/useImprove';
import { StatsCard } from '@/components/improve/StatsCard';
import { ImproveCharts } from '@/components/improve/ImproveCharts';
import { SubmissionTable } from '@/components/improve/SubmissionTable';
import { exportToCSV } from '@/utils/improveHelpers';
import { Users, Clock, CheckCircle2, XCircle, Activity, Sparkles, LogOut, Download, Building, Plus, Copy, Power, ExternalLink } from 'lucide-react';
import companyLogo from '@/components/improve/company logo.png';

export default function AdminDashboard() {
  const { getAllCompanies, getAllSubmissions, updateSubmissionStatus } = useImprove();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dummy Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const [activeTab, setActiveTab] = useState<'submissions' | 'companies'>('submissions');

  const fetchData = async () => {
    const [comps, subs] = await Promise.all([
      getAllCompanies(),
      getAllSubmissions()
    ]);
    setCompanies(comps);
    setSubmissions(subs);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setLoading(true);
      setIsAuthenticated(true);
    }
  };

  const handleExport = () => {
    exportToCSV(submissions, `rozgar24x7-all-candidates`);
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 mx-auto flex items-center justify-center text-white mb-4">
              <LogOut className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Rozgar24x7 Admin</h2>
            <p className="text-sm text-zinc-500 mt-2">Enter admin credentials</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password (try 'admin123')"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition">
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  const kpis = {
    companies: companies.length,
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    denied: submissions.filter(s => s.status === 'denied').length,
    scanned: submissions.filter(s => s.atsScore !== null).length,
    improved: submissions.filter(s => s.isImproved).length,
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tight">Rozgar24x7<span className="text-teal-600">Admin</span></span>
          <div className="hidden sm:flex ml-8 gap-1 p-1 bg-zinc-100 rounded-lg">
            <button 
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'submissions' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'}`}
            >
              Submissions
            </button>
            <button 
              onClick={() => setActiveTab('companies')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'companies' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'}`}
            >
              Companies
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900">
            <span className="hidden sm:block">Logout</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6 max-w-[90rem] mx-auto space-y-8">
        
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <StatsCard title="Total Companies" value={kpis.companies} icon={<Building className="w-6 h-6" />} delay={0.1} />
          <StatsCard title="Total Submissions" value={kpis.total} icon={<Users className="w-6 h-6" />} delay={0.2} />
          <StatsCard title="Pending Review" value={kpis.pending} icon={<Clock className="w-6 h-6" />} delay={0.3} />
          <StatsCard title="Approved" value={kpis.approved} icon={<CheckCircle2 className="w-6 h-6" />} delay={0.4} />
          <StatsCard title="Denied/Flagged" value={kpis.denied} icon={<XCircle className="w-6 h-6" />} delay={0.5} />
          <StatsCard title="ATS Scanned" value={kpis.scanned} icon={<Activity className="w-6 h-6" />} delay={0.6} />
          <StatsCard title="Resumes Improved" value={kpis.improved} icon={<Sparkles className="w-6 h-6" />} delay={0.7} />
        </div>

        {activeTab === 'submissions' ? (
          <>
            <section>
              <ImproveCharts submissions={submissions} />
            </section>

            <section className="bg-white/50 p-6 rounded-2xl border border-zinc-200 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-xl font-bold">Global Submissions Table</h3>
                <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" /> Export All CSV
                </button>
              </div>
              <SubmissionTable 
                submissions={submissions}
                isAdmin={true}
                onApprove={async (id) => {
                  await updateSubmissionStatus(id, { status: 'approved' });
                  fetchData();
                }}
                onDeny={async (id) => {
                  await updateSubmissionStatus(id, { status: 'denied' });
                  fetchData();
                }}
                onFlag={async (id, reason) => {
                  await updateSubmissionStatus(id, { status: 'denied', flaggedAs: reason });
                  fetchData();
                }}
                onRunAts={async (id) => {
                  await updateSubmissionStatus(id, { atsScore: Math.floor(Math.random() * 60) + 40 });
                  fetchData();
                }}
                onMarkImproved={async (id) => {
                  await updateSubmissionStatus(id, { isImproved: true });
                  fetchData();
                }}
              />
            </section>
          </>
        ) : (
          <CompaniesPanel />
        )}
      </main>

      <footer className="w-full pb-8 text-center text-sm text-zinc-500">
        Powered by Rozgar24x7
      </footer>
    </div>
  );
}

// ── Hardcoded Companies Panel ────────────────────────────────────────────────
function CompaniesPanel() {
  const UPLOAD_LINK = 'http://localhost:5173/improve/inttrvu';
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(UPLOAD_LINK);
  };

  return (
    <section className="bg-white/50 p-6 rounded-2xl border border-zinc-200 backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold">Registered Companies</h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-teal-500/20"
        >
          <Plus className="w-4 h-4" /> Add New Company
        </button>
      </div>

      {/* Add Company Form */}
      {showAdd && (
        <div className="p-6 bg-white border border-zinc-200 rounded-2xl space-y-4">
          <h4 className="text-base font-semibold">Add Company</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Company Name</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Ex. Google"
                className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              />
              {newName && (
                <p className="mt-2 text-xs text-zinc-500">
                  Preview URL: <span className="font-mono text-teal-500">/improve/{newName.toLowerCase().replace(/\s+/g, '-')}</span>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="hr@company.com"
                className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg text-sm transition-colors">Cancel</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm hover:opacity-90 transition-opacity">Save Company</button>
          </div>
        </div>
      )}

      {/* Companies Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white/50">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-500 uppercase">
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Upload Link</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src={companyLogo} alt="Inttrvu" className="h-7 object-contain" />
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-zinc-500">inttrvu</td>
              <td className="px-6 py-4">
                <a href={UPLOAD_LINK} target="_blank" rel="noreferrer"
                  className="text-teal-600 hover:underline text-xs font-mono truncate max-w-[200px] block">
                  {UPLOAD_LINK}
                </a>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 text-zinc-500">
                  <button onClick={handleCopy} title="Copy Upload Link" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-md">
                    <Copy className="w-4 h-4" />
                  </button>
                  <a href={UPLOAD_LINK} target="_blank" rel="noreferrer" title="Open Upload Page" className="p-1.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-md">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button title="Active" className="p-1.5 hover:bg-zinc-100 hover:text-amber-500 rounded-md">
                    <Power className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
