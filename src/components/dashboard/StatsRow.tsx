"use client"

import { motion } from "framer-motion"
import { FileText, TrendingUp, Send, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function StatsRow() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
    >
      <StatCard 
        title="Total ATS Scans" 
        value={12} 
        icon={<FileText className="w-4 h-4 text-blue-600" />} 
        trend="+3 this week" 
        trendUp={true}
        color="blue"
      />
      <StatCard 
        title="Avg ATS Score" 
        value={85} 
        icon={<TrendingUp className="w-4 h-4 text-green-600" />} 
        trend="+5% vs last month" 
        trendUp={true}
        color="green"
      />
      <StatCard 
        title="Resume Builder" 
        value={0} 
        icon={<CheckCircle className="w-4 h-4 text-orange-600" />} 
        trend="Coming Soon" 
        trendUp={false}
        color="orange"
      />
      <StatCard 
        title="Applications" 
        value={0} 
        icon={<Send className="w-4 h-4 text-blue-600" />} 
        trend="Coming Soon" 
        trendUp={false}
        color="blue"
      />
    </motion.div>
  )
}

const colorMap: Record<string, { bg: string; border: string; icon: string; value: string; trend: string }> = {
  blue:   { bg: "bg-blue-50/70",   border: "border-blue-200/60",   icon: "bg-blue-100",   value: "text-blue-900",   trend: "text-blue-700" },
  green:  { bg: "bg-green-50/70",  border: "border-green-200/60",  icon: "bg-green-100",  value: "text-green-900",  trend: "text-green-700" },
  orange: { bg: "bg-orange-50/70", border: "border-orange-200/60", icon: "bg-orange-100", value: "text-orange-900", trend: "text-orange-700" },
}

function StatCard({ title, value, icon, trend, trendUp, color = "blue" }: any) {
  // Count up animation logic
  const [displayValue, setDisplayValue] = useState(0)
  const c = colorMap[color]

  useEffect(() => {
    let startTime: number
    const duration = 1500

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setDisplayValue(Math.floor(progress * value))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [value])

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className={`${c.bg} ${c.border} border rounded-2xl p-5 backdrop-blur-sm hover:shadow-md transition-all group cursor-pointer`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={`w-8 h-8 rounded-full ${c.icon} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      <div className={`text-3xl font-bold tracking-tight mb-1 ${c.value}`}>{displayValue}</div>
      <div className={`text-xs font-medium ${c.trend} flex items-center gap-1`}>
        {trendUp ? <TrendingUp className="w-3 h-3" /> : null}
        {trend}
      </div>
    </motion.div>
  )
}
