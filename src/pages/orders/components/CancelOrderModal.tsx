import { useState } from "react";
import { XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId: string;
    orderTotal: number;
    onConfirm?: (reason: string) => void;
}

const reasons = [
    'Customer requested cancellation',
    'Out of stock',
    'Pricing error',
    'Duplicate order',
    'Fraudulent order',
    'Other',
];

export function CancelOrderModal({ open, onOpenChange, orderId, orderTotal, onConfirm }: Props) {
    const [selectedReason, setSelectedReason] = useState('');
    const [notes, setNotes] = useState('');

    const handleConfirm = () => {
        onConfirm?.(selectedReason);
        onOpenChange(false);
        setSelectedReason('');
        setNotes('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-semantic-error/10 flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-semantic-error" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-brand-dark">Cancel Order</DialogTitle>
                            <p className="text-xs text-text-muted mt-0.5">{orderId} • ₹{orderTotal.toLocaleString()}</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4">
                    <div className="p-3 rounded-xl bg-semantic-error/5 border border-semantic-error/20 mb-4">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-semantic-error shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-semantic-error">This action cannot be undone</p>
                                <p className="text-[11px] text-semantic-error/70">The customer will be notified. If prepaid, a refund will be initiated.</p>
                            </div>
                        </div>
                    </div>

                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Cancellation Reason</Label>
                    <div className="space-y-1.5 mb-4">
                        {reasons.map(r => (
                            <button key={r} onClick={() => setSelectedReason(r)}
                                className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-colors ${selectedReason === r ? 'bg-semantic-error/5 text-semantic-error border border-semantic-error/20' : 'hover:bg-bg-subtle text-brand-dark border border-transparent'}`}>
                                {r}
                            </button>
                        ))}
                    </div>

                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Additional Notes (optional)</Label>
                    <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add any context..."
                        className="rounded-xl bg-bg-subtle border-transparent min-h-[60px] resize-none text-sm" />
                </div>

                <DialogFooter className="px-6 py-4 border-t border-border/40 flex-row gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl flex-1">Keep Order</Button>
                    <Button disabled={!selectedReason} onClick={handleConfirm}
                        className="rounded-xl flex-1 bg-semantic-error hover:bg-semantic-error/90 text-white">
                        <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
