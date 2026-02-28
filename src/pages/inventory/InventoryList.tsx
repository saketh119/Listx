import { useState } from "react";
import {
    Search, AlertTriangle, TrendingDown,
    Package, History, Download
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InventoryItem {
    id: string;
    productName: string;
    sku: string;
    totalStock: number;
    amazonStock: number;
    flipkartStock: number;
    shopifyStock: number;
    reserved: number;
    lowStockThreshold: number;
    lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
    { id: "INV-001", productName: "Ergonomic Office Chair - Mesh Back", sku: "OFF-CHR-001", totalStock: 142, amazonStock: 60, flipkartStock: 50, shopifyStock: 32, reserved: 8, lowStockThreshold: 20, lastUpdated: "2 hrs ago" },
    { id: "INV-002", productName: "Wireless Noise-Cancelling Headphones", sku: "ELEC-HP-BLK", totalStock: 45, amazonStock: 20, flipkartStock: 0, shopifyStock: 25, reserved: 3, lowStockThreshold: 15, lastUpdated: "1 hr ago" },
    { id: "INV-003", productName: "Organic Cotton Yoga Mat", sku: "FIT-YM-ORG", totalStock: 0, amazonStock: 0, flipkartStock: 0, shopifyStock: 0, reserved: 0, lowStockThreshold: 10, lastUpdated: "3 days ago" },
    { id: "INV-004", productName: "Stainless Steel Water Bottle", sku: "HOME-BTL-1L", totalStock: 210, amazonStock: 80, flipkartStock: 70, shopifyStock: 60, reserved: 12, lowStockThreshold: 30, lastUpdated: "30 min ago" },
    { id: "INV-005", productName: "Smart LED Desk Lamp", sku: "HOME-LMP-SMT", totalStock: 12, amazonStock: 5, flipkartStock: 7, shopifyStock: 0, reserved: 2, lowStockThreshold: 15, lastUpdated: "5 hrs ago" },
    { id: "INV-006", productName: "Ceramic Coffee Mug Set (4 Pack)", sku: "HOME-MUG-C4", totalStock: 68, amazonStock: 30, flipkartStock: 0, shopifyStock: 38, reserved: 5, lowStockThreshold: 20, lastUpdated: "1 day ago" },
    { id: "INV-007", productName: "Minimalist Leather Wallet", sku: "ACC-WAL-LTH", totalStock: 15, amazonStock: 0, flipkartStock: 10, shopifyStock: 5, reserved: 1, lowStockThreshold: 10, lastUpdated: "4 hrs ago" },
    { id: "INV-008", productName: "MacBook Pro Hard Shell Case", sku: "ACC-MAC-14C", totalStock: 340, amazonStock: 200, flipkartStock: 0, shopifyStock: 140, reserved: 20, lowStockThreshold: 50, lastUpdated: "15 min ago" },
    { id: "INV-009", productName: "DSLR Camera Tripod Stand", sku: "ELEC-TRP-60", totalStock: 5, amazonStock: 3, flipkartStock: 2, shopifyStock: 0, reserved: 1, lowStockThreshold: 10, lastUpdated: "2 days ago" },
    { id: "INV-010", productName: "Adjustable Dumbbell Set (25kg)", sku: "FIT-DMB-25", totalStock: 120, amazonStock: 50, flipkartStock: 45, shopifyStock: 25, reserved: 8, lowStockThreshold: 20, lastUpdated: "45 min ago" },
    { id: "INV-011", productName: "Men's Classic White Sneakers", sku: "APP-SNK-WHT", totalStock: 42, amazonStock: 0, flipkartStock: 22, shopifyStock: 20, reserved: 4, lowStockThreshold: 15, lastUpdated: "6 hrs ago" },
    { id: "INV-012", productName: "Portable High-Speed SSD 1TB", sku: "ELEC-SSD-1TB", totalStock: 18, amazonStock: 8, flipkartStock: 5, shopifyStock: 5, reserved: 3, lowStockThreshold: 10, lastUpdated: "20 min ago" },
];

export default function InventoryList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const lowStockItems = mockInventory.filter(i => i.totalStock > 0 && i.totalStock <= i.lowStockThreshold);
    const outOfStockItems = mockInventory.filter(i => i.totalStock === 0);

    const filteredInventory = mockInventory.filter(item => {
        const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'low_stock') return matchesSearch && item.totalStock > 0 && item.totalStock <= item.lowStockThreshold;
        if (activeTab === 'out_of_stock') return matchesSearch && item.totalStock === 0;
        return matchesSearch;
    });

    const getStockBadge = (item: InventoryItem) => {
        if (item.totalStock === 0) return <Badge className="bg-semantic-error/10 text-semantic-error border-transparent">Out of Stock</Badge>;
        if (item.totalStock <= item.lowStockThreshold) return <Badge className="bg-brand-saffron/10 text-brand-saffron border-transparent">Low Stock</Badge>;
        return <Badge className="bg-brand-jade/10 text-brand-jade border-transparent">In Stock</Badge>;
    };

    return (
        <div className="flex flex-col h-full gap-6 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Inventory</h1>
                    <p className="text-body-sm text-text-muted mt-1">Track and manage stock levels across all platforms.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-medium border-border/60 hidden sm:flex">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline" className="rounded-xl font-medium border-border/60 hidden sm:flex">
                        <History className="w-4 h-4 mr-2" />
                        Stock Log
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-jade/10 flex items-center justify-center text-brand-jade shrink-0">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Total SKUs</p>
                        <p className="text-2xl font-black text-brand-dark">{mockInventory.length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-saffron/30 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-saffron/10 flex items-center justify-center text-brand-saffron shrink-0">
                        <TrendingDown className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Low Stock Alerts</p>
                        <p className="text-2xl font-black text-brand-saffron">{lowStockItems.length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-semantic-error/30 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-semantic-error/10 flex items-center justify-center text-semantic-error shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Out of Stock</p>
                        <p className="text-2xl font-black text-semantic-error">{outOfStockItems.length}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm flex flex-col xl:flex-row justify-between gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full xl:w-auto">
                    <TabsList className="bg-bg-subtle p-1 rounded-xl w-full sm:w-auto grid grid-cols-3 sm:flex h-auto">
                        <TabsTrigger value="all" className="rounded-lg py-2 px-4 text-sm font-medium data-[state=active]:shadow-sm">
                            All <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/50 text-xs text-text-muted">{mockInventory.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="low_stock" className="rounded-lg py-2 px-4 text-sm font-medium data-[state=active]:shadow-sm data-[state=active]:text-brand-saffron">
                            Low Stock <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/50 text-xs text-brand-saffron/80">{lowStockItems.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="out_of_stock" className="rounded-lg py-2 px-4 text-sm font-medium data-[state=active]:shadow-sm data-[state=active]:text-semantic-error">
                            Out of Stock <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/50 text-xs text-semantic-error/80">{outOfStockItems.length}</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex items-center gap-3">
                    <div className="relative w-full xl:w-72">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <Input placeholder="Search SKUs..." className="pl-9 h-10 rounded-xl bg-bg-subtle border-transparent focus:bg-white" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="border-b border-border/60 bg-bg-subtle/50 text-xs font-bold text-text-muted uppercase tracking-wider">
                                <th className="py-4 px-5 w-[280px]">Product / SKU</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4 text-center">Total</th>
                                <th className="py-4 px-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-brand-saffron/10 text-brand-saffron">A</span>
                                </th>
                                <th className="py-4 px-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#2874F0]/10 text-[#2874F0]">F</span>
                                </th>
                                <th className="py-4 px-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#95BF47]/10 text-[#95BF47]">S</span>
                                </th>
                                <th className="py-4 px-4 text-center">Reserved</th>
                                <th className="py-4 px-4">Updated</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filteredInventory.map(item => (
                                <tr key={item.id} className="hover:bg-bg-subtle/30 transition-colors group">
                                    <td className="py-3.5 px-5">
                                        <div className="font-semibold text-sm text-brand-dark truncate max-w-[260px]">{item.productName}</div>
                                        <div className="text-xs text-text-muted font-mono mt-0.5">{item.sku}</div>
                                    </td>
                                    <td className="py-3.5 px-4">{getStockBadge(item)}</td>
                                    <td className="py-3.5 px-4 text-center">
                                        <span className={`text-sm font-bold ${item.totalStock === 0 ? 'text-semantic-error' : item.totalStock <= item.lowStockThreshold ? 'text-brand-saffron' : 'text-brand-dark'}`}>
                                            {item.totalStock}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm text-text-muted">{item.amazonStock}</td>
                                    <td className="py-3.5 px-4 text-center text-sm text-text-muted">{item.flipkartStock}</td>
                                    <td className="py-3.5 px-4 text-center text-sm text-text-muted">{item.shopifyStock}</td>
                                    <td className="py-3.5 px-4 text-center">
                                        <span className="text-sm font-medium text-brand-lake">{item.reserved}</span>
                                    </td>
                                    <td className="py-3.5 px-4 text-xs text-text-muted">{item.lastUpdated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
