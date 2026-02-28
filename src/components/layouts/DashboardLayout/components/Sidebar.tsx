import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ListxLogo } from "@/components/ListxLogo";
import {
    BarChart2,
    Package,
    ShoppingCart,
    Truck,
    Users,
    Settings,
    LifeBuoy,
    ChevronLeft,
    ChevronRight,
    Warehouse,
    Plug,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    className?: string;
    isCollapsed?: boolean;
    onToggle?: () => void;
}

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart2 },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Inventory", href: "/dashboard/inventory", icon: Warehouse },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Logistics", href: "/dashboard/logistics", icon: Truck },
    { name: "Integrations", href: "/dashboard/integrations", icon: Plug },
    { name: "AI Studio", href: "/dashboard/ai-studio", icon: Sparkles },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
    { name: "Customers", href: "/dashboard/customers", icon: Users },
];

const bottomNavItems = [
    { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ className, isCollapsed = false, onToggle }: SidebarProps) {
    const location = useLocation();

    const NavLink = ({ item }: { item: typeof navItems[0] }) => {
        const isActive = item.href === '/dashboard'
            ? location.pathname === '/dashboard'
            : location.pathname.startsWith(item.href);
        return (
            <Link
                to={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-body-sm font-medium transition-all group",
                    isActive
                        ? "bg-brand-tea text-brand-dark"
                        : "text-text-muted hover:bg-bg-subtle hover:text-brand-dark"
                )}
            >
                <item.icon className={cn(
                    "h-5 w-5",
                    isActive ? "text-brand-jade" : "text-text-muted group-hover:text-brand-jade"
                )}
                />
                {!isCollapsed && <span>{item.name}</span>}
            </Link>
        );
    };

    return (
        <aside
            className={cn(
                "flex flex-col border-r bg-background transition-all duration-300 relative",
                isCollapsed ? "w-20" : "w-64",
                className
            )}
        >
            <div className={cn("h-16 flex items-center border-b px-6 shrink-0", isCollapsed && "justify-center px-0")}>
                <Link to="/dashboard" className="flex items-center group">
                    <ListxLogo className={cn("transition-all", isCollapsed ? "h-6 w-auto" : "h-7")} />
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink key={item.name} item={item} />
                ))}
            </div>

            <div className="p-4 border-t space-y-2 shrink-0">
                {bottomNavItems.map((item) => (
                    <NavLink key={item.name} item={item} />
                ))}

                {/* Collapse Toggle Trigger */}
                {onToggle && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggle}
                        className={cn(
                            "w-full flex items-center gap-3 justify-start text-text-muted hover:text-brand-dark hover:bg-bg-subtle",
                            isCollapsed && "justify-center px-0"
                        )}
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        {!isCollapsed && <span>Collapse</span>}
                    </Button>
                )}
            </div>
        </aside>
    );
}
