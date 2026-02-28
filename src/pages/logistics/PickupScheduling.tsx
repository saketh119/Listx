import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Truck, Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockOrders } from "@/data/mockOrders";

const timeSlots = [
    { id: 'morning', label: 'Morning', time: '9:00 AM - 12:00 PM', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 3:00 PM', icon: '☀️' },
    { id: 'evening', label: 'Evening', time: '3:00 PM - 6:00 PM', icon: '🌇' },
    { id: 'night', label: 'Night', time: '6:00 PM - 9:00 PM', icon: '🌙' },
];

export default function PickupScheduling() {
    const [pickupDate, setPickupDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
    const [scheduled, setScheduled] = useState(false);

    const readyOrders = mockOrders.filter(o => o.status === 'packed' && o.courier);

    const toggleOrder = (id: string) => {
        setSelectedOrders(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    };

    if (scheduled) {
        return (
            <div className="max-w-xl mx-auto pb-12 pt-12 text-center">
                <div className="bg-white rounded-2xl border border-brand-jade/30 shadow-sm p-10">
                    <div className="w-20 h-20 rounded-full bg-brand-jade/10 flex items-center justify-center mx-auto mb-6 animate-in zoom-in-50 duration-500">
                        <Check className="w-10 h-10 text-brand-jade" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark mb-2">Pickup Scheduled!</h2>
                    <p className="text-sm text-text-muted mb-1">{selectedOrders.size} orders ready for pickup</p>
                    <p className="text-sm font-medium text-brand-dark mb-6">{pickupDate} • {timeSlots.find(s => s.id === selectedSlot)?.time}</p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" asChild className="rounded-xl"><Link to="/dashboard/logistics">Dashboard</Link></Button>
                        <Button asChild className="rounded-xl shadow-brand-lake/20"><Link to="/dashboard/logistics/shipments">Track Shipments</Link></Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/logistics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Logistics</Link>
            </Button>

            <h1 className="text-display-sm font-bold text-brand-dark mb-1">Schedule Pickup</h1>
            <p className="text-body-sm text-text-muted mb-6">{readyOrders.length} packed orders ready for courier pickup</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2"><Package className="w-4 h-4 text-brand-lake" /> Packed Orders</h3>
                        <button onClick={() => setSelectedOrders(new Set(readyOrders.map(o => o.id)))} className="text-xs text-brand-lake hover:underline">Select All</button>
                    </div>
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                        {readyOrders.map(order => (
                            <label key={order.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${selectedOrders.has(order.id) ? 'bg-brand-lake/5 border border-brand-lake/20' : 'hover:bg-bg-subtle border border-transparent'}`}>
                                <input type="checkbox" checked={selectedOrders.has(order.id)} onChange={() => toggleOrder(order.id)} className="w-4 h-4 rounded accent-brand-lake" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-bold text-brand-dark">{order.id}</span>
                                        <Badge variant="outline" className="text-[10px] capitalize border-border/40">{order.platform}</Badge>
                                        <Badge className="bg-cyan-500/10 text-cyan-600 border-transparent text-[10px]">Packed</Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-text-muted mt-0.5">
                                        <span>{order.customerName}</span>
                                        <span>•</span>
                                        <span>{order.deliveryAddress.city}</span>
                                        {order.courier && <><span>•</span><span className="font-medium">{order.courier.name}</span></>}
                                    </div>
                                </div>
                            </label>
                        ))}
                        {readyOrders.length === 0 && (
                            <div className="text-center py-8"><p className="text-sm text-text-muted">No packed orders with courier assigned</p></div>
                        )}
                    </div>
                </div>

                {/* Right — Schedule */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 h-fit sticky top-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-lake" /> Pickup Details</h3>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Date</Label>
                            <Input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="rounded-xl bg-bg-subtle border-transparent h-11" />
                        </div>

                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Time Slot</Label>
                            <div className="space-y-2">
                                {timeSlots.map(slot => (
                                    <button key={slot.id} onClick={() => setSelectedSlot(slot.id)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedSlot === slot.id ? 'border-brand-lake bg-brand-lake/5' : 'border-border/40 hover:border-border'}`}>
                                        <span className="text-lg">{slot.icon}</span>
                                        <div className="flex-1">
                                            <span className="text-xs font-bold text-brand-dark">{slot.label}</span>
                                            <p className="text-[10px] text-text-muted">{slot.time}</p>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 ${selectedSlot === slot.id ? 'border-brand-lake bg-brand-lake' : 'border-border'}`}>
                                            {selectedSlot === slot.id && <Check className="w-2.5 h-2.5 text-white" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-3 rounded-xl bg-bg-subtle/50">
                            <div className="flex items-center gap-1.5 text-xs text-text-muted"><MapPin className="w-3 h-3" /> Pickup: Warehouse, Bengaluru</div>
                        </div>

                        {selectedOrders.size > 0 && (
                            <div className="p-3 rounded-xl bg-brand-lake/5 border border-brand-lake/20">
                                <div className="flex justify-between text-xs"><span className="text-text-muted">Orders</span><span className="font-bold text-brand-dark">{selectedOrders.size}</span></div>
                                <div className="flex justify-between text-xs mt-1"><span className="text-text-muted">Packages</span><span className="font-bold text-brand-dark">{selectedOrders.size}</span></div>
                            </div>
                        )}

                        <Button disabled={selectedOrders.size === 0 || !pickupDate || !selectedSlot} onClick={() => setScheduled(true)}
                            className="w-full rounded-xl shadow-brand-lake/20 font-medium h-11">
                            <Truck className="w-4 h-4 mr-2" /> Schedule Pickup
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
