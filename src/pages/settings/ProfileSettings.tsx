import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SettingsLayout } from "./SettingsLayout";

export default function ProfileSettings() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <SettingsLayout>
            <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4">Business Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Business Name</Label>
                            <Input defaultValue="ListX Commerce Pvt. Ltd." className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" />
                        </div>
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">GSTIN</Label>
                            <Input defaultValue="29AABCT1332L1ZB" className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm font-mono" />
                        </div>
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Email</Label>
                            <Input defaultValue="admin@listx.com" className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" />
                        </div>
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Phone</Label>
                            <Input defaultValue="+91 98765 43210" className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4">Business Address</h3>
                    <div className="space-y-4">
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Address</Label>
                            <Textarea defaultValue="123, Brigade Road, Koramangala" className="rounded-xl bg-bg-subtle border-transparent text-sm min-h-[60px] resize-none" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">City</Label><Input defaultValue="Bengaluru" className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" /></div>
                            <div><Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">State</Label><Input defaultValue="Karnataka" className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" /></div>
                            <div><Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Pincode</Label><Input defaultValue="560034" className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm font-mono" /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4">Logo & Branding</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-brand-lake/10 flex items-center justify-center text-2xl font-bold text-brand-lake">LX</div>
                        <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium">
                            <Upload className="w-4 h-4 mr-2" /> Upload Logo
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4">Preferences</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Timezone</Label>
                            <select className="w-full h-10 rounded-xl bg-bg-subtle border-transparent text-sm px-3" defaultValue="Asia/Kolkata">
                                <option>Asia/Kolkata (IST, UTC+5:30)</option>
                                <option>US/Eastern (EST)</option>
                                <option>Europe/London (GMT)</option>
                            </select>
                        </div>
                        <div>
                            <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">Currency</Label>
                            <select className="w-full h-10 rounded-xl bg-bg-subtle border-transparent text-sm px-3" defaultValue="INR">
                                <option>INR — Indian Rupee (₹)</option>
                                <option>USD — US Dollar ($)</option>
                                <option>EUR — Euro (€)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Button onClick={handleSave} className="rounded-xl shadow-brand-lake/20 font-medium px-8">
                    {saved ? '✓ Saved!' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                </Button>
            </div>
        </SettingsLayout>
    );
}
