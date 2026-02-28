import { Link } from "react-router-dom";
import {
    Truck, Package, AlertTriangle, Clock, CheckCircle2,
    ArrowUpRight, ArrowDownRight, TrendingUp
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    courierPartners, logisticsKPIs, deliveryPerformanceData, courierDistribution,
    activeShipments, failedDeliveries
} from "@/data/mockLogistics";

const kpiCards = [
    { label: 'Total Shipments', value: logisticsKPIs.totalShipments, icon: Package, trend: '+12%', trendUp: true, color: 'bg-brand-lake/10 text-brand-lake' },
    { label: 'On-Time Delivery', value: `${logisticsKPIs.onTimePercent}%`, icon: CheckCircle2, trend: '+2.1%', trendUp: true, color: 'bg-brand-jade/10 text-brand-jade' },
    { label: 'Avg. Delivery Days', value: logisticsKPIs.avgDeliveryDays, icon: Clock, trend: '-0.3', trendUp: true, color: 'bg-brand-saffron/10 text-brand-saffron' },
    { label: 'Pending Pickups', value: logisticsKPIs.pendingPickups, icon: Truck, trend: '−5', trendUp: false, color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Delivered Today', value: logisticsKPIs.deliveredToday, icon: CheckCircle2, trend: '+8', trendUp: true, color: 'bg-brand-jade/10 text-brand-jade' },
    { label: 'Exceptions', value: logisticsKPIs.exceptionsToday, icon: AlertTriangle, trend: '+1', trendUp: false, color: 'bg-semantic-error/10 text-semantic-error' },
];

export default function LogisticsDashboard() {
    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Logistics Dashboard</h1>
                    <p className="text-body-sm text-text-muted mt-1">Real-time overview of shipments and courier performance</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                        <Link to="/dashboard/logistics/shipments"><Truck className="w-4 h-4 mr-2" /> View Shipments</Link>
                    </Button>
                    <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                        <Link to="/dashboard/logistics/bulk-assign"><Package className="w-4 h-4 mr-2" /> Bulk Assignment</Link>
                    </Button>
                    <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                        <Link to="/dashboard/logistics/pickup-scheduling"><Clock className="w-4 h-4 mr-2" /> Schedule Pickups</Link>
                    </Button>
                    <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                        <Link to="/dashboard/logistics/returns"><AlertTriangle className="w-4 h-4 mr-2" /> Returns</Link>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {kpiCards.map(kpi => (
                    <div key={kpi.label} className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-9 h-9 rounded-xl ${kpi.color} flex items-center justify-center`}>
                                <kpi.icon className="w-4.5 h-4.5" />
                            </div>
                            <span className={`text-[10px] font-bold flex items-center gap-0.5 ${kpi.trendUp ? 'text-brand-jade' : 'text-semantic-error'}`}>
                                {kpi.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {kpi.trend}
                            </span>
                        </div>
                        <p className="text-xl font-bold text-brand-dark">{kpi.value}</p>
                        <p className="text-[10px] text-text-muted font-medium mt-0.5">{kpi.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Delivery Performance Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-brand-lake" /> Delivery Performance (7 days)
                        </h3>
                    </div>
                    <div className="flex items-end gap-2 h-40">
                        {deliveryPerformanceData.map(d => (
                            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                                <div className="w-full flex flex-col gap-0.5 items-stretch" style={{ height: '120px' }}>
                                    <div className="bg-semantic-error/20 rounded-t-md" style={{ height: `${d.delayed}%` }} />
                                    <div className="bg-brand-jade/60 rounded-b-md flex-1" />
                                </div>
                                <span className="text-[10px] text-text-muted font-medium">{d.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-jade/60" /><span className="text-[10px] text-text-muted">On Time</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-semantic-error/20" /><span className="text-[10px] text-text-muted">Delayed</span></div>
                    </div>
                </div>

                {/* Courier Distribution */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-5">Courier Distribution</h3>
                    <div className="space-y-3">
                        {courierDistribution.map(c => (
                            <div key={c.name} className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                                <span className="text-xs font-medium text-brand-dark flex-1">{c.name}</span>
                                <span className="text-xs font-bold text-brand-dark">{c.value}%</span>
                                <div className="w-20 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${c.value}%`, backgroundColor: c.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Courier Partners */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-bold text-brand-dark">Courier Partners</h3>
                    <Badge variant="outline" className="text-[10px] border-border/40">{courierPartners.length} active</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {courierPartners.map(c => (
                        <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl bg-bg-subtle/30 hover:bg-bg-subtle/60 transition-colors">
                            <div className="w-11 h-11 rounded-xl bg-white border border-border/40 flex items-center justify-center text-lg font-bold text-brand-dark shadow-sm">
                                {c.logo}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-brand-dark">{c.name}</span>
                                    <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'active' ? 'bg-brand-jade' : c.status === 'degraded' ? 'bg-brand-saffron animate-pulse' : 'bg-semantic-error'}`} />
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] text-text-muted">{c.onTimePercent}% OTD</span>
                                    <span className="text-[10px] text-text-muted">₹{c.costPerShipment}/ship</span>
                                    <span className="text-[10px] text-text-muted">{c.todayShipments} today</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5 text-brand-saffron">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={`text-[10px] ${i < Math.floor(c.rating) ? 'text-brand-saffron' : 'text-gray-200'}`}>★</span>
                                ))}
                                <span className="text-xs font-bold text-brand-dark ml-1">{c.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Exceptions Quick View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Exceptions */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-semantic-error" /> Recent Exceptions</h3>
                        <Button variant="ghost" size="sm" asChild className="text-xs text-brand-lake h-7 px-2">
                            <Link to="/dashboard/logistics/failed">View All →</Link>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {activeShipments.filter(s => s.status === 'exception' || s.status === 'delivery_attempted').slice(0, 3).map(s => (
                            <div key={s.awb} className="flex items-center gap-3 p-3 rounded-xl bg-semantic-error/5">
                                <div className="w-8 h-8 rounded-lg bg-semantic-error/10 flex items-center justify-center text-[10px] font-bold text-semantic-error">{s.courierLogo}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-brand-dark">{s.orderId} — {s.destination}</p>
                                    <p className="text-[10px] text-semantic-error">{s.exceptionType}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Failed Deliveries */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2"><Truck className="w-4 h-4 text-brand-saffron" /> Failed Deliveries</h3>
                        <Button variant="ghost" size="sm" asChild className="text-xs text-brand-lake h-7 px-2">
                            <Link to="/dashboard/logistics/failed">View All →</Link>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {failedDeliveries.slice(0, 3).map(f => (
                            <div key={f.awb} className="flex items-center gap-3 p-3 rounded-xl bg-brand-saffron/5">
                                <div className="w-8 h-8 rounded-lg bg-brand-saffron/10 flex items-center justify-center text-[10px] font-bold text-brand-saffron">{f.courierLogo}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-brand-dark">{f.customerName} — {f.destination}</p>
                                    <p className="text-[10px] text-brand-saffron">{f.failureReason.replace(/_/g, ' ')} • {f.attempts}/{f.maxAttempts} attempts</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
