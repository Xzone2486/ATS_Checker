"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

export function SignInModal() {
  const { showModal, closeModal, signIn } = useAuth()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      signIn(name || email.split("@")[0], email)
    }, 900)
  }

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-teal-500/10 border border-zinc-200 pointer-events-auto overflow-hidden">
              
              {/* Top gradient banner */}
              <div className="relative h-24 bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="flex items-center gap-2 text-white relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">ROZGAR 24X7</span>
                </div>
                <button onClick={closeModal} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                {/* REVERT_GUIDE: To restore Email/Password auth, uncomment the block below */}
                {/* 
                <div className="flex bg-zinc-100 rounded-xl p-1 mb-6 border border-zinc-200">
                  {(["signin", "signup"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                        mode === m ? "bg-white shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m === "signin" ? "Sign In" : "Create Account"}
                    </button>
                  ))}
                </div>
                */}

                {/* REVERT_GUIDE: To restore Email/Password auth, uncomment the form block below */}
                {/* 
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 bg-zinc-50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition-all placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-11 pl-10 pr-11 rounded-xl border border-zinc-200 bg-zinc-50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition-all placeholder:text-muted-foreground"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {mode === "signin" && (
                    <div className="text-right">
                      <button type="button" className="text-xs text-teal-600 hover:underline">Forgot password?</button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full h-11 text-sm font-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Signing in...</span>
                    ) : mode === "signin" ? "Sign In" : "Create Account"}
                  </Button>
                </form>
                */}

                {/* DEMO MESSAGE */}
                <div className="mb-6 text-center">
                   <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
                   <p className="text-sm text-muted-foreground mt-1">Please use one of your social accounts to continue</p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or continue with</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* OAuth buttons */}
                <div className="grid grid-cols-1 gap-3">
                  {["Google", "LinkedIn", "GitHub"].map((provider) => (
                    <button
                      key={provider}
                      onClick={() => signIn(provider + " User", `user@${provider.toLowerCase()}.com`)}
                      className="flex items-center justify-center gap-3 h-12 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-foreground text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] hover:shadow-md"
                    >
                      {provider === "Google" ? (
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      ) : provider === "LinkedIn" ? (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077b5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      )}
                      Continue with {provider}
                    </button>
                  ))}
                </div>

                {/* Benefits */}
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">What you get for free</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["3 ATS scans/mo", "1 AI resume build", "Score history", "PDF export"].map((b) => (
                      <div key={b} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" /> {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
