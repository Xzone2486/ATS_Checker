import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, AlertCircle } from 'lucide-react';
import { useCompanyAuth } from '@/hooks/useCompanyAuth';

export default function CompanyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useCompanyAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await login(email, password);
    if (!res.success) {
      setError(res.error || 'Invalid email or password');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 selection:bg-teal-500/30 relative overflow-hidden">
      {/* Background aesthetics matching UploadPage */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-dot-pattern opacity-60" />
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-teal-500/[0.03] blur-[120px] rounded-full animate-blob blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/[0.02] blur-[150px] rounded-full animate-blob pointer-events-none animation-delay-2000" />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-2xl border border-zinc-200 rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-100">
            <Building2 className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Rozgar24x7 Improve</h1>
          <p className="text-zinc-500">Company Portal Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address *</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="hr@company.com"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-zinc-900 transition-all shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Password *</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="•••••••••••"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-zinc-900 transition-all shadow-sm"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full py-4 mt-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-teal-500/20"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Login to Dashboard →'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-500">
            No account? <a href="mailto:contact@rozgar24x7.com" className="text-teal-600 font-medium hover:underline">Contact Rozgar24x7</a>
          </p>
        </div>
      </motion.div>
      
      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center text-sm text-zinc-400 pointer-events-none">
        Powered by Rozgar24x7
      </div>
    </div>
  );
}
