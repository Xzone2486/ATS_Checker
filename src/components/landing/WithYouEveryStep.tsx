"use client"

import { motion } from "framer-motion"
import {
  Lightbulb,
  FileEdit,
  Search,
  MessageSquareHeart,
  Trophy,
  Rocket,
  ArrowRight,
} from "lucide-react"
import { Link } from "react-router-dom"

const journeySteps = [
  {
    icon: Lightbulb,
    phase: "Phase 1",
    title: "Career Assessment",
    description:
      "We analyze your experience, skills, and goals to build a personalized resume strategy that highlights your unique value.",
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: FileEdit,
    phase: "Phase 2",
    title: "AI-Powered Crafting",
    description:
      "Our AI engine rewrites, restructures, and formats your resume with recruiter-approved language and ATS-optimized keywords.",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    phase: "Phase 3",
    title: "Job-Specific Tailoring",
    description:
      "Paste any job description and get a resume fine-tuned for that exact role — maximizing your ATS match score instantly.",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageSquareHeart,
    phase: "Phase 4",
    title: "Expert Review & Tips",
    description:
      "Get actionable feedback from our AI reviewer that spots weak areas, missing skills, and formatting issues others miss.",
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Trophy,
    phase: "Phase 5",
    title: "Interview-Ready Polish",
    description:
      "Final optimizations ensure your resume is polished, professional, and ready to impress both ATS systems and human reviewers.",
    color: "bg-emerald-500",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Rocket,
    phase: "Phase 6",
    title: "Launch & Land the Role",
    description:
      "Export in multiple formats, apply with confidence, and track your progress — we're with you until you sign the offer letter.",
    color: "bg-teal-500",
    gradient: "from-teal-500 to-blue-500",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
}

export function WithYouEveryStep() {
  return (
    <section className="py-12 relative w-full">
      <div className="container px-6 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
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
            From first draft to final offer — ROZGAR 24/7 guides you through the entire process with smart tools, instant feedback, and unwavering support.
          </p>
        </motion.div>

        {/* Journey Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {journeySteps.map((step, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative"
            >
              <div className="h-full p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-transparent transition-all duration-500 relative overflow-hidden">
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`}
                />

                {/* Phase number + icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                  >
                    {step.phase}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  {step.description}
                </p>

                {/* Hover arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <span className={`bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                    Learn more
                  </span>
                  <ArrowRight className={`w-4 h-4 text-${step.color.replace('bg-', '')}`} style={{ color: 'currentColor' }} />
                </div>

                {/* Bottom accent bar */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${step.gradient} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/ats-analysis"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.03] transition-all duration-300 rounded-xl px-10 py-4 text-base font-semibold group relative overflow-hidden"
          >
            {/* <span className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out" /> */}
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
