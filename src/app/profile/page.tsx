"use client"

import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/ui/header-1"
import { ResumeTable } from "@/components/dashboard/ResumeTable"
import { Footer } from "@/components/layout/Footer"
import { FileText, BarChart2, Star, Calendar, Mail, User, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const stats = [
  { label: "Resumes Created", value: "4", icon: FileText, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-500/10" },
  { label: "Avg ATS Score", value: "76%", icon: BarChart2, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
  { label: "Top Score", value: "94%", icon: Star, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { label: "Member Since", value: "Mar 2026", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
]

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col gap-8 pb-12 items-center pt-24 px-4">
        <div className="w-full max-w-4xl">

      {/* ── Profile Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl border border-border/60 overflow-hidden"
      >
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-blue-600 to-teal-600 relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>

        {/* Avatar + Info */}
        <div className="px-8 pb-6">
          {/* Row 1: avatar only — pulls up into banner */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative shrink-0">
              <img
                src={user?.avatar ?? `https://api.dicebear.com/7.x/notionists/svg?seed=default&backgroundColor=transparent`}
                alt="avatar"
                className="w-20 h-20 rounded-2xl border-4 border-background bg-zinc-100 shadow-lg"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center border-2 border-background hover:bg-teal-700 transition-colors">
                <Edit2 className="w-3 h-3 text-white" />
              </button>
            </div>
            <Button variant="gradient" size="sm" asChild>
              <Link to="/resume-builder">+ New Resume</Link>
            </Button>
          </div>

          {/* Row 2: name + meta — always below the avatar, never overlapping */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{user?.name ?? "Google User"}</h1>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {user?.email ?? "user@google.com"}</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Free Plan</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-zinc-50/50 dark:bg-zinc-900/30">
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-base font-bold leading-none">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── My Resumes ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">My Resumes</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/resume-builder">Create New</Link>
          </Button>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <ResumeTable />
        </div>
      </motion.div>
      </div>
    </div>
    <Footer />
    </main>
  )
}
