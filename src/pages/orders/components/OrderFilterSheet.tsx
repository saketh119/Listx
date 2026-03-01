import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter
} from "@/components/ui/sheet";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const statusOptions = [
    { id: 'new', label: 'New', color: 'bg-indigo-500' },
    { id: 'processing', label: 'Processing', color: 'bg-blue-500' },
    { id: 'packed', label: 'Packed', color: 'bg-cyan-500' },
    { id: 'shipped', label: 'Shipped', color: 'bg-amber-500' },
    { id: 'delivered', label: 'Delivered', color: 'bg-green-500' },
    { id: 'returned', label: 'Returned', color: 'bg-orange-500' },
    { id: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
];

const platformOptions = [
    { id: 'amazon', label: 'Amazon', color: 'bg-amber-500' },
    { id: 'flipkart', label: 'Flipkart', color: 'bg-yellow-500' },
    { id: 'shopify', label: 'Shopify', color: 'bg-green-500' },
    { id: 'ondc', label: 'ONDC', color: 'bg-purple-500' },
];

const paymentOptions = ['Prepaid', 'COD', 'Partial'];
const fulfillmentOptions = ['Platform Fulfilled', 'Self Ship', 'Dropship'];

export function OrderFilterSheet({ open, onOpenChange }: Props) {
    const [statuses, setStatuses] = useState<string[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [payments, setPayments] = useState<string[]>([]);
    const [fulfillments, setFulfillments] = useState<string[]>([]);
    const [courier, setCourier] = useState('All');
    const [valueMin, setValueMin] = useState('');
    const [valueMax, setValueMax] = useState('');
    const [slaRisk, setSlaRisk] = useState(false);

    const toggle = (arr: string[], val: string, setter: (v: string[]) => void) =>
        setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

    const activeCount = [statuses.length > 0, platforms.length > 0, payments.length > 0, fulfillments.length > 0, courier !== 'All', valueMin || valueMax, slaRisk].filter(Boolean).length;

    const clearAll = () => {
        setStatuses([]); setPlatforms([]); setPayments([]); setFulfillments([]);
        setCourier('All'); setValueMin(''); setValueMax(''); setSlaRisk(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-[420px] p-0 flex flex-col bg-white border-l border-border/60">
                <SheetHeader className="px-6 py-4 border-b border-border/40 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-brand-lake" />
                            <SheetTitle className="text-lg font-bold text-brand-dark">Filter Orders</SheetTitle>
                            {activeCount > 0 && <span className="w-5 h-5 rounded-full bg-brand-lake text-white text-[10px] flex items-center justify-center font-bold">{activeCount}</span>}
                        </div>
                        {activeCount > 0 && <button onClick={clearAll} className="text-xs font-medium text-brand-lake hover:underline">Clear All</button>}
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    {/* Order Status */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Order Status</Label>
                        <div className="space-y-2">
                            {statusOptions.map(s => (
                                <label key={s.id} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${statuses.includes(s.id) ? 'bg-brand-lake/5' : 'hover:bg-bg-subtle'}`}>
                                    <input type="checkbox" checked={statuses.includes(s.id)} onChange={() => toggle(statuses, s.id, setStatuses)} className="w-4 h-4 rounded accent-brand-lake" />
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                                    <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Platform */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Platform</Label>
                        <div className="space-y-2">
                            {platformOptions.map(p => (
                                <label key={p.id} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${platforms.includes(p.id) ? 'bg-brand-lake/5' : 'hover:bg-bg-subtle'}`}>
                                    <input type="checkbox" checked={platforms.includes(p.id)} onChange={() => toggle(platforms, p.id, setPlatforms)} className="w-4 h-4 rounded accent-brand-lake" />
                                    <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                                    <span className="text-sm font-medium text-brand-dark">{p.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Payment Type */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Payment Type</Label>
                        <div className="flex flex-wrap gap-2">
                            {paymentOptions.map(p => (
                                <button key={p} onClick={() => toggle(payments, p.toLowerCase(), setPayments)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${payments.includes(p.toLowerCase()) ? 'bg-brand-lake text-white' : 'bg-bg-subtle text-text-muted hover:bg-brand-lake/10'}`}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Fulfillment Type */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Fulfillment Type</Label>
                        <div className="flex flex-wrap gap-2">
                            {fulfillmentOptions.map(f => (
                                <button key={f} onClick={() => toggle(fulfillments, f, setFulfillments)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${fulfillments.includes(f) ? 'bg-brand-lake text-white' : 'bg-bg-subtle text-text-muted hover:bg-brand-lake/10'}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Order Value */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Order Value (₹)</Label>
                        <div className="flex items-center gap-3">
                            <Input type="number" placeholder="Min" value={valueMin} onChange={e => setValueMin(e.target.value)}
                                className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" />
                            <span className="text-text-muted text-sm">—</span>
                            <Input type="number" placeholder="Max" value={valueMax} onChange={e => setValueMax(e.target.value)}
                                className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" />
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* SLA Risk */}
                    <label className="flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-bg-subtle transition-colors">
                        <div>
                            <span className="text-sm font-medium text-brand-dark">Show only SLA at-risk</span>
                            <p className="text-[11px] text-text-muted">Orders near their shipping deadline</p>
                        </div>
                        <div className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${slaRisk ? 'bg-brand-lake' : 'bg-bg-subtle'}`} onClick={() => setSlaRisk(!slaRisk)}>
                            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-sm ${slaRisk ? 'translate-x-5' : 'translate-x-1'}`} />
                        </div>
                    </label>
                </div>

                <SheetFooter className="px-6 py-4 border-t border-border/40 shrink-0 flex-col gap-2">
                    <Button onClick={() => onOpenChange(false)} className="w-full rounded-xl h-11 font-medium shadow-brand-lake/20">
                        Apply Filters
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
