import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingCart,
    DollarSign, Repeat, TrendingDown, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCustomers, customerSegments } from "@/data/mockCustomers";

export default function CustomerDetail() {
    const { id } = useParams<{ id: string }>();
    const customer = mockCustomers.find(c => c.id === id);

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Customer Not Found</h2>
                <Button asChild className="rounded-xl"><Link to="/dashboard/customers">← Back</Link></Button>
            </div>
        );
    }

    const seg = customerSegments[customer.segment];

    // Mock recent orders for detail
    const recentOrders = [
        { id: 'ORD-2024-0189', date: customer.lastOrderDate, amount: customer.avgOrderValue + 200, status: 'Delivered', platform: customer.platforms[0] },
        { id: 'ORD-2024-0145', date: '2024-12-05', amount: customer.avgOrderValue - 300, status: 'Delivered', platform: customer.platforms[0] },
        { id: 'ORD-2024-0098', date: '2024-11-22', amount: customer.avgOrderValue + 500, status: 'Returned', platform: customer.platforms[customer.platforms.length - 1] },
        { id: 'ORD-2024-0067', date: '2024-11-10', amount: customer.avgOrderValue, status: 'Delivered', platform: customer.platforms[0] },
    ];

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/customers"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Customers</Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Profile */}
                <div className="space-y-5">
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-brand-lake/10 flex items-center justify-center text-2xl font-bold text-brand-lake mx-auto mb-3">
                            {customer.avatar}
                        </div>
                        <h2 className="text-lg font-bold text-brand-dark">{customer.name}</h2>
                        <Badge className={`${seg.bg} ${seg.color} border-transparent text-xs mt-1`}>{seg.label}</Badge>

                        <div className="mt-4 space-y-2 text-left">
                            <div className="flex items-center gap-2 text-xs text-text-muted"><Mail className="w-3.5 h-3.5 shrink-0" />{customer.email}</div>
                            <div className="flex items-center gap-2 text-xs text-text-muted"><Phone className="w-3.5 h-3.5 shrink-0" />{customer.phone}</div>
                            <div className="flex items-center gap-2 text-xs text-text-muted"><MapPin className="w-3.5 h-3.5 shrink-0" />{customer.city}, {customer.state}</div>
                            <div className="flex items-center gap-2 text-xs text-text-muted"><Calendar className="w-3.5 h-3.5 shrink-0" />Customer since {new Date(customer.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Tag className="w-3 h-3" /> Tags</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {customer.tags.map(t => <Badge key={t} className="bg-brand-lake/10 text-brand-lake border-transparent text-[10px]">{t}</Badge>)}
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Active Platforms</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {customer.platforms.map(p => <Badge key={p} variant="outline" className="text-[10px] border-border/40">{p}</Badge>)}
                        </div>
                    </div>
                </div>

                {/* Right — Metrics & Orders */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                            <ShoppingCart className="w-5 h-5 text-brand-lake mb-2" />
                            <p className="text-2xl font-bold text-brand-dark">{customer.totalOrders}</p>
                            <p className="text-[10px] text-text-muted">Total Orders</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                            <DollarSign className="w-5 h-5 text-brand-jade mb-2" />
                            <p className="text-2xl font-bold text-brand-dark">₹{(customer.totalSpent / 1000).toFixed(1)}K</p>
                            <p className="text-[10px] text-text-muted">Total Spent</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                            <Repeat className="w-5 h-5 text-brand-saffron mb-2" />
                            <p className="text-2xl font-bold text-brand-dark">₹{customer.avgOrderValue.toLocaleString()}</p>
                            <p className="text-[10px] text-text-muted">Avg. Order Value</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                            <TrendingDown className={`w-5 h-5 mb-2 ${customer.returnRate > 10 ? 'text-semantic-error' : customer.returnRate > 5 ? 'text-brand-saffron' : 'text-brand-jade'}`} />
                            <p className={`text-2xl font-bold ${customer.returnRate > 10 ? 'text-semantic-error' : 'text-brand-dark'}`}>{customer.returnRate}%</p>
                            <p className="text-[10px] text-text-muted">Return Rate</p>
                        </div>
                    </div>

                    {/* Engagement Score */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4">Engagement Score</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Recency', value: customer.segment === 'dormant' ? 20 : customer.segment === 'at_risk' ? 40 : 85, desc: 'Days since last order' },
                                { label: 'Frequency', value: customer.totalOrders > 30 ? 90 : customer.totalOrders > 15 ? 65 : 35, desc: 'Order frequency score' },
                                { label: 'Monetary', value: customer.totalSpent > 100000 ? 95 : customer.totalSpent > 50000 ? 70 : 40, desc: 'Spending value score' },
                            ].map(m => (
                                <div key={m.label} className="text-center">
                                    <div className="relative w-16 h-16 mx-auto mb-2">
                                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" stroke="#f0f0f0" strokeWidth="3" />
                                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" stroke={m.value >= 70 ? '#22c55e' : m.value >= 40 ? '#f59e0b' : '#ef4444'} strokeWidth="3"
                                                strokeDasharray={`${m.value}, 100`} className="transition-all duration-500" />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-brand-dark">{m.value}</span>
                                    </div>
                                    <p className="text-xs font-bold text-brand-dark">{m.label}</p>
                                    <p className="text-[9px] text-text-muted">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                        <div className="p-6 pb-0 flex items-center justify-between"><h3 className="text-sm font-bold text-brand-dark">Recent Orders</h3><Link to="/dashboard/orders" className="text-xs text-brand-lake hover:underline">View All</Link></div>
                        <table className="w-full">
                            <thead><tr className="border-b border-border/40">
                                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase">Order ID</th>
                                <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase">Date</th>
                                <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase">Amount</th>
                                <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase">Status</th>
                                <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase">Platform</th>
                            </tr></thead>
                            <tbody>
                                {recentOrders.map(o => (
                                    <tr key={o.id} className="border-b border-border/10 hover:bg-bg-subtle/30">
                                        <td className="p-4 text-sm font-medium text-brand-lake">{o.id}</td>
                                        <td className="p-4 text-center text-xs text-text-muted">{o.date}</td>
                                        <td className="p-4 text-right text-sm font-bold text-brand-dark">₹{o.amount.toLocaleString()}</td>
                                        <td className="p-4 text-center"><Badge className={`border-transparent text-[10px] ${o.status === 'Delivered' ? 'bg-brand-jade/10 text-brand-jade' : 'bg-semantic-error/10 text-semantic-error'}`}>{o.status}</Badge></td>
                                        <td className="p-4 text-center"><Badge variant="outline" className="text-[9px] border-border/30">{o.platform}</Badge></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
