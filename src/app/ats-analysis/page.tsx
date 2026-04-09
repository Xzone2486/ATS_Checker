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
  CheckCircle2, Sparkles, X, FileUp, Zap, MessageCircle, Mail, ExternalLink
} from "lucide-react"

type Stage = "upload" | "analyzing" | "results"

export default function AtsAnalysisPage() {
  const [stage, setStage] = useState<Stage>("upload")
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [progress, setProgress] = useState(0)
  const [jobRole, setJobRole] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    if (!f) return
    setFile(f)
    setFileUrl(URL.createObjectURL(f))
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
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Target Job Role <span className="text-xs opacity-60">(optional — improves accuracy)</span>
                  </label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer at Google"
                    className="w-full h-11 rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                  />
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
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Footer />
    </main>
  )
}
