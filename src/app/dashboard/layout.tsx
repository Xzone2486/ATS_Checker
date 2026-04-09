import { Header } from "@/components/ui/header-1"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Colorful blob palette – mirrors the reference image */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Top-left: soft orange/peach blob */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-100 opacity-60 blur-3xl animate-blob" />
        {/* Top-right: pink/rose blob */}
        <div className="absolute -top-20 right-0 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-pink-200 via-rose-100 to-fuchsia-100 opacity-55 blur-3xl animate-blob animation-delay-2000" />
        {/* Center: soft teal/cyan blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[560px] h-[400px] rounded-full bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 opacity-40 blur-3xl animate-blob animation-delay-4000" />
        {/* Bottom-left: lilac/blue blob */}
        <div className="absolute bottom-0 -left-24 w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-blue-200 via-cyan-100 to-teal-100 opacity-50 blur-3xl animate-blob animation-delay-6000" />
        {/* Bottom-right: blue blob */}
        <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-blue-200 via-sky-100 to-cyan-100 opacity-45 blur-3xl animate-blob animation-delay-2000" />
      </div>

      <Header />
      <main className="flex-1 px-6 py-8 pt-24 overflow-x-hidden relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
