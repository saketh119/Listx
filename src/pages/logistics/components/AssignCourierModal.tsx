import { useState } from "react";
import { Truck, Clock, Calendar, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { courierPartners } from "@/data/mockLogistics";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId?: string;
    onSuccess?: () => void;
}

export function AssignCourierModal({ open, onOpenChange, orderId = 'ORD-2024-0001', onSuccess }: Props) {
    const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
    const [pickupDate, setPickupDate] = useState('');
    const [pickupSlot, setPickupSlot] = useState('');
    const [step, setStep] = useState<'select' | 'schedule'>('select');

    const available = courierPartners.filter(c => c.status !== 'down');
    const slots = ['9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', '6:00 PM - 9:00 PM'];

    const handleAssign = () => {
        onOpenChange(false);
        onSuccess?.();
    };

    const resetAndClose = () => {
        setStep('select');
        setSelectedCourier(null);
        setPickupDate('');
        setPickupSlot('');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={resetAndClose}>
            <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-lake/10 flex items-center justify-center">
                            <Truck className="w-5 h-5 text-brand-lake" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-brand-dark">
                                {step === 'select' ? 'Assign Courier' : 'Schedule Pickup'}
                            </DialogTitle>
                            <p className="text-xs text-text-muted mt-0.5">{orderId}</p>
                        </div>
                    </div>
                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${step === 'select' ? 'bg-brand-lake text-white' : 'bg-brand-jade/10 text-brand-jade'}`}>
                            {step === 'schedule' ? <Check className="w-3 h-3" /> : '1'} Select Courier
                        </div>
                        <div className="w-6 h-px bg-border/60" />
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${step === 'schedule' ? 'bg-brand-lake text-white' : 'bg-bg-subtle text-text-muted'}`}>
                            2 Schedule Pickup
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4 max-h-[50vh] overflow-y-auto">
                    {step === 'select' ? (
                        <div className="space-y-2">
                            {available.map(c => (
                                <button key={c.id} onClick={() => setSelectedCourier(c.id)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedCourier === c.id ? 'border-brand-lake bg-brand-lake/5' : 'border-border/40 hover:border-border'}`}>
                                    <div className="w-10 h-10 rounded-lg bg-bg-subtle flex items-center justify-center text-sm font-bold text-brand-dark">{c.logo}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-brand-dark">{c.name}</span>
                                            <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'active' ? 'bg-brand-jade' : 'bg-brand-saffron'}`} />
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                                            <span><Clock className="w-2.5 h-2.5 inline mr-0.5" />{c.avgDeliveryDays}d</span>
                                            <span>₹{c.costPerShipment}</span>
                                            <span>{c.onTimePercent}% OTD</span>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCourier === c.id ? 'border-brand-lake bg-brand-lake' : 'border-border'}`}>
                                        {selectedCourier === c.id && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Pickup Date</Label>
                                <Input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)}
                                    className="rounded-xl bg-bg-subtle border-transparent h-11" />
                            </div>
                            <div>
                                <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Pickup Time Slot</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {slots.map(s => (
                                        <button key={s} onClick={() => setPickupSlot(s)}
                                            className={`p-2.5 rounded-xl text-xs font-medium text-center transition-colors ${pickupSlot === s ? 'bg-brand-lake text-white' : 'bg-bg-subtle text-text-muted hover:bg-brand-lake/10'}`}>
                                            <Calendar className="w-3 h-3 mx-auto mb-1" />{s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-bg-subtle/50">
                                <p className="text-[11px] text-text-muted"><MapPin className="w-3 h-3 inline mr-1" />Pickup from: Warehouse, Bengaluru, Karnataka</p>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="px-6 py-4 border-t border-border/40 flex-row gap-2">
                    {step === 'select' ? (
                        <>
                            <Button variant="outline" onClick={resetAndClose} className="rounded-xl flex-1">Cancel</Button>
                            <Button disabled={!selectedCourier} onClick={() => setStep('schedule')} className="rounded-xl flex-1 shadow-brand-lake/20">
                                Next: Schedule Pickup
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline" onClick={() => setStep('select')} className="rounded-xl flex-1">Back</Button>
                            <Button disabled={!pickupDate || !pickupSlot} onClick={handleAssign} className="rounded-xl flex-1 shadow-brand-lake/20">
                                <Truck className="w-4 h-4 mr-2" /> Confirm Assignment
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
