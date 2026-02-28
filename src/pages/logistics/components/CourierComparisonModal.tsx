import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { courierPartners } from "@/data/mockLogistics";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CourierComparisonModal({ open, onOpenChange }: Props) {
    const couriers = courierPartners.filter(c => c.status !== 'down');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
                    <DialogTitle className="text-lg font-bold text-brand-dark">Courier Comparison</DialogTitle>
                    <p className="text-xs text-text-muted mt-0.5">Compare performance metrics across courier partners</p>
                </DialogHeader>

                <div className="px-6 py-4 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/40">
                                <th className="p-3 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Courier</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Avg Days</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">On-Time %</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Cost/Ship</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Today</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">COD</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {couriers.map(c => (
                                <tr key={c.id} className="border-b border-border/20 hover:bg-bg-subtle/30 transition-colors">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-bg-subtle flex items-center justify-center text-sm font-bold text-brand-dark">{c.logo}</div>
                                            <span className="text-sm font-bold text-brand-dark">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <Badge className={`border-transparent text-[10px] ${c.status === 'active' ? 'bg-brand-jade/10 text-brand-jade' : 'bg-brand-saffron/10 text-brand-saffron'}`}>
                                            {c.status}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-bold text-brand-dark">{c.avgDeliveryDays}</span>
                                            <div className="w-12 h-1 bg-bg-subtle rounded-full mt-1"><div className="h-full bg-blue-400 rounded-full" style={{ width: `${Math.max(0, 100 - (c.avgDeliveryDays - 2) * 20)}%` }} /></div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`text-sm font-bold ${c.onTimePercent >= 90 ? 'text-brand-jade' : c.onTimePercent >= 85 ? 'text-brand-saffron' : 'text-semantic-error'}`}>{c.onTimePercent}%</span>
                                            <div className="w-12 h-1 bg-bg-subtle rounded-full mt-1"><div className={`h-full rounded-full ${c.onTimePercent >= 90 ? 'bg-brand-jade' : 'bg-brand-saffron'}`} style={{ width: `${c.onTimePercent}%` }} /></div>
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className="text-sm font-bold text-brand-dark">₹{c.costPerShipment}</span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className="text-sm font-bold text-brand-dark">{c.todayShipments}</span>
                                    </td>
                                    <td className="p-3 text-center">
                                        {c.codAvailable ? <Check className="w-4 h-4 text-brand-jade mx-auto" /> : <span className="text-text-muted/40">—</span>}
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-0.5">
                                            <span className="text-brand-saffron text-xs">★</span>
                                            <span className="text-sm font-bold text-brand-dark">{c.rating}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-border/40 flex justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
