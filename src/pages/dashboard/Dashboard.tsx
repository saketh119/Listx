import { KPIGrid } from "./components/KPIGrid";
import { RecentOrders } from "./components/RecentOrders";
import { RevenueChart } from "./components/RevenueChart";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-display-md mb-2">Dashboard Overview</h1>
                <p className="text-body-md text-text-muted">Welcome back. Here's what's happening today.</p>
            </div>

            <KPIGrid />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div className="space-y-6">
                    {/* Placeholder for AI Insights or Recent Alerts */}
                    <div className="h-full min-h-[432px] rounded-xl border bg-card p-6 flex items-center justify-center text-text-muted text-center shadow-sm">
                        <div>
                            <div className="w-12 h-12 rounded-full bg-brand-jade/10 text-brand-jade mx-auto flex items-center justify-center mb-4">
                                <span className="animate-pulse">✨</span>
                            </div>
                            <p className="font-display font-medium text-brand-dark">AI Insights</p>
                            <p className="text-body-sm mt-2 max-w-[200px] mx-auto">Smart recommendations based on your activity arriving soon.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <RecentOrders />
            </div>
        </div>
    );
}
