"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Zap, Target, FileEdit, Search, ShieldCheck, Flame, PieChart, Sparkles, UserCheck, MessageCircle, Mail } from "lucide-react"

const FEATURES = [
  {
    id: "ats-scan",
    title: "AI-Powered ATS Scan",
    description: "Upload your resume and get an instant compatibility score against industry-leading ATS systems. We check parse rate, structure, and readability.",
    icon: PieChart,
    bullets: [
      "Instant 0-100 compatibility score",
      "Format and structure verification",
      "Identifies auto-rejection risks"
    ]
  },
  {
    id: "keyword-match",
    title: "Keyword Match Engine",
    description: "Paste a target job description to discover exact missing hard and soft skills. Optimize your resume for the specific role you want.",
    icon: Target,
    bullets: [
      "Custom Job Description targeting",
      "Missing vs. matched skills analysis",
      "Context-aware keyword suggestions"
    ]
  },
  {
    id: "actionable-fixes",
    title: "Actionable Insights",
    description: "Don't just get a score. Get a detailed breakdown of exact formatting errors, repetition warnings, and impact quantification.",
    icon: Zap,
    bullets: [
      "Line-by-line error detection",
      "Impact and metrics suggestions",
      "Spelling and grammar checks"
    ]
  },
  {
    id: "expert-review",
    title: "Expert Mentor Review",
    description: "Sometimes AI isn't enough. Our platform connects you directly with professional career coaches to review your analysis via WhatsApp or Email.",
    icon: UserCheck,
    bullets: [
      "Direct 1-on-1 mentorship access",
      "Pre-filled resume & score sharing",
      "Personalized career guidance"
    ]
  }
]

export function FeaturesInteractive() {
  const [activeTab, setActiveTab] = useState(FEATURES[0].id)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    if (activeTab === "ats-scan") {
      setAnimatedScore(0)
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= 92) {
            clearInterval(interval)
            return 92
          }
          return prev + 2
        })
      }, 20)
      return () => clearInterval(interval)
    }
  }, [activeTab])

  const activeFeature = FEATURES.find(f => f.id === activeTab) || FEATURES[0]

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-zinc-950 rounded-[2.5rem] border border-border shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
      
      {/* LEFT COLUMN: Tabs */}
      <div className="w-full lg:w-[40%] bg-zinc-50 dark:bg-zinc-900/50 border-r border-border p-6 md:p-10 flex flex-col">
        <h3 className="text-2xl font-bold mb-8 text-foreground">How the ATS Checker Works</h3>
        
        <div className="flex flex-col gap-2 flex-1">
          {FEATURES.map((feature) => {
            const isActive = activeTab === feature.id
            const Icon = feature.icon
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`flex flex-col text-left px-5 py-4 rounded-2xl transition-all duration-300 relative ${
                  isActive 
                    ? "bg-white dark:bg-zinc-800 shadow-md border border-border" 
                    : "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 border border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r-full"
                  />
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive ? "bg-teal-500/10 text-teal-600 dark:text-teal-400" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`font-bold ${isActive ? "text-foreground" : "text-foreground/80"}`}>{feature.title}</span>
                </div>
                
                {/* Expandable Content for active tab */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {feature.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Mockup Display */}
      <div className="w-full lg:w-[60%] bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 20 }}
            className="w-full max-w-lg"
          >
            {activeTab === "ats-scan" && (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-border p-6 md:p-8 relative">
                <div className="absolute -top-4 -right-4 bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Analysis
                </div>
                <div className="flex flex-col items-center justify-center pt-4">
                  {/* Mock Gauge */}
                  <div className="relative w-48 h-24 mb-6 flex justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                      <path 
                        d="M 10 50 A 40 40 0 0 1 90 50" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        className="text-zinc-100 dark:text-zinc-800" 
                        strokeLinecap="round" 
                      />
                      <motion.path 
                        d="M 10 50 A 40 40 0 0 1 90 50" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        className="text-teal-500" 
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.92 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <span className="text-4xl font-extrabold text-teal-600 dark:text-teal-400 tabular-nums tracking-tight">
                        {animatedScore}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Score</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Excellent!</h4>
                  <p className="text-sm text-center text-muted-foreground max-w-[250px] mb-6">
                    Your resume is highly optimized. Minor tweaks can push it to a perfect score.
                  </p>
                  
                  <div className="w-full bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-border">
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span>ATS Parse Rate</span>
                      <span className="text-teal-600">100%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        className="h-full bg-teal-500 rounded-full" 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Successfully parsed by industry-leading ATS.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "keyword-match" && (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-border p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <Target className="w-6 h-6 text-blue-500" />
                  <div>
                    <h4 className="font-bold">Resume Tailoring</h4>
                    <p className="text-xs text-muted-foreground">Target Role: Senior Frontend Engineer</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Hard Skills */}
                  <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50 relative">
                    <div className="absolute -left-1 top-4 w-2 h-8 bg-red-500 rounded-r-md" />
                    <h5 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      <Flame className="w-4 h-4" /> MISSING HARD SKILLS
                    </h5>
                    <p className="text-xs text-muted-foreground mb-3">Add these terms based on the job description:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-800 rounded-md text-xs font-medium text-red-600 dark:text-red-400 line-through decoration-red-300">GraphQL</span>
                      <span className="px-2 py-1 bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-800 rounded-md text-xs font-medium text-red-600 dark:text-red-400 line-through decoration-red-300">AWS</span>
                      <span className="px-2 py-1 bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-800 rounded-md text-xs font-medium text-red-600 dark:text-red-400 line-through decoration-red-300">Jest</span>
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div className="p-4 rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/50 relative">
                    <div className="absolute -left-1 top-4 w-2 h-8 bg-green-500 rounded-r-md" />
                    <h5 className="text-sm font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> MATCHED SOFT SKILLS
                    </h5>
                    <p className="text-xs text-muted-foreground mb-3">You've successfully included:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white dark:bg-zinc-800 border border-green-200 dark:border-green-800 rounded-md text-xs font-medium text-green-600 dark:text-green-400">Leadership</span>
                      <span className="px-2 py-1 bg-white dark:bg-zinc-800 border border-green-200 dark:border-green-800 rounded-md text-xs font-medium text-green-600 dark:text-green-400">Communication</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "actionable-fixes" && (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-border p-6">
                <h4 className="font-bold flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <Zap className="w-5 h-5 text-orange-500" /> High Priority Fixes
                </h4>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900/50">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-sm font-bold text-orange-700 dark:text-orange-400">Quantifying Impact</h5>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300">2 Issues</span>
                    </div>
                    <p className="text-xs text-orange-700/80 dark:text-orange-400/80 leading-relaxed mb-3">
                      Recruiters look for measurable results. Try adding numbers, percentages, or dollar amounts to your work experience.
                    </p>
                    <div className="bg-white dark:bg-zinc-800/80 p-3 rounded-lg border border-orange-100 dark:border-orange-900/30">
                      <p className="text-xs text-muted-foreground mb-1"><span className="text-red-500 font-bold">Instead of:</span> "Improved application performance significantly"</p>
                      <p className="text-xs text-foreground"><span className="text-green-500 font-bold">Try:</span> "Boosted application performance by 40%, reducing load times by 2.5s"</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-sm font-bold text-foreground">Action Verbs</h5>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">1 Issue</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Avoid weak verbs like 'helped' or 'worked on'. Use strong verbs like 'spearheaded', 'architected', or 'orchestrated'.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expert-review" && (
              <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 px-6 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Resume Mentors</p>
                    <p className="text-white/70 text-xs text-blue-50">Online and ready to review</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                       <FileEdit className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">Attached Document</p>
                      <p className="text-sm font-medium text-foreground truncate">alex_frontend_resume.pdf</p>
                    </div>
                    <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-md bg-red-500/10 text-red-600">
                      Score: 65
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-3 cursor-pointer hover:bg-green-500/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Chat on WhatsApp</p>
                        <p className="text-xs text-muted-foreground">Fastest response</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/5 px-4 py-3 cursor-pointer hover:bg-blue-500/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Email a Mentor</p>
                        <p className="text-xs text-muted-foreground">Detailed feedback</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-[10px] text-muted-foreground mt-4">
                    Get 1-on-1 personalized feedback from a certified coach.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
