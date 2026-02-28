import { CheckCircle2, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SettingsLayout } from "./SettingsLayout";
import { billingPlan } from "@/data/mockAnalytics";

const plans = [
    { name: 'Starter', price: 999, features: ['100 products', '2 team members', 'Basic analytics'], current: false },
    { name: 'Pro', price: 2999, features: ['Unlimited products', '5 team members', 'AI Studio', 'Priority support', 'API access'], current: true },
    { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Unlimited members', 'Dedicated support', 'Custom integrations', 'SLA guarantee'], current: false },
];

export default function BillingSettings() {
    return (
        <SettingsLayout>
            <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-white rounded-2xl border border-brand-lake/30 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <Badge className="bg-brand-lake/10 text-brand-lake border-transparent text-xs mb-1">Current Plan</Badge>
                            <h3 className="text-xl font-bold text-brand-dark">{billingPlan.name} — ₹{billingPlan.price}/mo</h3>
                        </div>
                        <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium">Change Plan</Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-xl bg-bg-subtle/50 text-center">
                            <p className="text-lg font-bold text-brand-dark">{billingPlan.usage.products}</p>
                            <p className="text-[9px] text-text-muted">Products (Unlimited)</p>
                        </div>
                        <div className="p-3 rounded-xl bg-bg-subtle/50 text-center">
                            <p className="text-lg font-bold text-brand-dark">{billingPlan.usage.orders}</p>
                            <p className="text-[9px] text-text-muted">Orders (This Month)</p>
                        </div>
                        <div className="p-3 rounded-xl bg-bg-subtle/50 text-center">
                            <p className="text-lg font-bold text-brand-dark">{billingPlan.usage.members}/{billingPlan.usage.membersLimit}</p>
                            <p className="text-[9px] text-text-muted">Team Members</p>
                        </div>
                        <div className="p-3 rounded-xl bg-bg-subtle/50 text-center">
                            <p className="text-sm font-bold text-brand-dark">{billingPlan.nextBillingDate}</p>
                            <p className="text-[9px] text-text-muted">Next Billing</p>
                        </div>
                    </div>
                </div>

                {/* Plans Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {plans.map(p => (
                        <div key={p.name} className={`bg-white rounded-2xl border shadow-sm p-5 ${p.current ? 'border-brand-lake/30 ring-2 ring-brand-lake/10' : 'border-border/60'}`}>
                            <h4 className="text-sm font-bold text-brand-dark mb-1">{p.name}</h4>
                            <p className="text-xl font-bold text-brand-dark mb-3">{typeof p.price === 'number' ? `₹${p.price}` : p.price}<span className="text-xs text-text-muted font-normal">{typeof p.price === 'number' ? '/mo' : ''}</span></p>
                            <div className="space-y-1.5 mb-4">
                                {p.features.map(f => (
                                    <div key={f} className="flex items-center gap-2 text-xs text-text-muted"><CheckCircle2 className="w-3 h-3 text-brand-jade" />{f}</div>
                                ))}
                            </div>
                            {p.current ? <Badge className="bg-brand-lake/10 text-brand-lake border-transparent text-xs w-full justify-center">Current Plan</Badge>
                                : <Button variant="outline" className="w-full rounded-xl border-border/60 text-xs">{p.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}</Button>}
                        </div>
                    ))}
                </div>

                {/* Payment + Invoices */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4">Payment Method</h3>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-subtle/50">
                            <CreditCard className="w-6 h-6 text-brand-lake" />
                            <div><p className="text-sm font-medium text-brand-dark">Visa •••• 4242</p><p className="text-[10px] text-text-muted">Expires 12/2026</p></div>
                        </div>
                        <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium mt-3 w-full">Update Card</Button>
                    </div>

                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                        <h3 className="text-sm font-bold text-brand-dark mb-4">Recent Invoices</h3>
                        <div className="space-y-2">
                            {['Dec 2024', 'Nov 2024', 'Oct 2024'].map((m) => (
                                <div key={m} className="flex items-center justify-between p-3 rounded-xl bg-bg-subtle/30">
                                    <div><p className="text-xs font-medium text-brand-dark">{m}</p><p className="text-[10px] text-text-muted">₹{billingPlan.price} — Pro Plan</p></div>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-brand-jade/10 text-brand-jade border-transparent text-[9px]">Paid</Badge>
                                        <button className="text-text-muted hover:text-brand-lake"><Download className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
