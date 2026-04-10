"use client"

import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/ui/header-1"
import { Footer } from "@/components/layout/Footer"
import { ScoreGauge } from "@/components/ats/ScoreGauge"
import { ScoreBreakdown } from "@/components/ats/ScoreBreakdown"
import { IssuesDetected } from "@/components/ats/IssuesDetected"
import { BeforeAfterSlider } from "@/components/ats/BeforeAfterSlider"
import { Button } from "@/components/ui/button"
import {
  Upload, FileText, Loader2, Download, Share2,
  CheckCircle2, Sparkles, X, FileUp, Zap, MessageCircle, Mail, ExternalLink,
  ChevronDown, Briefcase
} from "lucide-react"

type Stage = "upload" | "analyzing" | "results"

interface JobExample {
  title: string
  company: string
  level: string
  badge: string
  badgeColor: string
  description: string
  skills: string[]
}

const JOB_EXAMPLES: JobExample[] = [
  {
    title: "Senior Frontend Engineer",
    company: "Google",
    level: "Senior · IC4",
    badge: "Tech",
    badgeColor: "blue",
    description: "Build next-gen web experiences with React, TypeScript & performance optimization at scale.",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
  },
  {
    title: "Full Stack Engineer",
    company: "Stripe",
    level: "Mid-Level · L3",
    badge: "Tech",
    badgeColor: "blue",
    description: "Design and ship robust API services and polished UIs for global payment infrastructure.",
    skills: ["Node.js", "React", "PostgreSQL", "AWS"],
  },
  {
    title: "Backend Software Engineer",
    company: "Amazon",
    level: "Senior · SDE-II",
    badge: "Tech",
    badgeColor: "blue",
    description: "Architect distributed microservices handling millions of transactions per second.",
    skills: ["Java", "AWS", "Microservices", "DynamoDB"],
  },
  {
    title: "Machine Learning Engineer",
    company: "OpenAI",
    level: "Senior · L5",
    badge: "AI / ML",
    badgeColor: "purple",
    description: "Train and fine-tune large language models for production-grade AI products.",
    skills: ["Python", "PyTorch", "LLMs", "CUDA"],
  },
  {
    title: "Data Scientist",
    company: "Netflix",
    level: "Mid-Level · L4",
    badge: "AI / ML",
    badgeColor: "purple",
    description: "Drive personalisation algorithms that serve 260 M+ subscribers worldwide.",
    skills: ["Python", "Spark", "SQL", "A/B Testing"],
  },
  {
    title: "AI Research Scientist",
    company: "DeepMind",
    level: "Senior · Research",
    badge: "AI / ML",
    badgeColor: "purple",
    description: "Publish cutting-edge research in reinforcement learning and multi-agent systems.",
    skills: ["Python", "JAX", "RL", "Mathematics"],
  },
  {
    title: "Product Manager",
    company: "Meta",
    level: "Senior · IC5",
    badge: "Product",
    badgeColor: "teal",
    description: "Own the roadmap for a social platform feature used by 3 billion people.",
    skills: ["Roadmapping", "SQL", "OKRs", "User Research"],
  },
  {
    title: "Product Manager",
    company: "Atlassian",
    level: "Associate · IC3",
    badge: "Product",
    badgeColor: "teal",
    description: "Collaborate with engineering and design to deliver Jira and Confluence features.",
    skills: ["Agile", "JIRA", "Analytics", "Prototyping"],
  },
  {
    title: "UX / UI Designer",
    company: "Apple",
    level: "Senior · ICT4",
    badge: "Design",
    badgeColor: "pink",
    description: "Craft pixel-perfect experiences for iOS, macOS and visionOS platforms.",
    skills: ["Figma", "SwiftUI", "Prototyping", "HIG"],
  },
  {
    title: "Lead Product Designer",
    company: "Figma",
    level: "Lead · IC5",
    badge: "Design",
    badgeColor: "pink",
    description: "Define the visual language and interaction patterns for the Figma design tool itself.",
    skills: ["Figma", "Systems", "Motion", "User Testing"],
  },
  {
    title: "DevOps / Platform Engineer",
    company: "Cloudflare",
    level: "Mid-Level · L3",
    badge: "Infra",
    badgeColor: "orange",
    description: "Automate CI/CD pipelines and manage global edge infrastructure for millions of sites.",
    skills: ["Kubernetes", "Terraform", "Go", "Prometheus"],
  },
  {
    title: "Cloud Solutions Architect",
    company: "Microsoft Azure",
    level: "Senior · L62",
    badge: "Infra",
    badgeColor: "orange",
    description: "Guide enterprise clients through cloud migrations and greenfield Azure deployments.",
    skills: ["Azure", "ARM", "Networking", "Security"],
  },
  {
    title: "Cybersecurity Analyst",
    company: "IBM Security",
    level: "Mid-Level · Band 7",
    badge: "Security",
    badgeColor: "red",
    description: "Detect, contain and remediate threats across Fortune 500 client environments.",
    skills: ["SIEM", "Splunk", "NIST", "Incident Response"],
  },
  {
    title: "Mobile App Developer",
    company: "Spotify",
    level: "Mid-Level · L4",
    badge: "Mobile",
    badgeColor: "green",
    description: "Build performant React Native and native features for 600 M+ Spotify users.",
    skills: ["React Native", "Swift", "Kotlin", "GraphQL"],
  },
  {
    title: "QA / Test Automation Engineer",
    company: "Salesforce",
    level: "Senior · MTS",
    badge: "QA",
    badgeColor: "indigo",
    description: "Own end-to-end test strategy and Selenium/Cypress automation for Salesforce CRM.",
    skills: ["Cypress", "Selenium", "JIRA", "CI/CD"],
  },
  {
    title: "Business Analyst",
    company: "McKinsey & Co.",
    level: "Analyst · Entry",
    badge: "Business",
    badgeColor: "teal",
    description: "Deliver data-driven insights and process improvement strategies for global clients.",
    skills: ["Excel", "PowerBI", "SQL", "Stakeholder Mgmt"],
  },
  {
    title: "Financial Analyst",
    company: "Goldman Sachs",
    level: "Associate · AN2",
    badge: "Finance",
    badgeColor: "yellow",
    description: "Model valuations, build pitch books and support M&A transactions in IBD.",
    skills: ["Excel", "DCF", "Bloomberg", "PowerPoint"],
  },
  {
    title: "Marketing Manager",
    company: "HubSpot",
    level: "Senior · IC4",
    badge: "Marketing",
    badgeColor: "orange",
    description: "Lead demand-gen campaigns across SEO, paid, and lifecycle channels.",
    skills: ["HubSpot", "Google Ads", "SEO", "Analytics"],
  },
  {
    title: "Project Manager (PMP)",
    company: "Accenture",
    level: "Senior · Level 8",
    badge: "Management",
    badgeColor: "indigo",
    description: "Manage cross-functional delivery of digital transformation projects end-to-end.",
    skills: ["PMP", "Agile", "Risk Mgmt", "Stakeholders"],
  },
  {
    title: "Human Resources Manager",
    company: "LinkedIn",
    level: "Senior · L5",
    badge: "HR",
    badgeColor: "green",
    description: "Partner with business leaders on talent acquisition, DEI, and performance management.",
    skills: ["Workday", "HRBP", "Recruiting", "L&D"],
  },
]

export default function AtsAnalysisPage() {
  const [stage, setStage] = useState<Stage>("upload")
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [progress, setProgress] = useState(0)
  const [jobRole, setJobRole] = useState("")
  const [showJobDropdown, setShowJobDropdown] = useState(false)
  const [filteredJobs, setFilteredJobs] = useState<JobExample[]>(JOB_EXAMPLES)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const jobDropdownRef = useRef<HTMLDivElement>(null)
  const jobInputRef = useRef<HTMLDivElement>(null)

  const handleFile = (f: File) => {
    if (!f) return
    setFile(f)
    setFileUrl(URL.createObjectURL(f))
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(e.target as Node)) {
        setShowJobDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const openDropdown = () => {
    if (jobInputRef.current) {
      const rect = jobInputRef.current.getBoundingClientRect()
      setDropdownPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
    setShowJobDropdown(true)
  }

  const handleJobRoleChange = (value: string) => {
    setJobRole(value)
    const q = value.toLowerCase()
    setFilteredJobs(
      q
        ? JOB_EXAMPLES.filter(
            (j) =>
              j.title.toLowerCase().includes(q) ||
              j.company.toLowerCase().includes(q) ||
              j.badge.toLowerCase().includes(q)
          )
        : JOB_EXAMPLES
    )
    openDropdown()
  }

  const selectJobRole = (job: JobExample) => {
    setJobRole(`${job.title} at ${job.company}`)
    setShowJobDropdown(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  const startAnalysis = () => {
    if (!file) return
    setStage("analyzing")
    setProgress(0)

    // Simulate scan progress
    const steps = [
      { pct: 15, delay: 400 },
      { pct: 35, delay: 900 },
      { pct: 58, delay: 1500 },
      { pct: 72, delay: 2100 },
      { pct: 89, delay: 2700 },
      { pct: 100, delay: 3400 },
    ]
    steps.forEach(({ pct, delay }) => {
      setTimeout(() => setProgress(pct), delay)
    })
    setTimeout(() => setStage("results"), 4000)
  }

  const reset = () => {
    setStage("upload")
    setFile(null)
    setFileUrl(null)
    setProgress(0)
    setJobRole("")
  }

  const handleShare = (method: "whatsapp" | "email") => {
    const message = `Check out my ATS analysis results! Target Role: ${jobRole || "Professional"}. Score: 94/100.`
    if (method === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank")
    } else {
      window.open(`mailto:?subject=ATS Analysis Results&body=${encodeURIComponent(message)}`, "_blank")
    }
    
    // Professional popup notification
    toast.success("Resume Sent for Enhancement", {
      description: "Our professional team will review your resume and provide feedback shortly.",
      duration: 5000,
      icon: <Sparkles className="w-4 h-4 text-teal-500" />,
    })
  }

  return (
    <main className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col selection:bg-teal-500/30 bg-hero-gradient">
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
      <div className="h-10 relative z-10 flex-none" />

      <div className="flex-1 container px-6 mx-auto py-8 relative z-10">
        <AnimatePresence mode="wait">

          {/* ─── UPLOAD STAGE ─── */}
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-4 border border-teal-500/20">
                  <Zap className="w-4 h-4" /> AI-Powered ATS Scanner
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Check Your ATS Score
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Upload your resume and get an instant ATS compatibility score with actionable improvements.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Drop Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center gap-4 h-64 rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 select-none ${
                    dragOver
                      ? "border-teal-500 bg-teal-500/5 scale-[1.01]"
                      : file
                      ? "border-green-500 bg-green-500/5"
                      : "border-border bg-card hover:border-teal-400 hover:bg-teal-500/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleInputChange}
                  />

                  {file ? (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-green-500" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {(file.size / 1024).toFixed(1)} KB · Ready to analyze
                        </p>
                      </div>
                      <button
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={(e) => { e.stopPropagation(); setFile(null) }}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center">
                        <FileUp className="w-7 h-7 text-teal-500" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground">Drop your resume here</p>
                        <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                        <p className="text-xs text-muted-foreground/60 mt-2">PDF, DOC, DOCX · Max 10 MB</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Optional Job Role */}
                <div ref={jobDropdownRef} className="relative">
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Target Job Role <span className="text-xs opacity-60">(optional — improves accuracy)</span>
                  </label>
                  <div ref={jobInputRef} className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={jobRole}
                      onChange={(e) => handleJobRoleChange(e.target.value)}
                      onFocus={openDropdown}
                      placeholder="e.g. Senior Frontend Engineer at Google"
                      className="w-full h-11 rounded-xl border border-border bg-card pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => { showJobDropdown ? setShowJobDropdown(false) : openDropdown() }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showJobDropdown ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {/* Rich Job Dropdown — fixed so it never clips under footer */}
                  {showJobDropdown && filteredJobs.length > 0 && (
                    <div
                      style={{
                        position: "fixed",
                        top: dropdownPos.top,
                        left: dropdownPos.left,
                        width: dropdownPos.width,
                        zIndex: 9999,
                      }}
                      className="rounded-2xl border border-border bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
                    >
                      {/* Header bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-zinc-50 dark:bg-zinc-800/60">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Popular Roles</span>
                        <span className="text-xs text-muted-foreground">{filteredJobs.length} results</span>
                      </div>

                      <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
                        {filteredJobs.map((job) => (
                          <button
                            key={`${job.title}-${job.company}`}
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); selectJobRole(job) }}
                            className="flex flex-col w-full px-4 py-3.5 text-left hover:bg-teal-500/5 dark:hover:bg-teal-500/10 transition-colors group"
                          >
                            {/* Row 1: title + badge + company */}
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {job.title}
                              </span>
                              <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                job.badgeColor === "blue"   ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" :
                                job.badgeColor === "purple" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" :
                                job.badgeColor === "teal"   ? "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" :
                                job.badgeColor === "pink"   ? "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300" :
                                job.badgeColor === "orange" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" :
                                job.badgeColor === "red"    ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" :
                                job.badgeColor === "green"  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" :
                                job.badgeColor === "indigo" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" :
                                job.badgeColor === "yellow" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" :
                                "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                              }`}>
                                {job.badge}
                              </span>
                              <span className="text-xs text-muted-foreground ml-auto shrink-0">{job.level}</span>
                            </div>

                            {/* Row 2: company */}
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Briefcase className="w-3 h-3 text-muted-foreground/60 shrink-0" />
                              <span className="text-xs text-muted-foreground font-medium">{job.company}</span>
                            </div>

                            {/* Row 3: description */}
                            <p className="text-xs text-muted-foreground/80 leading-relaxed mb-2">{job.description}</p>

                            {/* Row 4: skill chips */}
                            <div className="flex flex-wrap gap-1">
                              {job.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Analyze Button */}
                <Button
                  variant="gradient"
                  className="w-full h-12 text-base"
                  onClick={startAnalysis}
                  disabled={!file}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze My Resume
                </Button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground pt-2">
                  {["Private & Secure", "Instant Results", "Free to Use"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── ANALYZING STAGE ─── */}
          {stage === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] gap-8"
            >
              {/* Pulsing orb */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-40 h-40 rounded-full bg-teal-500/20 animate-ping" />
                <div className="absolute w-28 h-28 rounded-full bg-teal-500/30 animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center shadow-xl shadow-teal-500/40">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              </div>

              <div className="text-center max-w-sm space-y-2">
                <h2 className="text-2xl font-bold">Scanning Your Resume</h2>
                <p className="text-muted-foreground text-sm">{file?.name}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-sm space-y-3">
                <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {progress < 30 ? "Parsing document..." :
                     progress < 60 ? "Extracting keywords..." :
                     progress < 80 ? "Checking ATS compatibility..." :
                     progress < 100 ? "Generating insights..." :
                     "Complete!"}
                  </span>
                  <span>{progress}%</span>
                </div>
              </div>

              {/* Checklist items that appear */}
              <div className="w-full max-w-sm space-y-2">
                {[
                  { label: "Format & Structure", threshold: 20 },
                  { label: "Keyword Density", threshold: 45 },
                  { label: "ATS Parsing", threshold: 65 },
                  { label: "Skills Matching", threshold: 85 },
                ].map(({ label, threshold }) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={progress >= threshold ? { opacity: 1, x: 0 } : {}}
                    className="flex items-center gap-3 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-foreground">{label}</span>
                    <span className="ml-auto text-muted-foreground text-xs">✓ Done</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── RESULTS STAGE ─── */}
          {stage === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Page Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-1">ATS Analysis Results</h1>
                  <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    {file?.name ?? "resume.pdf"}
                    {jobRole && <> · <span className="text-teal-500">{jobRole}</span></>}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" onClick={reset}>
                    <Upload className="w-4 h-4" /> New Scan
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20" onClick={() => handleShare("whatsapp")}>
                    <MessageCircle className="w-4 h-4" /> Share to WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/20" onClick={() => handleShare("email")}>
                    <Mail className="w-4 h-4" /> Share via Mail
                  </Button>
                  <Button variant="gradient" size="sm" className="gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                </div>
              </div>

              {/* 3-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-start">
                {/* Left: Original Resume view */}
                <div className="glass-card rounded-3xl border border-border flex flex-col p-4 shadow-sm overflow-hidden lg:col-span-5 w-full">
                  <h3 className="text-lg font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-500" />
                    Original Resume
                  </h3>
                  <div className="flex-1 w-full bg-muted/30 rounded-none overflow-hidden border border-border relative transition-all block min-h-[700px]">
                    {fileUrl ? (
                      <iframe src={`${fileUrl}#view=FitH&toolbar=0`} className="absolute inset-0 w-full h-full border-none bg-white" title="Resume PDF" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
                        <FileText className="w-8 h-8 opacity-40" />
                        <span className="text-sm opacity-60">No preview available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle: ATS Score */}
                <div className="glass-card rounded-3xl border border-border flex flex-col items-center justify-start p-6 shadow-sm relative overflow-hidden lg:col-span-3">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
                  <div className="mt-8">
                    <ScoreGauge score={94} />
                  </div>
                  
                  <div className="mt-12 text-center px-2 mb-4">
                     <h4 className="text-xl font-bold mb-2">Almost There!</h4>
                     <p className="text-sm text-muted-foreground leading-relaxed">Your resume has great potential but requires some formatting and keyword adjustments to pass ATS systems with a higher score.</p>
                  </div>
                </div>

                {/* Right: Errors and Fixes */}
                <div className="flex flex-col gap-6 lg:col-span-4">
                  <IssuesDetected />
                  <ScoreBreakdown />
                </div>
              </div>

              {/* Before & After Comparison Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-3">See the AI Enhancement</h2>
                  <p className="text-muted-foreground">Compare your original resume with the AI-optimized version.</p>
                </div>
                <div className="glass-card rounded-[2.5rem] border border-border p-4 md:p-8 shadow-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
                  <BeforeAfterSlider />
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />
    </main>
  )
}
