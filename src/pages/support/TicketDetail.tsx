import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft, User, Bot, Settings2, Send, Clock,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { supportTickets, ticketStatusConfig, priorityConfig } from "@/data/mockSupport";

export default function TicketDetail() {
    const { id } = useParams<{ id: string }>();
    const ticket = supportTickets.find(t => t.id === id);
    const [reply, setReply] = useState('');
    const [internalNote, setInternalNote] = useState(false);

    if (!ticket) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Ticket Not Found</h2>
                <Button asChild className="rounded-xl"><Link to="/dashboard/support/tickets">← Back</Link></Button>
            </div>
        );
    }

    const s = ticketStatusConfig[ticket.status];
    const p = priorityConfig[ticket.priority];
    const senderIcon = { customer: User, agent: Bot, system: Settings2 };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/support/tickets"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Tickets</Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Thread */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Header */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-[10px] font-mono text-text-muted">{ticket.id}</span>
                            <div className="flex gap-1.5">
                                <Badge className={`${p.bg} ${p.color} border-transparent text-[10px]`}>{p.label}</Badge>
                                <Badge className={`${s.bg} ${s.color} border-transparent text-[10px]`}>{s.label}</Badge>
                            </div>
                        </div>
                        <h1 className="text-lg font-bold text-brand-dark">{ticket.subject}</h1>
                        <p className="text-xs text-text-muted mt-1">{ticket.category} • Created {new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>

                    {/* Messages */}
                    <div className="space-y-3">
                        {ticket.messages.map(m => {
                            const SenderIcon = senderIcon[m.senderType];
                            const isCustomer = m.senderType === 'customer';
                            const isSystem = m.senderType === 'system';

                            if (isSystem) {
                                return (
                                    <div key={m.id} className="flex items-center justify-center gap-2 py-2">
                                        <div className="h-px flex-1 bg-border/30" />
                                        <span className="text-[10px] text-text-muted flex items-center gap-1"><Settings2 className="w-3 h-3" /> {m.content} • {new Date(m.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                        <div className="h-px flex-1 bg-border/30" />
                                    </div>
                                );
                            }

                            return (
                                <div key={m.id} className={`flex gap-3 ${!isCustomer ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCustomer ? 'bg-brand-lake/10' : 'bg-brand-jade/10'}`}>
                                        <SenderIcon className={`w-4 h-4 ${isCustomer ? 'text-brand-lake' : 'text-brand-jade'}`} />
                                    </div>
                                    <div className={`flex-1 max-w-[85%] ${!isCustomer ? 'text-right' : ''}`}>
                                        <div className={`inline-block rounded-2xl p-4 ${isCustomer ? 'bg-bg-subtle/50' : 'bg-brand-jade/5 border border-brand-jade/10'}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-brand-dark">{m.sender}</span>
                                                <span className="text-[9px] text-text-muted">{new Date(m.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <p className="text-sm text-brand-dark leading-relaxed">{m.content}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Reply Box */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <button onClick={() => setInternalNote(false)} className={`text-xs font-medium px-3 py-1 rounded-lg ${!internalNote ? 'bg-brand-lake text-white' : 'text-text-muted hover:bg-bg-subtle'}`}>Reply</button>
                            <button onClick={() => setInternalNote(true)} className={`text-xs font-medium px-3 py-1 rounded-lg ${internalNote ? 'bg-brand-saffron text-white' : 'text-text-muted hover:bg-bg-subtle'}`}>Internal Note</button>
                        </div>
                        <Textarea value={reply} onChange={e => setReply(e.target.value)}
                            placeholder={internalNote ? "Add an internal note (not visible to customer)..." : "Type your reply to the customer..."}
                            className={`rounded-xl border-border/40 text-sm min-h-[80px] resize-none ${internalNote ? 'bg-brand-saffron/5' : 'bg-bg-subtle/30'}`} />
                        <div className="flex justify-end mt-2">
                            <Button className="rounded-xl shadow-brand-lake/20 font-medium text-sm">
                                <Send className="w-4 h-4 mr-2" /> {internalNote ? 'Add Note' : 'Send Reply'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    {/* Customer */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Customer</h3>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-brand-lake/10 flex items-center justify-center text-sm font-bold text-brand-lake">{ticket.customer.split(' ').map(n => n[0]).join('')}</div>
                            <div>
                                <p className="text-sm font-medium text-brand-dark">{ticket.customer}</p>
                                <p className="text-[10px] text-text-muted">{ticket.customerEmail}</p>
                            </div>
                        </div>
                        <Button variant="outline" asChild className="w-full rounded-xl border-border/60 text-xs">
                            <Link to="/dashboard/customers">View Profile</Link>
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Actions</h3>
                        <div className="space-y-2">
                            <div>
                                <label className="text-[10px] text-text-muted block mb-1">Status</label>
                                <select className="w-full h-9 rounded-lg bg-bg-subtle border-transparent text-xs px-3" defaultValue={ticket.status}>
                                    {Object.entries(ticketStatusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] text-text-muted block mb-1">Priority</label>
                                <select className="w-full h-9 rounded-lg bg-bg-subtle border-transparent text-xs px-3" defaultValue={ticket.priority}>
                                    {Object.entries(priorityConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] text-text-muted block mb-1">Assignee</label>
                                <select className="w-full h-9 rounded-lg bg-bg-subtle border-transparent text-xs px-3" defaultValue={ticket.assignee}>
                                    <option>Unassigned</option><option>Rahul Patel</option><option>Ananya Gupta</option><option>Priya Sharma</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Timeline</h3>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <Clock className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                                <div><p className="text-[10px] text-text-muted">Created</p><p className="text-xs text-brand-dark">{new Date(ticket.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p></div>
                            </div>
                            <div className="flex gap-2">
                                <Clock className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                                <div><p className="text-[10px] text-text-muted">Last Updated</p><p className="text-xs text-brand-dark">{new Date(ticket.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p></div>
                            </div>
                            <div className="flex gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                                <div><p className="text-[10px] text-text-muted">Messages</p><p className="text-xs text-brand-dark">{ticket.messages.length} in thread</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
