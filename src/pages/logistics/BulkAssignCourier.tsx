import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Truck, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "@/data/mockOrders";
import { courierPartners } from "@/data/mockLogistics";
import { CourierRecommendationModal } from "./components/CourierRecommendationModal";

export default function BulkAssignCourier() {
    const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
    const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [assigned, setAssigned] = useState(false);

    const unassigned = mockOrders.filter(o => !o.courier && o.status !== 'cancelled' && o.status !== 'delivered');
    const available = courierPartners.filter(c => c.status !== 'down');

    const toggleOrder = (id: string) => {
        setSelectedOrders(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    };
    const selectAll = () => setSelectedOrders(new Set(unassigned.map(o => o.id)));

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/logistics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Logistics</Link>
            </Button>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Bulk Courier Assignment</h1>
                    <p className="text-body-sm text-text-muted mt-1">{unassigned.length} orders awaiting courier assignment</p>
                </div>
                <Button variant="outline" onClick={() => setShowRecommendation(true)} className="rounded-xl border-brand-lake/30 text-brand-lake">
                    <Zap className="w-4 h-4 mr-2" /> AI Auto-Assign
                </Button>
            </div>

            {assigned ? (
                <div className="bg-white rounded-2xl border border-brand-jade/30 shadow-sm p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-jade/10 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-brand-jade" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark mb-1">Courier Assigned!</h2>
                    <p className="text-sm text-text-muted mb-4">{selectedOrders.size} orders assigned to {available.find(c => c.id === selectedCourier)?.name}</p>
                    <Button asChild className="rounded-xl"><Link to="/dashboard/logistics/shipments">View Shipments</Link></Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Orders Column */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2"><Package className="w-4 h-4 text-brand-lake" /> Select Orders</h3>
                            <button onClick={selectAll} className="text-xs text-brand-lake hover:underline">Select All ({unassigned.length})</button>
                        </div>
                        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                            {unassigned.map(order => (
                                <label key={order.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${selectedOrders.has(order.id) ? 'bg-brand-lake/5 border border-brand-lake/20' : 'hover:bg-bg-subtle border border-transparent'}`}>
                                    <input type="checkbox" checked={selectedOrders.has(order.id)} onChange={() => toggleOrder(order.id)} className="w-4 h-4 rounded accent-brand-lake" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-brand-dark">{order.id}</span>
                                            <Badge variant="outline" className="text-[10px] capitalize border-border/40">{order.platform}</Badge>
                                        </div>
                                        <p className="text-xs text-text-muted mt-0.5">{order.customerName} — {order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                                    </div>
                                    <span className="text-xs font-bold text-brand-dark shrink-0">₹{order.total.toLocaleString()}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Courier Selection */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 h-fit sticky top-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><Truck className="w-4 h-4 text-brand-lake" /> Select Courier</h3>
                        <div className="space-y-2 mb-4">
                            {available.map(c => (
                                <button key={c.id} onClick={() => setSelectedCourier(c.id)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedCourier === c.id ? 'border-brand-lake bg-brand-lake/5' : 'border-border/40 hover:border-border'}`}>
                                    <div className="w-8 h-8 rounded-lg bg-bg-subtle flex items-center justify-center text-xs font-bold text-brand-dark">{c.logo}</div>
                                    <div className="flex-1">
                                        <span className="text-xs font-bold text-brand-dark">{c.name}</span>
                                        <div className="flex gap-2 text-[10px] text-text-muted"><span>₹{c.costPerShipment}</span><span>{c.onTimePercent}%</span></div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 ${selectedCourier === c.id ? 'border-brand-lake bg-brand-lake' : 'border-border'}`}>
                                        {selectedCourier === c.id && <Check className="w-2.5 h-2.5 text-white" />}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {selectedOrders.size > 0 && selectedCourier && (
                            <div className="p-3 rounded-xl bg-bg-subtle/50 mb-4">
                                <div className="flex justify-between text-xs"><span className="text-text-muted">Orders</span><span className="font-bold text-brand-dark">{selectedOrders.size}</span></div>
                                <div className="flex justify-between text-xs mt-1"><span className="text-text-muted">Est. Cost</span><span className="font-bold text-brand-dark">₹{(selectedOrders.size * (available.find(c => c.id === selectedCourier)?.costPerShipment || 0)).toLocaleString()}</span></div>
                            </div>
                        )}

                        <Button disabled={selectedOrders.size === 0 || !selectedCourier} onClick={() => setAssigned(true)}
                            className="w-full rounded-xl shadow-brand-lake/20 font-medium">
                            <Truck className="w-4 h-4 mr-2" /> Assign {selectedOrders.size} Orders
                        </Button>
                    </div>
                </div>
            )}

            <CourierRecommendationModal open={showRecommendation} onOpenChange={setShowRecommendation} />
        </div>
    );
}
