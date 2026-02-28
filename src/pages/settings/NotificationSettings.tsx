import { useState } from "react";
import { Bell, Mail, Smartphone, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsLayout } from "./SettingsLayout";

interface NotifPref {
    category: string;
    description: string;
    email: boolean;
    push: boolean;
    sms: boolean;
}

const defaultPrefs: NotifPref[] = [
    { category: 'New Orders', description: 'When a new order is received', email: true, push: true, sms: false },
    { category: 'Order Status', description: 'When order status changes', email: true, push: true, sms: false },
    { category: 'Low Stock Alerts', description: 'When inventory falls below threshold', email: true, push: true, sms: true },
    { category: 'Return Requests', description: 'When a customer requests a return', email: true, push: false, sms: false },
    { category: 'Delivery Exceptions', description: 'Failed deliveries or delays', email: true, push: true, sms: true },
    { category: 'Platform Sync Errors', description: 'When API/sync issues occur', email: true, push: true, sms: false },
    { category: 'Team Activity', description: 'When team members make changes', email: false, push: false, sms: false },
    { category: 'Billing & Invoices', description: 'Payment reminders and invoices', email: true, push: false, sms: false },
];

export default function NotificationSettings() {
    const [prefs, setPrefs] = useState(defaultPrefs);
    const [saved, setSaved] = useState(false);

    const toggle = (idx: number, channel: 'email' | 'push' | 'sms') => {
        setPrefs(prev => prev.map((p, i) => i === idx ? { ...p, [channel]: !p[channel] } : p));
    };

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <SettingsLayout>
            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-bold text-brand-dark">Notification Preferences</h3>
                    <p className="text-xs text-text-muted mt-0.5">Choose how and when you want to be notified</p>
                </div>

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 p-4 border-b border-border/40 bg-bg-subtle/30">
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Category</span>
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider text-center flex items-center justify-center gap-1"><Mail className="w-3 h-3" /> Email</span>
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider text-center flex items-center justify-center gap-1"><Bell className="w-3 h-3" /> Push</span>
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider text-center flex items-center justify-center gap-1"><Smartphone className="w-3 h-3" /> SMS</span>
                    </div>

                    {prefs.map((p, i) => (
                        <div key={p.category} className={`grid grid-cols-[1fr_80px_80px_80px] gap-2 p-4 items-center ${i < prefs.length - 1 ? 'border-b border-border/10' : ''}`}>
                            <div>
                                <p className="text-sm font-medium text-brand-dark">{p.category}</p>
                                <p className="text-[10px] text-text-muted">{p.description}</p>
                            </div>
                            {(['email', 'push', 'sms'] as const).map(ch => (
                                <div key={ch} className="flex justify-center">
                                    <button onClick={() => toggle(i, ch)}
                                        className={`w-9 h-5 rounded-full transition-colors relative ${p[ch] ? 'bg-brand-jade' : 'bg-gray-200'}`}>
                                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${p[ch] ? 'left-[calc(100%-18px)]' : 'left-0.5'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <Button onClick={handleSave} className="rounded-xl shadow-brand-lake/20 font-medium px-8">
                    {saved ? '✓ Saved!' : <><Save className="w-4 h-4 mr-2" /> Save Preferences</>}
                </Button>
            </div>
        </SettingsLayout>
    );
}
