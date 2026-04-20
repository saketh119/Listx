import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, IndianRupee, ShoppingCart, PackageOpen, Undo2 } from "lucide-react";
export function KPIGrid({ kpis: backendKPIs }: { kpis?: any }) {
    const kpis = [
        {
            title: "Total Revenue",
            value: `₹${((backendKPIs?.totalRevenue || 0) / 1000).toFixed(1)}K`,
            change: `+${backendKPIs?.revenueGrowth || 0}%`,
            trend: "up",
            icon: IndianRupee,
        },
        {
            title: "Total Orders",
            value: (backendKPIs?.totalOrders || 0).toLocaleString(),
            change: `+${backendKPIs?.orderGrowth || 0}%`,
            trend: "up",
            icon: ShoppingCart,
        },
        {
            title: "Active Products",
            value: (backendKPIs?.activeProducts || 0).toLocaleString(),
            change: "Stable",
            trend: "neutral",
            icon: PackageOpen,
        },
        {
            title: "Return Rate",
            value: `${backendKPIs?.returnRate || 0}%`,
            change: "-0.5%",
            trend: "down-good",
            icon: Undo2,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi) => (
                <Card key={kpi.title}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-body-sm font-medium text-text-muted">{kpi.title}</span>
                            <div className="p-2 bg-bg-subtle rounded-lg text-brand-dark">
                                <kpi.icon className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <h3 className="text-display-md">{kpi.value}</h3>
                            <span className={`text-label-sm font-medium flex items-center ${kpi.trend === 'up' ? 'text-semantic-success' :
                                    kpi.trend === 'down-good' ? 'text-semantic-success' :
                                        kpi.trend === 'down-bad' ? 'text-semantic-error' :
                                            'text-text-muted'
                                }`}>
                                {kpi.trend === 'up' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                                {(kpi.trend === 'down-good' || kpi.trend === 'down-bad') && <ArrowDownRight className="h-3 w-3 mr-1" />}
                                {kpi.change}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
