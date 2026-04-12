import { CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
 return twMerge(clsx(inputs));
}

export type StatusType = 'pending' | 'approved' | 'denied';

interface StatusBadgeProps {
 status: StatusType;
 flaggedAs?: string | null;
}

export function StatusBadge({ status, flaggedAs }: StatusBadgeProps) {
 if (flaggedAs) {
 return (
 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 ">
 <AlertTriangle className="w-3.5 h-3.5" />
 {flaggedAs}
 </span>
 );
 }

 const styles = {
 pending: "bg-amber-100 text-amber-700 border-amber-200 ",
 approved: "bg-green-100 text-green-700 border-green-200 ",
 denied: "bg-rose-100 text-rose-700 border-rose-200 ",
 };

 const icons = {
 pending: <Clock className="w-3.5 h-3.5" />,
 approved: <CheckCircle2 className="w-3.5 h-3.5" />,
 denied: <XCircle className="w-3.5 h-3.5" />,
 };

 const labels = {
 pending: 'Pending',
 approved: 'Approved',
 denied: 'Denied',
 };

 return (
 <span className={cn(
 "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
 styles[status] || styles.pending
 )}>
 {icons[status] || icons.pending}
 {labels[status] || 'Unknown'}
 </span>
 );
}
