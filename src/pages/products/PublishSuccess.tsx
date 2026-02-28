import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    CheckCircle2, Upload, BarChart3,
    Package, AlertTriangle
} from "lucide-react";



const platformResults = [
    { name: 'Amazon', initial: 'A', color: 'bg-amber-500', textColor: 'text-amber-600', lightBg: 'bg-amber-500/10', count: 12, status: 'live' as const },
    { name: 'Shopify', initial: 'S', color: 'bg-green-500', textColor: 'text-green-600', lightBg: 'bg-green-500/10', count: 12, status: 'live' as const },
    { name: 'Flipkart', initial: 'F', color: 'bg-yellow-500', textColor: 'text-yellow-600', lightBg: 'bg-yellow-500/10', count: 10, status: 'review' as const },
];

export default function PublishSuccess() {
    const [showCheck, setShowCheck] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowCheck(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const totalPublished = platformResults.reduce((sum, p) => sum + p.count, 0);

    return (
        <div className="max-w-2xl mx-auto py-16 text-center">
            {/* Animated Checkmark */}
            <div className="flex justify-center mb-8">
                <div className={`w-24 h-24 rounded-full bg-brand-jade/10 flex items-center justify-center transition-all duration-700 ${showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                    <div className={`w-16 h-16 rounded-full bg-brand-jade flex items-center justify-center transition-all duration-500 delay-300 ${showCheck ? 'scale-100' : 'scale-0'}`}>
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                </div>
            </div>

            {/* Title */}
            <h1 className={`text-display-sm font-bold text-brand-dark mb-3 transition-all duration-500 delay-500 ${showCheck ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Products Published Successfully!
            </h1>
            <p className={`text-body-md text-text-muted mb-10 transition-all duration-500 delay-700 ${showCheck ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {totalPublished} products published to {platformResults.length} platforms
            </p>

            {/* Platform Breakdown */}
            <div className={`bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-8 text-left transition-all duration-500 delay-[900ms] ${showCheck ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Platform Breakdown</h3>
                <div className="space-y-3">
                    {platformResults.map(platform => (
                        <div key={platform.name} className="flex items-center justify-between p-3 rounded-xl bg-bg-subtle/50">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg ${platform.lightBg} ${platform.textColor} flex items-center justify-center text-xs font-bold`}>
                                    {platform.initial}
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-brand-dark">{platform.name}</span>
                                    <span className="text-xs text-text-muted ml-2">{platform.count} products</span>
                                </div>
                            </div>
                            {platform.status === 'live' ? (
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-brand-jade status-dot--live" />
                                    <span className="text-xs font-bold text-brand-jade">Live</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1.5">
                                    <AlertTriangle className="w-3.5 h-3.5 text-brand-saffron" />
                                    <span className="text-xs font-bold text-brand-saffron">Pending Review</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {platformResults.some(p => p.status === 'review') && (
                    <div className="mt-4 p-3 bg-brand-saffron/5 rounded-xl flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-brand-saffron shrink-0 mt-0.5" />
                        <p className="text-xs text-brand-saffron/80">
                            2 products on Flipkart are in review — usually takes 24–48 hours.
                        </p>
                    </div>
                )}
            </div>

            {/* Next Steps */}
            <div className={`transition-all duration-500 delay-[1100ms] ${showCheck ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">What's Next?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link to="/dashboard/products"
                        className="group flex flex-col items-center p-5 bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-md hover:border-brand-lake/30 transition-all">
                        <Package className="w-6 h-6 text-brand-lake mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-brand-dark mb-0.5">View All Products</span>
                        <span className="text-[11px] text-text-muted">Manage your catalog</span>
                    </Link>
                    <Link to="/dashboard/products/upload"
                        className="group flex flex-col items-center p-5 bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-md hover:border-brand-lake/30 transition-all">
                        <Upload className="w-6 h-6 text-brand-saffron mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-brand-dark mb-0.5">Upload More</span>
                        <span className="text-[11px] text-text-muted">Add more products</span>
                    </Link>
                    <Link to="/dashboard"
                        className="group flex flex-col items-center p-5 bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-md hover:border-brand-lake/30 transition-all">
                        <BarChart3 className="w-6 h-6 text-brand-jade mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold text-brand-dark mb-0.5">View Analytics</span>
                        <span className="text-[11px] text-text-muted">Track performance</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
