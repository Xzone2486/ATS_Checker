"use client"

import { MoreVertical, Edit2, Copy, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

const resumes = [
  { id: 1, name: "My Resume - v1.pdf", date: "2 mins ago", score: 94, status: "Optimized" },
  { id: 2, name: "Tech Resume 2024.pdf", date: "2 days ago", score: 88, status: "Needs Work" },
  { id: 3, name: "Draft_Resume.pdf", date: "1 week ago", score: 45, status: "Draft" },
  { id: 4, name: "Data_Science_CV.pdf", date: "2 weeks ago", score: 76, status: "Good" },
]

export function ResumeTable() {
  return (
    <div className="w-full overflow-x-auto h-full hide-scrollbar">
      <table className="w-full text-sm text-left relative">
        <thead className="text-xs text-muted-foreground uppercase bg-zinc-50 dark:bg-zinc-900/50 border-b border-border sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium">Document Name</th>
            <th scope="col" className="px-6 py-4 font-medium hidden sm:table-cell">Last Scanned</th>
            <th scope="col" className="px-6 py-4 font-medium">ATS Match</th>
            <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id} className="bg-card hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 border-b border-border transition-colors group">
              <td className="px-6 py-4 font-medium text-foreground flex items-center gap-3">
                <FileIcon />
                {resume.name}
              </td>
              <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">
                {resume.date}
              </td>
              <td className="px-6 py-4">
                <ScoreBadge score={resume.score} status={resume.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-teal-600">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FileIcon() {
  return (
    <div className="w-8 h-8 rounded bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 flex items-center justify-center shrink-0">
      <div className="w-3 h-4 border-[1.5px] border-teal-500 rounded-sm relative">
        <div className="absolute top-[2px] right-[2px] w-[3px] h-[3px] bg-teal-500 rounded-[1px]" />
      </div>
    </div>
  )
}

function ScoreBadge({ score, status }: { score: number, status: string }) {
  let colorClass = "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30"
  
  if (score < 50) {
    colorClass = "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30"
  } else if (score < 80) {
    colorClass = "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30"
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {score}% <span className="opacity-70 font-medium ml-1 hidden lg:inline-block">• {status}</span>
    </div>
  )
}
