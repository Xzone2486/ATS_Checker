"use client"

import { motion } from "framer-motion"
import { EliteResumeTools } from "./EliteResumeTools"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    }
  },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900">Elite Resume Tools</h2>
          <p className="text-lg text-muted-foreground">Stop guessing what recruiters want. Our AI suite builds the perfect resume optimized for humans and machines.</p>
        </div>

        <EliteResumeTools />
      </div>
    </section>
  )
}
