"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles, Zap, Target, FileEdit, Search, ArrowRight, ShieldCheck, Flame, Play } from "lucide-react"

// A helper for floating pill UI
const FloatingPill = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-zinc-100/50 ${className}`}>
    {children}
  </div>
)

export function EliteResumeTools() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
      
      {/* 1. ATS Resume Analyzer (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group col-span-1 md:col-span-2 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px] flex flex-col items-end"
      >
        <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 group-hover:text-white transition-colors duration-500 z-20 relative text-right">ATS Resume Analyzer</h3>
        
        {/* Mockup UI */}
        <div className="absolute left-0 md:left-[-20px] bottom-[-20px] w-[320px] md:w-[420px] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-xl rounded-br-xl shadow-xl border border-blue-100 p-6 transform translate-x-3 md:translate-x-0 z-10">
          <div className="flex gap-6 items-center mb-6">
            <div className="relative w-24 h-24 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-100 shadow-inner">
               <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 80 80">
                 <circle cx="40" cy="40" r="34" stroke="#14b8a6" strokeWidth="8" fill="none" strokeDasharray="213.6" strokeDashoffset="34" strokeLinecap="round" />
               </svg>
               <div className="flex flex-col items-center">
                 <span className="text-2xl font-extrabold text-blue-600">94</span>
                 <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Score</span>
               </div>
            </div>
            <div className="flex-1 space-y-4">
               <div>
                 <div className="flex justify-between text-xs font-semibold text-zinc-600 mb-1">
                   <span>Keywords</span>
                   <span className="text-blue-600">90%</span>
                 </div>
                 <div className="h-2 bg-zinc-100 w-full rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full w-[90%]" /></div>
               </div>
               <div>
                 <div className="flex justify-between text-xs font-semibold text-zinc-600 mb-1">
                   <span>Formatting</span>
                   <span className="text-blue-500">100%</span>
                 </div>
                 <div className="h-2 bg-zinc-100 w-full rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full w-full" /></div>
               </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
             {["React JS", "Node JS", "Leadership"].map(k => (
                <span key={k} className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">+ {k}</span>
             ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Smart Resume Optimizer (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.1 }}
        className="group col-span-1 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Smart Resume Optimizer</h3>
        
        <div className="mt-8 bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-xl shadow-xl border border-blue-100 p-4 space-y-3">
           <div className="h-6 bg-blue-50 rounded-md w-full border border-blue-100 flex items-center px-2 gap-2">
              <Zap className="w-3 h-3 text-blue-500" />
              <span className="text-[9px] font-bold text-blue-700">Level: Expert</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="h-1 bg-zinc-200 rounded-full flex-1" />
             <div className="h-1 bg-zinc-200 rounded-full w-12" />
           </div>
           <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded inline-block">Suggestion Applied</div>
        </div>
      </motion.div>

      {/* 3. Keyword Match Engine (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2 }}
        className="group col-span-1 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Keyword Match Engine</h3>
        
        <div className="mt-8 relative h-32">
           <div className="absolute left-0 top-0 w-full bg-white group-hover:bg-zinc-100 rounded-lg shadow-lg p-3 z-10">
              <div className="flex justify-between items-center mb-2">
                 <div className="h-1.5 bg-zinc-200 rounded-full w-12" />
                 <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="h-1.5 bg-zinc-100 rounded-full w-full" />
           </div>
           <div className="absolute left-4 top-12 w-full bg-white group-hover:bg-zinc-100 rounded-lg shadow-lg p-3 z-20 border border-blue-100 scale-95 opacity-80">
              <div className="h-1.5 bg-blue-200 rounded-full w-16 mb-2" />
              <div className="h-1.5 bg-zinc-100 rounded-full w-full" />
           </div>
        </div>
      </motion.div>

      {/* 4. AI Resume Rewriter (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="group col-span-1 md:col-span-2 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">AI Resume Rewriter</h3>
        
        <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 bottom-[-10px] w-[90%] md:w-[380px] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-xl shadow-xl border border-zinc-100 p-5">
           <div className="space-y-4">
              <div className="p-3 bg-zinc-50 rounded border border-zinc-100">
                 <span className="text-[10px] font-bold text-zinc-400 block mb-2">ORIGINAL</span>
                 <div className="h-2 bg-zinc-200 rounded-full w-full" />
              </div>
              <div className="flex justify-center -my-2">
                 <div className="bg-blue-600 text-white p-1 rounded-full"><Sparkles className="w-3 h-3" fill="currentColor" /></div>
              </div>
              <div className="p-3 bg-emerald-50 rounded border border-emerald-100">
                 <span className="text-[10px] font-bold text-emerald-600 block mb-2">REWRITTEN</span>
                 <div className="h-2 bg-emerald-200 rounded-full w-full shadow-sm shadow-emerald-500/20" />
              </div>
           </div>
        </div>
      </motion.div>

      {/* 5. ATS Score Booster (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="group col-span-1 md:col-span-2 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">ATS Score Booster</h3>
        
        <div className="absolute left-12 bottom-[-20px] w-full bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-tl-xl shadow-xl border-t border-l border-zinc-100/50 p-6 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
               <div className="space-y-2">
                  <div className="h-3 bg-zinc-100 rounded-full w-32" />
                  <div className="h-2.5 bg-blue-400 rounded-full w-24 shadow-lg shadow-blue-500/20" />
               </div>
               <div className="text-center">
                  <div className="text-4xl font-black text-blue-600">92%</div>
                  <div className="text-[9px] font-bold text-zinc-400 tracking-tighter">OPTIMIZED</div>
               </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
               {[1, 2].map(i => (
                  <div key={i} className="h-10 border border-zinc-100 rounded-lg bg-zinc-50" />
               ))}
            </div>
        </div>
      </motion.div>

      {/* 6. Professional Summary Builder (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="group col-span-1 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Professional Summary Builder</h3>
        
        <div className="mt-8 bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-xl shadow-xl border border-zinc-100 p-5">
           <div className="border border-blue-100 bg-blue-50/50 rounded-lg p-3 space-y-2">
              <div className="h-1.5 bg-zinc-800 rounded-full w-2/3" />
              <div className="h-1.5 bg-zinc-300 rounded-full w-full" />
              <div className="h-1.5 bg-zinc-300 rounded-full w-5/6" />
           </div>
        </div>
      </motion.div>

      {/* 7. Skill gap analyzer (Span 1) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="group col-span-1 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px] flex flex-col"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 mb-12">Skill gap analyzer</h3>
        
        <div className="flex-1 flex flex-col gap-4 items-center justify-center -mt-6">
           <div className="bg-white rounded-full shadow-lg shadow-blue-500/5 px-4 py-2.5 flex items-center gap-2 border border-blue-50 w-max transform -translate-x-4">
              <Flame className="w-4 h-4 text-orange-500" fill="currentColor" />
              <span className="text-sm font-bold text-zinc-700">Missing Skills</span>
              <span className="ml-2 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">AWS, Docker</span>
           </div>
           
           <div className="bg-white rounded-full shadow-lg shadow-emerald-500/5 px-4 py-2.5 flex items-center gap-2 border border-emerald-50 w-max transform translate-x-4 z-10">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-zinc-700">Strong Match</span>
              <span className="ml-2 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">React, Node</span>
           </div>
        </div>
      </motion.div>

      {/* 8. Resume Templates (Span 2) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="group col-span-1 md:col-span-2 bg-blue-50 hover:bg-blue-600 transition-colors duration-500 rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px]"
      >
        <h3 className="text-xl md:text-2xl font-bold text-zinc-900 group-hover:text-white transition-colors duration-500 z-10 relative">Resume Templates</h3>
        
        {/* Templates Mockup Container */}
        <div className="absolute right-0 bottom-[-40px] w-full md:w-[380px] h-[220px]">
           {/* Template 3 (Front) */}
           <div className="absolute right-12 md:right-32 bottom-2 w-[230px] h-[300px] bg-white group-hover:bg-zinc-100 transition-colors duration-500 rounded-t-sm shadow-2xl border border-blue-100 z-20 flex flex-col">
              <div className="border-b border-zinc-100 p-4 pb-3 flex flex-col items-center text-center">
                 <div className="text-[15px] font-serif text-blue-900 tracking-wide font-bold">Alex Mercer</div>
                 <div className="text-[8px] text-blue-600 uppercase tracking-widest font-extrabold mt-1">Full-Stack Developer</div>
              </div>
              <div className="p-4 space-y-3">
                 <div className="space-y-1.5">
                   <div className="h-1.5 bg-blue-200 rounded-full w-1/3" />
                   <div className="h-1 bg-zinc-200 rounded-full w-full" />
                 </div>
                 <div className="space-y-1.5">
                   <div className="h-1.5 bg-blue-200 rounded-full w-1/4" />
                   <div className="h-1 bg-zinc-200 rounded-full w-full" />
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

    </div>
  )
}
