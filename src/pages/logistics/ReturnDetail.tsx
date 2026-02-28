import { Link, useParams } from "react-router-dom";
import { ArrowLeft, RotateCcw, Package, Clock, Check, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { returnRequests } from "@/data/mockLogistics";

const statusCfg: Record<string, { label: string; color: string; bg: string }> = {
    requested: { label: 'Requested', color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
    approved: { label: 'Approved', color: 'text-blue-600', bg: 'bg-blue-500/10' },
    picked_up: { label: 'Picked Up', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    received: { label: 'Received', color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
    refunded: { label: 'Refunded', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    rejected: { label: 'Rejected', color: 'text-semantic-error', bg: 'bg-semantic-error/10' },
};

const reasonLabels: Record<string, string> = {
    damaged: 'Damaged Product', wrong_item: 'Wrong Item Received',
    not_required: 'No Longer Required', quality_issue: 'Quality Issue', late_delivery: 'Late Delivery',
};

export default function ReturnDetail() {
    const { id } = useParams<{ id: string }>();
    const ret = returnRequests.find(r => r.returnId === id);

    if (!ret) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Return Not Found</h2>
                <Button asChild className="rounded-xl"><Link to="/dashboard/logistics/returns">← Back</Link></Button>
            </div>
        );
    }

    const sc = statusCfg[ret.status];

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/logistics/returns"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Returns</Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Header */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <RotateCcw className="w-5 h-5 text-brand-saffron" />
                                    <h1 className="text-xl font-bold text-brand-dark font-mono">{ret.returnId}</h1>
                                </div>
                                <p className="text-xs text-text-muted">Order: <Link to={`/dashboard/orders/${ret.orderId}`} className="text-brand-lake hover:underline">{ret.orderId}</Link></p>
                            </div>
                            <Badge className={`${sc.bg} ${sc.color} border-transparent text-xs px-3 py-1`}>{sc.label}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><span className="text-[11px] text-text-muted uppercase block mb-1">Customer</span><span className="text-sm font-medium">{ret.customerName}</span></div>
                            <div><span className="text-[11px] text-text-muted uppercase block mb-1">Platform</span><span className="text-sm font-medium capitalize">{ret.platform}</span></div>
                            <div><span className="text-[11px] text-text-muted uppercase block mb-1">Reason</span><span className="text-sm font-medium">{reasonLabels[ret.reason]}</span></div>
                            <div><span className="text-[11px] text-text-muted uppercase block mb-1">Requested</span><span className="text-sm font-medium">{new Date(ret.requestedDate).toLocaleDateString('en-IN')}</span></div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-3">Customer Description</h3>
                        <p className="text-sm text-text-muted leading-relaxed">{ret.description}</p>
                    </div>

                    {/* Items */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-3 flex items-center gap-2"><Package className="w-4 h-4 text-brand-lake" /> Return Items</h3>
                        {ret.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-bg-subtle/30">
                                <div className="flex-1"><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-text-muted font-mono">{item.sku}</p></div>
                                <div className="text-right"><p className="text-xs text-text-muted">Qty: {item.qty}</p><Badge variant="outline" className="text-[10px] border-border/40">{item.condition}</Badge></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-5">
                    {/* Timeline */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-brand-lake" /> Timeline</h3>
                        <div className="space-y-0">
                            {[...ret.timeline].reverse().map((ev, i) => (
                                <div key={i} className="flex gap-3 pb-4 last:pb-0">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${i === 0 ? 'bg-brand-lake/10 text-brand-lake' : 'bg-bg-subtle text-text-muted'}`}>
                                            {i === 0 ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        </div>
                                        {i < ret.timeline.length - 1 && <div className="w-px flex-1 bg-border/40 mt-1" />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-brand-dark">{ev.event}</p>
                                        <p className="text-[10px] text-text-muted">{new Date(ev.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} • {ev.actor}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4">Actions</h3>
                        <div className="space-y-2">
                            {ret.status === 'requested' && <Button className="w-full rounded-xl bg-brand-jade hover:bg-brand-jade/90">Approve Return</Button>}
                            {ret.status === 'approved' && <Button className="w-full rounded-xl"><Truck className="w-4 h-4 mr-2" /> Schedule Pickup</Button>}
                            {ret.status === 'received' && <Button className="w-full rounded-xl bg-brand-jade hover:bg-brand-jade/90">Issue Refund</Button>}
                            {ret.status === 'requested' && <Button variant="outline" className="w-full rounded-xl border-semantic-error/30 text-semantic-error">Reject Return</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
