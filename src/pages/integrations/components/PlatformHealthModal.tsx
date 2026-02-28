import { Activity, Clock, Wifi, WifiOff, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { platformIntegrations } from "@/data/mockIntegrations";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    platformId: string;
}

export function PlatformHealthModal({ open, onOpenChange, platformId }: Props) {
    const platform = platformIntegrations.find(p => p.id === platformId);
    if (!platform || platform.status !== 'connected') return null;

    const healthColor = platform.apiHealth === 'healthy' ? 'text-brand-jade' : platform.apiHealth === 'degraded' ? 'text-brand-saffron' : 'text-semantic-error';
    const healthBg = platform.apiHealth === 'healthy' ? 'bg-brand-jade/10' : platform.apiHealth === 'degraded' ? 'bg-brand-saffron/10' : 'bg-semantic-error/10';
    const ratioPercent = platform.rateLimitUsed && platform.rateLimitTotal
        ? Math.round((platform.rateLimitUsed / platform.rateLimitTotal) * 100) : 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${platform.bg} flex items-center justify-center text-lg font-bold ${platform.color}`}>
                            {platform.logo}
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-brand-dark">{platform.name}</DialogTitle>
                            <p className="text-xs text-text-muted mt-0.5">Platform Health & Status</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4 space-y-4">
                    {/* API Health */}
                    <div className={`p-4 rounded-xl ${healthBg}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                                <Activity className="w-3.5 h-3.5" /> API Status
                            </span>
                            <Badge className={`${healthBg} ${healthColor} border-transparent text-[10px] capitalize`}>
                                {platform.apiHealth === 'healthy' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                                {platform.apiHealth}
                            </Badge>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted">Latency</span>
                            <span className={`font-bold ${platform.apiLatency! > 300 ? 'text-brand-saffron' : 'text-brand-jade'}`}>{platform.apiLatency}ms</span>
                        </div>
                    </div>

                    {/* Sync Info */}
                    <div className="p-4 rounded-xl bg-bg-subtle/50 space-y-2">
                        <span className="text-xs font-bold text-brand-dark flex items-center gap-1.5 mb-2">
                            <Clock className="w-3.5 h-3.5" /> Sync Details
                        </span>
                        <div className="flex justify-between text-xs"><span className="text-text-muted">Frequency</span><span className="font-medium text-brand-dark">{platform.syncFrequency}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-text-muted">Last Sync</span><span className="font-medium text-brand-dark">{new Date(platform.lastSync!).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-text-muted">Products</span><span className="font-bold text-brand-dark">{platform.productsLinked}</span></div>
                        <div className="flex justify-between text-xs"><span className="text-text-muted">Webhooks</span><span className="font-medium text-brand-dark">{platform.webhooksActive} active</span></div>
                    </div>

                    {/* Rate Limit */}
                    <div className="p-4 rounded-xl bg-bg-subtle/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-brand-dark flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Rate Limit</span>
                            <span className={`text-xs font-bold ${ratioPercent > 80 ? 'text-semantic-error' : ratioPercent > 60 ? 'text-brand-saffron' : 'text-brand-jade'}`}>{ratioPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-bg-subtle rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${ratioPercent > 80 ? 'bg-semantic-error' : ratioPercent > 60 ? 'bg-brand-saffron' : 'bg-brand-jade'}`} style={{ width: `${ratioPercent}%` }} />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1">{platform.rateLimitUsed?.toLocaleString()} / {platform.rateLimitTotal?.toLocaleString()} requests used</p>
                    </div>

                    {/* OAuth Scopes */}
                    <div>
                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">Permissions</span>
                        <div className="flex flex-wrap gap-1.5">
                            {platform.oauthScopes?.map(scope => (
                                <Badge key={scope} variant="outline" className="text-[10px] border-border/40 rounded-md capitalize">{scope}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-border/40 flex gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 rounded-xl">Close</Button>
                    <Button className="flex-1 rounded-xl shadow-brand-lake/20"><RefreshCw className="w-4 h-4 mr-2" /> Force Sync</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
