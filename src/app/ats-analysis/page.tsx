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
  ChevronDown, Briefcase, ClipboardList, ChevronRight, AlertTriangle, UserCheck, Search
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

const JD_ITEMS: string[] = [
  "Designed and deployed scalable machine learning models for real-world applications.",
  "Built and optimized data pipelines for processing large-scale structured and unstructured data.",
  "Developed and maintained RESTful APIs to support backend services.",
  "Implemented CI/CD pipelines to automate build, testing, and deployment workflows.",
  "Created interactive dashboards and visualizations to support business decision-making.",
  "Collaborated with cross-functional teams to translate business requirements into technical solutions.",
  "Applied statistical analysis and predictive modeling to extract actionable insights.",
  "Engineered features and performed data preprocessing to improve model accuracy.",
  "Designed cloud-based architectures using modern infrastructure solutions.",
  "Ensured application security by implementing best practices and vulnerability testing.",
  "Developed responsive and user-friendly frontend interfaces.",
  "Managed databases, including schema design, optimization, and query performance tuning.",
  "Conducted code reviews and enforced software development best practices.",
  "Built and deployed containerized applications using Docker and orchestration tools.",
  "Integrated third-party services and APIs into existing platforms.",
  "Automated repetitive tasks to improve operational efficiency.",
  "Monitored system performance and resolved production issues proactively.",
  "Implemented authentication and authorization mechanisms for secure systems.",
  "Designed and trained NLP models for text analysis and language understanding tasks.",
  "Worked on computer vision models for image classification and detection.",
  "Researched and experimented with new algorithms and emerging technologies.",
  "Improved application scalability and performance through optimization techniques.",
  "Maintained documentation for systems, workflows, and technical processes.",
  "Participated in Agile/Scrum ceremonies to ensure timely project delivery.",
  "Developed mobile applications for Android/iOS using modern frameworks.",
  "Built and deployed smart contracts or blockchain-based applications.",
  "Ensured data governance, compliance, and privacy standards were met.",
  "Conducted penetration testing and vulnerability assessments to enhance security.",
  "Designed user-centric UI/UX flows to improve product usability and engagement.",
  "Led or supported project management activities including planning, tracking, and reporting.",
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
  const [customJd, setCustomJd] = useState("")
  const [showJdPanel, setShowJdPanel] = useState(false)
  const [showMentorPopup, setShowMentorPopup] = useState(false)
  const [selectedJdItems, setSelectedJdItems] = useState<Set<string>>(new Set())
  const [jdSearch, setJdSearch] = useState("")
  const [showJdDropdown, setShowJdDropdown] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const jobDropdownRef = useRef<HTMLDivElement>(null)
  const jobInputRef = useRef<HTMLDivElement>(null)
  const jdDropdownRef = useRef<HTMLDivElement>(null)

  const handleFile = (f: File) => {
    if (!f) return
    setFile(f)
    setFileUrl(URL.createObjectURL(f))
  }

  // Close job-role dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(e.target as Node)) {
        setShowJobDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Close JD dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (jdDropdownRef.current && !jdDropdownRef.current.contains(e.target as Node)) {
        setShowJdDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Sync selected JD items → customJd string
  useEffect(() => {
    setCustomJd(
      selectedJdItems.size > 0
        ? Array.from(selectedJdItems).map((item) => `• ${item}`).join("\n")
        : ""
    )
  }, [selectedJdItems])

  const toggleJdItem = (item: string) => {
    setSelectedJdItems((prev) => {
      const next = new Set(prev)
      next.has(item) ? next.delete(item) : next.add(item)
      return next
    })
  }

  const openDropdown = () => {
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
    setTimeout(() => {
      setStage("results")
      // Simulated score is 70, so we show the low score popup
      setShowMentorPopup(true)
    }, 4000)
  }

  const reset = () => {
    setStage("upload")
    setFile(null)
    setFileUrl(null)
    setProgress(0)
    setJobRole("")
    setCustomJd("")
    setSelectedJdItems(new Set())
    setJdSearch("")
    setShowJdPanel(false)
    setShowJdDropdown(false)
    setShowMentorPopup(false)
  }

  const handleShare = (method: "whatsapp" | "email") => {
    const message = `Check out my ATS analysis results! Target Role: ${jobRole || "Professional"}. Score: 70/100.`
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

      <div className="flex-1 container px-6 mx-auto py-8 relative z-20">
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

                {/* Target Job Role Card */}
                <div className="relative group">
                  <div className="flex w-full items-center gap-3 px-4 py-3.5 text-left rounded-2xl border border-border bg-card transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-muted text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="text-sm font-medium text-foreground block">
                        Target Job Role
                        <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                          Optional
                        </span>
                      </label>
                      <input
                        type="text"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        placeholder="e.g. Senior Frontend Engineer"
                        className="w-full bg-transparent border-none p-0 text-xs text-muted-foreground mt-0.5 focus:ring-0 focus:outline-none placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>
                  <p className="absolute -top-6 left-1 text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                    Role Accuracy
                  </p>
                </div>


                {/* ── JD Responsibilities Dropdown ── */}
                <div ref={jdDropdownRef} className="relative z-40">
                  {/* Toggle header card */}
                  <button
                    type="button"
                    onClick={() => { setShowJdPanel((v) => !v); setShowJdDropdown(false) }}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-left rounded-2xl border transition-colors group ${
                      selectedJdItems.size > 0
                        ? "border-teal-500/40 bg-teal-500/5"
                        : "border-border bg-card hover:bg-muted/40"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
                      selectedJdItems.size > 0
                        ? "bg-teal-500/15 text-teal-600 dark:text-teal-400"
                        : "bg-muted text-muted-foreground group-hover:bg-teal-500/10 group-hover:text-teal-500"
                    }`}>
                      <ClipboardList className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        Select Custom JD
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                          Optional
                        </span>
                        {selectedJdItems.size > 0 && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                            ✓ {selectedJdItems.size} selected
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedJdItems.size > 0
                          ? "Click to review or modify selections"
                          : "Select roles to build a targeted JD"}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      showJdPanel ? "rotate-180" : ""
                    }`} />
                  </button>

                  {/* Dropdown panel */}
                  {showJdPanel && (
                    <div className="absolute left-0 right-0 top-full mt-2 z-[9999] rounded-2xl border border-border bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
                      {/* Search + header */}
                      <div className="px-4 py-3 border-b border-border bg-zinc-50 dark:bg-zinc-800/60 flex items-center gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                          <input
                            type="text"
                            value={jdSearch}
                            onChange={(e) => setJdSearch(e.target.value)}
                            placeholder="Search roles..."
                            className="w-full h-8 rounded-lg border border-border bg-card pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                          {selectedJdItems.size}/{JD_ITEMS.length} selected
                        </span>
                        {selectedJdItems.size > 0 && (
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); setSelectedJdItems(new Set()) }}
                            className="text-xs text-red-500 hover:text-red-600 transition-colors shrink-0 flex items-center gap-1"
                          >
                            <X className="w-3 h-3" /> Clear
                          </button>
                        )}
                      </div>

                      {/* Items list */}
                      <div className="max-h-[320px] overflow-y-auto divide-y divide-border">
                        {JD_ITEMS
                          .filter((item) =>
                            jdSearch.trim() === "" ||
                            item.toLowerCase().includes(jdSearch.toLowerCase())
                          )
                          .map((item) => {
                            const checked = selectedJdItems.has(item)
                            return (
                              <button
                                key={item}
                                type="button"
                                onMouseDown={(e) => { e.preventDefault(); toggleJdItem(item) }}
                                className={`flex items-start gap-3 w-full px-4 py-3 text-left transition-colors ${
                                  checked
                                    ? "bg-teal-500/8 dark:bg-teal-500/10"
                                    : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                                }`}
                              >
                                {/* Checkbox */}
                                <span className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                  checked
                                    ? "bg-teal-500 border-teal-500"
                                    : "border-border bg-card"
                                }`}>
                                  {checked && (
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                  )}
                                </span>
                                <span className={`text-xs leading-relaxed ${
                                  checked ? "text-teal-700 dark:text-teal-300 font-medium" : "text-foreground"
                                }`}>
                                  {item}
                                </span>
                              </button>
                            )
                          })
                        }
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-3 border-t border-border bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Selected responsibilities will be used to match your resume.
                        </p>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); setShowJdPanel(false) }}
                          className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline shrink-0 ml-4"
                        >
                          Done
                        </button>
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
          {stage === "results" && (() => {
            const ATS_SCORE = 70
            const resumeName = file?.name ?? "resume.pdf"
            const mentorEmail = "mentor@resumeboost.ai"
            const mentorWhatsApp = "919999999999" // replace with real number
            const mentorMailBody = `Hi,\n\nI'd like to connect regarding my resume review.\n\nResume: ${resumeName}\nATS Score: ${ATS_SCORE}/100${jobRole ? `\nTarget Role: ${jobRole}` : ""}\n\nPlease find my resume attached.\n\nThank you!`
            const mentorWAMsg = `Hi! I would like to connect for a resume review.\n\nResume: ${resumeName}\nATS Score: ${ATS_SCORE}/100${jobRole ? `\nTarget Role: ${jobRole}` : ""}\n\nCould you please help me improve my resume?`

            return (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Page Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-6 border-b border-border gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-1">ATS Analysis Results</h1>
                  <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    {resumeName}
                    {jobRole && <> · <span className="text-teal-500">{jobRole}</span></>}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <Button variant="outline" size="sm" className="gap-2 hidden sm:flex" onClick={reset}>
                    <Upload className="w-4 h-4" /> New Scan
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-2 bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-500/20" 
                    /* REVERT_GUIDE: Uncomment the line below and remove window.location.href to restore scrolling */
                    /* onClick={() => document.getElementById('mentor-section')?.scrollIntoView({ behavior: 'smooth' })} */
                    onClick={() => window.location.href = "/improve/for_all"}
                  >
                    <Sparkles className="w-4 h-4" /> Enhance Resume
                  </Button>
                  <Button variant="gradient" size="sm" className="gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </Button>
                </div>
              </div>

              {/* ── LOW SCORE ALERT ── */}
              {ATS_SCORE < 75 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 dark:bg-red-950/40 p-4 flex items-start gap-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/15 shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-red-400 mb-1">⚠ Low ATS Score — Your Resume May Be Auto-Rejected</p>
                    <p className="text-sm text-red-600/80 dark:text-red-400/80 leading-relaxed">
                      Your resume scored <strong>{ATS_SCORE}/100</strong>, which is below the 75-point threshold most ATS systems use. It may be filtered out before a recruiter ever reads it.
                      Address the issues listed below and consider connecting with a mentor for personalized help.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── 3-COLUMN TOP ROW: PDF | Score | Breakdown ── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 items-start">

                {/* LEFT: PDF Viewer */}
                <div className="glass-card rounded-3xl border border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-hidden lg:col-span-5 flex flex-col">
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
                    <FileText className="w-4 h-4 text-teal-500" />
                    <span className="text-sm font-semibold text-foreground">Original Resume</span>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="w-full bg-muted/30 overflow-hidden border border-border relative min-h-[560px] rounded-xl">
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
                </div>

                {/* CENTER: ATS Score Gauge */}
                <div className="glass-card rounded-3xl border border-border flex flex-col items-center justify-start p-6 shadow-sm relative overflow-hidden lg:col-span-3">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />
                  <div className="mt-8">
                    <ScoreGauge score={ATS_SCORE} />
                  </div>
                  <div className="mt-10 text-center px-2 mb-4">
                    <h4 className="text-xl font-bold mb-2">
                      {ATS_SCORE >= 90 ? "Excellent!" : ATS_SCORE >= 75 ? "Almost There!" : "Needs Work"}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ATS_SCORE >= 90
                        ? "Your resume is highly optimised. Minor tweaks can push it to a perfect score."
                        : ATS_SCORE >= 75
                        ? "Great potential! Some formatting and keyword adjustments will push you over the line."
                        : "Your resume needs significant improvements to pass most ATS filters. See the issues below."}
                    </p>
                  </div>
                </div>

                {/* RIGHT: Score Breakdown */}
                <div className="lg:col-span-4">
                  <ScoreBreakdown />
                </div>
              </div>

              {/* ── 2-COLUMN: Issues Detected + Connect with Mentor ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 items-start">

                {/* LEFT: Issues Detected */}
                <div className="glass-card rounded-3xl border border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] overflow-hidden h-full">
                  <div className="p-4 h-full">
                    <IssuesDetected />
                  </div>
                </div>

                {/* RIGHT: Connect with Mentor */}
                <motion.div
                  id="mentor-section"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="scroll-mt-20 h-full"
                >
                  <div className="glass-card rounded-3xl border border-border overflow-hidden shadow-sm h-full flex flex-col">
                    {/* Header gradient strip */}
                    <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-base">Connect with a Resume Mentor</p>
                        <p className="text-white/70 text-xs">Get personalized 1-on-1 feedback from a certified career coach</p>
                      </div>
                      <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/90 text-xs font-medium">Mentors Online</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        {/* Resume info pill */}
                        <div className="col-span-full flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
                          <FileText className="w-4 h-4 text-teal-500 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">Resume to share</p>
                            <p className="text-sm font-medium text-foreground truncate">{resumeName}</p>
                          </div>
                          <span className={`ml-auto shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                            ATS_SCORE >= 75 ? "bg-teal-500/10 text-teal-600 dark:text-teal-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}>
                            Score: {ATS_SCORE}/100
                          </span>
                        </div>

                        {/* WhatsApp mentor button */}
                        <button
                          type="button"
                          onClick={() => window.open(`https://wa.me/${mentorWhatsApp}?text=${encodeURIComponent(mentorWAMsg)}`, "_blank")}
                          className="flex items-center gap-4 rounded-2xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/12 dark:hover:bg-green-500/15 px-5 py-4 text-left transition-all group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Chat on WhatsApp</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Send your resume details instantly</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/60 ml-auto shrink-0" />
                        </button>

                        {/* Email mentor button */}
                        <button
                          type="button"
                          onClick={() => window.open(
                            `mailto:${mentorEmail}?subject=${encodeURIComponent(`Resume Review Request — ${resumeName}`)}&body=${encodeURIComponent(mentorMailBody)}`,
                            "_blank"
                          )}
                          className="flex items-center gap-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/12 dark:hover:bg-blue-500/15 px-5 py-4 text-left transition-all group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Email a Mentor</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Pre-filled with your resume & score</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/60 ml-auto shrink-0" />
                        </button>
                      </div>

                      <p className="text-center text-xs text-muted-foreground mt-auto">
                        📎 Tip: After opening the compose window, <strong>attach your resume file</strong> to the message before sending.
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>

            </motion.div>
            )
          })()}

        </AnimatePresence>
      </div>

      {/* ── LOW SCORE POPUP ── */}
      <AnimatePresence>
        {stage === "results" && showMentorPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden glass-card"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <button 
                onClick={() => setShowMentorPopup(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 rounded-2xl bg-red-400/20 border border-red-400/30 shadow-[0_0_20px_rgba(248,113,113,0.15)] flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Low ATS Score Detected</h3>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">
                  Your resume scored below the 75-point threshold and may be auto-rejected. Don't worry, our mentors can review and optimize it for you!
                </p>

                {/* REVERT_GUIDE: To restore the original popup, uncomment the block below and remove the demo buttons */}
                {/* 
                <Button 
                  className="w-full gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 border-none shadow-lg shadow-red-500/25 text-white h-12 rounded-xl text-base font-medium"
                  onClick={() => {
                    setShowMentorPopup(false);
                    document.getElementById('mentor-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <UserCheck className="w-5 h-5" />
                  Connect with Mentor
                </Button>
                */}

                {/* DEMO BUTTONS */}
                <div className="w-full space-y-3">
                  <Button 
                    className="w-full gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 border-none shadow-lg shadow-red-500/25 text-white h-12 rounded-xl text-base font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => {
                      setShowMentorPopup(false);
                      window.location.href = "/improve/for_all";
                    }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Fix Your Resume
                  </Button>

                  <button
                    className="w-full h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                    onClick={() => {
                      setShowMentorPopup(false);
                      document.getElementById('mentor-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <UserCheck className="w-4 h-4" />
                    Connect with Mentor
                  </button>
                </div>
                
                <button
                  className="mt-4 text-xs text-white/40 hover:text-white transition-colors"
                  onClick={() => setShowMentorPopup(false)}
                >
                  Review exactly what went wrong
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
