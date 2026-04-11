"use client"

import { motion } from "framer-motion"
import { FeaturesInteractive } from "./FeaturesInteractive"

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 relative overflow-hidden bg-white dark:bg-zinc-950">
      <div className="container px-6 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">Built for the AI Era</h2>
          <p className="text-lg text-muted-foreground">Stop guessing what recruiters want. Our suite of professional tools builds the perfect resume optimized for humans and machines.</p>
        </div>

        <FeaturesInteractive />
      </div>
    </section>
  )
}
