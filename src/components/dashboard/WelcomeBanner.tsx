"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export function WelcomeBanner() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-200/60 bg-amber-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Soft glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {greeting}, <span className="text-amber-700">Ryan 👋</span>
        </h1>
        <p className="text-muted-foreground">
          You're on a 3-day streak! Ready to analyze your resume with ATS Checker?
        </p>
        
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 max-w-sm">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-muted-foreground">Profile Completion</span>
              <span className="font-bold">60%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "60%" }} 
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-amber-100/80 border border-amber-200 rounded-xl p-4 max-w-xs shrink-0 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h4 className="font-bold text-sm mb-1 text-amber-900">Tip of the day</h4>
          <p className="text-xs text-amber-800/80 leading-relaxed mb-2 flex-1">Adding strong action verbs to your latest experience can bump your ATS score by up to 5 points.</p>
          <button className="text-xs font-bold text-amber-700 flex items-center gap-1 hover:underline">
            Analyze now <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
