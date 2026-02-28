import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { returnRequests } from "@/data/mockLogistics";
import type { ReturnRequest } from "@/data/mockLogistics";

const statusCfg: Record<ReturnRequest['status'], { label: string; color: string; bg: string }> = {
    requested: { label: 'Requested', color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
    approved: { label: 'Approved', color: 'text-blue-600', bg: 'bg-blue-500/10' },
    picked_up: { label: 'Picked Up', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    received: { label: 'Received', color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
    refunded: { label: 'Refunded', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    rejected: { label: 'Rejected', color: 'text-semantic-error', bg: 'bg-semantic-error/10' },
};

const reasonLabels: Record<string, string> = {
    damaged: 'Damaged', wrong_item: 'Wrong Item', not_required: 'Not Required',
    quality_issue: 'Quality Issue', late_delivery: 'Late Delivery',
};

export default function ReturnsList() {
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState('all');

    const filtered = returnRequests.filter(r => {
        if (search) {
            const q = search.toLowerCase();
            if (!r.returnId.toLowerCase().includes(q) && !r.orderId.toLowerCase().includes(q) && !r.customerName.toLowerCase().includes(q)) return false;
        }
        if (tab !== 'all' && r.status !== tab) return false;
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/logistics"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Link>
                </Button>
                <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><RotateCcw className="w-7 h-7 text-brand-saffron" /> Returns</h1>
                <p className="text-body-sm text-text-muted mt-1">{returnRequests.length} return requests</p>
            </div>

            <div className="relative mb-5">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input placeholder="Search returns..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-xl bg-bg-subtle border-transparent h-11" />
            </div>

            <Tabs value={tab} onValueChange={setTab} className="mb-5">
                <TabsList className="bg-bg-subtle p-1 rounded-xl w-full justify-start overflow-x-auto">
                    {['all', 'requested', 'approved', 'picked_up', 'received', 'refunded', 'rejected'].map(s => (
                        <TabsTrigger key={s} value={s} className="rounded-lg px-3 py-2 text-sm data-[state=active]:shadow-sm capitalize">{s === 'all' ? 'All' : s.replace('_', ' ')}</TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="space-y-3">
                {filtered.map(ret => {
                    const sc = statusCfg[ret.status];
                    return (
                        <div key={ret.returnId} className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 hover:shadow-md transition-all">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-mono text-sm font-bold text-brand-dark">{ret.returnId}</span>
                                        <Badge className={`${sc.bg} ${sc.color} border-transparent text-[10px]`}>{sc.label}</Badge>
                                        <Badge variant="outline" className="text-[10px] capitalize border-border/40">{ret.platform}</Badge>
                                    </div>
                                    <p className="text-sm font-medium text-brand-dark">{ret.customerName}</p>
                                    <div className="flex gap-3 text-xs text-text-muted mt-1">
                                        <span>Order: <Link to={`/dashboard/orders/${ret.orderId}`} className="text-brand-lake hover:underline">{ret.orderId}</Link></span>
                                        <span>Reason: {reasonLabels[ret.reason]}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {ret.items.map((it, i) => <span key={i} className="text-[10px] bg-bg-subtle px-2 py-0.5 rounded-md">{it.title} ×{it.qty}</span>)}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <Button variant="ghost" size="sm" asChild className="h-8 px-3 text-xs text-brand-lake rounded-lg">
                                        <Link to={`/dashboard/logistics/returns/${ret.returnId}`}><Eye className="w-3.5 h-3.5 mr-1" /> View</Link>
                                    </Button>
                                    {ret.status === 'requested' && (
                                        <div className="flex gap-1.5">
                                            <Button size="sm" className="h-7 px-3 text-[10px] rounded-lg bg-brand-jade text-white">Approve</Button>
                                            <Button size="sm" variant="outline" className="h-7 px-3 text-[10px] rounded-lg border-semantic-error/30 text-semantic-error">Reject</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
