import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeUploadFormProps {
 companyName: string;
 onSubmit: (data: { name: string; email: string; phone: string; file: File }) => Promise<{ success: boolean; error?: string }>;
}

export function ResumeUploadForm({ companyName, onSubmit }: ResumeUploadFormProps) {
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [file, setFile] = useState<File | null>(null);
 
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [success, setSuccess] = useState(false);

 // Dropzone setup
 const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
 setError(null);
 if (fileRejections.length > 0) {
 const error = fileRejections[0].errors[0];
 if (error.code === 'file-too-large') {
 setError('File is too large. Maximum size is 5MB.');
 } else if (error.code === 'file-invalid-type') {
 setError('Invalid file type. Only PDF, DOC, and DOCX are allowed.');
 } else {
 setError(error.message);
 }
 return;
 }
 
 if (acceptedFiles.length > 0) {
 setFile(acceptedFiles[0]);
 }
 }, []);

 const { getRootProps, getInputProps, isDragActive } = useDropzone({
 onDrop,
 accept: {
 'application/pdf': ['.pdf'],
 'application/msword': ['.doc'],
 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
 },
 maxSize: 5242880, // 5MB
 maxFiles: 1,
 });

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!name || !email || !phone || !file) {
 setError('Please fill all fields and upload a resume.');
 return;
 }

 setLoading(true);
 setError(null);

 try {
 const res = await onSubmit({ name, email, phone, file });
 if (res.success) {
 setSuccess(true);
 } else {
 setError(res.error || 'Something went wrong while submitting.');
 }
 } catch (err) {
 setError('An unexpected error occurred. Please try again.');
 } finally {
 setLoading(false);
 }
 };

 if (success) {
 return (
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="w-full max-w-xl mx-auto rounded-3xl border border-white/20 bg-white/60 backdrop-blur-3xl p-10 text-center shadow-2xl"
 >
 <motion.div
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={{ type: "spring", delay: 0.2 }}
 className="w-24 h-24 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg shadow-green-500/30"
 >
 <CheckCircle2 className="w-12 h-12 text-white" />
 </motion.div>
 <h2 className="text-3xl font-bold text-zinc-900 mb-4">Resume Submitted Successfully!</h2>
 <p className="text-zinc-600 text-lg">
 Our team at Inttrvu will review your application and get back to you soon.
 </p>
 </motion.div>
 );
 }

 return (
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="w-full max-w-xl mx-auto rounded-3xl border border-white/10 bg-white/50 backdrop-blur-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
 >
 <h2 className="text-2xl font-bold text-zinc-900 mb-6">Candidate Details</h2>
 
 <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
 {/* Name */}
 <div>
 <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name *</label>
 <input 
 type="text" 
 value={name}
 onChange={(e) => setName(e.target.value)}
 required
 placeholder="John Doe"
 className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-zinc-900 transition-all shadow-sm"
 />
 </div>

 {/* Email */}
 <div>
 <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address *</label>
 <input 
 type="email" 
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 placeholder="john@example.com"
 className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-zinc-900 transition-all shadow-sm"
 />
 </div>

 {/* Phone */}
 <div>
 <label className="block text-sm font-medium text-zinc-700 mb-1">Phone Number *</label>
 <input 
 type="tel" 
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 required
 pattern="^\+?91[6-9][0-9]{9}$"
 title="Please enter a valid 10 digit Indian number. e.g. +91 9876543210"
 placeholder="+91 98765 43210"
 className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-zinc-900 transition-all shadow-sm"
 />
 </div>

 {/* Dropzone */}
 <div>
 <label className="block text-sm font-medium text-zinc-700 mb-1">Resume Upload * (Max 5MB)</label>
 <div 
 {...getRootProps()} 
 className={`mt-1 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
 isDragActive ? 'border-teal-500 bg-teal-500/5' : 'border-zinc-300 hover:border-teal-400 hover:bg-zinc-50 :bg-white/5'
 }`}
 >
 <input {...getInputProps()} />
 {file ? (
 <div className="flex flex-col items-center justify-center gap-3">
 <div className="p-3 bg-green-500/10 rounded-full">
 <FileText className="w-8 h-8 text-green-500" />
 </div>
 <div>
 <p className="text-sm font-medium text-zinc-900 ">{file.name}</p>
 <p className="text-xs text-zinc-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
 </div>
 <button 
 type="button" 
 onClick={(e) => { e.stopPropagation(); setFile(null); }}
 className="mt-2 text-red-500 hover:text-red-600 text-sm font-medium hover:underline flex items-center justify-center gap-1"
 >
 <X className="w-3 h-3" /> Remove File
 </button>
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center gap-3 text-zinc-500">
 <div className="p-4 bg-zinc-100 rounded-full">
 <Upload className="w-8 h-8 opacity-70" />
 </div>
 <p className="text-sm">
 <span className="font-semibold text-teal-600 ">Click to upload</span> or drag and drop
 </p>
 <p className="text-xs opacity-70">
 PDF, DOC, DOCX up to 5MB
 </p>
 </div>
 )}
 </div>
 </div>

 <AnimatePresence>
 {error && (
 <motion.div 
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl flex flex-row items-center gap-3 mt-4"
 >
 <AlertCircle className="w-5 h-5 shrink-0" />
 <span>{error}</span>
 </motion.div>
 )}
 </AnimatePresence>

 <button
 type="submit"
 disabled={loading || !file}
 className="w-full mt-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
 >
 {loading ? (
 <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin"></div>
 ) : (
 'Submit My Resume →'
 )}
 </button>
 </form>
 </motion.div>
 );
}
