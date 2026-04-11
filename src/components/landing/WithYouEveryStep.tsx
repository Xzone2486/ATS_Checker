"use client"

import { motion } from "framer-motion"
import {
  Target, CheckCircle2, Sparkles, Wand2, Crosshair, Search, 
  MessageSquareHeart, AlertCircle, Trophy, LayoutTemplate, 
  Rocket, Briefcase, ArrowRight
} from "lucide-react"
import { Link } from "react-router-dom"

export function WithYouEveryStep() {
  return (
    <section className="py-24 relative w-full bg-white overflow-hidden">
      <div className="container px-6 mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            <Trophy className="w-4 h-4" />
            Your Success is Our Mission
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            With You at{" "}
            <span className="text-gradient">Every Step</span>{" "}
            of Your Job Search
          </h2>
          <p className="text-lg text-muted-foreground">
            From first draft to final offer — ROZGAR 24X7 guides you through the entire process with smart tools, instant feedback, and unwavering support.
          </p>
        </motion.div>

        <div className="space-y-32">
          
          {/* 1. Career Assessment */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-amber-100 to-orange-50 rounded-full blur-3xl -z-10" />
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8 relative z-10 w-full overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex justify-center items-center font-bold text-xl">
                    98%
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Job Role Match</h4>
                    <p className="text-sm text-slate-500">Based on your past experience</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[98%] rounded-full" />
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800 font-medium">
                    Strong alignment detected: Project Management & Agile Methodologies
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 bg-white p-6 shadow-xl rounded-2xl border border-slate-100 w-2/3 rotate-[-5deg]">
                  <p className="text-xs font-bold text-slate-400 mb-2">RECOMMENDED ROLE</p>
                  <p className="font-bold text-slate-800 text-lg">Senior Agile Coach</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium">High Demand</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-semibold border border-amber-200">
                <Target className="w-4 h-4" /> Assessment Phase
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Discover your true market value
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Before you apply, we analyze your career trajectory, skill set, and past achievements to identify the roles where you naturally stand out.
              </p>
              <ul className="space-y-4 mt-8">
                {["Identify hidden skill gaps", "Market-driven role recommendations", "Strengths and weaknesses analysis", "Tailored strategy for next steps"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 2. AI Crafting */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col-reverse lg:flex-row items-center gap-16"
          >
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold border border-blue-200">
                <Sparkles className="w-4 h-4" /> AI Crafting Phase
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Leave the proofreading and phrasing to AI
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Our smart assistant rewrites your bullet points to sound more professional, impactful, and tailored to passing strict ATS algorithms without losing your authentic voice.
              </p>
              <ul className="space-y-4 mt-8">
                {["Action verb optimization", "Grammar and typo elimination", "Cliché removal and restructuring", "Metric-driven impact phrasing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-bl from-blue-100 to-indigo-50 rounded-full blur-3xl -z-10" />
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8 relative z-10 w-full">
                <p className="text-xs font-bold text-slate-400 mb-2">BEFORE</p>
                <div className="line-through text-slate-400 text-sm mb-6 decoration-red-300 decoration-2">
                  "I was responsible for managing a team that built new software."
                </div>
                <div className="h-px w-full bg-slate-100 my-6 relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                    <Wand2 className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-xs font-bold text-blue-500 mb-2">AFTER (AI REWRITTEN)</p>
                <div className="text-slate-800 text-base font-medium leading-relaxed mb-4">
                  "Spearheaded a cross-functional team of 12 engineers to architect and deploy scalable software solutions, increasing system efficiency by 40%."
                </div>
                <div className="absolute -left-6 top-1/2 shadow-lg bg-white p-4 rounded-xl border border-slate-100 max-w-[200px] flex items-center gap-3 z-20">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-600 leading-tight">Strong action verbs added!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Job Tailoring */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-100 to-blue-50 rounded-full blur-3xl -z-10" />
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-6 relative z-10 w-full overflow-hidden flex gap-4 h-[300px]">
                <div className="flex-1 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4">
                  <Search className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-center">Paste Job<br/>Description</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border-l border-slate-100 pl-4 relative">
                  <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                    <path className="text-slate-100" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-cyan-500" strokeDasharray="92, 100" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-800">92</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ATS Score</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 z-20">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-bold">React.js</span>
                    <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-bold">TypeScript</span>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">+ Added</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold border border-cyan-200">
                <Crosshair className="w-4 h-4" /> Tailoring Phase
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Tailor your resume in a single click
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Paste the specific job description, and our assistant instantly maps the required keywords to your experience, ensuring a high match rate before you even apply.
              </p>
              <ul className="space-y-4 mt-8">
                {["Missing keyword insertion", "Automated alignment of titles", "Hidden ATS criteria checks", "Real-time score preview"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 4. Expert Review */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col-reverse lg:flex-row items-center gap-16"
          >
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold border border-rose-200">
                <MessageSquareHeart className="w-4 h-4" /> Review Phase
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Review like a Senior Recruiter
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Get an unbiased, hyper-detailed critique of your resume to spot subtle formatting errors, fluff, or missing sections that might deter hiring managers.
              </p>
              <ul className="space-y-4 mt-8">
                {["Pinpoint structural and visual flaws", "Identify cliché buzzwords for removal", "Actionable suggestions to improve readability", "Consistency checks across formatting"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-bl from-rose-100 to-pink-50 rounded-full blur-3xl -z-10" />
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8 relative z-10 w-full">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Length Optimization</p>
                      <p className="text-sm text-slate-500 mt-1">Your experience section is 30% longer than standard benchmarks. Consider pruning older roles.</p>
                      <button className="mt-2 text-xs font-semibold text-rose-600">Auto-fix suggestion</button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Quantifiable Metrics Missing</p>
                      <p className="text-sm text-slate-500 mt-1">"Managed budget" could be "Managed $1M+ budget". Try adding numbers to boost impact.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 top-1/4 shadow-lg bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 z-20">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-400">CRITIQUE SCORE</span>
                     <span className="font-bold text-slate-800 text-xl">Fair</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. Interview Ready */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-100 to-green-50 rounded-full blur-3xl -z-10" />
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-6 relative z-10 w-full overflow-hidden flex items-center justify-center">
                <div className="aspect-[1/1.2] w-2/3 bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-md relative">
                  <div className="h-6 w-1/2 bg-slate-200 rounded mb-4" />
                  <div className="h-3 w-full bg-slate-100 rounded mb-1" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded mb-6" />
                  <div className="h-4 w-1/3 bg-emerald-100 rounded mb-3" />
                  <div className="space-y-2 mb-6">
                    <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-emerald-300 mt-1 shrink-0" /><div className="h-2 w-full bg-slate-100 rounded" /></div>
                    <div className="flex gap-2"><div className="w-2 h-2 rounded-full bg-emerald-300 mt-1 shrink-0" /><div className="h-2 w-5/6 bg-slate-100 rounded" /></div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                    <LayoutTemplate className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-xs font-semibold opacity-90 uppercase tracking-wide">Export Ready</p>
                      <p className="font-bold">PDF, DOCX</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold border border-emerald-200">
                <Trophy className="w-4 h-4" /> Final Polish Phase
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Stand out with 20+ pristine sections
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Visual appeal matters. Present your meticulously crafted story using field-tested designs that guide the recruiter's eye straight to your biggest wins.
              </p>
              <ul className="space-y-4 mt-8">
                {["Optimized readability layouts", "ATS-friendly parsable designs", "Multiple industry-standard templates", "1-Click download in PDF or DOCX"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 6. Launch & Land */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col-reverse lg:flex-row items-center gap-16"
          >
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-sm font-semibold border border-teal-200">
                <Rocket className="w-4 h-4" /> Success Phase
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Launch your application with confidence
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Your highest-performing resume is ready. Download it, start applying, and manage your job hunting process while we stay with you mapping your progress to success.
              </p>
              <ul className="space-y-4 mt-8">
                {["Save multiple versions of your resume", "Fast duplicate-and-edit workflows", "Unlimited multi-format downloads", "Application success tracking metrics"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-bl from-teal-100 to-emerald-50 rounded-full blur-3xl -z-10" />
              <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8 relative z-10 w-full">
                <p className="text-xs font-bold text-slate-400 tracking-wider mb-6">MY RESUMES</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-teal-100 bg-teal-50/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Senior React Engineer - Google</p>
                        <p className="text-xs text-slate-500">Updated 2 minutes ago</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap hidden sm:block">98% Match</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Technical Lead - Core</p>
                        <p className="text-xs text-slate-500">Updated yesterday</p>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap hidden sm:block">85% Match</span>
                  </div>
                </div>
                <div className="absolute -left-6 -bottom-6 shadow-xl bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3 z-20">
                  <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-md shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Ready to Apply</p>
                    <p className="text-xs text-slate-500">Looks perfect</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-32"
        >
          <Link
            to="/ats-analysis"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.03] transition-all duration-300 rounded-xl px-10 py-4 text-base font-semibold group relative overflow-hidden"
          >
            <span className="relative flex items-center gap-2">
              Start Your Journey Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required · Free to start
          </p>
        </motion.div>
      </div>
    </section>
  )
}
