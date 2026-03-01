import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Zap, Shield, Check, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platformIntegrations } from "@/data/mockIntegrations";

type Step = 'intro' | 'authorize' | 'permissions' | 'syncing' | 'success';

export default function PlatformConnectFlow() {
    const { platformId } = useParams<{ platformId: string }>();
    const platform = platformIntegrations.find(p => p.id === platformId);
    const [step, setStep] = useState<Step>('intro');

    if (!platform) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Platform Not Found</h2>
                <Button asChild className="rounded-xl"><Link to="/dashboard/integrations">← Back</Link></Button>
            </div>
        );
    }

    const scopes = platform.oauthScopes || ['listings', 'orders', 'fulfillment'];

    const simulateAuth = () => {
        setStep('authorize');
        setTimeout(() => setStep('permissions'), 2000);
    };

    const simulateSync = () => {
        setStep('syncing');
        setTimeout(() => setStep('success'), 3000);
    };

    return (
        <div className="max-w-lg mx-auto pb-12 pt-4">
            <Button variant="ghost" asChild className="mb-6 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/integrations"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Integrations</Link>
            </Button>

            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-8">
                {['intro', 'authorize', 'permissions', 'syncing', 'success'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${['intro', 'authorize', 'permissions', 'syncing', 'success'].indexOf(step) >= i
                            ? 'bg-brand-lake text-white' : 'bg-bg-subtle text-text-muted'
                            }`}>
                            {['intro', 'authorize', 'permissions', 'syncing', 'success'].indexOf(step) > i ? <Check className="w-3 h-3" /> : i + 1}
                        </div>
                        {i < 4 && <div className={`w-8 h-0.5 ${['intro', 'authorize', 'permissions', 'syncing', 'success'].indexOf(step) > i ? 'bg-brand-lake' : 'bg-bg-subtle'}`} />}
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                {step === 'intro' && (
                    <div className="p-8 text-center">
                        <div className={`w-20 h-20 rounded-2xl ${platform.bg} flex items-center justify-center text-3xl font-bold ${platform.color} mx-auto mb-5`}>
                            {platform.logo}
                        </div>
                        <h2 className="text-xl font-bold text-brand-dark mb-2">Connect {platform.name}</h2>
                        <p className="text-sm text-text-muted mb-6">Link your {platform.name} account to sync products, orders, and inventory in real-time.</p>
                        <div className="space-y-2 text-left max-w-xs mx-auto mb-6">
                            {['Sync product listings automatically', 'Import orders in real-time', 'Update inventory across channels', 'Track order fulfillment'].map(f => (
                                <div key={f} className="flex items-center gap-2 text-xs text-text-muted"><Check className="w-3.5 h-3.5 text-brand-jade shrink-0" />{f}</div>
                            ))}
                        </div>
                        <Button onClick={simulateAuth} className="rounded-xl shadow-brand-lake/20 font-medium px-8">
                            <Zap className="w-4 h-4 mr-2" /> Connect with {platform.name}
                        </Button>
                    </div>
                )}

                {step === 'authorize' && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-brand-lake/10 flex items-center justify-center mx-auto mb-5 animate-pulse">
                            <ExternalLink className="w-8 h-8 text-brand-lake" />
                        </div>
                        <h2 className="text-lg font-bold text-brand-dark mb-2">Redirecting to {platform.name}...</h2>
                        <p className="text-sm text-text-muted mb-4">You'll be asked to authorize ListX on the {platform.name} login page.</p>
                        <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
                            <Loader2 className="w-4 h-4 animate-spin text-brand-lake" /> Waiting for authorization...
                        </div>
                    </div>
                )}

                {step === 'permissions' && (
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <Shield className="w-6 h-6 text-brand-lake" />
                            <div><h2 className="text-lg font-bold text-brand-dark">Permissions Required</h2><p className="text-xs text-text-muted">ListX needs these permissions:</p></div>
                        </div>
                        <div className="space-y-2 mb-6">
                            {scopes.map(scope => (
                                <div key={scope} className="flex items-center gap-3 p-3 rounded-xl bg-bg-subtle/50">
                                    <Check className="w-4 h-4 text-brand-jade shrink-0" />
                                    <div><p className="text-sm font-medium text-brand-dark capitalize">{scope}</p><p className="text-[10px] text-text-muted">Read & write access to {scope} data</p></div>
                                </div>
                            ))}
                        </div>
                        <Button onClick={simulateSync} className="w-full rounded-xl shadow-brand-lake/20 font-medium">
                            <Shield className="w-4 h-4 mr-2" /> Grant Permissions & Sync
                        </Button>
                    </div>
                )}

                {step === 'syncing' && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-brand-lake/10 flex items-center justify-center mx-auto mb-5">
                            <Loader2 className="w-8 h-8 text-brand-lake animate-spin" />
                        </div>
                        <h2 className="text-lg font-bold text-brand-dark mb-2">Syncing Your Data...</h2>
                        <p className="text-sm text-text-muted mb-6">Importing products and settings from {platform.name}</p>
                        <div className="space-y-2 max-w-xs mx-auto">
                            {['Fetching product catalog...', 'Importing order history...', 'Setting up webhooks...'].map((t, i) => (
                                <div key={t} className="flex items-center gap-2 text-xs text-text-muted"><Loader2 className={`w-3 h-3 ${i < 2 ? 'animate-spin text-brand-lake' : 'text-text-muted/40'}`} />{t}</div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 rounded-full bg-brand-jade/10 flex items-center justify-center mx-auto mb-5 animate-in zoom-in-50 duration-500">
                            <Check className="w-10 h-10 text-brand-jade" />
                        </div>
                        <h2 className="text-xl font-bold text-brand-dark mb-2">{platform.name} Connected!</h2>
                        <p className="text-sm text-text-muted mb-6">Your account is now linked and syncing automatically</p>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-bg-subtle/50 text-center"><p className="text-lg font-bold text-brand-dark">{platform.productsLinked || 142}</p><p className="text-[9px] text-text-muted">Products</p></div>
                            <div className="p-3 rounded-xl bg-bg-subtle/50 text-center"><p className="text-lg font-bold text-brand-dark">{scopes.length}</p><p className="text-[9px] text-text-muted">Permissions</p></div>
                            <div className="p-3 rounded-xl bg-bg-subtle/50 text-center"><p className="text-lg font-bold text-brand-dark">4</p><p className="text-[9px] text-text-muted">Webhooks</p></div>
                        </div>
                        <Button asChild className="rounded-xl shadow-brand-lake/20 font-medium px-8">
                            <Link to="/dashboard/integrations">Go to Integrations</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
