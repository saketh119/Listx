import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Keyboard, Plus, X, ImageIcon, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ManualEntry() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        sku: '',
        price: '',
        compareAtPrice: '',
        category: '',
        stock: '',
        weight: '',
        status: 'draft',
    });
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags(prev => [...prev, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setTags(prev => prev.filter(t => t !== tag));
    };

    const togglePlatform = (platform: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
        );
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            navigate('/dashboard/products');
        }, 1500);
    };

    const platforms = [
        { id: 'amazon', name: 'Amazon', color: 'brand-saffron' },
        { id: 'flipkart', name: 'Flipkart', color: '[#2874F0]' },
        { id: 'shopify', name: 'Shopify', color: '[#95BF47]' },
        { id: 'ondc', name: 'ONDC', color: 'brand-cedar' },
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 pb-24">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products/upload">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Methods
                    </Link>
                </Button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-bg-subtle border border-border/40 flex items-center justify-center text-brand-dark">
                        <Keyboard className="w-5 h-5" />
                    </div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Create Product Manually</h1>
                </div>
                <p className="text-body-sm text-text-muted mt-2">
                    Fill in the details below to add a new product to your catalog.
                </p>
            </div>

            <div className="space-y-8">
                {/* Basic Info */}
                <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8">
                    <h2 className="text-body-lg font-bold text-brand-dark mb-6">Basic Information</h2>
                    <div className="space-y-5">
                        <div>
                            <Label htmlFor="title" className="text-sm font-semibold text-brand-dark mb-2 block">Product Title *</Label>
                            <Input id="title" placeholder="e.g. Ergonomic Office Chair - Mesh Back" className="rounded-xl h-11 bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/40" value={formData.title} onChange={e => handleChange('title', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-sm font-semibold text-brand-dark mb-2 block">Description</Label>
                            <Textarea id="description" placeholder="Write a detailed product description..." className="rounded-xl bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/40 min-h-[120px] resize-y" value={formData.description} onChange={e => handleChange('description', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <Label htmlFor="sku" className="text-sm font-semibold text-brand-dark mb-2 block">SKU *</Label>
                                <Input id="sku" placeholder="e.g. OFF-CHR-001" className="rounded-xl h-11 bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/40 font-mono" value={formData.sku} onChange={e => handleChange('sku', e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="category" className="text-sm font-semibold text-brand-dark mb-2 block">Category *</Label>
                                <Select value={formData.category} onValueChange={v => handleChange('category', v)}>
                                    <SelectTrigger className="rounded-xl h-11 bg-bg-subtle border-transparent focus:bg-white">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="electronics">Electronics</SelectItem>
                                        <SelectItem value="furniture">Furniture</SelectItem>
                                        <SelectItem value="apparel">Apparel</SelectItem>
                                        <SelectItem value="fitness">Fitness</SelectItem>
                                        <SelectItem value="home_kitchen">Home & Kitchen</SelectItem>
                                        <SelectItem value="accessories">Accessories</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Media */}
                <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8">
                    <h2 className="text-body-lg font-bold text-brand-dark mb-6">Media</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-border/60 hover:border-brand-lake/40 hover:bg-brand-lake/5 transition-all flex flex-col items-center justify-center cursor-pointer group">
                                <ImageIcon className="w-6 h-6 text-text-muted/40 group-hover:text-brand-lake transition-colors mb-2" />
                                <span className="text-xs text-text-muted/60 group-hover:text-brand-lake/80">Add image</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-text-muted mt-3">Upload up to 8 images. Accepted: .jpg, .png, .webp. Max 5MB each.</p>
                </section>

                {/* Pricing & Inventory */}
                <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8">
                    <h2 className="text-body-lg font-bold text-brand-dark mb-6">Pricing & Inventory</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div>
                            <Label htmlFor="price" className="text-sm font-semibold text-brand-dark mb-2 block">Price (₹) *</Label>
                            <Input id="price" type="number" placeholder="0.00" className="rounded-xl h-11 bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/40" value={formData.price} onChange={e => handleChange('price', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="compareAtPrice" className="text-sm font-semibold text-brand-dark mb-2 block">Compare-at Price (₹)</Label>
                            <Input id="compareAtPrice" type="number" placeholder="0.00" className="rounded-xl h-11 bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/40" value={formData.compareAtPrice} onChange={e => handleChange('compareAtPrice', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="stock" className="text-sm font-semibold text-brand-dark mb-2 block">Stock Quantity *</Label>
                            <Input id="stock" type="number" placeholder="0" className="rounded-xl h-11 bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/40" value={formData.stock} onChange={e => handleChange('stock', e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* Tags */}
                <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8">
                    <h2 className="text-body-lg font-bold text-brand-dark mb-6">Tags</h2>
                    <div className="flex gap-2 mb-4">
                        <Input
                            placeholder="Add a tag..."
                            className="rounded-xl h-10 bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/40 flex-1"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button variant="outline" onClick={addTag} className="rounded-xl h-10 shrink-0 border-border/60">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-lake/10 text-brand-lake text-xs font-semibold">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-semantic-error transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                    )}
                </section>

                {/* Publish To Platforms */}
                <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8">
                    <h2 className="text-body-lg font-bold text-brand-dark mb-2">Publish to Platforms</h2>
                    <p className="text-body-sm text-text-muted mb-6">Select where this product should be listed once saved.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {platforms.map(platform => (
                            <button
                                key={platform.id}
                                onClick={() => togglePlatform(platform.id)}
                                className={`p-4 rounded-xl border-2 transition-all text-center font-semibold text-sm ${selectedPlatforms.includes(platform.id)
                                    ? `border-brand-lake bg-brand-lake/5 text-brand-dark shadow-sm`
                                    : `border-border/60 text-text-muted hover:border-brand-lake/30 hover:bg-bg-subtle`
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-lg font-bold ${selectedPlatforms.includes(platform.id) ? 'bg-brand-lake/10 text-brand-lake' : 'bg-bg-subtle text-text-muted'
                                    }`}>
                                    {platform.name.charAt(0)}
                                </div>
                                {platform.name}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-border/60 py-4 z-50">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Select value={formData.status} onValueChange={v => handleChange('status', v)}>
                            <SelectTrigger className="w-32 rounded-xl h-10 border-border/60 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="draft">Save as Draft</SelectItem>
                                <SelectItem value="active">Publish Now</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" asChild className="rounded-xl h-10 border-border/60 hidden sm:flex">
                            <Link to="/dashboard/products">
                                Cancel
                            </Link>
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving} className="rounded-xl h-10 px-8 shadow-sm bg-brand-jade hover:bg-brand-jade/90">
                            {isSaving ? (
                                <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />Saving...</>
                            ) : (
                                <><Save className="w-4 h-4 mr-2" />Save Product</>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
