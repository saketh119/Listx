import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Plus, Search, Filter, LayoutGrid, List as ListIcon,
    Download, Tag
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extendedMockProducts } from "@/data/mockProducts";

import { ProductTable } from "./components/ProductTable";
import { ProductGrid } from "./components/ProductGrid";

export default function ProductsList() {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    // Filter logic
    const filteredProducts = extendedMockProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'active') return matchesSearch && product.status === 'active';
        if (activeTab === 'draft') return matchesSearch && product.status === 'draft';
        if (activeTab === 'out_of_stock') return matchesSearch && product.status === 'out_of_stock';

        return matchesSearch;
    });

    return (
        <div className="flex flex-col h-full gap-6 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Products</h1>
                    <p className="text-body-sm text-text-muted mt-1">
                        Manage your catalog across all sales channels.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="hidden sm:flex rounded-xl font-medium border-border/60">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button asChild className="rounded-xl shadow-brand-lake/20 hover:shadow-brand-lake/40 font-medium">
                        <Link to="/dashboard/products/upload">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Filters & Controls */}
            <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm flex flex-col gap-4">
                <div className="flex flex-col xl:flex-row justify-between gap-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full xl:w-auto">
                        <TabsList className="bg-bg-subtle p-1 rounded-xl w-full sm:w-auto grid grid-cols-4 sm:flex h-auto">
                            <TabsTrigger value="all" className="rounded-lg py-2 px-4 text-sm font-medium data-[state=active]:shadow-sm">
                                All <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/50 text-xs text-text-muted">{extendedMockProducts.length}</span>
                            </TabsTrigger>
                            <TabsTrigger value="active" className="rounded-lg py-2 px-4 text-sm font-medium data-[state=active]:shadow-sm data-[state=active]:text-brand-jade">
                                Active <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/50 text-xs text-brand-jade/80">{extendedMockProducts.filter(p => p.status === 'active').length}</span>
                            </TabsTrigger>
                            <TabsTrigger value="draft" className="rounded-lg py-2 px-4 text-sm font-medium data-[state=active]:shadow-sm data-[state=active]:text-text-muted">
                                Draft <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/50 text-xs text-text-muted/80">{extendedMockProducts.filter(p => p.status === 'draft').length}</span>
                            </TabsTrigger>
                            <TabsTrigger value="out_of_stock" className="rounded-lg py-2 px-4 text-sm font-medium data-[state=active]:shadow-sm data-[state=active]:text-semantic-error">
                                Out of Stock <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/50 text-xs text-semantic-error/80">{extendedMockProducts.filter(p => p.status === 'out_of_stock').length}</span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="flex items-center gap-3">
                        <div className="relative w-full xl:w-72">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <Input
                                placeholder="Search products, SKUs..."
                                className="pl-9 h-10 rounded-xl bg-bg-subtle border-transparent focus:bg-white transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 rounded-xl border-border/60">
                            <Filter className="w-4 h-4 text-text-muted" />
                        </Button>
                        <div className="h-10 bg-bg-subtle rounded-xl p-1 flex items-center shrink-0 border border-border/60">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-dark' : 'text-text-muted hover:text-brand-dark'}`}
                            >
                                <ListIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-dark' : 'text-text-muted hover:text-brand-dark'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* List/Grid Content */}
            {filteredProducts.length > 0 ? (
                <>
                    {viewMode === 'list' ? (
                        <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                            <ProductTable products={filteredProducts} />
                        </div>
                    ) : (
                        <ProductGrid products={filteredProducts} />
                    )}
                </>
            ) : (
                <div className="bg-white rounded-2xl border border-border/60 border-dashed p-16 flex flex-col items-center justify-center text-center mt-4">
                    <div className="w-16 h-16 rounded-full bg-brand-saffron/10 flex items-center justify-center text-brand-saffron mb-4">
                        <Tag className="w-8 h-8" />
                    </div>
                    <h3 className="text-body-lg font-bold text-brand-dark mb-2">No products found</h3>
                    <p className="text-body-sm text-text-muted max-w-sm mb-6">
                        We couldn't find any products matching your current filters. Try adjusting your search or tab selection.
                    </p>
                    <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveTab('all'); }} className="rounded-xl">
                        Clear Filters
                    </Button>
                </div>
            )}
        </div>
    );
}
