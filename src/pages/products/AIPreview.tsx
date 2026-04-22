import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    ArrowLeft, CheckCircle2, Sparkles, RefreshCw, Edit,
    Check, Tag, Info, DollarSign
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";

type ProductStatus = 'approved' | 'needs_review' | 'rejected';

interface AIProduct {
    sku: string;
    title: string;
    price: number;
    category: string;
    description: string;
    status: ProductStatus;
    score?: number;
    image?: string;
}

export default function AIPreview() {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState<AIProduct[]>(location.state?.products || []);
    const [activeTab, setActiveTab] = useState('all');
    const [editingSku, setEditingSku] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const approvedCount = products.filter(p => p.status === 'approved').length;
    const needsReviewCount = products.filter(p => p.status === 'needs_review').length;

    const filteredProducts = products.filter(p => {
        if (activeTab === 'all') return true;
        if (activeTab === 'needs_review') return p.status === 'needs_review';
        if (activeTab === 'approved') return p.status === 'approved';
        return true;
    });

    const approveAll = () => {
        setProducts(prods => prods.map(p => ({ ...p, status: 'approved' as const })));
    };

    const toggleStatus = (sku: string, newStatus: ProductStatus) => {
        setProducts(prods => prods.map(p => p.sku === sku ? { ...p, status: newStatus } : p));
    };

    const handleUpdateField = (sku: string, field: keyof AIProduct, value: string | number) => {
        setProducts(prods => prods.map(p => p.sku === sku ? { ...p, [field]: value } : p));
    };

    const handleSaveAll = async () => {
        const approvedProducts = products.filter(p => p.status === 'approved');
        if (approvedProducts.length === 0) {
            alert("Please approve at least one product before saving.");
            return;
        }

        setIsSaving(true);
        try {
            await Promise.all(approvedProducts.map(prod => 
                apiClient.post('/products', {
                    ...prod,
                    status: 'active'
                })
            ));

            alert(`Successfully added ${approvedProducts.length} products to your catalog!`);
            navigate('/dashboard/products');
        } catch (error) {
            console.error("Failed to save products:", error);
            alert("Some products failed to save. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-6 px-4 sm:px-0">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products/upload/ai">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to AI Processing
                    </Link>
                </Button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-display-sm font-bold text-brand-dark">Review AI-Generated Listings</h1>
                        <p className="text-body-sm text-text-muted mt-1">
                            Verify identified products and prices before adding to your catalog.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={approveAll} className="rounded-xl shadow-brand-lake/20 font-medium h-11 px-6 bg-brand-lake hover:bg-brand-lake/90">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Approve All
                        </Button>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 mb-6 mx-4 sm:mx-0">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-brand-dark">{approvedCount} of {products.length} approved</span>
                    <span className="text-xs text-text-muted">{needsReviewCount} needs review</span>
                </div>
                <div className="w-full h-2.5 bg-bg-subtle rounded-full overflow-hidden">
                    <div className="h-full bg-brand-jade rounded-full transition-all duration-500"
                        style={{ width: `${(approvedCount / (products.length || 1)) * 100}%` }} />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-bg-subtle p-1 rounded-xl">
                        <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-sm">
                            All <span className="ml-1.5 text-xs text-text-muted">{products.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="needs_review" className="rounded-lg px-4 py-2 text-sm data-[state=active]:text-brand-saffron">
                            Needs Review <span className="ml-1.5 text-xs text-brand-saffron">{needsReviewCount}</span>
                        </TabsTrigger>
                        <TabsTrigger value="approved" className="rounded-lg px-4 py-2 text-sm data-[state=active]:text-brand-jade">
                            Approved <span className="ml-1.5 text-xs text-brand-jade">{approvedCount}</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Product Cards */}
            <div className="space-y-4 px-4 sm:px-0">
                {products.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-border/60">
                        <Info className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-brand-dark">No products extracted</h3>
                        <p className="text-sm text-text-muted mt-1">Please go back and upload a clear image of your list.</p>
                        <Button asChild className="mt-6 rounded-xl" variant="outline">
                            <Link to="/dashboard/products/upload/ai">Go Back</Link>
                        </Button>
                    </div>
                )}
                {filteredProducts.map((product, idx) => (
                    <div key={product.sku || idx} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${product.status === 'approved' ? 'border-brand-jade/30' : 'border-border/60'}`}>
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Details Area */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            {editingSku === product.sku ? (
                                                <input 
                                                    className="w-full text-lg font-bold text-brand-dark bg-bg-subtle p-2 rounded-lg border-2 border-brand-lake/30 outline-none"
                                                    value={product.title}
                                                    onChange={(e) => handleUpdateField(product.sku, 'title', e.target.value)}
                                                    onBlur={() => setEditingSku(null)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setEditingSku(product.sku)}>
                                                    <h3 className="text-lg font-bold text-brand-dark leading-tight">{product.title}</h3>
                                                    <Edit className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 ml-4">
                                            <div className="flex items-center gap-1 text-brand-jade font-black text-lg">
                                                <DollarSign className="w-4 h-4" />
                                                {product.price}
                                            </div>
                                            <span className="px-3 py-1 bg-brand-lake/10 text-brand-lake text-[10px] font-bold rounded-full uppercase tracking-wider border border-brand-lake/20">
                                                {product.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="p-4 bg-bg-subtle rounded-xl border border-border/40">
                                            <div className="flex items-center gap-2 mb-2 text-text-muted">
                                                <Info className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">AI Description</span>
                                            </div>
                                            <p className="text-xs text-brand-dark/80 leading-relaxed italic">"{product.description}"</p>
                                        </div>
                                        <div className="p-4 bg-bg-subtle rounded-xl border border-border/40">
                                            <div className="flex items-center gap-2 mb-2 text-text-muted">
                                                <Tag className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">SKU Details</span>
                                            </div>
                                            <p className="text-xs font-mono text-brand-lake font-bold">{product.sku}</p>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                        <div className="flex items-center gap-4">
                                            {product.score && (
                                                <div className="flex items-center gap-1.5">
                                                    <Sparkles className="w-4 h-4 text-brand-saffron" />
                                                    <span className="text-xs font-bold text-brand-dark">Match: {product.score}%</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {product.status === 'approved' ? (
                                                <Button size="sm" variant="outline" onClick={() => toggleStatus(product.sku, 'needs_review')}
                                                    className="h-9 px-4 text-xs font-medium rounded-xl border-brand-jade/30 text-brand-jade bg-brand-jade/5">
                                                    <Check className="w-3.5 h-3.5 mr-1.5" /> Approved
                                                </Button>
                                            ) : (
                                                <Button size="sm" onClick={() => toggleStatus(product.sku, 'approved')}
                                                    className="h-9 px-4 text-xs font-medium rounded-xl bg-brand-jade hover:bg-brand-jade/90 text-white">
                                                    <Check className="w-3.5 h-3.5 mr-1.5" /> Approve Product
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Action Bar */}
            {approvedCount > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-50">
                    <div className="bg-brand-dark rounded-2xl shadow-2xl p-4 flex items-center justify-between border border-white/10 backdrop-blur-md">
                        <div className="flex items-center gap-3 pl-2">
                            <div className="w-10 h-10 rounded-full bg-brand-jade/20 flex items-center justify-center text-brand-jade">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold">{approvedCount} Products Selected</h4>
                                <p className="text-white/60 text-[10px]">Ready to be added to your catalog</p>
                            </div>
                        </div>
                        <Button 
                            onClick={handleSaveAll} 
                            disabled={isSaving} 
                            className="bg-brand-jade hover:bg-brand-jade/90 text-white font-bold h-11 px-8 rounded-xl shadow-lg transition-all active:scale-95"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Sparkles className="w-4 h-4 mr-2" />
                            )}
                            {isSaving ? "Saving..." : "Add to Catalog"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

const Loader2 = ({ className }: { className?: string }) => (
    <RefreshCw className={className} />
);
