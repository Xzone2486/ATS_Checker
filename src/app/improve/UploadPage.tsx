import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResumeUploadForm } from '@/components/improve/ResumeUploadForm';
import { DosDonts } from '@/components/improve/DosDonts';
import { Building2, AlertCircle } from 'lucide-react';
import { useImprove, Company } from '@/hooks/useImprove';
import { getCompanyLogo } from '@/lib/companyLogos';

export default function UploadPage() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const { getCompanyBySlug } = useImprove();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      if (!companySlug) {
        setLoading(false);
        return;
      }
      const data = await getCompanyBySlug(companySlug);
      setCompany(data);
      setLoading(false);
    }
    loadCompany();
  }, [companySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 flex items-center justify-center p-6 pb-20 selection:bg-teal-500/30">
        <div className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-white border border-zinc-200 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Link not found or inactive</h1>
            <p className="text-zinc-500 mb-8 leading-relaxed">We couldn't find an active submission portal for this URL. Please check the link and try again.</p>
            <Link to="/" className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium transition-colors">
                Return to Homepage
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors font-sans selection:bg-teal-500/30">
      {/* Rich Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-60" />
        
        {/* Animated Blobs */}
        <div className="absolute top-[5%] left-[-10%] w-[600px] h-[600px] bg-teal-500/[0.03] blur-[120px] rounded-full animate-blob pointer-events-none" />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[120px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[10%] w-[700px] h-[700px] bg-cyan-500/[0.03] blur-[150px] rounded-full animate-blob animation-delay-4000 pointer-events-none" />
        <div className="absolute top-[60%] right-[15%] w-[400px] h-[400px] bg-teal-400/[0.02] blur-[100px] rounded-full animate-float-slow pointer-events-none" />

        {/* Floating accent particles */}
        <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-teal-500/[0.1] rounded-full animate-float hidden lg:block" />
        <div className="absolute top-[35%] left-[8%] w-2 h-2 bg-emerald-400/[0.15] rounded-full animate-float animation-delay-2000 hidden lg:block" />
        <div className="absolute top-[55%] left-[5%] w-4 h-4 bg-cyan-400/[0.08] rounded-full animate-float-slow hidden lg:block" />
        <div className="absolute top-[15%] right-[10%] w-3 h-3 bg-teal-500/[0.12] rounded-full animate-float animation-delay-4000 hidden lg:block" />
        <div className="absolute top-[65%] right-[12%] w-2 h-2 bg-emerald-400/[0.15] rounded-full animate-float-slow animation-delay-2000 hidden lg:block" />
        <div className="absolute bottom-[20%] right-[25%] w-3 h-3 bg-teal-400/[0.1] rounded-full animate-float animation-delay-4000 hidden lg:block" />

        {/* Side gradient framing */}
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-teal-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-emerald-500/[0.02] to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 w-full">
            {getCompanyLogo(company.slug) ? (
              <img
                src={getCompanyLogo(company.slug)!}
                alt={company.name}
                className="h-8 max-w-[140px] object-contain"
              />
            ) : (
              <span className="font-bold text-xl text-teal-800 flex items-center gap-2">
                <Building2 className="w-5 h-5" /> {company.name}
              </span>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-6 pt-32 pb-12 max-w-7xl mx-auto">
          <div className="text-center mb-14 max-w-3xl mx-auto flex flex-col items-center">
            {getCompanyLogo(company.slug) && (
                <img 
                  src={getCompanyLogo(company.slug)!} 
                  alt={`${company.name} logo`} 
                  className="max-h-[56px] object-contain mb-3"
                />
            )}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4">
              Submit Your Resume to {company.name}
            </h1>
            <p className="text-xl text-zinc-600 max-w-md mx-auto">
              One upload. Unlimited opportunities. Get noticed faster.
            </p>
          </div>

          <DosDonts />

          <ResumeUploadForm company={company} />
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-12 text-sm text-zinc-500">
          Powered by Rozgar24x7
        </footer>
      </div>
    </div>
  );
}
