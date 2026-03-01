import { Link } from "react-router-dom";
import {
    TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign,
    ShoppingCart, BarChart2, Users, Package, RotateCcw, Search as SearchIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    dailyRevenueData, platformBreakdown, analyticsKPIs, topProducts
} from "@/data/mockAnalytics";

const kpis = [
    { label: 'Total Revenue', value: `₹${(analyticsKPIs.totalRevenue / 100000).toFixed(1)}L`, trend: `+${analyticsKPIs.revenueGrowth}%`, up: true, icon: DollarSign, color: 'bg-brand-jade/10 text-brand-jade' },
    { label: 'Total Orders', value: analyticsKPIs.totalOrders.toLocaleString(), trend: `+${analyticsKPIs.orderGrowth}%`, up: true, icon: ShoppingCart, color: 'bg-brand-lake/10 text-brand-lake' },
    { label: 'Avg. Order Value', value: `₹${analyticsKPIs.avgOrderValue}`, trend: '+2.1%', up: true, icon: BarChart2, color: 'bg-brand-saffron/10 text-brand-saffron' },
    { label: 'Conversion Rate', value: `${analyticsKPIs.conversionRate}%`, trend: '+0.3%', up: true, icon: TrendingUp, color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Return Rate', value: `${analyticsKPIs.returnRate}%`, trend: '-0.8%', up: true, icon: RotateCcw, color: 'bg-semantic-error/10 text-semantic-error' },
    { label: 'Repeat Customers', value: `${analyticsKPIs.repeatCustomerRate}%`, trend: '+4.2%', up: true, icon: Users, color: 'bg-cyan-500/10 text-cyan-600' },
];

const reportLinks = [
    { name: 'Sales Report', href: '/dashboard/analytics/sales', icon: DollarSign, desc: 'Revenue, orders, AOV' },
    { name: 'Inventory Report', href: '/dashboard/analytics/inventory', icon: Package, desc: 'Stock levels, turnover' },
    { name: 'Logistics Report', href: '/dashboard/analytics/logistics', icon: BarChart2, desc: 'Delivery performance' },
    { name: 'Returns Report', href: '/dashboard/analytics/returns', icon: RotateCcw, desc: 'Return rates, reasons' },
    { name: 'SEO Report', href: '/dashboard/analytics/seo', icon: SearchIcon, desc: 'Product SEO scores' },
];

const maxRev = Math.max(...dailyRevenueData.map(d => d.revenue));

export default function AnalyticsOverview() {
    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3">
                        <BarChart2 className="w-7 h-7 text-brand-lake" /> Analytics
                    </h1>
                    <p className="text-body-sm text-text-muted mt-1">Business performance at a glance — Last 30 days</p>
                </div>
                <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                    <Link to="/dashboard/analytics/sales">View Full Reports →</Link>
                </Button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {kpis.map(k => (
                    <div key={k.label} className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-9 h-9 rounded-xl ${k.color} flex items-center justify-center`}><k.icon className="w-4 h-4" /></div>
                            <span className={`text-[10px] font-bold flex items-center gap-0.5 ${k.up ? 'text-brand-jade' : 'text-semantic-error'}`}>
                                {k.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{k.trend}
                            </span>
                        </div>
                        <p className="text-xl font-bold text-brand-dark">{k.value}</p>
                        <p className="text-[10px] text-text-muted font-medium mt-0.5">{k.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2 mb-5">
                        <TrendingUp className="w-4 h-4 text-brand-lake" /> Revenue Trend (This Week)
                    </h3>
                    <div className="flex items-end gap-3 h-44">
                        {dailyRevenueData.map(d => (
                            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                                <span className="text-[9px] font-bold text-brand-dark">₹{(d.revenue / 1000).toFixed(0)}K</span>
                                <div className="w-full bg-brand-lake/15 rounded-t-lg relative" style={{ height: `${(d.revenue / maxRev) * 130}px` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-lake/60 to-brand-lake/20 rounded-t-lg" />
                                </div>
                                <span className="text-[10px] text-text-muted font-medium">{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Breakdown */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-5">Revenue by Platform</h3>
                    <div className="space-y-3">
                        {platformBreakdown.map(p => {
                            const pct = Math.round((p.revenue / analyticsKPIs.totalRevenue) * 100);
                            return (
                                <div key={p.platform}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-brand-dark">{p.platform}</span>
                                        <span className="text-xs font-bold text-brand-dark">₹{(p.revenue / 1000).toFixed(0)}K ({pct}%)</span>
                                    </div>
                                    <div className="w-full h-2 bg-bg-subtle rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: p.color }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4">Top Selling Products</h3>
                    <div className="space-y-2">
                        {topProducts.map((p, i) => (
                            <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-bg-subtle/30">
                                <span className="w-6 h-6 rounded-full bg-brand-lake/10 text-brand-lake text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-brand-dark truncate">{p.name}</p>
                                    <p className="text-[10px] text-text-muted">{p.units} units sold</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-brand-dark">₹{(p.revenue / 1000).toFixed(0)}K</p>
                                    <span className={`text-[10px] font-bold ${p.growth >= 0 ? 'text-brand-jade' : 'text-semantic-error'}`}>{p.growth >= 0 ? '+' : ''}{p.growth}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Reports */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4">Deep-Dive Reports</h3>
                    <div className="space-y-2">
                        {reportLinks.map(r => (
                            <Link key={r.name} to={r.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-subtle transition-colors group">
                                <div className="w-9 h-9 rounded-lg bg-brand-lake/10 flex items-center justify-center">
                                    <r.icon className="w-4 h-4 text-brand-lake" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-brand-dark group-hover:text-brand-lake">{r.name}</p>
                                    <p className="text-[10px] text-text-muted">{r.desc}</p>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-lake" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
