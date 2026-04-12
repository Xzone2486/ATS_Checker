import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatsCardProps {
 title: string;
 value: string | number;
 icon: ReactNode;
 delay?: number;
}

export function StatsCard({ title, value, icon, delay = 0 }: StatsCardProps) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay }}
 className="relative overflow-hidden group rounded-2xl border border-white/10 bg-white/50 backdrop-blur-xl p-5 hover:shadow-xl transition-all duration-300"
 >
 <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
 <div className="flex items-start justify-between relative z-10">
 <div className="flex flex-col justify-between min-h-[72px]">
 <p className="text-xs font-medium text-zinc-500 leading-tight">{title}</p>
 <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mt-auto">{value}</h3>
 </div>
 <div className="p-2.5 bg-teal-500/10 rounded-xl text-teal-600 shrink-0">
 {icon}
 </div>
 </div>
 </motion.div>
 );
}
