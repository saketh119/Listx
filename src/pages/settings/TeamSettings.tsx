import { useState } from "react";
import { UserPlus, Shield, Mail, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SettingsLayout } from "./SettingsLayout";
import { teamMembers } from "@/data/mockAnalytics";

const roleBadge: Record<string, string> = { Owner: 'bg-brand-lake/10 text-brand-lake', Admin: 'bg-purple-500/10 text-purple-600', Editor: 'bg-brand-jade/10 text-brand-jade', Viewer: 'bg-bg-subtle text-text-muted' };

export default function TeamSettings() {
    const [showInvite, setShowInvite] = useState(false);

    return (
        <SettingsLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-brand-dark">Team Members</h3>
                        <p className="text-xs text-text-muted mt-0.5">4 of 5 seats used</p>
                    </div>
                    <Button onClick={() => setShowInvite(!showInvite)} className="rounded-xl shadow-brand-lake/20 font-medium text-sm">
                        <UserPlus className="w-4 h-4 mr-2" /> Invite Member
                    </Button>
                </div>

                {showInvite && (
                    <div className="bg-brand-lake/5 rounded-2xl border border-brand-lake/20 p-5">
                        <h4 className="text-xs font-bold text-brand-dark mb-3">Invite New Member</h4>
                        <div className="flex gap-2">
                            <Input placeholder="email@example.com" className="rounded-xl bg-white border-border/40 h-10 text-sm flex-1" />
                            <select className="h-10 rounded-xl bg-white border border-border/40 text-sm px-3">
                                <option>Viewer</option><option>Editor</option><option>Admin</option>
                            </select>
                            <Button className="rounded-xl font-medium text-sm"><Mail className="w-4 h-4 mr-2" /> Send</Button>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                    {teamMembers.map((m, i) => (
                        <div key={m.id} className={`flex items-center gap-4 p-4 ${i < teamMembers.length - 1 ? 'border-b border-border/20' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-brand-lake/10 flex items-center justify-center text-sm font-bold text-brand-lake">{m.avatar}</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-brand-dark">{m.name}</p>
                                <p className="text-[10px] text-text-muted">{m.email}</p>
                            </div>
                            <Badge className={`${roleBadge[m.role]} border-transparent text-[10px]`}><Shield className="w-3 h-3 mr-1" />{m.role}</Badge>
                            <Badge className={`border-transparent text-[10px] ${m.status === 'active' ? 'bg-brand-jade/10 text-brand-jade' : 'bg-brand-saffron/10 text-brand-saffron'}`}>
                                {m.status === 'active' ? 'Active' : 'Invited'}
                            </Badge>
                            {m.role !== 'Owner' && <button className="text-text-muted hover:text-brand-dark"><MoreVertical className="w-4 h-4" /></button>}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-4">Role Permissions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead><tr className="border-b border-border/40">
                                <th className="p-2 text-left text-[10px] text-text-muted uppercase">Permission</th>
                                <th className="p-2 text-center text-[10px] text-text-muted uppercase">Owner</th>
                                <th className="p-2 text-center text-[10px] text-text-muted uppercase">Admin</th>
                                <th className="p-2 text-center text-[10px] text-text-muted uppercase">Editor</th>
                                <th className="p-2 text-center text-[10px] text-text-muted uppercase">Viewer</th>
                            </tr></thead>
                            <tbody>
                                {['Manage Products', 'Manage Orders', 'View Analytics', 'Manage Integrations', 'Manage Team', 'Billing & Plan'].map(p => (
                                    <tr key={p} className="border-b border-border/10">
                                        <td className="p-2 text-brand-dark">{p}</td>
                                        {['✓', '✓', p.includes('Team') || p.includes('Billing') ? '—' : '✓', p === 'View Analytics' ? '✓' : '—'].map((v, i) => (
                                            <td key={i} className={`p-2 text-center ${v === '✓' ? 'text-brand-jade font-bold' : 'text-text-muted/40'}`}>{v}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
