import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useImprove, Company } from '@/hooks/useImprove';
import { ResumeUploadForm } from '@/components/improve/ResumeUploadForm';
import { DosDonts } from '@/components/improve/DosDonts';

export default function UploadPage() {
  const { companySlug } = useParams<{ companySlug: string }>();
  const { getCompanyBySlug, submitResume, loading: dbLoading } = useImprove();
  const [company, setCompany] = useState<Company | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (companySlug) {
      getCompanyBySlug(companySlug).then(res => {
        setCompany(res);
        setInitialLoading(false);
      });
    } else {
      setInitialLoading(false);
    }
  }, [companySlug]);

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!company || !company.isActive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-center p-6">
        <h1 className="text-6xl font-bold text-zinc-800 mb-4">404</h1>
        <p className="text-xl text-zinc-600 max-w-md">
          This upload link is inactive or does not exist. Please contact the company HR for a valid link.
        </p>
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
        {/* Header matching ATS checker light mode */}
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
            <span className="text-xl font-bold tracking-tight">Rozgar24x7<span className="text-teal-600">Improve</span></span>
            {company && (
              <div className="hidden sm:flex ml-8 gap-1 p-1 bg-zinc-100 rounded-lg">
                <div className="px-4 py-1.5 text-sm font-medium rounded-md bg-white text-zinc-900 shadow-sm">
                  {company.name} Portal
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <main className="px-6 pt-32 pb-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6">
              Submit Your Resume
            </h1>
          </div>

          <DosDonts />

          <ResumeUploadForm 
            companyName={company.name} 
            onSubmit={async (data) => {
              return await submitResume({
                companyId: company.id,
                companyName: company.name,
                companySlug: company.slug,
                candidateName: data.name,
                email: data.email,
                phone: data.phone,
                resumeUrl: URL.createObjectURL(data.file),
                fileName: data.file.name,
                fileType: data.file.type,
                fileSize: data.file.size
              });
            }} 
          />
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-12 text-sm text-zinc-500">
          Powered by Rozgar24x7
        </footer>
      </div>
    </div>
  );
}
