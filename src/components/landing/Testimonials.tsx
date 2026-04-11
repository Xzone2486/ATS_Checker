"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import FloatingLines from "./FloatingLines"
import { testimonials } from "@/lib/testimonialsData"

// Split into two rows for different scroll directions
const half = Math.ceil(testimonials.length / 2)
const row1 = testimonials.slice(0, half)
const row2 = testimonials.slice(half)

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="min-w-[340px] md:min-w-[380px] p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 flex-shrink-0 relative group cursor-default select-none"
      style={{
        transform: isHovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-teal-500/10 group-hover:text-teal-500/20 transition-colors" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < t.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-zinc-300 dark:text-zinc-700"
            }`}
          />
        ))}
      </div>

      {/* Review text */}
      {t.text && (
        <div className="mb-4 pr-2 max-h-[120px] overflow-y-auto custom-scrollbar">
          <p className="text-sm text-muted-foreground leading-relaxed">
            &ldquo;{t.text}&rdquo;
          </p>
        </div>
      )}



      {/* Person */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden border-2 border-teal-500/30 flex-shrink-0">
          <img
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${t.avatar}&backgroundColor=transparent`}
            alt={t.name}
            className="w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{t.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {t.date}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ScrollRow({ items, direction }: { items: typeof testimonials; direction: "left" | "right" }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const velocityRef = useRef(0)
  const lastMouseXRef = useRef(0)
  const speed = direction === "left" ? 0.25 : 0.2
  const allItems = [...items, ...items, ...items]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = () => {
      const totalWidth = track.scrollWidth / 3

      if (!isDraggingRef.current) {
        if (!pausedRef.current) {
          posRef.current += speed
        }
        if (posRef.current >= totalWidth) posRef.current -= totalWidth
        if (posRef.current < 0) posRef.current += totalWidth
      }

      if (direction === "left") {
        track.style.transform = `translateX(-${posRef.current}px)`
      } else {
        track.style.transform = `translateX(${posRef.current - totalWidth}px)`
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [direction, speed])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    pausedRef.current = true
    dragStartXRef.current = e.clientX
    dragStartPosRef.current = posRef.current
    lastMouseXRef.current = e.clientX
    velocityRef.current = 0
    if (trackRef.current) trackRef.current.style.cursor = "grabbing"
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    // For "right" direction the transform is negative, so flip the delta
    const raw = dragStartXRef.current - e.clientX
    const delta = direction === "right" ? -raw : raw
    velocityRef.current = lastMouseXRef.current - e.clientX
    lastMouseXRef.current = e.clientX
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 3
    let newPos = dragStartPosRef.current + delta
    // Wrap-around clamping
    while (newPos >= totalWidth) newPos -= totalWidth
    while (newPos < 0) newPos += totalWidth
    posRef.current = newPos
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    pausedRef.current = false
    if (trackRef.current) trackRef.current.style.cursor = "grab"
  }

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      pausedRef.current = false
    } else {
      pausedRef.current = false
    }
    if (trackRef.current) trackRef.current.style.cursor = "grab"
  }

  return (
    <div className="w-full overflow-hidden relative select-none">
      <div
        ref={trackRef}
        className="flex gap-6 py-3"
        style={{ width: "max-content", cursor: "grab", userSelect: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => { if (!isDraggingRef.current) pausedRef.current = true }}
        onMouseLeave={handleMouseLeave}
      >
        {allItems.map((t, i) => (
          <TestimonialCard key={i} t={t} index={i} />
        ))}
      </div>
    </div>
  )
}


export function Testimonials() {
  return (
    <section className="py-12 relative overflow-hidden bg-zinc-950 dark text-foreground">
      {/* Dynamic Floating Lines Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <FloatingLines
          linesGradient={['#7cff67', '#B19EEF', '#5227FF']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[6, 6, 6]}
          lineDistance={[5, 5, 5]}
          topWavePosition={{ x: 10.0, y: 0.5, rotate: -0.4 }}
          middleWavePosition={{ x: 5.0, y: 0.0, rotate: 0.2 }}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={false}
          parallax={false}
        />
      </div>

      <div className="container px-6 mx-auto mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6 border border-amber-500/20">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            Trusted by 50,000+ Professionals
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by Senior Professionals &{" "}
            <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don&apos;t just take our word for it — hear from the executives, engineers, and leaders who landed their dream roles with ROZGAR 24X7.
          </p>
        </motion.div>
      </div>

      {/* Scrolling testimonial rows */}
      <div className="flex flex-col gap-6 relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50/50 dark:from-zinc-950 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50/50 dark:from-zinc-950 to-transparent pointer-events-none z-10" />

        <ScrollRow items={row1} direction="left" />
        <ScrollRow items={row2} direction="right" />
      </div>

      {/* Stats bar */}
      <div className="container px-6 mx-auto mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "100K+", label: "Professionals Served" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "92%", label: "Interview Rate" },
            { value: "3x", label: "Faster Hiring" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
