import { useState } from "react";
import { RotateCcw, Check, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    returnId: string;
    orderId: string;
    customerName: string;
    reason: string;
    items: { title: string; qty: number; condition: string }[];
    onApprove?: () => void;
    onReject?: (reason: string) => void;
}

const rejectReasons = [
    'Product is non-returnable',
    'Return window expired',
    'Product damaged by customer',
    'Missing original packaging',
    'Other',
];

export function ReturnApprovalModal({ open, onOpenChange, returnId, orderId, customerName, reason, items, onApprove, onReject }: Props) {
    const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [notes, setNotes] = useState('');

    const handleApprove = () => {
        onApprove?.();
        onOpenChange(false);
        reset();
    };

    const handleReject = () => {
        onReject?.(rejectReason);
        onOpenChange(false);
        reset();
    };

    const reset = () => { setAction(null); setRejectReason(''); setNotes(''); };

    return (
        <Dialog open={open} onOpenChange={(v: boolean) => { if (!v) reset(); onOpenChange(v); }}>
            <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-saffron/10 flex items-center justify-center">
                            <RotateCcw className="w-5 h-5 text-brand-saffron" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-brand-dark">Return Approval</DialogTitle>
                            <p className="text-xs text-text-muted mt-0.5">{returnId} • Order {orderId}</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4">
                    {/* Return Summary */}
                    <div className="p-3 rounded-xl bg-bg-subtle/50 mb-4 space-y-2">
                        <div className="flex justify-between text-xs"><span className="text-text-muted">Customer</span><span className="font-medium text-brand-dark">{customerName}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-text-muted">Reason</span><span className="font-medium text-brand-dark capitalize">{reason.replace('_', ' ')}</span></div>
                        <div>
                            <span className="text-xs text-text-muted block mb-1">Items</span>
                            {items.map((item, i) => (
                                <div key={i} className="flex justify-between text-xs">
                                    <span className="text-brand-dark">{item.title} ×{item.qty}</span>
                                    <Badge variant="outline" className="text-[9px] border-border/40">{item.condition}</Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!action ? (
                        /* Action Selection */
                        <div className="space-y-2">
                            <button onClick={() => setAction('approve')}
                                className="w-full flex items-center gap-3 p-4 rounded-xl border border-brand-jade/20 hover:bg-brand-jade/5 transition-colors text-left">
                                <div className="w-10 h-10 rounded-lg bg-brand-jade/10 flex items-center justify-center"><Check className="w-5 h-5 text-brand-jade" /></div>
                                <div><p className="text-sm font-bold text-brand-dark">Approve Return</p><p className="text-[11px] text-text-muted">Schedule reverse pickup from customer</p></div>
                            </button>
                            <button onClick={() => setAction('reject')}
                                className="w-full flex items-center gap-3 p-4 rounded-xl border border-semantic-error/20 hover:bg-semantic-error/5 transition-colors text-left">
                                <div className="w-10 h-10 rounded-lg bg-semantic-error/10 flex items-center justify-center"><XCircle className="w-5 h-5 text-semantic-error" /></div>
                                <div><p className="text-sm font-bold text-brand-dark">Reject Return</p><p className="text-[11px] text-text-muted">Decline with reason — customer will be notified</p></div>
                            </button>
                        </div>
                    ) : action === 'approve' ? (
                        /* Approve Flow */
                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-brand-jade/5 border border-brand-jade/20 flex items-start gap-2">
                                <Check className="w-4 h-4 text-brand-jade shrink-0 mt-0.5" />
                                <div><p className="text-xs font-bold text-brand-jade">Approving Return</p><p className="text-[11px] text-brand-jade/70">A reverse pickup will be scheduled automatically</p></div>
                            </div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider block">Notes (optional)</Label>
                            <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Internal notes..."
                                className="rounded-xl bg-bg-subtle border-transparent min-h-[60px] resize-none text-sm" />
                        </div>
                    ) : (
                        /* Reject Flow */
                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider block">Rejection Reason</Label>
                            {rejectReasons.map(r => (
                                <button key={r} onClick={() => setRejectReason(r)}
                                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-colors ${rejectReason === r ? 'bg-semantic-error/5 text-semantic-error border border-semantic-error/20' : 'hover:bg-bg-subtle text-brand-dark border border-transparent'}`}>
                                    {r}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter className="px-6 py-4 border-t border-border/40 flex-row gap-2">
                    <Button variant="outline" onClick={() => action ? setAction(null) : onOpenChange(false)} className="rounded-xl flex-1">
                        {action ? 'Back' : 'Cancel'}
                    </Button>
                    {action === 'approve' && (
                        <Button onClick={handleApprove} className="rounded-xl flex-1 bg-brand-jade hover:bg-brand-jade/90 text-white">
                            <Check className="w-4 h-4 mr-2" /> Approve
                        </Button>
                    )}
                    {action === 'reject' && (
                        <Button disabled={!rejectReason} onClick={handleReject} className="rounded-xl flex-1 bg-semantic-error hover:bg-semantic-error/90 text-white">
                            <XCircle className="w-4 h-4 mr-2" /> Reject
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
