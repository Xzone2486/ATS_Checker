import { Company } from '@/hooks/useImprove';
import { generateSlug } from '@/utils/improveHelpers';
import { Copy, Plus, Power, PowerOff, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CompanyManagerProps {
 companies: Company[];
}

export function CompanyManager({ companies }: CompanyManagerProps) {
 const [showAdd, setShowAdd] = useState(false);
 const [newCompany, setNewCompany] = useState({ name: '', email: '' });

 const handleCopyLink = (slug: string) => {
 const url = `${window.location.origin}/improve/${slug}`;
 navigator.clipboard.writeText(url);
 toast.success("Upload link copied to clipboard");
 };

 return (
 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <h2 className="text-xl font-bold text-zinc-900 ">Registered Companies</h2>
 <button 
 onClick={() => setShowAdd(!showAdd)}
 className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors text-sm font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
 >
 <Plus className="w-4 h-4" />
 Add New Company
 </button>
 </div>

 {showAdd && (
 <div className="p-6 bg-white/50 border border-zinc-200 rounded-2xl backdrop-blur-xl">
 <h3 className="text-lg font-medium mb-4">Add Company</h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-zinc-700 mb-1">Company Name</label>
 <input 
 type="text" 
 value={newCompany.name}
 onChange={e => setNewCompany(prev => ({ ...prev, name: e.target.value }))}
 className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
 placeholder="Ex. Google"
 />
 {newCompany.name && (
 <p className="mt-2 text-xs text-zinc-500">
 Preview URL: <span className="font-mono text-teal-500">/improve/{generateSlug(newCompany.name)}</span>
 </p>
 )}
 </div>
 <div>
 <label className="block text-sm font-medium text-zinc-700 mb-1">Contact Email</label>
 <input 
 type="email" 
 value={newCompany.email}
 onChange={e => setNewCompany(prev => ({ ...prev, email: e.target.value }))}
 className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
 placeholder="hr@google.com"
 />
 </div>
 </div>
 <div className="mt-4 flex justify-end gap-2">
 <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 :bg-white/5 rounded-lg transition-colors">Cancel</button>
 <button onClick={() => {
 toast.success("Company added successfully");
 setShowAdd(false);
 }} className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:opacity-90 transition-opacity">
 Save Company
 </button>
 </div>
 </div>
 )}

 <div className="bg-white/50 border border-zinc-200 rounded-xl overflow-x-auto text-sm">
 <table className="w-full text-left">
 <thead className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-500 uppercase">
 <tr>
 <th className="px-6 py-4">Company Name</th>
 <th className="px-6 py-4">Slug</th>
 <th className="px-6 py-4">Created At</th>
 <th className="px-6 py-4">Status</th>
 <th className="px-6 py-4 text-right">Actions</th>
 </tr>
 </thead>
 <tbody>
 {companies.map(company => (
 <tr key={company.id} className="border-b border-zinc-100 ">
 <td className="px-6 py-4 font-medium">{company.name}</td>
 <td className="px-6 py-4 font-mono text-xs text-zinc-500 ">{company.slug}</td>
 <td className="px-6 py-4 text-zinc-600 ">
 {new Date(company.createdAt).toLocaleDateString()}
 </td>
 <td className="px-6 py-4">
 <span className={`inline-flex px-2 py-1 text-xs rounded-full ${company.isActive ? 'bg-green-100 text-green-700 ' : 'bg-zinc-100 text-zinc-700 '}`}>
 {company.isActive ? 'Active' : 'Inactive'}
 </span>
 </td>
 <td className="px-6 py-4 text-right">
 <div className="flex justify-end gap-2 text-zinc-500">
 <button onClick={() => handleCopyLink(company.slug)} title="Copy Upload Link" className="p-1.5 hover:bg-zinc-100 :bg-white/10 hover:text-zinc-900 :text-white rounded-md">
 <Copy className="w-4 h-4" />
 </button>
 <button title={company.isActive ? "Deactivate" : "Activate"} className={`p-1.5 rounded-md hover:bg-zinc-100 :bg-white/10 ${company.isActive ? 'hover:text-amber-500' : 'hover:text-green-500'}`}>
 {company.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
 </button>
 <button title="Delete" className="p-1.5 hover:bg-red-100 :bg-red-500/20 hover:text-red-500 rounded-md">
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );
}
