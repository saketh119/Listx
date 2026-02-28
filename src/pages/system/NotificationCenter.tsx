import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ShoppingCart, Truck, AlertTriangle, XCircle, Settings, IndianRupee, BellOff, X } from "lucide-react";
import { Link } from "react-router-dom";

type NotificationType = "order" | "logistics" | "inventory" | "system" | "finance";

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
    linkName?: string;
    linkUrl?: string;
}

const mockNotifications: Notification[] = [
    {
        id: "1", type: "order", title: "New order received",
        message: "Order #ORD-2024-0432 has been placed by Rahul Sharma via Amazon.",
        time: "10 mins ago", read: false, linkName: "View Order #4523", linkUrl: "/orders/ORD-2024-0432"
    },
    {
        id: "2", type: "logistics", title: "Courier assigned",
        message: "Delhivery has been assigned for Order #ORD-2024-0431. AWB: 23940294029. Pickup scheduled for today.",
        time: "1 hour ago", read: false, linkName: "Track Shipment", linkUrl: "/logistics/track/23940294029"
    },
    {
        id: "3", type: "inventory", title: "Low stock warning",
        message: "Wireless Earphones Pro is running low. Only 3 units remaining across all fulfillment centers.",
        time: "2 hours ago", read: false, linkName: "Update Stock", linkUrl: "/inventory/update"
    },
    {
        id: "4", type: "system", title: "Platform sync error",
        message: "Flipkart connection lost. Order sync paused. Please re-authenticate your channel.",
        time: "Yesterday", read: true, linkName: "Reconnect Now", linkUrl: "/settings/integrations"
    },
    {
        id: "5", type: "finance", title: "Payment received",
        message: "Settlement of ₹12,450 from Amazon has been successfully deposited to your bank account.",
        time: "Yesterday", read: true
    },
];

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [activeTab, setActiveTab] = useState("all");

    const filteredNotifications = notifications.filter(n => {
        if (activeTab === "all") return true;
        if (activeTab === "orders" && n.type === "order") return true;
        if (activeTab === "inventory" && n.type === "inventory") return true;
        if (activeTab === "logistics" && n.type === "logistics") return true;
        if (activeTab === "system" && (n.type === "system" || n.type === "finance")) return true;
        return false;
    });

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case "order": return <ShoppingCart className="w-5 h-5 text-brand-jade" />;
            case "logistics": return <Truck className="w-5 h-5 text-brand-lake" />;
            case "inventory": return <AlertTriangle className="w-5 h-5 text-brand-saffron" />;
            case "system": return <XCircle className="w-5 h-5 text-semantic-error" />;
            case "finance": return <IndianRupee className="w-5 h-5 text-brand-jade" />;
        }
    };

    const getIconBg = (type: NotificationType) => {
        switch (type) {
            case "order": return "bg-brand-jade/10";
            case "logistics": return "bg-brand-lake/10";
            case "inventory": return "bg-brand-saffron/10";
            case "system": return "bg-semantic-error/10";
            case "finance": return "bg-brand-jade/10";
        }
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const dismissNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-display-md text-brand-dark">Notifications</h1>
                    <p className="text-body-md text-text-muted mt-1">Stay updated with everything happening in your store.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 text-brand-lake border-border hover:bg-bg-subtle" onClick={markAllRead}>
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all as read
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 border-border hover:bg-bg-subtle" asChild>
                        <Link to="/settings/notifications">
                            <Settings className="w-5 h-5 text-text-muted" />
                        </Link>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-bg-subtle p-1 h-auto rounded-xl flex-wrap">
                    <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-sm">All</TabsTrigger>
                    <TabsTrigger value="orders" className="rounded-lg px-4 py-2 text-sm">Orders</TabsTrigger>
                    <TabsTrigger value="inventory" className="rounded-lg px-4 py-2 text-sm">Inventory</TabsTrigger>
                    <TabsTrigger value="logistics" className="rounded-lg px-4 py-2 text-sm">Logistics</TabsTrigger>
                    <TabsTrigger value="system" className="rounded-lg px-4 py-2 text-sm">System</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden min-h-[400px]">
                {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 bg-bg-subtle rounded-full flex items-center justify-center mb-4">
                            <BellOff className="w-8 h-8 text-text-muted/50" />
                        </div>
                        <h3 className="text-body-lg font-semibold text-brand-dark mb-1">You're all caught up!</h3>
                        <p className="text-body-sm text-text-muted text-balance max-w-xs">There are no notifications matching this category.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border/40">
                        {filteredNotifications.map((notif) => (
                            <div key={notif.id} className={`group flex gap-4 p-5 hover:bg-bg-subtle transition-colors relative ${!notif.read ? 'bg-brand-lake/5' : ''}`}>
                                {!notif.read && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-lake" />
                                )}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${getIconBg(notif.type)}`}>
                                    {getIcon(notif.type)}
                                </div>
                                <div className="flex-1 min-w-0 pr-8">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <h4 className={`text-base font-semibold ${!notif.read ? 'text-brand-dark' : 'text-brand-dark/80'}`}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-xs text-text-muted whitespace-nowrap shrink-0">{notif.time}</span>
                                    </div>
                                    <p className={`text-body-sm mb-3 ${!notif.read ? 'text-brand-dark/80' : 'text-text-muted'}`}>
                                        {notif.message}
                                    </p>
                                    {notif.linkName && (
                                        <Link to={notif.linkUrl || "#"} className="text-sm font-medium text-brand-lake hover:underline inline-flex items-center">
                                            {notif.linkName} <ArrowRight className="w-3 h-3 ml-1" />
                                        </Link>
                                    )}
                                </div>
                                <button
                                    className="absolute right-4 top-5 opacity-0 group-hover:opacity-100 p-2 text-text-muted hover:text-semantic-error hover:bg-semantic-error/10 rounded-lg transition-all"
                                    onClick={() => dismissNotification(notif.id)}
                                    title="Dismiss notification"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
