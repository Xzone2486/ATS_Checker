"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import FloatingClouds from "./FloatingClouds"

const HeroCanvas = React.lazy(() => import("./HeroCanvas"))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-start pt-0 pb-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <FloatingClouds />
      </div>
      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium mb-6 backdrop-blur-sm border border-teal-500/20">
              <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
              Optimize Your Resume with AI Now!
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
            >
              Your Resume, <br />
              <span className="text-gradient">Optimized by AI</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-xl"
            >
              Upload your resume and get an AI review that passes ATS systems and increases your interview chances by 3x.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 mb-12">
              <Link to="/ats-analysis">
                <Button variant="premium-glass" size="xl">
                  Analyze My Resume
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden z-[${5-i}]`}>
                     <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=transparent`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p>Join <strong className="text-foreground">3,546+</strong> users who landed interviews last month.</p>
            </motion.div>
          </motion.div> 

          {/* Right Side 3D Canvas */}
          <div className="w-full h-[500px] lg:h-[600px] relative">
            <React.Suspense fallback={<div className="w-full h-[100%] animate-pulse rounded-2xl bg-teal-500/10" />}>
              <HeroCanvas />
            </React.Suspense>
          </div>

        </div>
      </div>
    </section>
  )
}
