import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, Lock, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "@/data/mockOrders";

export default function OrderEdit() {
    const { id } = useParams<{ id: string }>();
    const order = mockOrders.find(o => o.id === id);

    const [form, setForm] = useState({
        addressLine1: order?.deliveryAddress.line1 || '',
        addressLine2: order?.deliveryAddress.line2 || '',
        city: order?.deliveryAddress.city || '',
        state: order?.deliveryAddress.state || '',
        pincode: order?.deliveryAddress.pincode || '',
        phone: order?.customerPhone || '',
        email: order?.customerEmail || '',
        notes: order?.notes || '',
        tags: order?.tags.join(', ') || '',
    });

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Order Not Found</h2>
                <Button asChild className="rounded-xl"><Link to="/dashboard/orders">← Back to Orders</Link></Button>
            </div>
        );
    }

    const isEditable = !['amazon', 'flipkart'].includes(order.platform);

    return (
        <div className="max-w-3xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to={`/dashboard/orders/${order.id}`}><ArrowLeft className="w-4 h-4 mr-2" /> Back to {order.id}</Link>
            </Button>

            <h1 className="text-display-sm font-bold text-brand-dark mb-2">Edit Order {order.id}</h1>

            {/* Warning Banner */}
            <div className="bg-brand-saffron/5 border border-brand-saffron/20 rounded-xl p-4 flex items-start gap-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-brand-saffron shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-bold text-brand-saffron">Editing orders will log an audit trail</p>
                    <p className="text-xs text-brand-saffron/70">Changes may affect platform records. All edits are timestamped.</p>
                </div>
            </div>

            {/* Non-editable Fields */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-5">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Read-Only Fields</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <Label className="text-xs text-text-muted mb-1.5 block flex items-center gap-1"><Lock className="w-3 h-3" /> Order ID</Label>
                        <div className="h-10 px-3 rounded-xl bg-bg-subtle border-transparent flex items-center font-mono text-sm text-text-muted">{order.id}</div>
                    </div>
                    <div>
                        <Label className="text-xs text-text-muted mb-1.5 block flex items-center gap-1"><Lock className="w-3 h-3" /> Platform</Label>
                        <div className="h-10 px-3 rounded-xl bg-bg-subtle border-transparent flex items-center text-sm text-text-muted capitalize">{order.platform}</div>
                    </div>
                    <div>
                        <Label className="text-xs text-text-muted mb-1.5 block flex items-center gap-1"><Lock className="w-3 h-3" /> Payment Amount</Label>
                        <div className="h-10 px-3 rounded-xl bg-bg-subtle border-transparent flex items-center text-sm font-bold text-text-muted">₹{order.total.toLocaleString()}</div>
                    </div>
                </div>
                <p className="text-[11px] text-text-muted mt-3 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> These fields are managed by {order.platform.charAt(0).toUpperCase() + order.platform.slice(1)}
                </p>
            </div>

            {/* Editable: Delivery Address */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-5">
                <h3 className="text-sm font-bold text-brand-dark mb-4">Delivery Address</h3>
                <div className="space-y-4">
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Address Line 1</Label>
                        <Input value={form.addressLine1} onChange={e => setForm(f => ({ ...f, addressLine1: e.target.value }))}
                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                    </div>
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Address Line 2</Label>
                        <Input value={form.addressLine2} onChange={e => setForm(f => ({ ...f, addressLine2: e.target.value }))}
                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" placeholder="Landmark, floor, etc." />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">City</Label>
                            <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                                className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                        </div>
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">State</Label>
                            <Input value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                                className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                        </div>
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Pincode</Label>
                            <Input value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))}
                                className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-5">
                <h3 className="text-sm font-bold text-brand-dark mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Phone</Label>
                        <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                    </div>
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Email</Label>
                        <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                    </div>
                </div>
            </div>

            {/* Notes & Tags */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-5">
                <h3 className="text-sm font-bold text-brand-dark mb-4">Notes & Tags</h3>
                <div className="space-y-4">
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Internal Notes</Label>
                        <Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white min-h-[100px] resize-none" placeholder="Not visible to customer..." />
                    </div>
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Tags (comma separated)</Label>
                        <Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" placeholder="priority, bulk, gift..." />
                    </div>
                </div>
            </div>

            {/* Items — locked for platform orders */}
            {!isEditable && (
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-5 opacity-60">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-text-muted">Order Items</h3>
                        <Badge variant="outline" className="text-[10px] border-border/40"><Lock className="w-2.5 h-2.5 mr-1" /> Platform managed</Badge>
                    </div>
                    <p className="text-xs text-text-muted">Items cannot be modified for {order.platform} orders. Only address, contact, notes, and tags can be edited.</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
                <Button variant="outline" asChild className="rounded-xl border-border/60">
                    <Link to={`/dashboard/orders/${order.id}`}>Cancel</Link>
                </Button>
                <Button className="rounded-xl shadow-brand-lake/20 font-medium min-w-[180px]">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
            </div>
        </div>
    );
}
