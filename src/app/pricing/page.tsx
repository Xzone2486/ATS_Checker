"use client"

import { Header } from "@/components/ui/header-1"
import { Footer } from "@/components/layout/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Check, Sparkles, X, CreditCard, ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const plans = [
  {
    name: "Pro",
    description: "For serious job seekers",
    price: 500,
    features: [
      "Free ATS checking",
      "Unlimited AI resumes",
      "Unlimited downloads"
    ],
    highlight: true,
  },
  {
    name: "Max",
    description: "White-glove career strategy",
    price: 800,
    features: [
      "Free ATS checking",
      "Free ATS enhancement",
      "LinkedIn profile optimization",
      "Priority email support"
    ],
    highlight: false,
  }
]

export default function PricingPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)
  
  // Fix scroll position glitch when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  // Payment Modal State
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const openPaymentModaL = (plan: typeof plans[0]) => {
    setSelectedPlan(plan)
    setIsPaymentModalOpen(true)
    setIsProcessing(false)
    setIsSuccess(false)
  }

  const simulatePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      toast.success("Payment Successful! Welcome to Pro.")
      
      setTimeout(() => {
        setIsPaymentModalOpen(false)
      }, 2000)
    }, 2000)
  }

  return (
    <main className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center bg-hero-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern pointer-events-none" />
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/[0.03] blur-[100px] rounded-full animate-blob pointer-events-none" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-teal-500/[0.02] blur-[100px] rounded-full animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-500/[0.02] blur-[120px] rounded-full animate-blob animation-delay-4000 pointer-events-none" />
        <div className="absolute top-[60%] right-[10%] w-[300px] h-[300px] bg-blue-500/[0.02] blur-[80px] rounded-full animate-float-slow pointer-events-none" />

        {/* Floating accent circles */}
        <div className="absolute top-[15%] left-[5%] w-3 h-3 bg-teal-400/[0.08] rounded-full animate-float hidden lg:block" />
        <div className="absolute top-[25%] left-[3%] w-2 h-2 bg-blue-400/[0.1] rounded-full animate-float animation-delay-2000 hidden lg:block" />
        <div className="absolute top-[45%] left-[2%] w-4 h-4 bg-cyan-400/[0.06] rounded-full animate-float-slow hidden lg:block" />
        <div className="absolute top-[20%] right-[3%] w-3 h-3 bg-teal-400/[0.08] rounded-full animate-float animation-delay-4000 hidden lg:block" />
        <div className="absolute top-[60%] right-[5%] w-2 h-2 bg-blue-400/[0.1] rounded-full animate-float-slow animation-delay-2000 hidden lg:block" />

        {/* Side gradient glows */}
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-blue-500/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-teal-500/[0.02] to-transparent pointer-events-none" />
      </div>

      <Header />
      
      <div className="flex-1 w-full flex flex-col items-center pt-32 pb-24 px-4 sm:px-6 relative isolate z-10">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-6 border border-teal-100 dark:border-teal-500/20">
            <Sparkles className="w-4 h-4" /> Simple, transparent pricing
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Invest in your <span className="text-gradient">career.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-muted-foreground/80">
            Join 10,000+ professionals who landed their dream jobs using ROZGAR 24X7.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full perspective-1000">
           {plans.map((plan, i) => (
             <motion.div 
               key={plan.name}
               initial={{ opacity: 0, y: 40, rotateX: 10 }}
               animate={{ opacity: 1, y: 0, rotateX: 0 }}
               transition={{ delay: 0.2 + (i * 0.1), type: "spring", stiffness: 200, damping: 20 }}
               className={`glass-card rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                 plan.highlight 
                   ? 'border-teal-500 shadow-[0_0_30px_rgba(99,102,241,0.2)] md:scale-105 z-10' 
                   : 'border-border'
               }`}
             >
               {plan.highlight && (
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-md">
                   Most Popular
                 </div>
               )}

               <div className="mb-8">
                 <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                 <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
                 <div className="mt-6 flex items-baseline gap-1">
                   <span className="text-4xl font-black">₹{plan.price}</span>
                 </div>
               </div>

               <div className="flex-1">
                 <ul className="space-y-4 text-sm font-medium mb-8">
                   {plan.features.map(f => (
                     <li key={f} className="flex items-start gap-3">
                       <div className="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                         <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                       </div>
                       <span>{f}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <Button 
                variant={plan.highlight ? "gradient" : "outline"}
                className={`w-full py-6 text-base font-bold transition-all ${!plan.highlight && "hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400"}`}
                onClick={() => openPaymentModaL(plan)}
               >
                 Get Started
               </Button>
             </motion.div>
           ))}
        </div>
      </div>

      <Footer />

      {/* Payment Simulation Modal (Stripe Checkout clone) */}
      <AnimatePresence>
        {isPaymentModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => !isProcessing && !isSuccess && setIsPaymentModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10"
            >
              {/* Modal Header */}
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 border-b border-border flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Subscribe to {selectedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-500" /> Secure Checkout</p>
                </div>
                {!isProcessing && !isSuccess && (
                  <button onClick={() => setIsPaymentModalOpen(false)} className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-bold mb-2">Payment Successful!</h4>
                      <p className="text-muted-foreground text-sm">Welcome to ROZGAR 24X7 {selectedPlan.name}. Your account has been upgraded.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={simulatePayment}
                      className="space-y-4"
                    >
                      {/* Price Summary */}
                      <div className="flex justify-between items-center py-3 border-b border-border/50 mb-6">
                        <span className="font-medium text-muted-foreground">Total due today</span>
                        <span className="text-2xl font-black">₹{selectedPlan.price}</span>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Card details</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input 
                            type="text" 
                            required 
                            placeholder="Card number" 
                            className="w-full pl-10 pr-3 py-3 border border-border rounded-t-lg bg-background text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                            defaultValue="4242 4242 4242 4242"
                          />
                        </div>
                        <div className="flex -mt-3.5">
                          <input 
                            type="text" 
                            required 
                            placeholder="MM / YY" 
                            className="w-1/2 px-3 py-3 border border-r-0 border-t-0 border-border rounded-bl-lg bg-background text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                            defaultValue="12 / 28"
                          />
                          <input 
                            type="text" 
                            required 
                            placeholder="CVC" 
                            className="w-1/2 px-3 py-3 border border-t-0 border-border rounded-br-lg bg-background text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                            defaultValue="123"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 mt-4">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cardholder name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Name on card" 
                          className="w-full px-3 py-3 border border-border rounded-lg bg-background text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                          defaultValue="Ryan Florence"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        variant="gradient" 
                        disabled={isProcessing}
                        className="w-full py-6 mt-6 font-bold shadow-lg shadow-teal-500/20"
                      >
                        {isProcessing ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                        ) : (
                          `Pay ₹${selectedPlan.price}`
                        )}
                      </Button>
                      
                      <p className="text-center text-[10px] text-muted-foreground mt-4">
                        By confirming your subscription, you allow ROZGAR 24X7 to charge you for future payments in accordance with their terms.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
