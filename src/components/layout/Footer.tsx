"use client"

import { Link } from "react-router-dom"
import { ArrowRight, Mail, Hash, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-zinc-950 border-t border-border pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-4">
             <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-600 shadow-md">
                <span className="text-white font-bold text-sm tracking-tight">RX</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">ROZGAR <span className="text-teal-600 dark:text-teal-400">24X7</span></span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Silicon Valley-tier AI SaaS to optimize your resume. Build, analyze, and land your dream job faster.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Hash className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {/* <li><Link to="/resume-builder" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Resume Builder</Link></li> */}
              <li><Link to="/ats-analysis" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">ATS Checker</Link></li>
              <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Pricing</Link></li>
              {/* <li><a href="#" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Templates</a></li> */}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Career Advice</a></li>
              {/* <li><a href="#" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Resume Examples</a></li> */}
              <li><a href="#" className="text-sm text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay updated</h3>
            <p className="text-sm text-muted-foreground mb-4">Get weekly career tips and resume advice.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                type="submit" 
                className="inline-flex h-10 px-4 items-center justify-center whitespace-nowrap rounded-md bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-sm font-medium transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/50 pt-8 gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ROZGAR 24X7. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <span className="flex items-center gap-1">Made with <span className="text-red-500">❤️</span> in India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
