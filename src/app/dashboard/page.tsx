import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner"
import { StatsRow } from "@/components/dashboard/StatsRow"
import { ResumeTable } from "@/components/dashboard/ResumeTable"
import { AtsScoreChart } from "@/components/dashboard/AtsScoreChart"
import { Button } from "@/components/ui/button"
import { UploadCloud, FileEdit } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <WelcomeBanner />
      <StatsRow />

      {/* Quick Actions & Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        
        {/* Actions (1/3 width) */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* Upload – teal tint */}
          <div className="rounded-2xl p-6 border-2 border-dashed border-teal-300/60 bg-teal-50/60 backdrop-blur-sm hover:border-teal-400/80 hover:bg-teal-50/80 transition-all flex flex-col items-center justify-center text-center group cursor-pointer h-48 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <UploadCloud className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-bold mb-1 text-teal-900">Upload Resume</h3>
            <p className="text-xs text-teal-700/70">PDF, DOCX up to 5MB</p>
          </div>

          {/* AI Builder – blue/pink tint */}
          <div className="rounded-2xl p-6 border border-zinc-200/70 bg-zinc-50/40 backdrop-blur-sm flex flex-col items-center justify-center text-center h-48 shadow-sm opacity-70">
            <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4 shadow-sm opacity-50">
              <FileEdit className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="font-bold mb-1 text-zinc-700">AI Builder</h3>
            <p className="text-xs text-zinc-500 font-semibold px-2 py-1 bg-zinc-100 rounded border border-zinc-200 uppercase tracking-widest mt-1">Coming Soon</p>
          </div>
        </div>

        {/* ATS Chart – rose/pink tint */}
        <div className="lg:col-span-2 rounded-2xl p-6 border border-rose-200/60 bg-rose-50/50 backdrop-blur-sm h-full min-h-[400px] shadow-sm">
          <h3 className="font-bold mb-6 text-rose-900">ATS Score Trend</h3>
          <div className="w-full h-[300px] flex items-center justify-center text-muted-foreground text-sm border border-rose-100 rounded-xl bg-white/70 p-4">
            <AtsScoreChart />
          </div>
        </div>
        
      </div>

      {/* Recent Resumes – sky/blue tint */}
      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4 text-sky-900">Recent Resumes</h3>
        <div className="w-full border border-sky-200/60 rounded-2xl bg-sky-50/50 backdrop-blur-sm overflow-hidden shadow-sm">
           <ResumeTable />
        </div>
      </div>
      
    </div>
  )
}
