import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft, Copy, ExternalLink, Edit, Trash2, Save,
    Package, ImageIcon, Sparkles, Check, AlertTriangle,
    ChevronDown, ChevronUp, Star
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { extendedMockProducts } from "@/data/mockProducts";

const platformColors: Record<string, { bg: string; text: string; label: string }> = {
    amazon: { bg: 'bg-amber-500/10', text: 'text-amber-600', label: 'Amazon' },
    flipkart: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', label: 'Flipkart' },
    shopify: { bg: 'bg-green-500/10', text: 'text-green-600', label: 'Shopify' },
    ondc: { bg: 'bg-purple-500/10', text: 'text-purple-600', label: 'ONDC' },
};

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const product = extendedMockProducts.find(p => p.id === id);

    const [isEditing, setIsEditing] = useState(false);
    const [copied, setCopied] = useState(false);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        basic: true, description: true, pricing: true, inventory: true, images: true, variants: false, platform: false,
    });

    const [form, setForm] = useState({
        title: product?.title || '',
        sku: product?.sku || '',
        category: product?.category || '',
        price: product?.price || 0,
        compareAtPrice: product?.compareAtPrice || 0,
        costPrice: Math.round((product?.price || 0) * 0.6),
        stock: product?.stock || 0,
        lowStockThreshold: 10,
        description: 'Premium quality product crafted with attention to detail. Designed for everyday use with superior materials and construction that ensures long-lasting durability.',
        bulletPoints: ['High-quality material', 'Ergonomic design', 'Durable construction', 'Easy maintenance', '12-month warranty'],
        taxRate: '18',
    });

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-20 h-20 rounded-full bg-semantic-error/10 flex items-center justify-center text-semantic-error mb-6">
                    <Package className="w-10 h-10" />
                </div>
                <h2 className="text-display-sm font-bold text-brand-dark mb-2">Product Not Found</h2>
                <p className="text-body-sm text-text-muted mb-6">The product you're looking for doesn't exist or has been removed.</p>
                <Button asChild className="rounded-xl">
                    <Link to="/dashboard/products">← Back to Products</Link>
                </Button>
            </div>
        );
    }

    const calculateCompleteness = () => {
        let score = 0;
        if (form.title) score += 15;
        if (form.sku) score += 10;
        if (form.category) score += 10;
        if (form.price > 0) score += 15;
        if (form.description) score += 15;
        if (form.bulletPoints.filter(b => b).length >= 3) score += 10;
        if (product.image) score += 15;
        if (product.platforms.length > 0) score += 10;
        return Math.min(score, 100);
    };

    const margin = form.costPrice > 0 ? (((form.price - form.costPrice) / form.price) * 100).toFixed(1) : '0';
    const completeness = calculateCompleteness();

    const copySku = () => {
        navigator.clipboard.writeText(product.sku);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleSection = (key: string) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const getStatusBadge = () => {
        switch (product.status) {
            case 'active': return <Badge className="bg-brand-jade/10 text-brand-jade border-transparent text-sm px-3 py-1">Active</Badge>;
            case 'draft': return <Badge className="bg-text-muted/10 text-text-muted border-transparent text-sm px-3 py-1">Draft</Badge>;
            case 'out_of_stock': return <Badge className="bg-semantic-error/10 text-semantic-error border-transparent text-sm px-3 py-1">Out of Stock</Badge>;
            case 'archived': return <Badge variant="outline" className="text-text-muted text-sm px-3 py-1">Archived</Badge>;
            default: return null;
        }
    };

    const SectionHeader = ({ id: sectionId, title, icon: Icon }: { id: string; title: string; icon: React.ComponentType<{ className?: string }> }) => (
        <button onClick={() => toggleSection(sectionId)} className="w-full flex items-center justify-between p-5 hover:bg-bg-subtle/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-lake/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-lake" />
                </div>
                <h3 className="text-body-md font-bold text-brand-dark">{title}</h3>
            </div>
            {openSections[sectionId] ? <ChevronUp className="w-4 h-4 text-text-muted" /> : <ChevronDown className="w-4 h-4 text-text-muted" />}
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Breadcrumb + Header */}
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </Link>
                </Button>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            {getStatusBadge()}
                            <span className="text-xs text-text-muted">Last edited: 2 hours ago</span>
                        </div>
                        <h1 className="text-display-sm font-bold text-brand-dark leading-tight">{product.title}</h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="font-mono text-sm text-text-muted bg-bg-subtle px-2 py-0.5 rounded-md">{product.sku}</span>
                            <button onClick={copySku} className="text-text-muted hover:text-brand-lake transition-colors">
                                {copied ? <Check className="w-3.5 h-3.5 text-brand-jade" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        {product.platforms.length > 0 && (
                            <Button variant="outline" className="rounded-xl border-border/60 text-sm">
                                <ExternalLink className="w-4 h-4 mr-2" /> View Live
                            </Button>
                        )}
                        {isEditing ? (
                            <>
                                <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl border-border/60">Cancel</Button>
                                <Button onClick={() => setIsEditing(false)} className="rounded-xl shadow-brand-lake/20">
                                    <Save className="w-4 h-4 mr-2" /> Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)} className="rounded-xl shadow-brand-lake/20">
                                <Edit className="w-4 h-4 mr-2" /> Edit Product
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column — Form Sections */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Basic Info */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                        <SectionHeader id="basic" title="Basic Information" icon={Package} />
                        {openSections.basic && (
                            <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Product Name</Label>
                                    <Input value={form.title} disabled={!isEditing} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                                        className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                                    <span className="text-[11px] text-text-muted mt-1 block">{form.title.length}/150 characters</span>
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">SKU</Label>
                                    <Input value={form.sku} disabled={!isEditing} onChange={e => setForm(p => ({ ...p, sku: e.target.value }))}
                                        className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11 font-mono" />
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Category</Label>
                                    <Select value={form.category} disabled={!isEditing} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                                        <SelectTrigger className="rounded-xl bg-bg-subtle border-transparent h-11">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {['Electronics', 'Furniture', 'Home & Kitchen', 'Fitness', 'Accessories', 'Apparel'].map(c => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                        <SectionHeader id="description" title="Description" icon={Edit} />
                        {openSections.description && (
                            <div className="px-5 pb-5 space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Description</Label>
                                        <Button variant="ghost" size="sm" className="text-xs text-brand-saffron hover:text-brand-saffron/80 h-7 px-2">
                                            <Sparkles className="w-3 h-3 mr-1" /> AI Generate
                                        </Button>
                                    </div>
                                    <Textarea value={form.description} disabled={!isEditing} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                        className="rounded-xl bg-bg-subtle border-transparent focus:bg-white min-h-[120px] resize-none" />
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Key Features</Label>
                                    <div className="space-y-2">
                                        {form.bulletPoints.map((bp, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-brand-jade/10 text-brand-jade text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                                <Input value={bp} disabled={!isEditing}
                                                    onChange={e => { const bps = [...form.bulletPoints]; bps[i] = e.target.value; setForm(p => ({ ...p, bulletPoints: bps })); }}
                                                    className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-9 text-sm" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                        <SectionHeader id="pricing" title="Pricing" icon={Star} />
                        {openSections.pricing && (
                            <div className="px-5 pb-5">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div>
                                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Selling Price (₹)</Label>
                                        <Input type="number" value={form.price} disabled={!isEditing}
                                            onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
                                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11 font-bold text-brand-dark" />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">MRP (₹)</Label>
                                        <Input type="number" value={form.compareAtPrice} disabled={!isEditing}
                                            onChange={e => setForm(p => ({ ...p, compareAtPrice: Number(e.target.value) }))}
                                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Cost Price (₹)</Label>
                                        <Input type="number" value={form.costPrice} disabled={!isEditing}
                                            onChange={e => setForm(p => ({ ...p, costPrice: Number(e.target.value) }))}
                                            className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">GST Rate</Label>
                                        <Select value={form.taxRate} disabled={!isEditing} onValueChange={v => setForm(p => ({ ...p, taxRate: v }))}>
                                            <SelectTrigger className="rounded-xl bg-bg-subtle border-transparent h-11">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {['0', '5', '12', '18', '28'].map(r => (
                                                    <SelectItem key={r} value={r}>{r}%</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-brand-jade/5 rounded-xl flex items-center gap-3">
                                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Margin</span>
                                    <span className={`text-lg font-bold ${Number(margin) >= 30 ? 'text-brand-jade' : Number(margin) >= 15 ? 'text-brand-saffron' : 'text-semantic-error'}`}>
                                        {margin}%
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Inventory */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                        <SectionHeader id="inventory" title="Inventory" icon={Package} />
                        {openSections.inventory && (
                            <div className="px-5 pb-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Current Stock</Label>
                                    <Input type="number" value={form.stock} disabled={!isEditing}
                                        onChange={e => setForm(p => ({ ...p, stock: Number(e.target.value) }))}
                                        className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11 font-bold" />
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Low Stock Threshold</Label>
                                    <Input type="number" value={form.lowStockThreshold} disabled={!isEditing}
                                        onChange={e => setForm(p => ({ ...p, lowStockThreshold: Number(e.target.value) }))}
                                        className="rounded-xl bg-bg-subtle border-transparent focus:bg-white h-11" />
                                </div>
                                <div className="flex items-end">
                                    {form.stock === 0 ? (
                                        <div className="flex items-center gap-2 text-semantic-error text-sm font-bold">
                                            <AlertTriangle className="w-4 h-4" /> Out of Stock
                                        </div>
                                    ) : form.stock <= form.lowStockThreshold ? (
                                        <div className="flex items-center gap-2 text-brand-saffron text-sm font-bold">
                                            <AlertTriangle className="w-4 h-4" /> Low Stock
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-brand-jade text-sm font-bold">
                                            <Check className="w-4 h-4" /> Healthy
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                        <SectionHeader id="images" title="Product Images" icon={ImageIcon} />
                        {openSections.images && (
                            <div className="px-5 pb-5">
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {product.image && (
                                        <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-brand-jade/40 group">
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 left-2">
                                                <Badge className="bg-brand-jade text-white text-[10px] border-transparent">Primary</Badge>
                                            </div>
                                        </div>
                                    )}
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center text-text-muted/40 hover:border-brand-lake/40 hover:text-brand-lake/60 transition-colors cursor-pointer">
                                            <ImageIcon className="w-6 h-6 mb-1" />
                                            <span className="text-[10px] font-medium">Add Image</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[11px] text-text-muted mt-3">Drag images to reorder. First image is the primary. Min resolution: 1000×1000px.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="flex flex-col gap-4">
                    {/* Publish Options */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 sticky top-6">
                        <h3 className="text-body-md font-bold text-brand-dark mb-4">Publish Options</h3>
                        <div className="space-y-3 mb-5">
                            <Button variant="outline" className="w-full rounded-xl border-border/60 h-11 font-medium justify-center">
                                Save as Draft
                            </Button>
                            <Button className="w-full rounded-xl h-11 font-medium shadow-brand-lake/20">
                                Publish Now
                            </Button>
                        </div>

                        <Separator className="my-4 bg-border/40" />

                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Platforms</h4>
                        <div className="space-y-2">
                            {(['amazon', 'flipkart', 'shopify', 'ondc'] as const).map(p => {
                                const pc = platformColors[p];
                                const isActive = product.platforms.includes(p);
                                return (
                                    <label key={p} className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-brand-jade/5' : 'hover:bg-bg-subtle'}`}>
                                        <input type="checkbox" defaultChecked={isActive} className="w-4 h-4 rounded accent-brand-jade" />
                                        <span className={`w-6 h-6 rounded-md ${pc.bg} ${pc.text} flex items-center justify-center text-[10px] font-bold`}>
                                            {pc.label.charAt(0)}
                                        </span>
                                        <span className="text-sm font-medium text-brand-dark">{pc.label}</span>
                                        {isActive && <Check className="w-3.5 h-3.5 text-brand-jade ml-auto" />}
                                    </label>
                                );
                            })}
                        </div>

                        <Separator className="my-4 bg-border/40" />

                        {/* Product Health Score */}
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Product Health</h4>
                        <div className="relative w-full h-3 bg-bg-subtle rounded-full overflow-hidden mb-2">
                            <div className={`h-full rounded-full transition-all duration-500 ${completeness >= 80 ? 'bg-brand-jade' : completeness >= 50 ? 'bg-brand-saffron' : 'bg-semantic-error'}`}
                                style={{ width: `${completeness}%` }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`text-xl font-bold ${completeness >= 80 ? 'text-brand-jade' : completeness >= 50 ? 'text-brand-saffron' : 'text-semantic-error'}`}>
                                {completeness}%
                            </span>
                            <span className="text-[11px] text-text-muted">Completeness</span>
                        </div>
                        {completeness < 100 && (
                            <div className="mt-3 space-y-1.5">
                                {!form.description && <p className="text-[11px] text-text-muted flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-brand-saffron" /> Add a description</p>}
                                {product.platforms.length === 0 && <p className="text-[11px] text-text-muted flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-brand-saffron" /> Select platforms</p>}
                            </div>
                        )}

                        <Separator className="my-4 bg-border/40" />

                        {/* AI Score */}
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">AI Listing Score</h4>
                        <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14">
                                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56"><circle cx="28" cy="28" r="24" fill="none" stroke="#F0F7FA" strokeWidth="4" />
                                    <circle cx="28" cy="28" r="24" fill="none" stroke={product.aiScore >= 80 ? '#42D49C' : product.aiScore >= 60 ? '#F59E0B' : '#FF4C46'}
                                        strokeWidth="4" strokeDasharray={`${(product.aiScore / 100) * 150.8} 150.8`} strokeLinecap="round" /></svg>
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-brand-dark">{product.aiScore}</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-dark">{product.aiScore >= 80 ? 'Excellent' : product.aiScore >= 60 ? 'Good' : 'Needs Work'}</p>
                                <p className="text-[11px] text-text-muted">SEO & listing quality</p>
                            </div>
                        </div>

                        <Separator className="my-4 bg-border/40" />

                        {/* Danger Zone */}
                        <Button variant="outline" className="w-full rounded-xl border-semantic-error/30 text-semantic-error hover:bg-semantic-error/5 hover:border-semantic-error/50 h-10 text-sm font-medium">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete Product
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
