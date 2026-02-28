import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign, TrendingUp, ArrowUpRight, ShoppingCart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { monthlyRevenueData, platformBreakdown, analyticsKPIs } from "@/data/mockAnalytics";

const maxRev = Math.max(...monthlyRevenueData.map(d => d.revenue));

export default function SalesReport() {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/analytics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Analytics</Link>
            </Button>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><DollarSign className="w-7 h-7 text-brand-jade" /> Sales Report</h1>
                    <p className="text-body-sm text-text-muted mt-1">Revenue, orders, and platform performance</p>
                </div>
                <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium"><Download className="w-4 h-4 mr-2" /> Export</Button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total Revenue', value: `₹${(analyticsKPIs.totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, trend: `+${analyticsKPIs.revenueGrowth}%` },
                    { label: 'Total Orders', value: analyticsKPIs.totalOrders.toLocaleString(), icon: ShoppingCart, trend: `+${analyticsKPIs.orderGrowth}%` },
                    { label: 'Avg. Order Value', value: `₹${analyticsKPIs.avgOrderValue}`, icon: TrendingUp, trend: '+2.1%' },
                    { label: 'Conversion Rate', value: `${analyticsKPIs.conversionRate}%`, icon: ArrowUpRight, trend: '+0.3%' },
                ].map(k => (
                    <div key={k.label} className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                        <k.icon className="w-5 h-5 text-brand-lake mb-2" />
                        <p className="text-xl font-bold text-brand-dark">{k.value}</p>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] text-text-muted">{k.label}</p>
                            <span className="text-[10px] font-bold text-brand-jade">{k.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly Chart */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-6">
                <h3 className="text-sm font-bold text-brand-dark mb-5">Monthly Revenue (Last 6 Months)</h3>
                <div className="flex items-end gap-4 h-48">
                    {monthlyRevenueData.map(d => (
                        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-[9px] font-bold text-brand-dark">₹{(d.revenue / 100000).toFixed(1)}L</span>
                            <div className="w-full rounded-t-lg relative" style={{ height: `${(d.revenue / maxRev) * 160}px` }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-jade/50 to-brand-jade/15 rounded-t-lg" />
                            </div>
                            <span className="text-[10px] text-text-muted font-medium">{d.label}</span>
                            <span className="text-[9px] text-text-muted">{d.orders} orders</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Platform Table */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                <div className="p-6 pb-0"><h3 className="text-sm font-bold text-brand-dark mb-4">Revenue by Platform</h3></div>
                <table className="w-full">
                    <thead><tr className="border-b border-border/40">
                        <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Platform</th>
                        <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">Revenue</th>
                        <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">Orders</th>
                        <th className="p-4 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">Share</th>
                    </tr></thead>
                    <tbody>
                        {platformBreakdown.map(p => (
                            <tr key={p.platform} className="border-b border-border/20 hover:bg-bg-subtle/30">
                                <td className="p-4 flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} /><span className="text-sm font-medium text-brand-dark">{p.platform}</span></td>
                                <td className="p-4 text-right text-sm font-bold text-brand-dark">₹{(p.revenue / 1000).toFixed(0)}K</td>
                                <td className="p-4 text-right text-sm text-brand-dark">{p.orders}</td>
                                <td className="p-4 text-right"><Badge className="bg-brand-lake/10 text-brand-lake border-transparent text-[10px]">{Math.round((p.revenue / analyticsKPIs.totalRevenue) * 100)}%</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
