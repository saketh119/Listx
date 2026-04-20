import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AlertCircle, X } from "lucide-react";
import { CommandPalette } from "@/components/CommandPalette";
import { SpotlightCoachmarks } from "@/components/SpotlightCoachmarks";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function DashboardLayout() {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSystemBanner, setShowSystemBanner] = useState(true);

    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, isAuthLoading, navigate]);

    if (isAuthLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-bg-subtle text-text-muted">Loading workspace...</div>;
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-bg-subtle flex">
            {/* Desktop Sidebar */}
            <Sidebar
                className="hidden lg:flex fixed inset-y-0 z-40"
                isCollapsed={isSidebarCollapsed}
                onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Mobile Sidebar (Sheet) */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="p-0 w-64 border-r-0">
                    <Sidebar className="w-full h-full border-r-0" />
                </SheetContent>
            </Sheet>

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
                    }`}
            >
                {showSystemBanner && (
                    <div className="bg-brand-saffron/10 border-b border-brand-saffron/20 px-4 py-3 flex items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-brand-saffron shrink-0 mt-0.5 sm:mt-0" />
                            <p className="text-sm font-medium text-brand-dark">
                                Amazon API sync is experiencing delays. Orders may take up to 30 mins to appear.
                                <a href="#" className="ml-2 text-brand-lake hover:underline font-semibold">View Status</a>
                            </p>
                        </div>
                        <button
                            onClick={() => setShowSystemBanner(false)}
                            className="text-text-muted hover:text-brand-dark shrink-0 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Global Features */}
            <CommandPalette />
            <SpotlightCoachmarks />
        </div>
    );
}
