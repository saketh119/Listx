import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft, Copy, Check, MapPin,
    Package, CreditCard, Truck, Printer, FileText, XCircle,
    AlertTriangle, MessageSquare, Tag, Clock, User, ShoppingCart, CheckCircle2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { mockOrders } from "@/data/mockOrders";
import { CourierRecommendationModal } from "@/pages/logistics/components/CourierRecommendationModal";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    new: { label: 'New', color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
    processing: { label: 'Processing', color: 'text-blue-600', bg: 'bg-blue-500/10' },
    packed: { label: 'Packed', color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
    shipped: { label: 'Shipped', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    delivered: { label: 'Delivered', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    returned: { label: 'Returned', color: 'text-orange-600', bg: 'bg-orange-500/10' },
    cancelled: { label: 'Cancelled', color: 'text-semantic-error', bg: 'bg-semantic-error/10' },
};

const platformConfig: Record<string, { label: string; color: string; bg: string; initial: string }> = {
    amazon: { label: 'Amazon', color: 'text-amber-600', bg: 'bg-amber-500/10', initial: 'A' },
    flipkart: { label: 'Flipkart', color: 'text-yellow-600', bg: 'bg-yellow-500/10', initial: 'F' },
    shopify: { label: 'Shopify', color: 'text-green-600', bg: 'bg-green-500/10', initial: 'S' },
    ondc: { label: 'ONDC', color: 'text-purple-600', bg: 'bg-purple-500/10', initial: 'O' },
};

const timelineSteps = ['Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

const timelineIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'shopping-cart': ShoppingCart, 'credit-card': CreditCard, 'check-circle': CheckCircle2,
    'package': Package, 'truck': Truck, 'map-pin': MapPin, 'file-text': FileText,
    'x-circle': XCircle, 'rotate-ccw': ArrowLeft, 'check': Check,
};

export default function OrderDetail() {
    const { id } = useParams<{ id: string }>();
    const order = mockOrders.find(o => o.id === id);
    const [copied, setCopied] = useState<string | null>(null);
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [notes, setNotes] = useState(order?.notes || '');
    const [showCourierModal, setShowCourierModal] = useState(false);

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-20 h-20 rounded-full bg-semantic-error/10 flex items-center justify-center mb-6">
                    <Package className="w-10 h-10 text-semantic-error" />
                </div>
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Order Not Found</h2>
                <p className="text-body-sm text-text-muted mb-6">This order doesn't exist or has been removed.</p>
                <Button asChild className="rounded-xl"><Link to="/dashboard/orders">← Back to Orders</Link></Button>
            </div>
        );
    }

    const sc = statusConfig[order.status];
    const pc = platformConfig[order.platform];

    const copyText = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const slaTime = new Date(order.slaDeadline);
    const now = new Date();
    const hoursToSla = Math.max(0, Math.round((slaTime.getTime() - now.getTime()) / 3600000));
    const slaUrgent = hoursToSla < 4;

    const currentStepIndex = ['new', 'processing', 'packed', 'shipped', 'delivered'].indexOf(
        order.status === 'cancelled' || order.status === 'returned' ? 'new' : order.status
    );

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Back */}
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/orders"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders</Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column — 2/3 */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    {/* Order Header */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h1 className="text-2xl font-bold text-brand-dark font-mono">{order.id}</h1>
                                    <button onClick={() => copyText(order.id, 'id')} className="text-text-muted hover:text-brand-lake">
                                        {copied === 'id' ? <Check className="w-4 h-4 text-brand-jade" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge className={`${pc.bg} ${pc.color} border-transparent text-xs`}>
                                        <span className="font-bold mr-1">{pc.initial}</span> {pc.label}
                                    </Badge>
                                    <span className="text-xs text-text-muted">{new Date(order.createdAt).toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                            <Badge className={`${sc.bg} ${sc.color} border-transparent text-sm px-4 py-1.5 font-bold`}>{sc.label}</Badge>
                        </div>
                        {order.status !== 'cancelled' && order.status !== 'returned' && (
                            <div className={`flex items-center gap-2 p-3 rounded-xl ${slaUrgent ? 'bg-semantic-error/5' : 'bg-bg-subtle/50'}`}>
                                <Clock className={`w-4 h-4 ${slaUrgent ? 'text-semantic-error' : 'text-text-muted'}`} />
                                <span className={`text-xs font-medium ${slaUrgent ? 'text-semantic-error' : 'text-text-muted'}`}>
                                    Ship by: {slaTime.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    {slaUrgent && ` — ${hoursToSla}h remaining!`}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><User className="w-4 h-4 text-brand-lake" /> Customer Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Name</span>
                                <span className="text-sm font-medium text-brand-dark">{order.customerName}</span>
                            </div>
                            <div>
                                <span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Phone</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-brand-dark">{showPhone ? '+91 98765' + order.customerPhone.slice(-4) : order.customerPhone}</span>
                                    <button onClick={() => setShowPhone(!showPhone)} className="text-xs text-brand-lake hover:underline">{showPhone ? 'Hide' : 'Reveal'}</button>
                                </div>
                            </div>
                            <div>
                                <span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Email</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-brand-dark">{showEmail ? order.customerEmail.replace('***', 'user') : order.customerEmail}</span>
                                    <button onClick={() => setShowEmail(!showEmail)} className="text-xs text-brand-lake hover:underline">{showEmail ? 'Hide' : 'Reveal'}</button>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4 bg-border/40" />
                        <div>
                            <span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Delivery Address</span>
                            <div className="flex items-start justify-between">
                                <div className="text-sm text-brand-dark leading-relaxed">
                                    <p>{order.deliveryAddress.line1}</p>
                                    {order.deliveryAddress.line2 && <p>{order.deliveryAddress.line2}</p>}
                                    <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} — {order.deliveryAddress.pincode}</p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button onClick={() => copyText(`${order.deliveryAddress.line1}, ${order.deliveryAddress.city} ${order.deliveryAddress.pincode}`, 'addr')}
                                        className="text-text-muted hover:text-brand-lake"><Copy className="w-3.5 h-3.5" /></button>
                                    <a href={`https://maps.google.com?q=${order.deliveryAddress.line1} ${order.deliveryAddress.city}`} target="_blank" rel="noreferrer"
                                        className="text-text-muted hover:text-brand-lake"><MapPin className="w-3.5 h-3.5" /></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><Package className="w-4 h-4 text-brand-lake" /> Order Items</h3>
                        <div className="space-y-3">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-bg-subtle/30">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-bg-subtle shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-brand-dark truncate">{item.title}</p>
                                        <p className="text-xs text-text-muted font-mono">{item.sku}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs text-text-muted">Qty: {item.qty}</p>
                                        <p className="text-sm font-bold text-brand-dark">₹{(item.unitPrice * item.qty).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Separator className="my-4 bg-border/40" />
                        <div className="space-y-1.5 max-w-xs ml-auto">
                            <div className="flex justify-between text-xs text-text-muted"><span>Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
                            {order.discount > 0 && <div className="flex justify-between text-xs text-brand-jade"><span>Discount</span><span>−₹{order.discount.toLocaleString()}</span></div>}
                            <div className="flex justify-between text-xs text-text-muted"><span>Tax (GST)</span><span>₹{order.tax.toLocaleString()}</span></div>
                            <Separator className="bg-border/40" />
                            <div className="flex justify-between text-sm font-bold text-brand-dark"><span>Total</span><span>₹{order.total.toLocaleString()}</span></div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-brand-lake" /> Payment</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Method</span>
                                <Badge className={`border-transparent text-xs ${order.paymentType === 'prepaid' ? 'bg-brand-jade/10 text-brand-jade' : 'bg-brand-saffron/10 text-brand-saffron'}`}>{order.paymentType.toUpperCase()}</Badge>
                            </div>
                            <div><span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Amount</span>
                                <span className="text-sm font-bold text-brand-dark">₹{order.total.toLocaleString()}</span></div>
                            <div><span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Status</span>
                                <Badge className={`border-transparent text-xs ${order.paymentStatus === 'paid' ? 'bg-brand-jade/10 text-brand-jade' : 'bg-brand-saffron/10 text-brand-saffron'}`}>{order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</Badge>
                            </div>
                            <div><span className="text-[11px] text-text-muted uppercase tracking-wider block mb-1">Transaction ID</span>
                                <span className="text-xs font-mono text-text-muted">{order.transactionId}</span></div>
                        </div>
                    </div>
                </div>

                {/* Right Column — 1/3 */}
                <div className="flex flex-col gap-5">
                    {/* Order Status Timeline (Screen 38) */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-5 flex items-center gap-2"><Clock className="w-4 h-4 text-brand-lake" /> Order Timeline</h3>
                        {/* Stepper */}
                        {order.status !== 'cancelled' && order.status !== 'returned' && (
                            <div className="flex items-center justify-between mb-6">
                                {timelineSteps.map((step, i) => (
                                    <div key={step} className="flex items-center">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${i <= currentStepIndex ? 'bg-brand-jade text-white' : 'bg-bg-subtle text-text-muted'}`}>
                                            {i < currentStepIndex ? <Check className="w-3 h-3" /> : i + 1}
                                        </div>
                                        {i < timelineSteps.length - 1 && (
                                            <div className={`h-0.5 w-4 sm:w-6 ${i < currentStepIndex ? 'bg-brand-jade' : 'bg-bg-subtle'}`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Detailed Timeline */}
                        <div className="space-y-0">
                            {[...order.timeline].reverse().map((event, i) => {
                                const IconComp = timelineIconMap[event.icon] || Clock;
                                return (
                                    <div key={i} className="flex gap-3 pb-4 last:pb-0">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${i === 0 ? 'bg-brand-lake/10 text-brand-lake' : 'bg-bg-subtle text-text-muted'}`}>
                                                <IconComp className="w-3.5 h-3.5" />
                                            </div>
                                            {i < order.timeline.length - 1 && <div className="w-px flex-1 bg-border/40 mt-1" />}
                                        </div>
                                        <div className="pb-1">
                                            <p className={`text-xs font-medium ${i === 0 ? 'text-brand-dark' : 'text-text-muted'}`}>{event.event}</p>
                                            <p className="text-[10px] text-text-muted/60 mt-0.5">
                                                {new Date(event.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                <span className="ml-1.5 capitalize">• {event.actor}</span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Logistics Card */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><Truck className="w-4 h-4 text-brand-lake" /> Logistics</h3>
                        {order.courier ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-subtle/50">
                                    <div className="w-10 h-10 rounded-lg bg-white border border-border/40 flex items-center justify-center text-sm font-bold text-brand-dark">
                                        {order.courier.logo}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-brand-dark">{order.courier.name}</p>
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono text-[10px] text-text-muted">{order.courier.awb}</span>
                                            <button onClick={() => copyText(order.courier!.awb, 'awb')} className="text-text-muted hover:text-brand-lake">
                                                {copied === 'awb' ? <Check className="w-3 h-3 text-brand-jade" /> : <Copy className="w-3 h-3" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {order.courier.pickupTime && (
                                    <div className="flex justify-between text-xs"><span className="text-text-muted">Pickup</span>
                                        <span className="font-medium text-brand-dark">{new Date(order.courier.pickupTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                )}
                                {order.courier.estimatedDelivery && (
                                    <div className="flex justify-between text-xs"><span className="text-text-muted">Est. Delivery</span>
                                        <span className="font-medium text-brand-dark">{new Date(order.courier.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                                    </div>
                                )}
                                <Button variant="outline" className="w-full rounded-xl border-border/60 text-sm font-medium mt-2" asChild>
                                    <Link to={`/dashboard/logistics/shipments/${order.courier.awb}`}><Truck className="w-4 h-4 mr-2" /> Track Shipment</Link>
                                </Button>
                                {order.status === 'packed' && (
                                    <button className="text-xs text-brand-lake hover:underline text-center w-full">Change Courier</button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-xs text-text-muted">No courier assigned yet</p>
                                <Button onClick={() => setShowCourierModal(true)} className="w-full rounded-xl shadow-brand-lake/20 font-medium">Assign Courier</Button>
                                <button onClick={() => setShowCourierModal(true)} className="text-xs text-brand-lake hover:underline text-center w-full">Auto-Assign (AI)</button>
                            </div>
                        )}
                    </div>

                    {/* Notes & Tags */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-brand-lake" /> Notes & Tags</h3>
                        <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add internal notes..."
                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white text-sm min-h-[80px] resize-none mb-3" />
                        {order.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {order.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-[10px] border-border/40 rounded-md px-2 py-0.5"><Tag className="w-2.5 h-2.5 mr-1" />{tag}</Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4">Actions</h3>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full rounded-xl border-border/60 text-sm font-medium justify-start h-10">
                                <Printer className="w-4 h-4 mr-2 text-text-muted" /> Print Shipping Label
                            </Button>
                            <Button variant="outline" className="w-full rounded-xl border-border/60 text-sm font-medium justify-start h-10">
                                <FileText className="w-4 h-4 mr-2 text-text-muted" /> Print Invoice
                            </Button>
                            {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                <Button variant="outline" className="w-full rounded-xl border-semantic-error/30 text-semantic-error hover:bg-semantic-error/5 text-sm font-medium justify-start h-10">
                                    <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                                </Button>
                            )}
                            <Button variant="outline" className="w-full rounded-xl border-border/60 text-sm font-medium justify-start h-10">
                                <AlertTriangle className="w-4 h-4 mr-2 text-text-muted" /> Raise Issue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Courier Recommendation Modal */}
            <CourierRecommendationModal
                open={showCourierModal}
                onOpenChange={setShowCourierModal}
                orderId={order.id}
                destination={`${order.deliveryAddress.city}, ${order.deliveryAddress.state}`}
            />
        </div>
    );
}
