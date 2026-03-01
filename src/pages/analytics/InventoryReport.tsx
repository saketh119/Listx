import { Link } from "react-router-dom";
import { ArrowLeft, Package, AlertTriangle, TrendingDown, Archive, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inventoryMetrics } from "@/data/mockAnalytics";

export default function InventoryReport() {
    const m = inventoryMetrics;
    const stockHealth = Math.round((m.inStockSKUs / m.totalSKUs) * 100);

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/analytics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Analytics</Link>
            </Button>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><Package className="w-7 h-7 text-brand-saffron" /> Inventory Report</h1>
                    <p className="text-body-sm text-text-muted mt-1">Stock levels, turnover, and dead stock analysis</p>
                </div>
                <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium"><Download className="w-4 h-4 mr-2" /> Export</Button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <Package className="w-5 h-5 text-brand-lake mb-2" />
                    <p className="text-2xl font-bold text-brand-dark">{m.totalSKUs}</p>
                    <p className="text-[10px] text-text-muted">Total SKUs</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-jade/30 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-jade">{stockHealth}%</p>
                    <p className="text-[10px] text-text-muted">Stock Health</p>
                    <div className="w-full h-1.5 bg-bg-subtle rounded-full mt-2"><div className="h-full bg-brand-jade rounded-full" style={{ width: `${stockHealth}%` }} /></div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-saffron/30 shadow-sm p-4">
                    <AlertTriangle className="w-5 h-5 text-brand-saffron mb-2" />
                    <p className="text-2xl font-bold text-brand-saffron">{m.lowStockSKUs}</p>
                    <p className="text-[10px] text-text-muted">Low Stock SKUs</p>
                </div>
                <div className="bg-white rounded-2xl border border-semantic-error/30 shadow-sm p-4">
                    <TrendingDown className="w-5 h-5 text-semantic-error mb-2" />
                    <p className="text-2xl font-bold text-semantic-error">{m.outOfStockSKUs}</p>
                    <p className="text-[10px] text-text-muted">Out of Stock</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Stock Distribution */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-5">Stock Distribution</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'In Stock', value: m.inStockSKUs, color: 'bg-brand-jade', pct: Math.round((m.inStockSKUs / m.totalSKUs) * 100) },
                            { label: 'Low Stock', value: m.lowStockSKUs, color: 'bg-brand-saffron', pct: Math.round((m.lowStockSKUs / m.totalSKUs) * 100) },
                            { label: 'Out of Stock', value: m.outOfStockSKUs, color: 'bg-semantic-error', pct: Math.round((m.outOfStockSKUs / m.totalSKUs) * 100) },
                        ].map(s => (
                            <div key={s.label}>
                                <div className="flex justify-between text-xs mb-1"><span className="text-text-muted">{s.label}</span><span className="font-bold text-brand-dark">{s.value} SKUs ({s.pct}%)</span></div>
                                <div className="w-full h-2 bg-bg-subtle rounded-full"><div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} /></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Turnover */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-5">Inventory Health</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-bg-subtle/50">
                            <p className="text-xs text-text-muted mb-1">Avg. Turnover</p>
                            <p className="text-2xl font-bold text-brand-dark">{m.avgTurnoverDays} days</p>
                        </div>
                        <div className="p-4 rounded-xl bg-semantic-error/5 border border-semantic-error/20">
                            <div className="flex items-center gap-2 mb-1"><Archive className="w-4 h-4 text-semantic-error" /><p className="text-xs font-bold text-semantic-error">Dead Stock Alert</p></div>
                            <p className="text-lg font-bold text-brand-dark">{m.deadStockCount} products</p>
                            <p className="text-[10px] text-text-muted">₹{(m.deadStockValue / 1000).toFixed(0)}K value tied up (no sales in 90+ days)</p>
                        </div>
                        <div className="p-4 rounded-xl bg-brand-saffron/5 border border-brand-saffron/20">
                            <div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4 text-brand-saffron" /><p className="text-xs font-bold text-brand-saffron">Reorder Needed</p></div>
                            <p className="text-lg font-bold text-brand-dark">{m.reorderPendingCount} products</p>
                            <p className="text-[10px] text-text-muted">Below minimum stock threshold</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
