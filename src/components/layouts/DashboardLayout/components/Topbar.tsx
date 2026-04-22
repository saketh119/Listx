import { Bell, Search, Menu, ShoppingCart, Truck, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
    onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">

            <div className="flex items-center gap-4 flex-1">
                {onMenuClick && (
                    <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden shrink-0">
                        <Menu className="h-5 w-5" />
                    </Button>
                )}

                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <Input
                        placeholder="Search orders, products, or customers..."
                        className="pl-10 h-10 bg-bg-subtle border-transparent focus-visible:bg-background"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative text-text-muted hover:text-brand-dark">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-brand-saffron border-2 border-background"></span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[380px] p-0" forceMount>
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <span className="font-semibold text-brand-dark">Notifications</span>
                            <div className="flex gap-3 text-xs">
                                <button className="text-text-muted hover:text-brand-dark transition-colors">Mark all read</button>
                                <Link to="/notifications" className="text-brand-lake hover:underline font-medium">View All</Link>
                            </div>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto py-2">
                            <DropdownMenuItem className="px-4 py-3 items-start gap-4 cursor-pointer focus:bg-bg-subtle rounded-none data-[highlighted]:bg-bg-subtle">
                                <div className="w-8 h-8 rounded-full bg-brand-jade/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <ShoppingCart className="w-4 h-4 text-brand-jade" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium leading-none text-brand-dark">New order received</p>
                                        <p className="text-xs text-text-muted">10m ago</p>
                                    </div>
                                    <p className="text-xs text-text-muted line-clamp-2">Order #ORD-2024-0432 has been placed by Rahul Sharma via Amazon.</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-3 items-start gap-4 cursor-pointer focus:bg-bg-subtle rounded-none data-[highlighted]:bg-bg-subtle">
                                <div className="w-8 h-8 rounded-full bg-brand-lake/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <Truck className="w-4 h-4 text-brand-lake" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium leading-none text-brand-dark">Courier assigned</p>
                                        <p className="text-xs text-text-muted">1h ago</p>
                                    </div>
                                    <p className="text-xs text-text-muted line-clamp-2">Delhivery has been assigned for Order #ORD-2024-0431.</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="px-4 py-3 items-start gap-4 cursor-pointer focus:bg-bg-subtle rounded-none data-[highlighted]:bg-bg-subtle">
                                <div className="w-8 h-8 rounded-full bg-brand-saffron/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <AlertTriangle className="w-4 h-4 text-brand-saffron" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium leading-none text-brand-dark">Low stock warning</p>
                                        <p className="text-xs text-text-muted">2h ago</p>
                                    </div>
                                    <p className="text-xs text-text-muted line-clamp-2">Wireless Earphones Pro is running low. Only 3 units remaining.</p>
                                </div>
                            </DropdownMenuItem>
                        </div>
                        <div className="p-2 border-t text-center">
                            <Link to="/notifications" className="text-xs font-medium text-text-muted hover:text-brand-dark w-full inline-block py-2">
                                See all notifications &rarr;
                            </Link>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            <Avatar className="h-9 w-9 shadow-sm border border-border">
                                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="@user" />
                                <AvatarFallback className="bg-brand-tea text-brand-dark font-semibold">AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-body-sm font-medium leading-none">{(user as any)?.name || user?.user_metadata?.name || user?.user_metadata?.full_name || 'Admin User'}</p>
                                <p className="text-body-xs leading-none text-text-muted">
                                    {user?.email || 'admin@listx.ai'}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard/settings')}>Profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard/settings')}>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-brand-saffron focus:text-brand-saffron cursor-pointer" onClick={handleLogout}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
