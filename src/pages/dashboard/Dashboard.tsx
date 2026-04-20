import { useState, useEffect } from "react";
import { KPIGrid } from "./components/KPIGrid";
import { RecentOrders } from "./components/RecentOrders";
import { RevenueChart } from "./components/RevenueChart";
import { apiClient } from "@/lib/api-client";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await apiClient.get('/analytics/dashboard');
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleSeedData = async () => {
        try {
            await apiClient.post('/system/seed');
            window.location.reload();
        } catch (error) {
            console.error("Failed to seed data:", error);
            alert("Seeding failed. Make sure you are logged in.");
        }
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center min-h-[400px]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-display-md mb-2">Dashboard Overview</h1>
                    <p className="text-body-md text-text-muted">Welcome back. Here's what's happening today.</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleSeedData} className="border-brand-jade text-brand-jade hover:bg-brand-jade/5">
                    Seed Test Data
                </Button>
            </div>

            <KPIGrid kpis={data?.kpis} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RevenueChart data={data?.revenueData} />
                </div>
                <div className="space-y-6">
                    {/* AI Insights */}
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
