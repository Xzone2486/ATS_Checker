"use client"

import { useRef, useEffect } from "react"
import { Eye, CheckCircle2, Briefcase, GraduationCap, BarChart2, Code2, Users, FileText, ChevronLeft, ChevronRight } from "lucide-react"

interface Template {
  name: string
  role: string
  level: string
  category: string
  color: string
  badge: string
  iconBg: string
  score: number
  file: string
  image: string
  icon: React.ReactNode
  tags: string[]
}

const resumeTemplates: Template[] = [
  {
    name: "Clean Classic",
    role: "All-Purpose Professional",
    level: "Mid-Senior Level",
    category: "Professional",
    color: "from-blue-500/20 to-blue-600/5",
    badge: "bg-blue-500",
    iconBg: "bg-blue-100 text-blue-600",
    score: 96,
    file: "/templates/Clean Classic – Rozgar24x7 Resume Template.pdf",
    image: "/hero_3d_templates/Clean Classic – Rozgar24x7 Resume Template.png",
    icon: null,
    tags: ["ATS-Optimized", "Clean Layout", "Universal"],
  },
  {
    name: "Executive Strategy Manager",
    role: "Senior Strategy Lead",
    level: "Mid-Senior Level",
    category: "Professional",
    color: "from-indigo-500/20 to-indigo-600/5",
    badge: "bg-indigo-500",
    iconBg: "bg-indigo-100 text-indigo-600",
    score: 97,
    file: "/templates/Navy Pro – Rozgar24x7 Resume Template.pdf",
    image: "/hero_3d_templates/Navy Pro – Rozgar24x7 Resume Template.png",
    icon: null,
    tags: ["Corporate", "Executive", "Bold Design"],
  },
  {
    name: "Data Scientist",
    role: "Data Scientist",
    level: "Entry–Mid Level",
    category: "Data Science",
    color: "from-rose-500/20 to-rose-600/5",
    badge: "bg-rose-500",
    iconBg: "bg-rose-100 text-rose-600",
    score: 95,
    file: "/templates/data scientist - Entry _ Mid level template.pdf",
    image: "/hero_3d_templates/data scientist - Entry _ Mid level template.png",
    icon: null,
    tags: ["Python", "ML/AI", "Statistics"],
  },
  {
    name: "Frontend Engineer Intern",
    role: "Junior Web Developer",
    level: "Entry Level",
    category: "Student",
    color: "from-amber-500/20 to-amber-600/5",
    badge: "bg-amber-500",
    iconBg: "bg-amber-100 text-amber-600",
    score: 88,
    file: "/templates/student-template-v1.pdf",
    image: "/hero_3d_templates/student-template-v1.png",
    icon: null,
    tags: ["Internship", "Projects", "Academics"],
  },
  {
    name: "Associate Consultant",
    role: "Business Consultant",
    level: "Entry Level",
    category: "Student",
    color: "from-cyan-500/20 to-cyan-600/5",
    badge: "bg-cyan-500",
    iconBg: "bg-cyan-100 text-cyan-600",
    score: 89,
    file: "/templates/student-template-v2.pdf",
    image: "/hero_3d_templates/student-template-v2.png",
    icon: null,
    tags: ["Campus", "Skills", "Leadership"],
  },
  {
    name: "Junior Project Coordinator",
    role: "Management Trainee",
    level: "Entry Level",
    category: "Student",
    color: "from-pink-500/20 to-pink-600/5",
    badge: "bg-pink-500",
    iconBg: "bg-pink-100 text-pink-600",
    score: 91,
    file: "/templates/student-template-v3.pdf",
    image: "/hero_3d_templates/student-template-v3.png",
    icon: null,
    tags: ["Research", "Projects", "GPA"],
  },
]

const categoryIcon: Record<string, React.ReactNode> = {
  "Professional": <Briefcase className="w-5 h-5" />,
  "Finance & Data": <BarChart2 className="w-5 h-5" />,
  "Administration": <Briefcase className="w-5 h-5" />,
  "Engineering": <Code2 className="w-5 h-5" />,
  "Data Science": <BarChart2 className="w-5 h-5" />,
  "Student": <GraduationCap className="w-5 h-5" />,
}

// Triple the list for seamless infinite scroll
const allResumes = [...resumeTemplates, ...resumeTemplates, ...resumeTemplates]

export function ResumeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const speed = 0.6

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed
        const totalWidth = track.scrollWidth / 3
        if (posRef.current >= totalWidth) posRef.current -= totalWidth
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    
    const cardWidth = 320 + 24 // card + gap
    const shift = cardWidth * 2 // Scroll 2 cards at a time
    
    if (direction === 'left') {
      posRef.current -= shift
    } else {
      posRef.current += shift
    }

    // Handle wrapping
    const totalWidth = track.scrollWidth / 3
    if (posRef.current < 0) posRef.current += totalWidth
    if (posRef.current >= totalWidth) posRef.current -= totalWidth
    
    track.style.transform = `translateX(-${posRef.current}px)`
  }

  return (
      <section id="examples" className="py-12 bg-zinc-50 relative overflow-hidden">
      {/* Rich background fills */}
      <div className="absolute inset-0 bg-dot-pattern-lg pointer-events-none" />
      <div className="absolute top-0 left-[-5%] w-[350px] h-[350px] bg-blue-500/[0.05] rounded-full blur-[80px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-teal-500/[0.05] rounded-full blur-[80px] animate-float-slow animation-delay-4000 pointer-events-none" />
      <div className="container px-6 mx-auto mb-12 relative z-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Proven Templates</h2>
          <p className="text-muted-foreground text-lg">See the resumes that got our users hired at top tier companies.</p>
        </div>
      </div>

      {/* Extra top padding so the -top-4 badge is never clipped */}
      <div className="w-full overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none z-10" />

        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-xl flex items-center justify-center text-zinc-600 hover:bg-white hover:text-teal-600 transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-xl flex items-center justify-center text-zinc-600 hover:bg-white hover:text-teal-600 transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          ref={trackRef}
          /* pt-8 gives breathing room for the badge that overflows -top-4 */
          className="flex gap-6 px-6 pb-12 pt-8"
          style={{ width: "max-content" }}
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {allResumes.map((resume, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[320px] h-[520px] rounded-2xl bg-white shadow-xl border border-zinc-200 relative flex-shrink-0 group overflow-hidden"
              style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = "scale(1.06) translateY(-8px)"
                el.style.boxShadow = "0 32px 64px -16px rgba(99,102,241,0.25)"
                el.style.zIndex = "20"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = ""
                el.style.boxShadow = ""
                el.style.zIndex = "1"
              }}
            >
              {/* Image Background Section */}
              <div className="absolute inset-x-0 top-0 h-[65%] overflow-hidden bg-zinc-100">
                <img 
                  src={resume.image} 
                  alt={resume.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              {/* ATS Score Badge - Positioned over the image */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl p-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${resume.badge} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {resume.score}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">ATS MATCH</p>
                  <p className="text-xs font-medium flex items-center gap-1 text-zinc-900"><CheckCircle2 className="w-3 h-3 text-green-500" /> Excellent</p>
                </div>
              </div>

              {/* Content Section - Bottom portion */}
              <div className="absolute inset-x-0 bottom-0 h-[45%] p-6 flex flex-col bg-white border-t border-zinc-100">
                {/* Category icon + label */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`flex items-center justify-center w-7 h-7 rounded-lg ${resume.iconBg} flex-shrink-0`}>
                    {categoryIcon[resume.category]}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{resume.category}</span>
                </div>

                {/* Template info */}
                <h3 className="text-base font-bold text-zinc-900 leading-tight mb-0.5">{resume.name}</h3>
                <p className="text-sm text-zinc-500 mb-2">{resume.role}</p>
                
                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 max-h-[32px] overflow-hidden">
                  {resume.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${resume.iconBg}`}>{tag}</span>
                  ))}
                </div>

                {/* View button */}
                <div className="mt-auto">
                  <a
                    href={resume.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white ${resume.badge} hover:opacity-90 transition-all shadow-md active:scale-95`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4" />
                    View Template
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
