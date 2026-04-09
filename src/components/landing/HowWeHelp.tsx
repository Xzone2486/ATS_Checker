"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Target, Wand2, TrendingUp, ShieldCheck, Layers, Zap } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Precision Job Matching",
    description: "Our AI cross-references your experience with job descriptions to surface the exact keywords, skills, and achievements that recruiters search for.",
    bg: "linear-gradient(135deg, #1d4ed8, #0891b2)",
    number: "01",
    stat: "3× more interview callbacks",
  },
  {
    icon: Wand2,
    title: "One-Click AI Rewrite",
    description: "Transform vague bullet points into quantified, action-driven achievements. Just click and watch your resume evolve in real-time.",
    bg: "linear-gradient(135deg, #0d9488, #c026d3)",
    number: "02",
    stat: "10× faster resume writing",
  },
  {
    icon: TrendingUp,
    title: "ATS Score Maximizer",
    description: "Get a detailed breakdown of how ATS systems read your resume — including missing keywords, formatting issues, and readability scores.",
    bg: "linear-gradient(135deg, #059669, #0d9488)",
    number: "03",
    stat: "94% avg ATS pass rate",
  },
  {
    icon: ShieldCheck,
    title: "Industry-Proven Templates",
    description: "Choose from 30+ templates designed by recruiters and tested across Fortune 500 ATS systems. Every template is optimized for maximum parse rate.",
    bg: "linear-gradient(135deg, #d97706, #ca8a04)",
    number: "04",
    stat: "30+ ATS-proven templates",
  },
  {
    icon: Layers,
    title: "Multi-Version Management",
    description: "Create tailored resume versions for different roles and companies. Easily compare, duplicate, and fine-tune for each opportunity.",
    bg: "linear-gradient(135deg, #e11d48, #9333ea)",
    number: "05",
    stat: "Unlimited resume versions",
  },
  {
    icon: Zap,
    title: "Real-Time Feedback Loop",
    description: "Instantly see how every edit impacts your ATS score, keyword density, and recruiter appeal without ever leaving the editor.",
    bg: "linear-gradient(135deg, #1d4ed8, #0891b2)",
    number: "06",
    stat: "Live score updates",
  },
]

const VH_PER_CARD = 50
const HEADER_VH = 10

export function HowWeHelp() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const N = features.length

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      // How many pixels of the section have scrolled past the top of the viewport
      const scrolledIn = -rect.top
      // Total scroll distance available inside the section
      const totalScrollable = rect.height - window.innerHeight

      cardsRef.current.forEach((card, i) => {
        if (!card) return

        // Each card enters during its own "window" of the total scroll
        const perCard = totalScrollable / N
        const cardStart = i * perCard * 0.75         // stagger start
        const cardEnd   = cardStart + perCard * 0.6   // how fast it slides in

        const rawProgress = (scrolledIn - cardStart) / (cardEnd - cardStart)
        const enterProgress = Math.max(0, Math.min(1, rawProgress))

        // Cards that are now buried get slightly scaled down
        const nextCardProgress = Math.max(0, Math.min(1, (scrolledIn - ((i + 1) * perCard * 0.75)) / (perCard * 0.6)))
        const scaleDown = nextCardProgress * 0.05

        const translateY = (1 - enterProgress) * 100   // 100vh → 0
        const scale      = 1 - scaleDown
        const stackTop   = i * 14                        // 14px stacking offset per depth

        card.style.transform = `translate3d(0, ${translateY}vh, 0) scale(${scale})`
        card.style.top       = `${stackTop}px`
        card.style.zIndex    = String(i + 1)
        card.style.opacity   = enterProgress > 0.05 ? "1" : "0"
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // run once immediately
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const totalVh = features.length * VH_PER_CARD + HEADER_VH + 10

  return (
    <section
      ref={sectionRef}
      id="how-we-help"
      className="relative"
      style={{
        height: `${totalVh}vh`,
        background: "white",
      }}
    >
      {/* Ambient blobs (lightened) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-100/30 rounded-full blur-[100px] pointer-events-none" />

      {/* ─── Sticky viewport ─── */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* Section header */}
        <div className="shrink-0 pt-14 pb-6 text-center px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-5 border border-blue-200">
              <Zap className="w-4 h-4" />
              Supercharge Your Job Search
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-zinc-900">
              How ROZGAR 24/7{" "}
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
                Powers Your Success
              </span>
            </h2>
            <p className="text-base text-zinc-500">
              Every feature is built with one goal — to get your resume past the bots and into the hands of real hiring managers.
            </p>
          </motion.div>
        </div>

        {/* Cards area */}
        <div className="relative flex-1 overflow-hidden px-4 md:px-12">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el }}
                className="absolute inset-x-4 md:inset-x-12 rounded-[28px] overflow-hidden"
                style={{
                  transform: "translate3d(0, 100vh, 0)",
                  opacity: 0,
                  willChange: "transform, opacity",
                  bottom: 0,
                  maxHeight: "calc(100% - 14px)",
                }}
              >
                {/* Card inner */}
                <div
                  className="w-full h-full flex flex-col md:flex-row gap-6 md:gap-10 items-start p-8 md:p-12 text-white relative overflow-hidden"
                  style={{ background: feature.bg, minHeight: "280px" }}
                >
                  {/* Dot-grid watermark */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  {/* Number watermark */}
                  <div className="absolute top-4 right-8 text-white/10 font-black text-8xl leading-none select-none">
                    {feature.number}
                  </div>

                  {/* Icon */}
                  <div className="shrink-0 relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 border border-white/25 flex items-center justify-center shadow-2xl">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 relative z-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold uppercase tracking-widest mb-4">
                      {feature.stat}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                      {feature.description}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-6 flex items-center gap-4 max-w-xs">
                      <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${65 + i * 5}%` }} />
                      </div>
                      <span className="text-white/55 text-sm font-medium">{65 + i * 5}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Scroll hint */}
        <div className="shrink-0 flex justify-center pb-4 relative z-20">
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center pt-1">
              <div className="w-1 h-1.5 bg-white/40 rounded-full animate-bounce" />
            </div>
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  )
}
