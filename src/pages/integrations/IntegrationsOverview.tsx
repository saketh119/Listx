import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Plug, CheckCircle2, XCircle, AlertTriangle, RefreshCw,
    ArrowUpRight, Clock, Package, Truck, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    platformIntegrations, logisticsPartnerIntegrations
} from "@/data/mockIntegrations";
import { PlatformHealthModal } from "./components/PlatformHealthModal";
import { DisconnectModal } from "./components/DisconnectModal";

const statusCfg: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string; color: string; bg: string }> = {
    connected: { icon: CheckCircle2, label: 'Connected', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    disconnected: { icon: XCircle, label: 'Not Connected', color: 'text-text-muted', bg: 'bg-bg-subtle' },
    error: { icon: AlertTriangle, label: 'Error', color: 'text-semantic-error', bg: 'bg-semantic-error/10' },
    syncing: { icon: RefreshCw, label: 'Syncing...', color: 'text-brand-lake', bg: 'bg-brand-lake/10' },
};

export default function IntegrationsOverview() {
    const [healthPlatform, setHealthPlatform] = useState<string | null>(null);
    const [disconnectTarget, setDisconnectTarget] = useState<{ id: string; name: string; type: 'platform' | 'logistics' } | null>(null);

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3">
                        <Plug className="w-7 h-7 text-brand-lake" /> Integrations
                    </h1>
                    <p className="text-body-sm text-text-muted mt-1">Connect your sales channels and logistics partners</p>
                </div>
            </div>

            {/* Platforms */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center gap-2">
                        <Package className="w-4 h-4 text-brand-lake" /> Sales Channels
                    </h2>
                    <Badge variant="outline" className="text-[10px] border-border/40">
                        {platformIntegrations.filter(p => p.status === 'connected').length}/{platformIntegrations.length} connected
                    </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {platformIntegrations.map(p => {
                        const sc = statusCfg[p.status];
                        const StatusIcon = sc.icon;
                        return (
                            <div key={p.id} className={`bg-white rounded-2xl border shadow-sm p-5 transition-all hover:shadow-md ${p.status === 'error' ? 'border-semantic-error/30' : 'border-border/60'}`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center text-xl font-bold ${p.color}`}>
                                        {p.logo}
                                    </div>
                                    <Badge className={`${sc.bg} ${sc.color} border-transparent text-[10px]`}>
                                        <StatusIcon className="w-3 h-3 mr-1" />{sc.label}
                                    </Badge>
                                </div>
                                <h3 className="text-sm font-bold text-brand-dark mb-1">{p.name}</h3>
                                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-3">{p.type}</p>

                                {p.status === 'connected' ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-2 mb-3">
                                            <div className="p-2 rounded-lg bg-bg-subtle/50 text-center">
                                                <p className="text-lg font-bold text-brand-dark">{p.productsLinked}</p>
                                                <p className="text-[9px] text-text-muted">Products</p>
                                            </div>
                                            <div className="p-2 rounded-lg bg-bg-subtle/50 text-center">
                                                <p className="text-lg font-bold text-brand-dark">{p.ordersToday}</p>
                                                <p className="text-[9px] text-text-muted">Orders Today</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-text-muted mb-3">
                                            <Clock className="w-3 h-3" /> Last sync: {new Date(p.lastSync!).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => setHealthPlatform(p.id)} className="flex-1 rounded-lg text-[11px] h-8">
                                                Health
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => setDisconnectTarget({ id: p.id, name: p.name, type: 'platform' })}
                                                className="rounded-lg text-[11px] h-8 border-semantic-error/30 text-semantic-error hover:bg-semantic-error/5">
                                                Disconnect
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <Button asChild className="w-full rounded-xl shadow-brand-lake/20 font-medium mt-2">
                                        <Link to={`/dashboard/integrations/connect/${p.id}`}>
                                            <Zap className="w-4 h-4 mr-2" /> Connect
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Logistics */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center gap-2">
                        <Truck className="w-4 h-4 text-brand-lake" /> Logistics Partners
                    </h2>
                    <Badge variant="outline" className="text-[10px] border-border/40">
                        {logisticsPartnerIntegrations.filter(l => l.status === 'connected').length}/{logisticsPartnerIntegrations.length} connected
                    </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {logisticsPartnerIntegrations.map(l => {
                        const sc = statusCfg[l.status];
                        const StatusIcon = sc.icon;
                        return (
                            <div key={l.id} className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-11 h-11 rounded-xl ${l.bg} flex items-center justify-center text-sm font-bold ${l.color}`}>
                                        {l.logo}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-brand-dark">{l.name}</h3>
                                        <Badge className={`${sc.bg} ${sc.color} border-transparent text-[10px] mt-0.5`}>
                                            <StatusIcon className="w-3 h-3 mr-1" />{sc.label}
                                        </Badge>
                                    </div>
                                </div>

                                {l.status === 'connected' ? (
                                    <>
                                        <div className="space-y-1.5 mb-3 text-xs">
                                            <div className="flex justify-between"><span className="text-text-muted">Shipments (month)</span><span className="font-bold text-brand-dark">{l.shipmentsThisMonth}</span></div>
                                            <div className="flex justify-between"><span className="text-text-muted">COD</span><span className={l.codEnabled ? 'text-brand-jade font-medium' : 'text-text-muted'}>{l.codEnabled ? '✓ Enabled' : '✗ Disabled'}</span></div>
                                            <div className="flex justify-between"><span className="text-text-muted">Auto Manifest</span><span className={l.autoManifest ? 'text-brand-jade font-medium' : 'text-text-muted'}>{l.autoManifest ? '✓ On' : '✗ Off'}</span></div>
                                            <div className="flex justify-between"><span className="text-text-muted">Tracking Webhook</span><span className={l.trackingWebhook ? 'text-brand-jade font-medium' : 'text-text-muted'}>{l.trackingWebhook ? '✓ Active' : '✗ Inactive'}</span></div>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => setDisconnectTarget({ id: l.id, name: l.name, type: 'logistics' })}
                                            className="w-full rounded-lg text-[11px] h-8 border-semantic-error/30 text-semantic-error hover:bg-semantic-error/5">
                                            Disconnect
                                        </Button>
                                    </>
                                ) : (
                                    <Button asChild className="w-full rounded-xl shadow-brand-lake/20 font-medium mt-2">
                                        <Link to={`/dashboard/integrations/connect-logistics/${l.id}`}>
                                            <Zap className="w-4 h-4 mr-2" /> Connect
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modals */}
            {healthPlatform && (
                <PlatformHealthModal
                    open={!!healthPlatform}
                    onOpenChange={() => setHealthPlatform(null)}
                    platformId={healthPlatform}
                />
            )}
            {disconnectTarget && (
                <DisconnectModal
                    open={!!disconnectTarget}
                    onOpenChange={() => setDisconnectTarget(null)}
                    name={disconnectTarget.name}
                    type={disconnectTarget.type}
                />
            )}
        </div>
    );
}
