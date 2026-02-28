import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft, Copy, MapPin, Phone, Truck, Package,
    CheckCircle2, AlertTriangle, Clock, ExternalLink
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { activeShipments } from "@/data/mockLogistics";
import { useState } from "react";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    pickup_pending: { label: 'Pickup Pending', color: 'text-purple-600', bg: 'bg-purple-500/10' },
    picked_up: { label: 'Picked Up', color: 'text-blue-600', bg: 'bg-blue-500/10' },
    in_transit: { label: 'In Transit', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    out_for_delivery: { label: 'Out for Delivery', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    delivered: { label: 'Delivered', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    delivery_attempted: { label: 'Attempt Failed', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    exception: { label: 'Exception', color: 'text-semantic-error', bg: 'bg-semantic-error/10' },
};

export default function ShipmentTracker() {
    const { awb } = useParams<{ awb: string }>();
    const shipment = activeShipments.find(s => s.awb === awb);
    const [copied, setCopied] = useState(false);

    if (!shipment) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-20 h-20 rounded-full bg-semantic-error/10 flex items-center justify-center mb-6">
                    <Truck className="w-10 h-10 text-semantic-error" />
                </div>
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Shipment Not Found</h2>
                <p className="text-body-sm text-text-muted mb-6">This AWB number doesn't exist in the system.</p>
                <Button asChild className="rounded-xl"><Link to="/dashboard/logistics/shipments">← Back to Shipments</Link></Button>
            </div>
        );
    }

    const sc = statusConfig[shipment.status];

    const copyAwb = () => {
        navigator.clipboard.writeText(shipment.awb);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/logistics/shipments"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Shipments</Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Shipment Details */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Header Card */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-xl font-bold text-brand-dark font-mono">{shipment.awb}</h1>
                                    <button onClick={copyAwb} className="text-text-muted hover:text-brand-lake">
                                        {copied ? <CheckCircle2 className="w-4 h-4 text-brand-jade" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-xs text-text-muted">Order: <Link to={`/dashboard/orders/${shipment.orderId}`} className="text-brand-lake hover:underline">{shipment.orderId}</Link></p>
                            </div>
                            <Badge className={`${sc.bg} ${sc.color} border-transparent text-xs px-3 py-1`}>{sc.label}</Badge>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-subtle/50">
                            <div className="w-10 h-10 rounded-xl bg-white border border-border/40 flex items-center justify-center text-sm font-bold text-brand-dark shadow-sm">
                                {shipment.courierLogo}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-dark">{shipment.courierName}</p>
                                <p className="text-[10px] text-text-muted">Courier Partner</p>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-auto h-8 px-3 text-xs text-brand-lake"><ExternalLink className="w-3 h-3 mr-1" /> Track on Site</Button>
                        </div>
                    </div>

                    {/* Route Map Placeholder */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-lake" /> Shipment Route</h3>
                        <div className="relative py-6 px-4">
                            <div className="flex items-center justify-between relative">
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-bg-subtle -translate-y-1/2 rounded-full" />
                                <div className="absolute top-1/2 left-0 h-1 bg-brand-jade -translate-y-1/2 rounded-full transition-all duration-500"
                                    style={{ width: `${(shipment.checkpoints.findIndex(c => c.isCurrent) / Math.max(shipment.checkpoints.length - 1, 1)) * 100}%` }} />
                                {shipment.checkpoints.length > 0 ? shipment.checkpoints.map((cp, i) => (
                                    <div key={i} className="relative z-10 flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${cp.isCurrent ? 'bg-brand-lake border-brand-lake text-white animate-pulse' : i < shipment.checkpoints.findIndex(c => c.isCurrent) ? 'bg-brand-jade border-brand-jade text-white' : 'bg-white border-border text-text-muted'}`}>
                                            {cp.isCurrent ? <Truck className="w-3.5 h-3.5" /> : i < shipment.checkpoints.findIndex(c => c.isCurrent) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                        </div>
                                        <p className="text-[10px] font-bold text-brand-dark mt-2 text-center max-w-[80px]">{cp.city}</p>
                                        <p className="text-[9px] text-text-muted text-center max-w-[80px]">{cp.facility}</p>
                                    </div>
                                )) : (
                                    <div className="w-full text-center py-4">
                                        <p className="text-xs text-text-muted">Awaiting pickup — no tracking updates yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Detailed Timeline */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-5 flex items-center gap-2"><Clock className="w-4 h-4 text-brand-lake" /> Tracking History</h3>
                        <div className="space-y-0">
                            {[...shipment.checkpoints].reverse().map((cp, i) => (
                                <div key={i} className="flex gap-3 pb-4 last:pb-0">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${cp.isCurrent ? 'bg-brand-lake text-white' : i === shipment.checkpoints.length - 1 ? 'bg-brand-jade/10 text-brand-jade' : 'bg-bg-subtle text-text-muted'}`}>
                                            {cp.isCurrent ? <MapPin className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5" />}
                                        </div>
                                        {i < shipment.checkpoints.length - 1 && <div className="w-px flex-1 bg-border/40 mt-1" />}
                                    </div>
                                    <div>
                                        <p className={`text-xs font-medium ${cp.isCurrent ? 'text-brand-dark' : 'text-text-muted'}`}>{cp.status}</p>
                                        <p className="text-[10px] text-text-muted/60 mt-0.5">{cp.city} — {cp.facility}</p>
                                        <p className="text-[10px] text-text-muted/40">{new Date(cp.timestamp).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="flex flex-col gap-5">
                    {/* Shipment Summary */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sticky top-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4">Shipment Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs"><span className="text-text-muted">Origin</span><span className="font-medium text-brand-dark">{shipment.origin}</span></div>
                            <div className="flex justify-between text-xs"><span className="text-text-muted">Destination</span><span className="font-medium text-brand-dark">{shipment.destination}</span></div>
                            <Separator className="bg-border/40" />
                            <div className="flex justify-between text-xs"><span className="text-text-muted">Current Location</span><span className="font-medium text-brand-dark">{shipment.currentLocation}</span></div>
                            <div className="flex justify-between text-xs"><span className="text-text-muted">Last Update</span><span className="font-medium text-brand-dark">{new Date(shipment.lastUpdate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span></div>
                            <div className="flex justify-between text-xs"><span className="text-text-muted">ETA</span><span className="font-medium text-brand-dark">{new Date(shipment.eta).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                            <Separator className="bg-border/40" />
                            {shipment.exceptionType && (
                                <div className="p-3 rounded-xl bg-semantic-error/5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertTriangle className="w-3.5 h-3.5 text-semantic-error" />
                                        <span className="text-xs font-bold text-semantic-error">Exception</span>
                                    </div>
                                    <p className="text-[11px] text-semantic-error/80">{shipment.exceptionType}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 space-y-2">
                            <Button className="w-full rounded-xl shadow-brand-lake/20 font-medium">
                                <Phone className="w-4 h-4 mr-2" /> Contact Courier
                            </Button>
                            <Button variant="outline" className="w-full rounded-xl border-border/60 text-sm font-medium">
                                Reschedule Delivery
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
