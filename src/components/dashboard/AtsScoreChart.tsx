"use client"

import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid
} from "recharts"
import { motion } from "framer-motion"

const data = [
  { date: "Jan", score: 45 },
  { date: "Feb", score: 52 },
  { date: "Mar", score: 58 },
  { date: "Apr", score: 65 },
  { date: "May", score: 72 },
  { date: "Jun", score: 86 },
  { date: "Jul", score: 94 },
]

export function AtsScoreChart() {
  return (
    <div className="w-full h-full relative group">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10 dark:opacity-5 text-border" />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="glass-card bg-background/90 p-3 rounded-xl border border-border shadow-lg hidden group-hover:block">
                    <p className="font-medium text-sm text-muted-foreground mb-1">{payload[0].payload.date}</p>
                    <p className="text-2xl font-bold flex items-center gap-2 text-teal-600 dark:text-teal-400">
                      {payload[0].value} <span className="text-xs font-normal text-muted-foreground">score</span>
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#14b8a6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorScore)" 
            animationDuration={2000}
            activeDot={{ r: 6, fill: "#14b8a6", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
    </div>
  )
}
