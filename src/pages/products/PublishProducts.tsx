import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft, Check, AlertTriangle, Calendar,
    ChevronRight, Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";


const platforms = [
    {
        id: 'amazon', name: 'Amazon Seller Central', initial: 'A',
        color: 'bg-amber-500', lightBg: 'bg-amber-500/10', textColor: 'text-amber-600',
        ready: 12, issues: 0, checks: [
            { label: 'Titles under 200 character limit', ok: true },
            { label: 'All required fields filled', ok: true },
            { label: 'Images meet minimum resolution', ok: true },
            { label: 'Brand field populated', ok: true },
        ],
    },
    {
        id: 'flipkart', name: 'Flipkart Seller Hub', initial: 'F',
        color: 'bg-yellow-500', lightBg: 'bg-yellow-500/10', textColor: 'text-yellow-600',
        ready: 10, issues: 2, checks: [
            { label: 'Titles under 150 character limit', ok: true },
            { label: 'All required fields filled', ok: false },
            { label: 'FSN mapping complete', ok: true },
            { label: 'Brand field populated', ok: false },
        ],
    },
    {
        id: 'shopify', name: 'Shopify Store', initial: 'S',
        color: 'bg-green-500', lightBg: 'bg-green-500/10', textColor: 'text-green-600',
        ready: 12, issues: 0, checks: [
            { label: 'Product type assigned', ok: true },
            { label: 'Collections mapped', ok: true },
            { label: 'SEO fields populated', ok: true },
            { label: 'Vendor field filled', ok: true },
        ],
    },
    {
        id: 'ondc', name: 'ONDC Network', initial: 'O',
        color: 'bg-purple-500', lightBg: 'bg-purple-500/10', textColor: 'text-purple-600',
        ready: 8, issues: 4, checks: [
            { label: 'Category code mapped', ok: true },
            { label: 'All mandatory attributes filled', ok: false },
            { label: 'Price within acceptable range', ok: true },
            { label: 'Short description provided', ok: false },
        ],
    },
];

export default function PublishProducts() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string[]>(['amazon', 'shopify']);
    const [scheduleMode, setScheduleMode] = useState<'now' | 'scheduled'>('now');
    const [publishing, setPublishing] = useState(false);

    const togglePlatform = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    };

    const totalReady = platforms.filter(p => selected.includes(p.id)).reduce((sum, p) => sum + p.ready, 0);
    const totalIssues = platforms.filter(p => selected.includes(p.id)).reduce((sum, p) => sum + p.issues, 0);

    const handlePublish = () => {
        setPublishing(true);
        setTimeout(() => navigate('/dashboard/products/publish-success'), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Header */}
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                    </Link>
                </Button>
                <h1 className="text-display-sm font-bold text-brand-dark">Publish Products</h1>
                <p className="text-body-sm text-text-muted mt-1">
                    Select platforms and review pre-flight checks before publishing 12 products.
                </p>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {platforms.map(platform => {
                    const isSelected = selected.includes(platform.id);

                    return (
                        <div key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            className={`bg-white rounded-2xl border-2 shadow-sm p-5 cursor-pointer transition-all duration-200 ${isSelected
                                ? `border-brand-lake/40 shadow-brand-lake/10 ring-1 ring-brand-lake/20`
                                : 'border-border/60 hover:border-border'}`}
                        >
                            {/* Platform Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl ${platform.lightBg} ${platform.textColor} flex items-center justify-center text-sm font-bold`}>
                                        {platform.initial}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-brand-dark">{platform.name}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-brand-jade font-medium">{platform.ready} ready</span>
                                            {platform.issues > 0 && (
                                                <span className="text-xs text-brand-saffron font-medium">• {platform.issues} issues</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${isSelected
                                    ? 'bg-brand-lake border-brand-lake' : 'border-border/60'}`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                            </div>

                            {/* Pre-flight Checks */}
                            <div className="space-y-2">
                                {platform.checks.map((check, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        {check.ok ? (
                                            <div className="w-4 h-4 rounded-full bg-brand-jade/10 flex items-center justify-center shrink-0">
                                                <Check className="w-2.5 h-2.5 text-brand-jade" />
                                            </div>
                                        ) : (
                                            <div className="w-4 h-4 rounded-full bg-brand-saffron/10 flex items-center justify-center shrink-0">
                                                <AlertTriangle className="w-2.5 h-2.5 text-brand-saffron" />
                                            </div>
                                        )}
                                        <span className={`text-xs ${check.ok ? 'text-text-muted' : 'text-brand-saffron font-medium'}`}>{check.label}</span>
                                        {!check.ok && <button className="text-[10px] text-brand-lake font-medium hover:underline ml-auto">Fix</button>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Publishing Options */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-8">
                <h3 className="text-body-md font-bold text-brand-dark mb-4">Publishing Schedule</h3>
                <div className="flex gap-3">
                    <button onClick={() => setScheduleMode('now')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${scheduleMode === 'now' ? 'border-brand-lake/40 bg-brand-lake/5' : 'border-border/60 hover:border-border'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${scheduleMode === 'now' ? 'bg-brand-lake/10 text-brand-lake' : 'bg-bg-subtle text-text-muted'}`}>
                                <ChevronRight className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-brand-dark">Publish Immediately</p>
                                <p className="text-xs text-text-muted">Products go live right away</p>
                            </div>
                        </div>
                    </button>
                    <button onClick={() => setScheduleMode('scheduled')}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${scheduleMode === 'scheduled' ? 'border-brand-lake/40 bg-brand-lake/5' : 'border-border/60 hover:border-border'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${scheduleMode === 'scheduled' ? 'bg-brand-lake/10 text-brand-lake' : 'bg-bg-subtle text-text-muted'}`}>
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-brand-dark">Schedule for Later</p>
                                <p className="text-xs text-text-muted">Pick a date and time</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Summary & Publish */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-bold text-brand-dark">
                        {totalReady} products to {selected.length} platform{selected.length !== 1 ? 's' : ''}
                    </p>
                    {totalIssues > 0 && (
                        <p className="text-xs text-brand-saffron mt-0.5 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> {totalIssues} issues to review
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-border/60 font-medium">Save as Draft</Button>
                    <Button onClick={handlePublish} disabled={selected.length === 0 || publishing} className="rounded-xl shadow-brand-lake/20 font-medium min-w-[200px]">
                        {publishing ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing...</>
                        ) : (
                            <>Publish to {selected.length} Platform{selected.length !== 1 ? 's' : ''} →</>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
