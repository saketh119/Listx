import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, Search, Truck, Package, AlertTriangle, Clock,
    MapPin, CheckCircle2, Eye
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activeShipments } from "@/data/mockLogistics";

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
    pickup_pending: { label: 'Pickup Pending', color: 'text-purple-600', bg: 'bg-purple-500/10', icon: Clock },
    picked_up: { label: 'Picked Up', color: 'text-blue-600', bg: 'bg-blue-500/10', icon: Package },
    in_transit: { label: 'In Transit', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10', icon: Truck },
    out_for_delivery: { label: 'Out for Delivery', color: 'text-brand-jade', bg: 'bg-brand-jade/10', icon: MapPin },
    delivered: { label: 'Delivered', color: 'text-brand-jade', bg: 'bg-brand-jade/10', icon: CheckCircle2 },
    delivery_attempted: { label: 'Attempt Failed', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10', icon: AlertTriangle },
    exception: { label: 'Exception', color: 'text-semantic-error', bg: 'bg-semantic-error/10', icon: AlertTriangle },
};

export default function ActiveShipments() {
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState('all');

    const filtered = activeShipments.filter(s => {
        if (search) {
            const q = search.toLowerCase();
            if (!s.awb.toLowerCase().includes(q) && !s.orderId.toLowerCase().includes(q) && !s.destination.toLowerCase().includes(q)) return false;
        }
        if (tab !== 'all') {
            if (tab === 'exceptions') return s.status === 'exception' || s.status === 'delivery_attempted';
            return s.status === tab;
        }
        return true;
    });

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/logistics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Logistics</Link>
                </Button>
                <h1 className="text-display-sm font-bold text-brand-dark">Active Shipments</h1>
                <p className="text-body-sm text-text-muted mt-1">{activeShipments.length} shipments being tracked</p>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 mb-5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input placeholder="Search by AWB, Order ID, destination..." value={search} onChange={e => setSearch(e.target.value)}
                        className="pl-10 rounded-xl bg-bg-subtle border-transparent h-11" />
                </div>
            </div>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab} className="mb-5">
                <TabsList className="bg-bg-subtle p-1 rounded-xl w-full justify-start overflow-x-auto">
                    <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm">All <span className="ml-1 text-xs opacity-60">{activeShipments.length}</span></TabsTrigger>
                    <TabsTrigger value="pickup_pending" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm">Pickup Pending</TabsTrigger>
                    <TabsTrigger value="in_transit" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm">In Transit</TabsTrigger>
                    <TabsTrigger value="out_for_delivery" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm">Out for Delivery</TabsTrigger>
                    <TabsTrigger value="exceptions" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm text-semantic-error">Exceptions</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Shipment Cards */}
            <div className="space-y-3">
                {filtered.map(shipment => {
                    const sc = statusConfig[shipment.status];
                    const StatusIcon = sc.icon;
                    return (
                        <div key={shipment.awb} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${shipment.status === 'exception' ? 'border-semantic-error/30' : 'border-border/60'}`}>
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-border/40 flex items-center justify-center text-sm font-bold text-brand-dark shadow-sm">
                                            {shipment.courierLogo}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm font-bold text-brand-dark">{shipment.awb}</span>
                                                <Badge variant="outline" className={`text-[10px] ${sc.bg} ${sc.color} border-transparent`}>
                                                    <StatusIcon className="w-3 h-3 mr-1" /> {sc.label}
                                                </Badge>
                                            </div>
                                            <span className="text-xs text-text-muted">{shipment.courierName} • {shipment.orderId}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild className="h-8 px-3 text-xs text-brand-lake rounded-lg">
                                        <Link to={`/dashboard/logistics/shipments/${shipment.awb}`}><Eye className="w-3.5 h-3.5 mr-1" /> Track</Link>
                                    </Button>
                                </div>

                                {/* Route */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-brand-lake" />
                                        <span className="text-xs font-medium text-brand-dark">{shipment.origin}</span>
                                    </div>
                                    <div className="flex-1 h-px bg-border/60 relative">
                                        <Truck className="w-3.5 h-3.5 text-brand-lake absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-medium text-brand-dark">{shipment.destination}</span>
                                        <div className="w-2 h-2 rounded-full bg-brand-jade" />
                                    </div>
                                </div>

                                {/* Current + ETA */}
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-text-muted">
                                        <MapPin className="w-3 h-3" /> {shipment.currentLocation}
                                    </div>
                                    <span className="text-text-muted">
                                        ETA: {new Date(shipment.eta).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                    </span>
                                </div>

                                {/* Exception badge */}
                                {shipment.exceptionType && (
                                    <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-semantic-error/5">
                                        <AlertTriangle className="w-3.5 h-3.5 text-semantic-error" />
                                        <span className="text-xs font-medium text-semantic-error">{shipment.exceptionType}</span>
                                    </div>
                                )}

                                {/* Checkpoints */}
                                {shipment.checkpoints.length > 0 && (
                                    <div className="mt-3 flex items-center gap-1">
                                        {shipment.checkpoints.map((cp, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${cp.isCurrent ? 'bg-brand-lake animate-pulse' : i < shipment.checkpoints.findIndex(c => c.isCurrent) ? 'bg-brand-jade' : 'bg-bg-subtle'}`} />
                                                {i < shipment.checkpoints.length - 1 && <div className={`w-6 h-0.5 ${i < shipment.checkpoints.findIndex(c => c.isCurrent) ? 'bg-brand-jade/40' : 'bg-bg-subtle'}`} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
