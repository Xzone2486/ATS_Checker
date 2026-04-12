import { Submission } from '@/hooks/useImprove';
import { useTheme } from 'next-themes';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

interface ImproveChartsProps {
 submissions: Submission[];
}

export function ImproveCharts({ submissions }: ImproveChartsProps) {
 const { theme } = useTheme();
 const isDark = theme === 'dark';

 const textColor = isDark ? '#94a3b8' : '#64748b';
 const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

 // 1. Pie Chart Data (Status)
 const statusCounts = submissions.reduce((acc, sub) => {
 acc[sub.status] = (acc[sub.status] || 0) + 1;
 return acc;
 }, {} as Record<string, number>);

 const pieData = [
 { name: 'Pending', value: statusCounts['pending'] || 0, color: '#f59e0b' },
 { name: 'Approved', value: statusCounts['approved'] || 0, color: '#10b981' },
 { name: 'Denied', value: statusCounts['denied'] || 0, color: '#f43f5e' },
 ].filter(d => d.value > 0);

 // 2. ATS Score Distribution (Bar)
 const scoreBuckets = { '0-25': 0, '26-50': 0, '51-75': 0, '76-100': 0 };
 submissions.forEach(sub => {
 if (sub.atsScore === null) return;
 if (sub.atsScore <= 25) scoreBuckets['0-25']++;
 else if (sub.atsScore <= 50) scoreBuckets['26-50']++;
 else if (sub.atsScore <= 75) scoreBuckets['51-75']++;
 else scoreBuckets['76-100']++;
 });
 const scoreData = Object.keys(scoreBuckets).map(key => ({
 name: key,
 count: scoreBuckets[key as keyof typeof scoreBuckets]
 }));

 // 3. Daily Submissions (Line)
 // Get last 7 days including today
 const last7DaysData = [...Array(7)].map((_, i) => {
 const d = new Date();
 d.setDate(d.getDate() - (6 - i));
 const dateStr = d.toISOString().split('T')[0];
 
 const count = submissions.filter(s => s.submittedAt.startsWith(dateStr)).length;
 
 return {
 date: d.toLocaleDateString('en-US', { weekday: 'short' }),
 count
 };
 });

 return (
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 
 {/* Status Breakdown */}
 <div className="bg-white/50 p-6 rounded-2xl border border-zinc-200 backdrop-blur-xl">
 <h3 className="text-lg font-bold text-zinc-900 mb-6">Status Breakdown</h3>
 <div className="h-64">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie
 data={pieData}
 cx="50%"
 cy="50%"
 innerRadius={60}
 outerRadius={80}
 paddingAngle={5}
 dataKey="value"
 >
 {pieData.map((entry, index) => (
 <Cell key={`cell-${index}`} fill={entry.color} />
 ))}
 </Pie>
 <Tooltip 
 contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 itemStyle={{ color: isDark ? '#fff' : '#000' }}
 />
 </PieChart>
 </ResponsiveContainer>
 </div>
 <div className="flex justify-center gap-4 mt-4 text-sm">
 {pieData.map(d => (
 <div key={d.name} className="flex items-center gap-2">
 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
 <span className="text-zinc-600 ">{d.name}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Daily Submission Trend */}
 <div className="bg-white/50 p-6 rounded-2xl border border-zinc-200 backdrop-blur-xl">
 <h3 className="text-lg font-bold text-zinc-900 mb-6">Submission Trend (Last 7 Days)</h3>
 <div className="h-64">
 <ResponsiveContainer width="100%" height="100%">
 <LineChart data={last7DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
 <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
 <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
 <Tooltip 
 contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 />
 <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
 </LineChart>
 </ResponsiveContainer>
 </div>
 </div>

 {/* ATS Score Distribution */}
 <div className="bg-white/50 p-6 rounded-2xl border border-zinc-200 backdrop-blur-xl lg:col-span-2">
 <h3 className="text-lg font-bold text-zinc-900 mb-6">ATS Score Distribution</h3>
 <div className="h-64">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={scoreData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
 <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
 <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
 <Tooltip
 cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} 
 contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 />
 <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>

 </div>
 );
}
