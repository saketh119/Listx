import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Users, Search, ArrowUpRight, DollarSign,
    Repeat, TrendingUp, UserPlus, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { customerSegments, customerKPIs } from "@/data/mockCustomers";
import { apiClient } from "@/lib/api-client";
import { Spinner } from "@/components/ui/spinner";

export default function CustomersList() {
    const [search, setSearch] = useState('');
    const [segFilter, setSegFilter] = useState<string>('all');
    
    const [customers, setCustomers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await apiClient.get('/customers');
                // Backend returns customers grouped by email/phone
                setCustomers(res.data.customers || []);
            } catch (err) {
                console.error("Failed to fetch customers", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const filtered = useMemo(() => {
        return customers
            .filter(c => segFilter === 'all' || c.segment === segFilter)
            .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
    }, [customers, search, segFilter]);

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><Users className="w-7 h-7 text-brand-lake" /> Customers</h1>
                    <p className="text-body-sm text-text-muted mt-1">Manage your customer relationships and segments</p>
                </div>
                <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                    <Link to="/dashboard/customers/segments"><Filter className="w-4 h-4 mr-2" /> View Segments</Link>
                </Button>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                    { label: 'Total Customers', value: customers.length.toLocaleString(), icon: Users, color: 'bg-brand-lake/10 text-brand-lake' },
                    { label: 'New This Month', value: customerKPIs.newThisMonth.toString(), icon: UserPlus, color: 'bg-brand-jade/10 text-brand-jade', trend: '+18%' },
                    { label: 'Avg. LTV', value: `₹${customerKPIs.avgLifetimeValue.toLocaleString()}`, icon: DollarSign, color: 'bg-brand-saffron/10 text-brand-saffron' },
                    { label: 'Repeat Rate', value: `${customerKPIs.repeatRate}%`, icon: Repeat, color: 'bg-purple-500/10 text-purple-600' },
                    { label: 'Churn Rate', value: `${customerKPIs.churnRate}%`, icon: TrendingUp, color: 'bg-semantic-error/10 text-semantic-error' },
                    { label: 'Satisfaction', value: `${customerKPIs.avgSatisfaction}/5`, icon: ArrowUpRight, color: 'bg-cyan-500/10 text-cyan-600' },
                ].map(k => (
                    <div key={k.label} className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                        <div className={`w-8 h-8 rounded-lg ${k.color} flex items-center justify-center mb-2`}><k.icon className="w-4 h-4" /></div>
                        <p className="text-xl font-bold text-brand-dark">{k.value}</p>
                        <div className="flex items-center justify-between mt-0.5">
                            <p className="text-[10px] text-text-muted">{k.label}</p>
                            {k.trend && <span className="text-[10px] font-bold text-brand-jade">{k.trend}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
                        className="pl-10 rounded-xl bg-white border-border/60 h-10" />
                </div>
                <div className="flex gap-1.5 overflow-x-auto">
                    <button onClick={() => setSegFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${segFilter === 'all' ? 'bg-brand-lake text-white' : 'bg-white text-text-muted border border-border/40 hover:border-brand-lake/30'}`}>
                        All ({customers.length})
                    </button>
                    {Object.entries(customerSegments).map(([key, seg]) => {
                        const count = customers.filter(c => c.segment === key).length;
                        return (
                            <button key={key} onClick={() => setSegFilter(key)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${segFilter === key ? 'bg-brand-lake text-white' : 'bg-white text-text-muted border border-border/40 hover:border-brand-lake/30'}`}>
                                {seg.label} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20"><Spinner size="lg" /></div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-text-muted"><p>No customers found.</p></div>
                ) : (
                <table className="w-full">
                    <thead><tr className="border-b border-border/40">
                        <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Customer</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Segment</th>
                        <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">Orders</th>
                        <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">Total Spent</th>
                        <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">AOV</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Platforms</th>
                        <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">Last Order</th>
                    </tr></thead>
                    <tbody>
                        {filtered.map(c => {
                            const seg = customerSegments[c.segment as keyof typeof customerSegments] || { bg: 'bg-gray-100', color: 'text-gray-600', label: 'Unsegmented' };
                            return (
                                <tr key={c.id} className="border-b border-border/10 hover:bg-bg-subtle/30 transition-colors cursor-pointer" onClick={() => { }}>
                                    <td className="p-4">
                                        <Link to={`/dashboard/customers/${c.id}`} className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-brand-lake/10 flex items-center justify-center text-xs font-bold text-brand-lake">{c.avatar}</div>
                                            <div>
                                                <p className="text-sm font-medium text-brand-dark hover:text-brand-lake">{c.name}</p>
                                                <p className="text-[10px] text-text-muted">{c.email}</p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="p-4 text-center"><Badge className={`${seg.bg} ${seg.color} border-transparent text-[10px]`}>{seg.label}</Badge></td>
                                    <td className="p-4 text-right text-sm font-bold text-brand-dark">{c.totalOrders}</td>
                                    <td className="p-4 text-right text-sm font-bold text-brand-dark">₹{(c.totalSpent / 1000).toFixed(1)}K</td>
                                    <td className="p-4 text-right text-sm text-brand-dark">₹{c.avgOrderValue.toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex gap-1 justify-center">{c.platforms.map((p: string) => <Badge key={p} variant="outline" className="text-[9px] border-border/30">{p}</Badge>)}</div>
                                    </td>
                                    <td className="p-4 text-right text-xs text-text-muted">{new Date(c.lastOrderDate).toLocaleDateString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    );
}
