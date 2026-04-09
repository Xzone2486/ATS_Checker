"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { UploadCloud, Bot, Download } from "lucide-react"

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // Smooth out the spring
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  const steps = [
    {
      title: "1. Upload & Describe",
      desc: "Drop your existing resume and paste the job description you're targeting. We support PDF, DOCX, and TXT.",
      icon: <UploadCloud className="w-6 h-6 text-white" />,
      color: "bg-blue-500"
    },
    {
      title: "2. AI Analysis & Rewrite",
      desc: "Our engine scans for missing keywords, weak verbs, and poor formatting, then instantly generates optimized bullet points.",
      icon: <Bot className="w-6 h-6 text-white" />,
      color: "bg-teal-500"
    },
    {
      title: "3. Download & Apply",
      desc: "Export your hyper-optimized, ATS-friendly resume as a beautiful PDF or raw DOCX, ready to get you hired.",
      icon: <Download className="w-6 h-6 text-white" />,
      color: "bg-blue-500"
    }
  ]

  return (
    <section className="py-16 relative overflow-hidden bg-white/30 dark:bg-zinc-950/30" ref={containerRef}>
      {/* Rich background fills */}
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-blue-500/[0.04] pointer-events-none" />
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-teal-500/[0.05] rounded-full blur-[120px] animate-blob pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-blue-500/[0.05] rounded-full blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="container px-6 mx-auto text-center max-w-4xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-20">How It Works</h2>

        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4">
          
          {/* Timeline Line (Desktop only) */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-zinc-200 dark:bg-zinc-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500 origin-left"
              style={{ scaleX: pathLength }}
            />
          </div>

          {/* Timeline Line (Mobile only) */}
          <div className="block md:hidden absolute top-0 bottom-0 left-[28px] w-[2px] bg-zinc-200 dark:bg-zinc-800 z-[-1]">
            <motion.div 
              className="w-full bg-gradient-to-b from-blue-500 via-teal-500 to-blue-500 origin-top"
              style={{ scaleY: pathLength }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, type: "spring" }}
              className="flex flex-row md:flex-col items-start md:items-center gap-6 relative flex-1"
            >
              {/* Icon Circle */}
              <div className={`w-14 h-14 rounded-full ${step.color} outline outline-8 outline-white dark:outline-background flex items-center justify-center shadow-xl z-10 flex-shrink-0`}>
                {step.icon}
              </div>

              {/* Content */}
              <div className="text-left md:text-center mt-2 md:mt-4">
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}
