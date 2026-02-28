import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Zap, Key, Check, Loader2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logisticsPartnerIntegrations } from "@/data/mockIntegrations";

type Step = 'credentials' | 'verifying' | 'success';

export default function LogisticsConnectFlow() {
    const { partnerId } = useParams<{ partnerId: string }>();
    const partner = logisticsPartnerIntegrations.find(p => p.id === partnerId);
    const [step, setStep] = useState<Step>('credentials');
    const [apiKey, setApiKey] = useState('');
    const [warehouseId, setWarehouseId] = useState('WH-BLR-001');

    if (!partner) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Partner Not Found</h2>
                <Button asChild className="rounded-xl"><Link to="/dashboard/integrations">← Back</Link></Button>
            </div>
        );
    }

    const handleConnect = () => {
        setStep('verifying');
        setTimeout(() => setStep('success'), 2500);
    };

    return (
        <div className="max-w-lg mx-auto pb-12 pt-4">
            <Button variant="ghost" asChild className="mb-6 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/integrations"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Integrations</Link>
            </Button>

            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                {step === 'credentials' && (
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-2xl ${partner.bg} flex items-center justify-center text-xl font-bold ${partner.color}`}>
                                {partner.logo}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-brand-dark">Connect {partner.name}</h2>
                                <p className="text-xs text-text-muted">Enter your API credentials to link your account</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                                    <Key className="w-3 h-3 inline mr-1" /> API Key / Token
                                </Label>
                                <Input value={apiKey} onChange={e => setApiKey(e.target.value)}
                                    placeholder={`Enter your ${partner.name} API key`}
                                    className="rounded-xl bg-bg-subtle border-transparent h-11 font-mono text-sm" />
                                <p className="text-[10px] text-text-muted mt-1">
                                    Find this in your {partner.name} dashboard under API Settings
                                </p>
                            </div>

                            <div>
                                <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                                    <Truck className="w-3 h-3 inline mr-1" /> Warehouse ID
                                </Label>
                                <Input value={warehouseId} onChange={e => setWarehouseId(e.target.value)}
                                    placeholder="WH-BLR-001"
                                    className="rounded-xl bg-bg-subtle border-transparent h-11 font-mono text-sm" />
                            </div>

                            <div className="space-y-2 pt-2">
                                {['Enable COD shipments', 'Auto-generate manifests', 'Receive tracking webhooks'].map(opt => (
                                    <label key={opt} className="flex items-center gap-3 p-3 rounded-xl bg-bg-subtle/50 cursor-pointer hover:bg-bg-subtle transition-colors">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-brand-lake" />
                                        <span className="text-xs font-medium text-brand-dark">{opt}</span>
                                    </label>
                                ))}
                            </div>

                            <Button disabled={!apiKey} onClick={handleConnect} className="w-full rounded-xl shadow-brand-lake/20 font-medium h-11 mt-2">
                                <Zap className="w-4 h-4 mr-2" /> Verify & Connect
                            </Button>
                        </div>
                    </div>
                )}

                {step === 'verifying' && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-brand-lake/10 flex items-center justify-center mx-auto mb-5">
                            <Loader2 className="w-8 h-8 text-brand-lake animate-spin" />
                        </div>
                        <h2 className="text-lg font-bold text-brand-dark mb-2">Verifying Credentials...</h2>
                        <p className="text-sm text-text-muted">Connecting to {partner.name} API</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-8 text-center">
                        <div className="w-20 h-20 rounded-full bg-brand-jade/10 flex items-center justify-center mx-auto mb-5 animate-in zoom-in-50 duration-500">
                            <Check className="w-10 h-10 text-brand-jade" />
                        </div>
                        <h2 className="text-xl font-bold text-brand-dark mb-2">{partner.name} Connected!</h2>
                        <p className="text-sm text-text-muted mb-6">You can now create shipments and track deliveries</p>
                        <Button asChild className="rounded-xl shadow-brand-lake/20 font-medium px-8">
                            <Link to="/dashboard/integrations">Go to Integrations</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
