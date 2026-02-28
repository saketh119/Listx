import { Link } from "react-router-dom";
import { ArrowLeft, Truck, Download, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const courierPerformance = [
    { name: 'Delhivery', delivered: 420, total: 456, onTime: 92, avgDays: 3.2, rating: 4.5 },
    { name: 'Blue Dart', delivered: 290, total: 312, onTime: 88, avgDays: 2.8, rating: 4.3 },
    { name: 'Ekart', delivered: 165, total: 189, onTime: 78, avgDays: 4.1, rating: 3.9 },
];

export default function LogisticsReport() {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/analytics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Analytics</Link>
            </Button>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><Truck className="w-7 h-7 text-brand-lake" /> Logistics Report</h1>
                    <p className="text-body-sm text-text-muted mt-1">Delivery performance and courier comparison</p>
                </div>
                <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium"><Download className="w-4 h-4 mr-2" /> Export</Button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-dark">957</p><p className="text-[10px] text-text-muted">Total Shipments</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-jade/30 shadow-sm p-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-jade mb-1" />
                    <p className="text-2xl font-bold text-brand-jade">875</p><p className="text-[10px] text-text-muted">Delivered</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-lake/30 shadow-sm p-4">
                    <Clock className="w-5 h-5 text-brand-lake mb-1" />
                    <p className="text-2xl font-bold text-brand-lake">58</p><p className="text-[10px] text-text-muted">In Transit</p>
                </div>
                <div className="bg-white rounded-2xl border border-semantic-error/30 shadow-sm p-4">
                    <XCircle className="w-5 h-5 text-semantic-error mb-1" />
                    <p className="text-2xl font-bold text-semantic-error">24</p><p className="text-[10px] text-text-muted">Failed</p>
                </div>
            </div>

            {/* Courier Comparison */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden mb-6">
                <div className="p-6 pb-0"><h3 className="text-sm font-bold text-brand-dark mb-4">Courier Performance Comparison</h3></div>
                <table className="w-full">
                    <thead><tr className="border-b border-border/40">
                        <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase">Courier</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase">Delivered</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase">On Time %</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase">Avg Days</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase">Rating</th>
                    </tr></thead>
                    <tbody>
                        {courierPerformance.map(c => (
                            <tr key={c.name} className="border-b border-border/20 hover:bg-bg-subtle/30">
                                <td className="p-4 text-sm font-medium text-brand-dark">{c.name}</td>
                                <td className="p-4 text-center text-sm text-brand-dark">{c.delivered}/{c.total}</td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-16 h-2 bg-bg-subtle rounded-full"><div className={`h-full rounded-full ${c.onTime >= 90 ? 'bg-brand-jade' : c.onTime >= 80 ? 'bg-brand-saffron' : 'bg-semantic-error'}`} style={{ width: `${c.onTime}%` }} /></div>
                                        <span className={`text-xs font-bold ${c.onTime >= 90 ? 'text-brand-jade' : c.onTime >= 80 ? 'text-brand-saffron' : 'text-semantic-error'}`}>{c.onTime}%</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center text-sm text-brand-dark">{c.avgDays}d</td>
                                <td className="p-4 text-center"><Badge className="bg-brand-saffron/10 text-brand-saffron border-transparent text-xs">⭐ {c.rating}</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delivery Timeline */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                <h3 className="text-sm font-bold text-brand-dark mb-4">Delivery Time Distribution</h3>
                <div className="grid grid-cols-5 gap-2">
                    {[
                        { label: '1 day', count: 120, pct: 14 },
                        { label: '2 days', count: 280, pct: 32 },
                        { label: '3 days', count: 310, pct: 35 },
                        { label: '4-5 days', count: 130, pct: 15 },
                        { label: '5+ days', count: 35, pct: 4 },
                    ].map(d => (
                        <div key={d.label} className="text-center">
                            <div className="h-24 flex items-end justify-center mb-1">
                                <div className="w-10 rounded-t-lg bg-gradient-to-t from-brand-lake/50 to-brand-lake/20" style={{ height: `${(d.pct / 35) * 80}px` }} />
                            </div>
                            <p className="text-xs font-bold text-brand-dark">{d.pct}%</p>
                            <p className="text-[10px] text-text-muted">{d.label}</p>
                            <p className="text-[9px] text-text-muted">{d.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
