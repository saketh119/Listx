import { useState } from "react";
import { Key, Plus, Copy, Check, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingsLayout } from "./SettingsLayout";
import { apiKeys } from "@/data/mockAnalytics";

export default function APIKeysSettings() {
    const [showCreate, setShowCreate] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const [revealed, setRevealed] = useState<Set<string>>(new Set());

    const copyKey = (key: string, id: string) => { navigator.clipboard.writeText(key); setCopied(id); setTimeout(() => setCopied(null), 2000); };
    const toggleReveal = (id: string) => setRevealed(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

    return (
        <SettingsLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div><h3 className="text-sm font-bold text-brand-dark">API Keys</h3><p className="text-xs text-text-muted mt-0.5">Manage your API keys for programmatic access</p></div>
                    <Button onClick={() => setShowCreate(!showCreate)} className="rounded-xl shadow-brand-lake/20 font-medium text-sm"><Plus className="w-4 h-4 mr-2" /> Create Key</Button>
                </div>

                {showCreate && (
                    <div className="bg-brand-lake/5 rounded-2xl border border-brand-lake/20 p-5">
                        <h4 className="text-xs font-bold text-brand-dark mb-3">New API Key</h4>
                        <div className="flex gap-2">
                            <div className="flex-1"><Label className="text-[10px] text-text-muted mb-1 block">Name</Label>
                                <Input placeholder="e.g. Production, Staging" className="rounded-xl bg-white border-border/40 h-10 text-sm" /></div>
                            <div className="flex items-end"><Button className="rounded-xl font-medium text-sm h-10"><Key className="w-4 h-4 mr-2" /> Generate</Button></div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                    {apiKeys.map((k, i) => (
                        <div key={k.id} className={`flex items-center gap-4 p-4 ${i < apiKeys.length - 1 ? 'border-b border-border/20' : ''}`}>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${k.status === 'active' ? 'bg-brand-jade/10' : 'bg-bg-subtle'}`}>
                                <Key className={`w-4 h-4 ${k.status === 'active' ? 'text-brand-jade' : 'text-text-muted'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2"><p className="text-sm font-medium text-brand-dark">{k.name}</p>
                                    <Badge className={`border-transparent text-[9px] ${k.status === 'active' ? 'bg-brand-jade/10 text-brand-jade' : 'bg-semantic-error/10 text-semantic-error'}`}>{k.status}</Badge></div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs font-mono text-text-muted">{revealed.has(k.id) ? k.key.replace('****', 'abcd1234') : k.key}</span>
                                    <button onClick={() => toggleReveal(k.id)} className="text-text-muted hover:text-brand-lake">
                                        {revealed.has(k.id) ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    </button>
                                    <button onClick={() => copyKey(k.key, k.id)} className="text-text-muted hover:text-brand-lake">
                                        {copied === k.id ? <Check className="w-3 h-3 text-brand-jade" /> : <Copy className="w-3 h-3" />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-text-muted mt-0.5">Created {k.created}{k.lastUsed ? ` • Last used ${new Date(k.lastUsed).toLocaleDateString('en-IN')}` : ''}</p>
                            </div>
                            {k.status === 'active' && <button className="text-text-muted hover:text-semantic-error"><Trash2 className="w-4 h-4" /></button>}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-3">Webhook Endpoints</h3>
                    <p className="text-xs text-text-muted mb-4">Configure webhook URLs to receive real-time notifications for order and inventory events.</p>
                    <div className="space-y-2">
                        {['Order Created', 'Order Updated', 'Inventory Changed', 'Shipment Tracking'].map(e => (
                            <div key={e} className="flex items-center justify-between p-3 rounded-xl bg-bg-subtle/30">
                                <span className="text-xs font-medium text-brand-dark">{e}</span>
                                <Input placeholder="https://your-api.com/webhook" className="max-w-xs rounded-lg bg-white border-border/40 h-8 text-xs ml-3" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
