import { useState } from "react";
import { Zap, Star, Clock, IndianRupee, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { courierPartners } from "@/data/mockLogistics";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orderId?: string;
    destination?: string;
    weight?: number;
    paymentType?: 'cod' | 'prepaid';
}

export function CourierRecommendationModal({ open, onOpenChange, orderId = 'ORD-2024-0001', destination = 'Chennai, Tamil Nadu', weight = 0.8, paymentType = 'prepaid' }: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    const scored = courierPartners
        .filter(c => c.status !== 'down' && (paymentType !== 'cod' || c.codAvailable))
        .map(c => {
            const speedScore = Math.max(0, 100 - (c.avgDeliveryDays - 2) * 20);
            const reliabilityScore = c.onTimePercent;
            const costScore = Math.max(0, 100 - (c.costPerShipment - 40) * 1.5);
            const overall = Math.round(speedScore * 0.3 + reliabilityScore * 0.5 + costScore * 0.2);
            return { ...c, speedScore: Math.round(speedScore), reliabilityScore, costScore: Math.round(costScore), overall };
        })
        .sort((a, b) => b.overall - a.overall);

    const best = scored[0];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-lake/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-brand-lake" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-brand-dark">Smart Courier Recommendation</DialogTitle>
                            <p className="text-xs text-text-muted mt-0.5">{orderId} → {destination} • {weight}kg • {paymentType.toUpperCase()}</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                    {/* AI Pick */}
                    {best && (
                        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-brand-lake/5 to-brand-jade/5 border border-brand-lake/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-brand-lake" />
                                <span className="text-xs font-bold text-brand-lake uppercase tracking-wider">AI Recommended</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-white border border-border/40 flex items-center justify-center text-lg font-bold text-brand-dark shadow-sm">{best.logo}</div>
                                    <div>
                                        <p className="text-sm font-bold text-brand-dark">{best.name}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-text-muted mt-0.5">
                                            <span>{best.avgDeliveryDays}d avg</span><span>•</span><span>{best.onTimePercent}% OTD</span><span>•</span><span>₹{best.costPerShipment}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-brand-jade">{best.overall}</div>
                                    <p className="text-[10px] text-text-muted">score</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* All Options */}
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">All Available Couriers</p>
                    <div className="space-y-2">
                        {scored.map(c => (
                            <button key={c.id} onClick={() => setSelected(c.id)}
                                className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${selected === c.id ? 'border-brand-lake bg-brand-lake/5 shadow-sm' : 'border-border/40 hover:border-border'}`}>
                                <div className="w-9 h-9 rounded-lg bg-bg-subtle flex items-center justify-center text-sm font-bold text-brand-dark">{c.logo}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-brand-dark">{c.name}</span>
                                        {c.status === 'degraded' && <Badge className="bg-brand-saffron/10 text-brand-saffron border-transparent text-[8px]">Degraded</Badge>}
                                        {c.id === best?.id && <Badge className="bg-brand-jade/10 text-brand-jade border-transparent text-[8px]">Best</Badge>}
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] text-text-muted flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{c.avgDeliveryDays}d</span>
                                        <span className="text-[10px] text-text-muted flex items-center gap-0.5"><Star className="w-2.5 h-2.5" />{c.onTimePercent}%</span>
                                        <span className="text-[10px] text-text-muted flex items-center gap-0.5"><IndianRupee className="w-2.5 h-2.5" />₹{c.costPerShipment}</span>
                                        {c.codAvailable && <span className="text-[10px] text-brand-jade">COD ✓</span>}
                                    </div>
                                </div>
                                {/* Score bars */}
                                <div className="flex flex-col gap-1 w-20">
                                    <div className="flex items-center gap-1"><span className="text-[8px] text-text-muted w-6">Spd</span><div className="flex-1 h-1 bg-bg-subtle rounded-full"><div className="h-full bg-blue-400 rounded-full" style={{ width: `${c.speedScore}%` }} /></div></div>
                                    <div className="flex items-center gap-1"><span className="text-[8px] text-text-muted w-6">Rel</span><div className="flex-1 h-1 bg-bg-subtle rounded-full"><div className="h-full bg-brand-jade rounded-full" style={{ width: `${c.reliabilityScore}%` }} /></div></div>
                                    <div className="flex items-center gap-1"><span className="text-[8px] text-text-muted w-6">Cost</span><div className="flex-1 h-1 bg-bg-subtle rounded-full"><div className="h-full bg-brand-saffron rounded-full" style={{ width: `${c.costScore}%` }} /></div></div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-lg font-bold text-brand-dark">{c.overall}</span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === c.id ? 'border-brand-lake bg-brand-lake' : 'border-border'}`}>
                                    {selected === c.id && <Check className="w-3 h-3 text-white" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t border-border/40 flex-row gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl flex-1">Cancel</Button>
                    <Button disabled={!selected} onClick={() => onOpenChange(false)} className="rounded-xl flex-1 shadow-brand-lake/20">
                        <Truck className="w-4 h-4 mr-2" /> Assign Courier
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
