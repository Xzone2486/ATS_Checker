import { useState } from 'react';
import { Submission } from '@/hooks/useImprove';
import { StatusBadge } from './StatusBadge';
import { Download, ExternalLink, Activity, Check, X, Flag, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface SubmissionTableProps {
 submissions: Submission[];
 isAdmin?: boolean;
 onApprove?: (id: string) => void;
 onDeny?: (id: string) => void;
 onFlag?: (id: string, reason: string) => void;
 onMarkImproved?: (id: string) => void;
 onRunAts?: (id: string) => void;
}

export function SubmissionTable({ 
 submissions, 
 isAdmin = false,
 onApprove,
 onDeny,
 onFlag,
 onMarkImproved,
 onRunAts
}: SubmissionTableProps) {
 const [currentPage, setCurrentPage] = useState(1);
 const [searchTerm, setSearchTerm] = useState('');
 
 const itemsPerPage = 20;

 const filtered = submissions.filter(s => 
 s.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
 s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
 (isAdmin && s.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
 );

 const totalPages = Math.ceil(filtered.length / itemsPerPage);
 const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

 return (
 <div className="w-full space-y-4">
 <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-zinc-200 ">
 <div className="relative w-72">
 <Search className="w-4 h-4 absolute left-3 top-1/2 -tranzinc-y-1/2 text-zinc-400" />
 <input 
 type="text"
 placeholder="Search candidates..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
 />
 </div>
 <div className="text-sm text-zinc-500">
 Total: {filtered.length} candidates
 </div>
 </div>

 <div className="bg-white/50 border border-zinc-200 rounded-xl overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-xs text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-200 ">
 <tr>
 <th className="px-6 py-4 rounded-tl-xl">Candidate Details</th>
 {isAdmin && <th className="px-6 py-4">Company</th>}
 <th className="px-6 py-4">Submitted At</th>
 <th className="px-6 py-4 text-center">ATS Score</th>
 <th className="px-6 py-4 text-center">Status</th>
 <th className="px-6 py-4 text-center">Improved</th>
 <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
 </tr>
 </thead>
 <tbody>
 {currentData.length > 0 ? currentData.map((sub) => (
 <tr key={sub.id} className="border-b border-zinc-100 hover:bg-zinc-50 :bg-white/5 transition-colors">
 <td className="px-6 py-4">
 <div className="font-semibold text-zinc-900 ">{sub.candidateName}</div>
 <div className="text-zinc-500 text-xs mt-1">{sub.email}</div>
 <div className="text-zinc-500 text-xs mt-0.5">{sub.phone}</div>
 </td>
 {isAdmin && (
 <td className="px-6 py-4 font-medium text-zinc-700 ">
 {sub.companyName}
 </td>
 )}
 <td className="px-6 py-4 text-zinc-600 ">
 {new Date(sub.submittedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' })}
 </td>
 <td className="px-6 py-4 text-center font-medium">
 {sub.atsScore ? (
 <span className={sub.atsScore > 75 ? 'text-green-600 ' : sub.atsScore > 50 ? 'text-amber-600 ' : 'text-red-600 '}>
 {sub.atsScore}
 </span>
 ) : <span className="text-zinc-400">—</span>}
 </td>
 <td className="px-6 py-4 text-center">
 <StatusBadge status={sub.status as any} flaggedAs={sub.flaggedAs} />
 </td>
 <td className="px-6 py-4 text-center">
 {sub.isImproved ? <Check className="w-4 h-4 text-green-500 mx-auto" /> : <span className="text-zinc-400">—</span>}
 </td>
 <td className="px-6 py-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <a href={sub.resumeUrl} target="_blank" rel="noreferrer" title="View Resume" className="p-1.5 hover:bg-zinc-200 :bg-white/10 rounded-md text-zinc-600 transition-colors">
 <ExternalLink className="w-4 h-4" />
 </a>
 
 {!isAdmin && (
 <a href={sub.resumeUrl} download title="Download" className="p-1.5 hover:bg-zinc-200 :bg-white/10 rounded-md text-zinc-600 transition-colors">
 <Download className="w-4 h-4" />
 </a>
 )}
 
 {sub.status === 'pending' && (
 <>
 <button onClick={() => onApprove?.(sub.id)} title="Approve" className="p-1.5 hover:bg-green-100 :bg-green-500/20 text-green-600 rounded-md transition-colors">
 <Check className="w-4 h-4" />
 </button>
 <button onClick={() => onDeny?.(sub.id)} title="Deny" className="p-1.5 hover:bg-red-100 :bg-red-500/20 text-red-600 rounded-md transition-colors">
 <X className="w-4 h-4" />
 </button>
 </>
 )}

 {isAdmin && (
 <>
 <button onClick={() => onRunAts?.(sub.id)} title="Run ATS Scan" disabled={sub.atsScore !== null} className="p-1.5 hover:bg-teal-100 :bg-teal-500/20 text-teal-600 rounded-md transition-colors disabled:opacity-30">
 <Activity className="w-4 h-4" />
 </button>
 <button onClick={() => onFlag?.(sub.id, "Fake Resume")} title="Flag Resume" className="p-1.5 hover:bg-rose-100 :bg-rose-500/20 text-rose-600 rounded-md transition-colors">
 <Flag className="w-4 h-4" />
 </button>
 </>
 )}
 </div>
 </td>
 </tr>
 )) : (
 <tr>
 <td colSpan={isAdmin ? 7 : 6} className="px-6 py-8 text-center text-zinc-500 ">
 No submissions found
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>

 {totalPages > 1 && (
 <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-zinc-200 ">
 <button 
 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
 disabled={currentPage === 1}
 className="p-2 rounded-lg border border-zinc-200 disabled:opacity-50 hover:bg-white :bg-white/5 transition-colors"
 >
 <ChevronLeft className="w-4 h-4" />
 </button>
 <span className="text-sm text-zinc-600 ">
 Page {currentPage} of {totalPages}
 </span>
 <button 
 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
 disabled={currentPage === totalPages}
 className="p-2 rounded-lg border border-zinc-200 disabled:opacity-50 hover:bg-white :bg-white/5 transition-colors"
 >
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 )}
 </div>
 );
}
