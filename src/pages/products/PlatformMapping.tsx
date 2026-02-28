import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Globe, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const platformData = [
    { id: 'amazon', name: 'Amazon India', status: 'connected', icon: 'A', color: 'brand-saffron', fields: ['Title', 'Brand', 'MRP', 'Category', 'Images', 'Bullet Points'] },
    { id: 'flipkart', name: 'Flipkart', status: 'connected', icon: 'F', color: '[#2874F0]', fields: ['Title', 'Brand Name', 'Selling Price', 'SKU', 'Images', 'Description'] },
    { id: 'shopify', name: 'Shopify Store', status: 'connected', icon: 'S', color: '[#95BF47]', fields: ['Title', 'Vendor', 'Price', 'Type', 'Images', 'Body HTML'] },
    { id: 'ondc', name: 'ONDC Network', status: 'pending', icon: 'O', color: 'brand-cedar', fields: ['Name', 'Brand', 'Price', 'Category', 'Media', 'Short Description'] },
];

const fieldMappings = [
    { source: 'Product Title', targets: { amazon: 'Title', flipkart: 'Title', shopify: 'Title', ondc: 'Name' } },
    { source: 'Brand', targets: { amazon: 'Brand', flipkart: 'Brand Name', shopify: 'Vendor', ondc: 'Brand' } },
    { source: 'Price', targets: { amazon: 'MRP', flipkart: 'Selling Price', shopify: 'Price', ondc: 'Price' } },
    { source: 'Category', targets: { amazon: 'Category', flipkart: 'SKU', shopify: 'Type', ondc: 'Category' } },
    { source: 'Images', targets: { amazon: 'Images', flipkart: 'Images', shopify: 'Images', ondc: 'Media' } },
    { source: 'Description', targets: { amazon: 'Bullet Points', flipkart: 'Description', shopify: 'Body HTML', ondc: 'Short Description' } },
];

export default function PlatformMapping() {
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['amazon', 'flipkart']);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);
    const navigate = useNavigate();

    const togglePlatform = (id: string) => {
        setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    };

    const handlePublish = () => {
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            setPublishSuccess(true);
        }, 2500);
    };

    if (publishSuccess) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[70vh]">
                <div className="text-center max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 rounded-full bg-brand-jade/10 flex items-center justify-center text-brand-jade mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-display-sm font-bold text-brand-dark mb-3">Published Successfully!</h2>
                    <p className="text-body-sm text-text-muted mb-8">
                        Your product has been published to <strong>{selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}</strong>. It may take a few minutes to appear on each marketplace.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" asChild className="rounded-xl h-11 border-border/60">
                            <Link to="/dashboard/products/upload">Add More Products</Link>
                        </Button>
                        <Button onClick={() => navigate('/dashboard/products')} className="rounded-xl h-11 px-8 bg-brand-jade hover:bg-brand-jade/90">
                            View Products
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </Link>
                </Button>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-brand-lake/10 flex items-center justify-center text-brand-lake">
                        <Globe className="w-5 h-5" />
                    </div>
                    <h1 className="text-display-sm font-bold text-brand-dark">Publish to Platforms</h1>
                </div>
                <p className="text-body-sm text-text-muted">
                    Select platforms and review field mappings before publishing your product.
                </p>
            </div>

            {/* Platform Selection */}
            <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8 mb-6">
                <h2 className="text-body-lg font-bold text-brand-dark mb-6">Select Targets</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {platformData.map(platform => (
                        <button
                            key={platform.id}
                            onClick={() => platform.status === 'connected' && togglePlatform(platform.id)}
                            disabled={platform.status !== 'connected'}
                            className={`p-5 rounded-xl border-2 transition-all text-left relative ${platform.status !== 'connected'
                                ? 'border-border/40 opacity-50 cursor-not-allowed'
                                : selectedPlatforms.includes(platform.id)
                                    ? 'border-brand-lake bg-brand-lake/5 shadow-sm'
                                    : 'border-border/60 hover:border-brand-lake/30'
                                }`}
                        >
                            {selectedPlatforms.includes(platform.id) && (
                                <CheckCircle2 className="w-5 h-5 text-brand-lake absolute top-3 right-3" />
                            )}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-3 ${selectedPlatforms.includes(platform.id) ? 'bg-brand-lake/10 text-brand-lake' : 'bg-bg-subtle text-text-muted'
                                }`}>
                                {platform.icon}
                            </div>
                            <div className="text-sm font-bold text-brand-dark">{platform.name}</div>
                            <div className={`text-xs mt-1 font-medium ${platform.status === 'connected' ? 'text-brand-jade' : 'text-text-muted'}`}>
                                {platform.status === 'connected' ? '● Connected' : '○ Not connected'}
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Field Mapping Table */}
            {selectedPlatforms.length > 0 && (
                <section className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden mb-8">
                    <div className="p-6 sm:p-8 pb-0">
                        <h2 className="text-body-lg font-bold text-brand-dark mb-2">Field Mapping Preview</h2>
                        <p className="text-body-sm text-text-muted mb-6">Review how your product fields will map to each platform.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-t border-border/40 bg-bg-subtle/50 text-xs text-text-muted uppercase tracking-wider font-bold">
                                    <th className="py-3 px-6 text-left">Listx Field</th>
                                    {selectedPlatforms.map(pId => {
                                        const p = platformData.find(x => x.id === pId);
                                        return <th key={pId} className="py-3 px-6 text-left">{p?.name}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                                {fieldMappings.map((mapping, i) => (
                                    <tr key={i} className="hover:bg-bg-subtle/30 transition-colors">
                                        <td className="py-3.5 px-6 font-semibold text-brand-dark">{mapping.source}</td>
                                        {selectedPlatforms.map(pId => (
                                            <td key={pId} className="py-3.5 px-6 text-text-muted font-mono text-xs">
                                                {mapping.targets[pId as keyof typeof mapping.targets] || '—'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
                <Button variant="outline" asChild className="rounded-xl h-11 border-border/60">
                    <Link to="/dashboard/products">Cancel</Link>
                </Button>
                <Button
                    onClick={handlePublish}
                    disabled={selectedPlatforms.length === 0 || isPublishing}
                    className="rounded-xl h-11 px-8 bg-brand-jade hover:bg-brand-jade/90 shadow-sm"
                >
                    {isPublishing ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Publishing to {selectedPlatforms.length} platforms...</>
                    ) : (
                        <>Publish to {selectedPlatforms.length} Platform{selectedPlatforms.length > 1 ? 's' : ''}<ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                </Button>
            </div>
        </div>
    );
}
