import { Link } from "react-router-dom";
import {
    LifeBuoy, Inbox, Clock, CheckCircle2, Star, ArrowUpRight,
    AlertTriangle, BookOpen, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supportKPIs, supportTickets, ticketStatusConfig, priorityConfig, kbArticles } from "@/data/mockSupport";

export default function SupportDashboard() {
    const openTickets = supportTickets.filter(t => t.status === 'open' || t.status === 'in_progress');

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><LifeBuoy className="w-7 h-7 text-brand-lake" /> Support Center</h1>
                    <p className="text-body-sm text-text-muted mt-1">Tickets, knowledge base, and customer satisfaction</p>
                </div>
                <Button className="rounded-xl shadow-brand-lake/20 font-medium text-sm">
                    <Plus className="w-4 h-4 mr-2" /> New Ticket
                </Button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                    { label: 'Open Tickets', value: supportKPIs.openTickets, icon: Inbox, color: 'bg-brand-saffron/10 text-brand-saffron' },
                    { label: 'Avg. Response', value: supportKPIs.avgResponseTime, icon: Clock, color: 'bg-brand-lake/10 text-brand-lake' },
                    { label: 'Avg. Resolution', value: supportKPIs.avgResolutionTime, icon: CheckCircle2, color: 'bg-brand-jade/10 text-brand-jade' },
                    { label: 'Satisfaction', value: `${supportKPIs.satisfactionScore}/5`, icon: Star, color: 'bg-purple-500/10 text-purple-600' },
                    { label: 'Resolved Today', value: supportKPIs.resolvedToday, icon: CheckCircle2, color: 'bg-cyan-500/10 text-cyan-600' },
                    { label: 'This Week', value: supportKPIs.totalThisWeek, icon: ArrowUpRight, color: 'bg-brand-lake/10 text-brand-lake' },
                ].map(k => (
                    <div key={k.label} className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                        <div className={`w-8 h-8 rounded-lg ${k.color} flex items-center justify-center mb-2`}><k.icon className="w-4 h-4" /></div>
                        <p className="text-xl font-bold text-brand-dark">{k.value}</p>
                        <p className="text-[10px] text-text-muted">{k.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Tickets */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm">
                    <div className="p-5 pb-0 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-brand-saffron" /> Active Tickets</h3>
                        <Link to="/dashboard/support/tickets" className="text-xs text-brand-lake hover:underline">View All →</Link>
                    </div>
                    <div className="p-3">
                        {openTickets.map(t => {
                            const s = ticketStatusConfig[t.status];
                            const p = priorityConfig[t.priority];
                            return (
                                <Link key={t.id} to={`/dashboard/support/tickets/${t.id}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-subtle/50 transition-colors group">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${t.priority === 'urgent' ? 'bg-semantic-error animate-pulse' : t.priority === 'high' ? 'bg-brand-saffron' : 'bg-brand-lake'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-brand-dark group-hover:text-brand-lake truncate">{t.subject}</p>
                                        <p className="text-[10px] text-text-muted">{t.customer} • {t.category}</p>
                                    </div>
                                    <Badge className={`${p.bg} ${p.color} border-transparent text-[9px] shrink-0`}>{p.label}</Badge>
                                    <Badge className={`${s.bg} ${s.color} border-transparent text-[9px] shrink-0`}>{s.label}</Badge>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Access */}
                <div className="space-y-4">
                    {/* Knowledge Base */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-brand-jade" /> Knowledge Base</h3>
                        <p className="text-xs text-text-muted mb-3">{kbArticles.length} articles across {new Set(kbArticles.map(a => a.category)).size} categories</p>
                        <Button variant="outline" asChild className="w-full rounded-xl border-border/60 text-xs">
                            <Link to="/dashboard/support/knowledge-base">Browse Articles →</Link>
                        </Button>
                    </div>

                    {/* Popular Articles */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Most Viewed Articles</h3>
                        <div className="space-y-2">
                            {kbArticles.sort((a, b) => b.views - a.views).slice(0, 4).map(a => (
                                <Link key={a.id} to="/dashboard/support/knowledge-base" className="block p-2 rounded-lg hover:bg-bg-subtle/50 transition-colors">
                                    <p className="text-xs font-medium text-brand-dark">{a.title}</p>
                                    <p className="text-[10px] text-text-muted">{a.views.toLocaleString()} views • {a.helpful} found helpful</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
