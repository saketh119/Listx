import { Link, useLocation } from "react-router-dom";
import { User, Users, CreditCard, Key, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
    { name: 'Profile', href: '/dashboard/settings', icon: User },
    { name: 'Team', href: '/dashboard/settings/team', icon: Users },
    { name: 'Billing', href: '/dashboard/settings/billing', icon: CreditCard },
    { name: 'API Keys', href: '/dashboard/settings/api-keys', icon: Key },
    { name: 'Notifications', href: '/dashboard/settings/notifications', icon: Bell },
];

export function SettingsLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="mb-6">
                <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3">
                    <Settings className="w-7 h-7 text-brand-lake" /> Settings
                </h1>
                <p className="text-body-sm text-text-muted mt-1">Manage your account, team, and billing</p>
            </div>

            <div className="flex gap-6">
                {/* Sidebar Tabs */}
                <nav className="w-48 shrink-0 space-y-1">
                    {tabs.map(t => {
                        const isActive = t.href === '/dashboard/settings'
                            ? location.pathname === '/dashboard/settings'
                            : location.pathname.startsWith(t.href);
                        return (
                            <Link key={t.name} to={t.href}
                                className={cn("flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    isActive ? "bg-brand-tea text-brand-dark" : "text-text-muted hover:bg-bg-subtle hover:text-brand-dark"
                                )}>
                                <t.icon className={cn("w-4 h-4", isActive ? "text-brand-jade" : "text-text-muted")} />
                                {t.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Content */}
                <div className="flex-1 min-w-0">{children}</div>
            </div>
        </div>
    );
}
