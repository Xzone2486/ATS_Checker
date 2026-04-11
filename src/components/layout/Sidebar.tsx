"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  FileText, 
  BarChart2, 
  Settings, 
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Resumes", href: "/resume-builder", icon: FileText },
  { name: "ATS Analysis", href: "/ats-analysis", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = useLocation().pathname
  const [collapsed, setCollapsed] = React.useState(false)

  // Try to load collapsed state from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed")
    if (saved) setCollapsed(JSON.parse(saved))
  }, [])

  const toggleCollapse = () => {
    const newVal = !collapsed
    setCollapsed(newVal)
    localStorage.setItem("sidebar_collapsed", JSON.stringify(newVal))
  }

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-border bg-card z-40 overflow-hidden"
      >
        <div className="flex items-center h-16 px-4 border-b border-border/50 justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2 overflow-hidden flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 shrink-0">
              <span className="text-white font-bold text-sm tracking-tight">RX</span>
            </div>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.1 }}
                className="font-semibold text-lg tracking-tight whitespace-nowrap"
              >
                ROZGAR 24X7
              </motion.span>
            )}
          </Link>
        </div>

        <div className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
            const Icon = link.icon

            return (
              <Link key={link.name} to={link.href}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden",
                  isActive 
                    ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-medium" 
                    : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600 rounded-r-md"
                    />
                  )}
                  <Icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-teal-600 dark:text-teal-400")} />
                  
                  {!collapsed && (
                    <span className="whitespace-nowrap">{link.name}</span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-border/50 flex flex-col gap-4">
          {!collapsed && (
            <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl p-4 border border-teal-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/20 rounded-full blur-xl" />
              <Sparkles className="w-5 h-5 text-teal-500 mb-2" />
              <p className="text-sm font-medium mb-1">Pro Plan</p>
              <p className="text-xs text-muted-foreground mb-3">12 days left in trial</p>
              <Button variant="gradient" size="sm" className="w-full text-xs h-8">Upgrade Now</Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shrink-0">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=ryan" alt="User" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium truncate">Ryan Davis</span>
                  <span className="text-xs text-muted-foreground truncate">ryan@example.com</span>
                </div>
              </div>
            )}
            
            <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground ml-auto" title="Log out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={toggleCollapse}
          className="absolute right-0 top-20 translate-x-1/2 w-6 h-6 bg-border rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors z-50 shadow-sm"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Main Content padding spacer for desktop */}
      <motion.div 
        initial={false}
        animate={{ marginLeft: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block h-screen w-0"
      />
    </>
  )
}
