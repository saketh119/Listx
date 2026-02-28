import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Search, SlidersHorizontal, Download, RefreshCw,
    MoreHorizontal, Eye, Truck, Printer, XCircle, Check,
    ChevronLeft, ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { mockOrders, orderStats } from "@/data/mockOrders";
import type { Platform, OrderStatus } from "@/data/mockOrders";
import { OrderFilterSheet } from "./components/OrderFilterSheet";

const platformConfig: Record<Platform, { label: string; color: string; bg: string; initial: string }> = {
    amazon: { label: 'Amazon', color: 'text-amber-600', bg: 'bg-amber-500/10', initial: 'A' },
    flipkart: { label: 'Flipkart', color: 'text-yellow-600', bg: 'bg-yellow-500/10', initial: 'F' },
    shopify: { label: 'Shopify', color: 'text-green-600', bg: 'bg-green-500/10', initial: 'S' },
    ondc: { label: 'ONDC', color: 'text-purple-600', bg: 'bg-purple-500/10', initial: 'O' },
};

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
    new: { label: 'New', color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
    processing: { label: 'Processing', color: 'text-blue-600', bg: 'bg-blue-500/10' },
    packed: { label: 'Packed', color: 'text-cyan-600', bg: 'bg-cyan-500/10' },
    shipped: { label: 'Shipped', color: 'text-brand-saffron', bg: 'bg-brand-saffron/10' },
    delivered: { label: 'Delivered', color: 'text-brand-jade', bg: 'bg-brand-jade/10' },
    returned: { label: 'Returned', color: 'text-orange-600', bg: 'bg-orange-500/10' },
    cancelled: { label: 'Cancelled', color: 'text-semantic-error', bg: 'bg-semantic-error/10' },
};

export default function OrdersList() {
    const [search, setSearch] = useState('');
    const [platformTab, setPlatformTab] = useState<string>('all');
    const [statusTab, setStatusTab] = useState<string>('all');
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const filtered = useMemo(() => {
        return mockOrders.filter(o => {
            if (search) {
                const q = search.toLowerCase();
                if (!o.id.toLowerCase().includes(q) && !o.customerName.toLowerCase().includes(q) &&
                    !o.items.some(i => i.sku.toLowerCase().includes(q))) return false;
            }
            if (platformTab !== 'all' && o.platform !== platformTab) return false;
            if (statusTab !== 'all' && o.status !== statusTab) return false;
            return true;
        });
    }, [search, platformTab, statusTab]);

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };
    const toggleAll = () => {
        if (selectedIds.size === paged.length) setSelectedIds(new Set());
        else setSelectedIds(new Set(paged.map(o => o.id)));
    };

    const leftBorderColor = (status: OrderStatus, tags: string[]) => {
        if (status === 'new') return 'border-l-4 border-l-indigo-500';
        if (tags.includes('sla-risk')) return 'border-l-4 border-l-semantic-error';
        if (status === 'cancelled') return 'border-l-4 border-l-gray-300';
        return '';
    };

    const formatDate = (d: string) => {
        const date = new Date(d);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Orders</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-body-sm text-text-muted">{orderStats.total} orders</span>
                        <span className="text-xs text-text-muted">•</span>
                        <span className="flex items-center gap-1 text-xs text-brand-jade"><span className="w-1.5 h-1.5 rounded-full bg-brand-jade animate-pulse" /> Last synced: 2 min ago</span>
                        <button className="text-text-muted hover:text-brand-lake transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                </div>
            </div>

            {/* Search + Filters Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input placeholder="Search by Order ID, customer, SKU..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                        className="pl-10 rounded-xl bg-bg-subtle border-transparent h-11" />
                </div>
                <Button variant="outline" onClick={() => setFilterOpen(true)} className="rounded-xl border-border/60 h-11 px-4 shrink-0">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                </Button>
            </div>

            {/* Platform Tabs */}
            <Tabs value={platformTab} onValueChange={v => { setPlatformTab(v); setCurrentPage(1); }} className="mb-4">
                <TabsList className="bg-bg-subtle p-1 rounded-xl w-full justify-start overflow-x-auto">
                    <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm">
                        All <span className="ml-1.5 text-xs opacity-60">{orderStats.total}</span>
                    </TabsTrigger>
                    {(Object.keys(platformConfig) as Platform[]).map(p => (
                        <TabsTrigger key={p} value={p} className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm">
                            <span className={`w-4 h-4 rounded-md ${platformConfig[p].bg} ${platformConfig[p].color} text-[9px] font-bold flex items-center justify-center mr-1.5`}>
                                {platformConfig[p].initial}
                            </span>
                            {platformConfig[p].label}
                            <span className="ml-1.5 text-xs opacity-60">{orderStats.byPlatform[p]}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {/* Status Sub-tabs */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
                {['all', 'new', 'processing', 'packed', 'shipped', 'delivered', 'returned', 'cancelled'].map(s => {
                    const cfg = s === 'all' ? null : statusConfig[s as OrderStatus];
                    const count = s === 'all' ? filtered.length : mockOrders.filter(o => o.status === s && (platformTab === 'all' || o.platform === platformTab)).length;
                    return (
                        <button key={s} onClick={() => { setStatusTab(s); setCurrentPage(1); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${statusTab === s
                                ? `${cfg?.bg || 'bg-brand-lake/10'} ${cfg?.color || 'text-brand-lake'}` : 'text-text-muted hover:bg-bg-subtle'}`}>
                            {s === 'all' ? 'All' : cfg?.label} <span className="ml-1 opacity-60">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-bg-subtle/50 border-b border-border/40">
                                <th className="p-3 w-10">
                                    <input type="checkbox" checked={selectedIds.size === paged.length && paged.length > 0}
                                        onChange={toggleAll} className="w-4 h-4 rounded accent-brand-lake" />
                                </th>
                                <th className="p-3 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Order ID</th>
                                <th className="p-3 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider w-8"></th>
                                <th className="p-3 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Customer</th>
                                <th className="p-3 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Date</th>
                                <th className="p-3 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Items</th>
                                <th className="p-3 text-right text-[11px] font-bold text-text-muted uppercase tracking-wider">Value</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Payment</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="p-3 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Courier</th>
                                <th className="p-3 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map(order => {
                                const pc = platformConfig[order.platform];
                                const sc = statusConfig[order.status];
                                return (
                                    <tr key={order.id} className={`border-b border-border/20 hover:bg-bg-subtle/30 transition-colors ${leftBorderColor(order.status, order.tags)} ${order.status === 'cancelled' ? 'opacity-50' : ''}`}>
                                        <td className="p-3">
                                            <input type="checkbox" checked={selectedIds.has(order.id)} onChange={() => toggleSelect(order.id)}
                                                className="w-4 h-4 rounded accent-brand-lake" />
                                        </td>
                                        <td className="p-3">
                                            <Link to={`/dashboard/orders/${order.id}`} className="font-mono text-xs font-bold text-brand-dark hover:text-brand-lake transition-colors">
                                                {order.id}
                                            </Link>
                                        </td>
                                        <td className="p-3">
                                            <div className={`w-6 h-6 rounded-md ${pc.bg} ${pc.color} flex items-center justify-center text-[9px] font-bold`} title={pc.label}>
                                                {pc.initial}
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <span className="text-sm font-medium text-brand-dark">{order.customerName}</span>
                                        </td>
                                        <td className="p-3">
                                            <span className="text-xs text-text-muted" title={new Date(order.createdAt).toLocaleString()}>{formatDate(order.createdAt)}</span>
                                        </td>
                                        <td className="p-3">
                                            <span className="text-xs text-text-muted">
                                                {order.items.length} item{order.items.length > 1 ? 's' : ''} — {order.items[0]?.title?.substring(0, 20)}...
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <span className="text-sm font-bold text-brand-dark">₹{order.total.toLocaleString()}</span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <Badge variant="outline" className={`text-[10px] font-bold border-transparent ${order.paymentType === 'prepaid' ? 'bg-brand-jade/10 text-brand-jade' : order.paymentType === 'cod' ? 'bg-brand-saffron/10 text-brand-saffron' : 'bg-blue-500/10 text-blue-600'}`}>
                                                {order.paymentType.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="p-3 text-center">
                                            <Badge variant="outline" className={`text-[10px] font-bold border-transparent ${sc.bg} ${sc.color}`}>
                                                {sc.label}
                                            </Badge>
                                        </td>
                                        <td className="p-3">
                                            {order.courier ? (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-5 h-5 rounded bg-bg-subtle flex items-center justify-center text-[9px] font-bold text-text-muted">{order.courier.logo}</span>
                                                    <span className="font-mono text-[10px] text-text-muted">{order.courier.awb}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-text-muted/40">—</span>
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl w-48">
                                                    <DropdownMenuItem asChild className="rounded-lg text-xs cursor-pointer">
                                                        <Link to={`/dashboard/orders/${order.id}`}><Eye className="w-3.5 h-3.5 mr-2" /> View Details</Link>
                                                    </DropdownMenuItem>
                                                    {!order.courier && order.status !== 'cancelled' && order.status !== 'delivered' && (
                                                        <DropdownMenuItem className="rounded-lg text-xs cursor-pointer"><Truck className="w-3.5 h-3.5 mr-2" /> Assign Courier</DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem className="rounded-lg text-xs cursor-pointer"><Printer className="w-3.5 h-3.5 mr-2" /> Print Label</DropdownMenuItem>
                                                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                                                        <DropdownMenuItem className="rounded-lg text-xs text-semantic-error cursor-pointer"><XCircle className="w-3.5 h-3.5 mr-2" /> Cancel</DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 bg-bg-subtle/30">
                    <span className="text-xs text-text-muted">
                        Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
                    </span>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="h-8 w-8 p-0 rounded-lg">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(i + 1)}
                                className={`h-8 w-8 p-0 rounded-lg text-xs ${currentPage === i + 1 ? '' : 'border-border/60'}`}>
                                {i + 1}
                            </Button>
                        ))}
                        <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="h-8 w-8 p-0 rounded-lg">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bulk Action Bar */}
            {selectedIds.size > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="max-w-6xl mx-auto px-4 pb-4">
                        <div className="bg-brand-dark rounded-2xl shadow-2xl shadow-brand-dark/30 px-6 py-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-brand-jade/20 flex items-center justify-center">
                                    <span className="text-sm font-bold text-brand-jade">{selectedIds.size}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{selectedIds.size} order{selectedIds.size > 1 ? 's' : ''} selected</p>
                                    <p className="text-[11px] text-white/50">Choose an action</p>
                                </div>
                                <button onClick={() => setSelectedIds(new Set())} className="ml-2 text-white/50 hover:text-white text-xs">✕</button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="secondary" className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 text-xs font-medium">
                                    <Truck className="w-3.5 h-3.5 mr-1.5" /> Assign Courier
                                </Button>
                                <Button size="sm" variant="secondary" className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 text-xs font-medium">
                                    <Printer className="w-3.5 h-3.5 mr-1.5" /> Print Labels
                                </Button>
                                <Button size="sm" variant="secondary" className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 text-xs font-medium">
                                    <Check className="w-3.5 h-3.5 mr-1.5" /> Mark Packed
                                </Button>
                                <Button size="sm" variant="secondary" className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 text-xs font-medium">
                                    <Download className="w-3.5 h-3.5 mr-1.5" /> Export
                                </Button>
                                <div className="w-px h-6 bg-white/15 mx-1" />
                                <Button size="sm" variant="secondary" className="rounded-xl bg-semantic-error/20 hover:bg-semantic-error/30 text-semantic-error border-0 h-9 px-4 text-xs font-medium">
                                    <XCircle className="w-3.5 h-3.5 mr-1.5" /> Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Sheet */}
            <OrderFilterSheet open={filterOpen} onOpenChange={setFilterOpen} />
        </div>
    );
}
