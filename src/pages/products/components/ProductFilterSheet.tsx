import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter
} from "@/components/ui/sheet";

interface FilterState {
    platforms: string[];
    statuses: string[];
    stockStatus: string;
    priceMin: string;
    priceMax: string;
    category: string;
}

const initialFilters: FilterState = {
    platforms: [],
    statuses: [],
    stockStatus: 'all',
    priceMin: '',
    priceMax: '',
    category: '',
};

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onApply?: (filters: FilterState) => void;
    totalCount?: number;
}

const platformOptions = [
    { id: 'amazon', label: 'Amazon', color: 'bg-amber-500' },
    { id: 'flipkart', label: 'Flipkart', color: 'bg-yellow-500' },
    { id: 'shopify', label: 'Shopify', color: 'bg-green-500' },
    { id: 'ondc', label: 'ONDC', color: 'bg-purple-500' },
];

const statusOptions = [
    { id: 'active', label: 'Active', color: 'bg-brand-jade' },
    { id: 'draft', label: 'Draft', color: 'bg-text-muted' },
    { id: 'out_of_stock', label: 'Out of Stock', color: 'bg-semantic-error' },
    { id: 'archived', label: 'Archived', color: 'bg-text-muted/50' },
];

const stockOptions = [
    { id: 'all', label: 'All' },
    { id: 'in_stock', label: 'In Stock' },
    { id: 'low_stock', label: 'Low Stock (<10)' },
    { id: 'out_of_stock', label: 'Out of Stock' },
];

const categoryOptions = ['All', 'Electronics', 'Furniture', 'Home & Kitchen', 'Fitness', 'Accessories', 'Apparel'];

export function ProductFilterSheet({ open, onOpenChange, onApply, totalCount = 15 }: Props) {
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    const toggleArray = (arr: string[], val: string) =>
        arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

    const activeFilterCount = [
        filters.platforms.length > 0,
        filters.statuses.length > 0,
        filters.stockStatus !== 'all',
        filters.priceMin !== '' || filters.priceMax !== '',
        filters.category !== '' && filters.category !== 'All',
    ].filter(Boolean).length;

    const clearAll = () => setFilters(initialFilters);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-[420px] p-0 flex flex-col bg-white border-l border-border/60">
                <SheetHeader className="px-6 py-4 border-b border-border/40 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-brand-lake" />
                            <SheetTitle className="text-lg font-bold text-brand-dark">Filter Products</SheetTitle>
                            {activeFilterCount > 0 && (
                                <span className="w-5 h-5 rounded-full bg-brand-lake text-white text-[10px] flex items-center justify-center font-bold">{activeFilterCount}</span>
                            )}
                        </div>
                        {activeFilterCount > 0 && (
                            <button onClick={clearAll} className="text-xs font-medium text-brand-lake hover:underline">Clear All</button>
                        )}
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    {/* Platform */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Platform</Label>
                        <div className="space-y-2">
                            {platformOptions.map(p => (
                                <label key={p.id} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${filters.platforms.includes(p.id) ? 'bg-brand-lake/5' : 'hover:bg-bg-subtle'}`}>
                                    <input type="checkbox" checked={filters.platforms.includes(p.id)}
                                        onChange={() => setFilters(f => ({ ...f, platforms: toggleArray(f.platforms, p.id) }))}
                                        className="w-4 h-4 rounded accent-brand-lake" />
                                    <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                                    <span className="text-sm font-medium text-brand-dark">{p.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Status */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Listing Status</Label>
                        <div className="space-y-2">
                            {statusOptions.map(s => (
                                <label key={s.id} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${filters.statuses.includes(s.id) ? 'bg-brand-lake/5' : 'hover:bg-bg-subtle'}`}>
                                    <input type="checkbox" checked={filters.statuses.includes(s.id)}
                                        onChange={() => setFilters(f => ({ ...f, statuses: toggleArray(f.statuses, s.id) }))}
                                        className="w-4 h-4 rounded accent-brand-lake" />
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                                    <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Stock Status */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Stock Status</Label>
                        <div className="space-y-2">
                            {stockOptions.map(s => (
                                <label key={s.id} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${filters.stockStatus === s.id ? 'bg-brand-lake/5' : 'hover:bg-bg-subtle'}`}>
                                    <input type="radio" name="stockStatus" checked={filters.stockStatus === s.id}
                                        onChange={() => setFilters(f => ({ ...f, stockStatus: s.id }))}
                                        className="w-4 h-4 accent-brand-lake" />
                                    <span className="text-sm font-medium text-brand-dark">{s.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Price Range */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Price Range (₹)</Label>
                        <div className="flex items-center gap-3">
                            <Input type="number" placeholder="Min" value={filters.priceMin}
                                onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value }))}
                                className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" />
                            <span className="text-text-muted text-sm">—</span>
                            <Input type="number" placeholder="Max" value={filters.priceMax}
                                onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))}
                                className="rounded-xl bg-bg-subtle border-transparent h-10 text-sm" />
                        </div>
                    </div>

                    <Separator className="bg-border/40" />

                    {/* Category */}
                    <div>
                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 block">Category</Label>
                        <div className="flex flex-wrap gap-2">
                            {categoryOptions.map(c => (
                                <button key={c} onClick={() => setFilters(f => ({ ...f, category: c === 'All' ? '' : c }))}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${(c === 'All' && !filters.category) || filters.category === c
                                        ? 'bg-brand-lake text-white' : 'bg-bg-subtle text-text-muted hover:bg-brand-lake/10 hover:text-brand-lake'}`}>
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <SheetFooter className="px-6 py-4 border-t border-border/40 shrink-0 flex-col gap-2">
                    <p className="text-xs text-text-muted text-center mb-1">Showing {totalCount} results</p>
                    <Button onClick={() => { onApply?.(filters); onOpenChange(false); }}
                        className="w-full rounded-xl h-11 font-medium shadow-brand-lake/20">
                        Apply Filters
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
