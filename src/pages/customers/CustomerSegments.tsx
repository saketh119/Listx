import { Link } from "react-router-dom";
import { ArrowLeft, Users, Crown, Heart, UserCheck, AlertTriangle, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockCustomers, customerSegments } from "@/data/mockCustomers";

const segIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    vip: Crown, loyal: Heart, regular: UserCheck, at_risk: AlertTriangle, dormant: UserX,
};

export default function CustomerSegments() {
    return (
        <div className="max-w-5xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/customers"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Customers</Link>
            </Button>
            <div className="mb-6">
                <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><Users className="w-7 h-7 text-brand-lake" /> Customer Segments</h1>
                <p className="text-body-sm text-text-muted mt-1">RFM-based segmentation for targeted marketing</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(customerSegments).map(([key, seg]) => {
                    const customers = mockCustomers.filter(c => c.segment === key);
                    const SegIcon = segIcons[key];
                    const totalSpent = customers.reduce((s, c) => s + c.totalSpent, 0);
                    const avgOrders = customers.length ? Math.round(customers.reduce((s, c) => s + c.totalOrders, 0) / customers.length) : 0;

                    return (
                        <div key={key} className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-11 h-11 rounded-xl ${seg.bg} flex items-center justify-center`}>
                                    <SegIcon className={`w-5 h-5 ${seg.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-brand-dark">{seg.label}</h3>
                                    <p className="text-[10px] text-text-muted">{seg.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="p-2 rounded-lg bg-bg-subtle/50 text-center">
                                    <p className="text-lg font-bold text-brand-dark">{customers.length}</p>
                                    <p className="text-[9px] text-text-muted">Customers</p>
                                </div>
                                <div className="p-2 rounded-lg bg-bg-subtle/50 text-center">
                                    <p className="text-lg font-bold text-brand-dark">{avgOrders}</p>
                                    <p className="text-[9px] text-text-muted">Avg. Orders</p>
                                </div>
                                <div className="p-2 rounded-lg bg-bg-subtle/50 text-center">
                                    <p className="text-sm font-bold text-brand-dark">₹{(totalSpent / 1000).toFixed(0)}K</p>
                                    <p className="text-[9px] text-text-muted">Total Rev.</p>
                                </div>
                            </div>

                            {/* Customer Avatars */}
                            <div className="flex items-center -space-x-2 mb-3">
                                {customers.slice(0, 4).map(c => (
                                    <div key={c.id} className="w-7 h-7 rounded-full bg-brand-lake/10 border-2 border-white flex items-center justify-center text-[9px] font-bold text-brand-lake">{c.avatar}</div>
                                ))}
                                {customers.length > 4 && <div className="w-7 h-7 rounded-full bg-bg-subtle border-2 border-white flex items-center justify-center text-[9px] font-bold text-text-muted">+{customers.length - 4}</div>}
                            </div>

                            <Button variant="outline" asChild className="w-full rounded-xl border-border/60 text-xs">
                                <Link to={`/dashboard/customers?segment=${key}`}>View {seg.label} Customers</Link>
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
