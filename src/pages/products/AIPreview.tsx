import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft, CheckCircle2, Sparkles, RefreshCw, Edit,
    Check
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const aiProducts = [
    {
        id: 'P1', originalTitle: 'Office Chair', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=200&q=80',
        aiTitle: 'Premium Ergonomic Office Chair – Breathable Mesh Back, Adjustable Lumbar Support & Armrests, 360° Swivel',
        aiDescription: 'Transform your workspace with this premium ergonomic office chair featuring a breathable mesh back for all-day comfort. The adjustable lumbar support and armrests ensure a customized seating experience, while the 360° swivel and smooth-rolling casters make movement effortless.',
        keywords: ['ergonomic chair', 'office chair', 'mesh back', 'lumbar support', 'swivel chair', 'desk chair'],
        status: 'approved' as const, score: 94,
    },
    {
        id: 'P2', originalTitle: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80',
        aiTitle: 'Wireless Active Noise-Cancelling Headphones – 40H Battery, Hi-Res Audio, Foldable Design (Midnight Black)',
        aiDescription: 'Experience pure audio bliss with these wireless noise-cancelling headphones. Featuring 40 hours of battery life, Hi-Res Audio certification, and a sleek foldable design that makes them perfect for travel and daily commutes.',
        keywords: ['wireless headphones', 'noise cancelling', 'bluetooth', 'hi-res audio', 'over-ear', 'foldable'],
        status: 'needs_review' as const, score: 87,
    },
    {
        id: 'P3', originalTitle: 'Yoga Mat', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&q=80',
        aiTitle: 'Organic Cotton Yoga Mat – Extra Thick 8mm, Non-Slip Surface, Eco-Friendly, Carrying Strap Included',
        aiDescription: 'Elevate your yoga practice with this eco-friendly organic cotton yoga mat. The extra-thick 8mm cushion provides superior joint protection, while the non-slip surface ensures stability during the most demanding poses.',
        keywords: ['yoga mat', 'organic cotton', 'non-slip', 'thick mat', 'eco-friendly', 'fitness mat'],
        status: 'needs_review' as const, score: 91,
    },
    {
        id: 'P4', originalTitle: 'Water Bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&q=80',
        aiTitle: 'Stainless Steel Insulated Water Bottle 1L – 24H Cold, 12H Hot, BPA-Free, Leak-Proof Sports Bottle',
        aiDescription: 'Stay hydrated in style with this premium stainless steel insulated water bottle. Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design makes it perfect for gym, office, and outdoor adventures.',
        keywords: ['water bottle', 'insulated bottle', 'stainless steel', 'BPA free', 'sports bottle', 'thermos'],
        status: 'approved' as const, score: 96,
    },
    {
        id: 'P5', originalTitle: 'LED Desk Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&q=80',
        aiTitle: 'Smart LED Desk Lamp with Wireless Charging – 5 Color Modes, Touch Control, Eye-Care Technology',
        aiDescription: 'Illuminate your workspace with this smart LED desk lamp featuring built-in wireless charging. Five adjustable color temperature modes and stepless brightness control create the perfect lighting for any task, while the eye-care technology reduces strain during long working hours.',
        keywords: ['desk lamp', 'LED lamp', 'wireless charging', 'smart lamp', 'eye care', 'touch control'],
        status: 'needs_review' as const, score: 82,
    },
];

type ProductStatus = 'approved' | 'needs_review' | 'rejected';

interface AIProduct {
    id: string;
    originalTitle: string;
    image: string;
    aiTitle: string;
    aiDescription: string;
    keywords: string[];
    status: ProductStatus;
    score: number;
}

export default function AIPreview() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<AIProduct[]>(aiProducts);
    const [activeTab, setActiveTab] = useState('all');
    const [editingId, setEditingId] = useState<string | null>(null);

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

    const toggleStatus = (id: string, newStatus: ProductStatus) => {
        setProducts(prods => prods.map(p => p.id === id ? { ...p, status: newStatus } : p));
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products/upload/ai">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to AI Processing
                    </Link>
                </Button>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-display-sm font-bold text-brand-dark">Review AI-Generated Listings</h1>
                        <p className="text-body-sm text-text-muted mt-1">
                            Review, edit, and approve AI-generated content before publishing.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium">
                            <RefreshCw className="w-4 h-4 mr-2" /> Regenerate All
                        </Button>
                        <Button onClick={approveAll} className="rounded-xl shadow-brand-lake/20 font-medium">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Approve All
                        </Button>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-brand-dark">{approvedCount} of {products.length} approved</span>
                    <span className="text-xs text-text-muted">{needsReviewCount} needs review</span>
                </div>
                <div className="w-full h-2.5 bg-bg-subtle rounded-full overflow-hidden">
                    <div className="h-full bg-brand-jade rounded-full transition-all duration-500"
                        style={{ width: `${(approvedCount / products.length) * 100}%` }} />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between mb-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-bg-subtle p-1 rounded-xl">
                        <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm">
                            All <span className="ml-1.5 text-xs text-text-muted">{products.length}</span>
                        </TabsTrigger>
                        <TabsTrigger value="needs_review" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm data-[state=active]:text-brand-saffron">
                            Needs Review <span className="ml-1.5 text-xs text-brand-saffron">{needsReviewCount}</span>
                        </TabsTrigger>
                        <TabsTrigger value="approved" className="rounded-lg px-4 py-2 text-sm data-[state=active]:shadow-sm data-[state=active]:text-brand-jade">
                            Approved <span className="ml-1.5 text-xs text-brand-jade">{approvedCount}</span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Product Cards */}
            <div className="space-y-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${product.status === 'approved' ? 'border-brand-jade/30' : 'border-border/60'}`}>
                        <div className="p-5">
                            <div className="flex gap-5">
                                {/* Thumbnail */}
                                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-bg-subtle">
                                    <img src={product.image} alt={product.originalTitle} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    {/* Original Title */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Original:</span>
                                        <span className="text-xs text-text-muted">{product.originalTitle}</span>
                                    </div>

                                    {/* AI Title */}
                                    {editingId === product.id ? (
                                        <Textarea defaultValue={product.aiTitle}
                                            className="rounded-xl bg-bg-subtle border-brand-lake/30 focus:bg-white text-sm font-bold text-brand-dark mb-2 min-h-[60px]"
                                            onBlur={() => setEditingId(null)} autoFocus />
                                    ) : (
                                        <div className="flex items-start gap-2 mb-2">
                                            <h3 className="text-sm font-bold text-brand-dark leading-snug flex-1">{product.aiTitle}</h3>
                                            <button onClick={() => setEditingId(product.id)} className="shrink-0 mt-0.5 text-text-muted hover:text-brand-lake transition-colors">
                                                <Edit className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}

                                    {/* AI Description */}
                                    <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">{product.aiDescription}</p>

                                    {/* Keywords */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {product.keywords.map(kw => (
                                            <span key={kw} className="px-2 py-0.5 bg-brand-lake/5 text-brand-lake text-[10px] font-medium rounded-md">{kw}</span>
                                        ))}
                                    </div>

                                    {/* Bottom row */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5">
                                                <Sparkles className={`w-3.5 h-3.5 ${product.score >= 90 ? 'text-brand-jade' : product.score >= 80 ? 'text-brand-saffron' : 'text-text-muted'}`} />
                                                <span className="text-xs font-bold text-brand-dark">Score: {product.score}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium text-text-muted hover:text-brand-lake rounded-lg">
                                                <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                                            </Button>
                                            {product.status === 'approved' ? (
                                                <Button size="sm" variant="outline" onClick={() => toggleStatus(product.id, 'needs_review')}
                                                    className="h-8 px-3 text-xs font-medium rounded-lg border-brand-jade/30 text-brand-jade bg-brand-jade/5">
                                                    <Check className="w-3 h-3 mr-1" /> Approved
                                                </Button>
                                            ) : (
                                                <Button size="sm" onClick={() => toggleStatus(product.id, 'approved')}
                                                    className="h-8 px-3 text-xs font-medium rounded-lg bg-brand-jade hover:bg-brand-jade/90 text-white">
                                                    <Check className="w-3 h-3 mr-1" /> Approve
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

            {/* Bottom Action */}
            {approvedCount > 0 && (
                <div className="mt-8 flex items-center justify-between bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                    <span className="text-sm font-bold text-brand-dark">{approvedCount} product{approvedCount > 1 ? 's' : ''} ready to publish</span>
                    <Button onClick={() => navigate('/dashboard/products/publish-select')} className="rounded-xl shadow-brand-lake/20 font-medium">
                        Publish Approved Products →
                    </Button>
                </div>
            )}
        </div>
    );
}
