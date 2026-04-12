import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function DosDonts() {
 const dos = [
 "Upload PDF, DOC, or DOCX only",
 "Use your real full name",
 "Ensure your contact details are correct",
 "Keep file size under 5MB",
 "Submit only once"
 ];

 const donts = [
 "Do not upload fake or random files",
 "Do not upload images, ZIPs, or other formats",
 "Do not submit someone else's resume",
 "Do not use a password-protected file",
 "Do not submit multiple times with different emails"
 ];

 const variant = {
 hidden: { opacity: 0, y: 20 },
 visible: (i: number) => ({
 opacity: 1,
 y: 0,
 transition: {
 delay: i * 0.1,
 duration: 0.5,
 },
 }),
 };

 return (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-12">
 {/* DOS */}
 <motion.div 
 custom={1}
 initial="hidden"
 animate="visible"
 variants={variant}
 className="rounded-2xl border border-green-500/20 bg-green-50/50 backdrop-blur-xl p-6"
 >
 <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-green-500" />
 Do's
 </h3>
 <ul className="space-y-3">
 {dos.map((item, idx) => (
 <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700 ">
 <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </motion.div>

 {/* DON'TS */}
 <motion.div 
 custom={2}
 initial="hidden"
 animate="visible"
 variants={variant}
 className="rounded-2xl border border-rose-500/20 bg-rose-50/50 backdrop-blur-xl p-6"
 >
 <h3 className="text-xl font-bold text-rose-700 mb-4 flex items-center gap-2">
 <XCircle className="w-5 h-5 text-rose-500" />
 Don'ts
 </h3>
 <ul className="space-y-3">
 {donts.map((item, idx) => (
 <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700 ">
 <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </motion.div>
 </div>
 );
}
