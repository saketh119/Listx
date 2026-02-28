import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supportTickets, ticketStatusConfig, priorityConfig } from "@/data/mockSupport";

export default function TicketsList() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = supportTickets
        .filter(t => statusFilter === 'all' || t.status === statusFilter)
        .filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/support"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Support</Link>
            </Button>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark">All Tickets</h1>
                    <p className="text-body-sm text-text-muted mt-1">{supportTickets.length} total tickets</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..."
                        className="pl-10 rounded-xl bg-white border-border/60 h-10" />
                </div>
                <div className="flex gap-1.5 overflow-x-auto">
                    {['all', 'open', 'in_progress', 'waiting', 'resolved', 'closed'].map(s => (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${statusFilter === s ? 'bg-brand-lake text-white' : 'bg-white text-text-muted border border-border/40'}`}>
                            {s === 'all' ? 'All' : ticketStatusConfig[s]?.label || s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ticket List */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                {filtered.map((t, i) => {
                    const s = ticketStatusConfig[t.status];
                    const p = priorityConfig[t.priority];
                    return (
                        <Link key={t.id} to={`/dashboard/support/tickets/${t.id}`}
                            className={`flex items-center gap-4 p-4 hover:bg-bg-subtle/30 transition-colors ${i < filtered.length - 1 ? 'border-b border-border/10' : ''}`}>
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.priority === 'urgent' ? 'bg-semantic-error animate-pulse' : t.priority === 'high' ? 'bg-brand-saffron' : t.priority === 'medium' ? 'bg-brand-lake' : 'bg-gray-300'}`} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[10px] font-mono text-text-muted">{t.id}</span>
                                    <Badge className={`${p.bg} ${p.color} border-transparent text-[9px]`}>{p.label}</Badge>
                                </div>
                                <p className="text-sm font-medium text-brand-dark truncate">{t.subject}</p>
                                <p className="text-[10px] text-text-muted">{t.customer} • {t.category} • {t.assignee}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <Badge className={`${s.bg} ${s.color} border-transparent text-[10px] mb-1`}>{s.label}</Badge>
                                <p className="text-[9px] text-text-muted">{new Date(t.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                            </div>
                        </Link>
                    );
                })}
                {filtered.length === 0 && <div className="p-8 text-center text-sm text-text-muted">No tickets found</div>}
            </div>
        </div>
    );
}
