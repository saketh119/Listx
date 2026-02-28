import { Check, Truck, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Dialog, DialogContent
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courierName: string;
    awb: string;
    orderId: string;
    pickupDate?: string;
    pickupSlot?: string;
}

export function CourierBookingSuccessModal({ open, onOpenChange, courierName, awb, orderId, pickupDate, pickupSlot }: Props) {
    const [copied, setCopied] = useState(false);

    const copyAwb = () => {
        navigator.clipboard.writeText(awb);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden text-center">
                <div className="pt-8 pb-6 px-6">
                    {/* Success Animation */}
                    <div className="w-20 h-20 rounded-full bg-brand-jade/10 flex items-center justify-center mx-auto mb-5 animate-in zoom-in-50 duration-500">
                        <div className="w-14 h-14 rounded-full bg-brand-jade/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-brand-jade" />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-brand-dark mb-1">Courier Booked!</h2>
                    <p className="text-sm text-text-muted mb-5">Your shipment has been successfully booked</p>

                    {/* Details Card */}
                    <div className="bg-bg-subtle/50 rounded-xl p-4 text-left space-y-2.5 mb-5">
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted">Order</span>
                            <span className="font-bold text-brand-dark font-mono">{orderId}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted">Courier</span>
                            <span className="font-bold text-brand-dark flex items-center gap-1"><Truck className="w-3 h-3" />{courierName}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-text-muted">AWB</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-brand-dark">{awb}</span>
                                <button onClick={copyAwb} className="text-text-muted hover:text-brand-lake">
                                    {copied ? <Check className="w-3 h-3 text-brand-jade" /> : <Copy className="w-3 h-3" />}
                                </button>
                            </div>
                        </div>
                        {pickupDate && (
                            <div className="flex justify-between text-xs">
                                <span className="text-text-muted">Pickup</span>
                                <span className="font-medium text-brand-dark">{pickupDate}{pickupSlot ? ` • ${pickupSlot}` : ''}</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <Button onClick={() => onOpenChange(false)} className="w-full rounded-xl shadow-brand-lake/20 font-medium">
                            Done
                        </Button>
                        <Button variant="ghost" className="w-full rounded-xl text-xs text-brand-lake">
                            <ExternalLink className="w-3 h-3 mr-1.5" /> Track on Courier Website
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
