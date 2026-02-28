import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Phone, MapPin, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { failedDeliveries } from "@/data/mockLogistics";

const reasonLabels: Record<string, { label: string; color: string }> = {
    customer_unavailable: { label: 'Customer Unavailable', color: 'text-brand-saffron' },
    wrong_address: { label: 'Wrong Address', color: 'text-semantic-error' },
    refused_delivery: { label: 'Refused Delivery', color: 'text-semantic-error' },
    package_damaged: { label: 'Package Damaged', color: 'text-orange-600' },
    address_not_found: { label: 'Address Not Found', color: 'text-semantic-error' },
};

export default function FailedDeliveries() {
    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/logistics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Logistics</Link>
                </Button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-semantic-error/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-semantic-error" />
                    </div>
                    <div>
                        <h1 className="text-display-sm font-bold text-brand-dark">Failed Deliveries</h1>
                        <p className="text-body-sm text-text-muted">{failedDeliveries.length} shipments need attention</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {failedDeliveries.map(fd => {
                    const reason = reasonLabels[fd.failureReason];
                    const maxedOut = fd.attempts >= fd.maxAttempts;
                    return (
                        <div key={fd.awb} className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${maxedOut ? 'border-semantic-error/30 bg-semantic-error/[0.02]' : 'border-border/60'}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-11 h-11 rounded-xl bg-white border border-border/40 flex items-center justify-center text-sm font-bold text-brand-dark shadow-sm shrink-0">
                                        {fd.courierLogo}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-sm font-bold text-brand-dark">{fd.awb}</span>
                                            <Badge className={`${maxedOut ? 'bg-semantic-error/10 text-semantic-error' : 'bg-brand-saffron/10 text-brand-saffron'} border-transparent text-[10px]`}>
                                                {fd.attempts}/{fd.maxAttempts} attempts
                                            </Badge>
                                        </div>
                                        <p className="text-sm font-medium text-brand-dark">{fd.customerName}</p>
                                        <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{fd.destination}</span>
                                            <span>{fd.courierName}</span>
                                            <span>Order: <Link to={`/dashboard/orders/${fd.orderId}`} className="text-brand-lake hover:underline">{fd.orderId}</Link></span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <AlertTriangle className={`w-3.5 h-3.5 ${reason.color}`} />
                                            <span className={`text-xs font-medium ${reason.color}`}>{reason.label}</span>
                                            <span className="text-[10px] text-text-muted">• Last attempt: {new Date(fd.lastAttempt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 shrink-0">
                                    {!maxedOut ? (
                                        <>
                                            <Button size="sm" className="h-8 px-3 text-xs rounded-lg"><RefreshCw className="w-3 h-3 mr-1" /> Reattempt</Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs rounded-lg"><Phone className="w-3 h-3 mr-1" /> Call</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button size="sm" variant="outline" className="h-8 px-3 text-xs rounded-lg border-semantic-error/30 text-semantic-error"><XCircle className="w-3 h-3 mr-1" /> RTO</Button>
                                            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs rounded-lg"><Phone className="w-3 h-3 mr-1" /> Call</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
