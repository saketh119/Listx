import { Link } from "react-router-dom";
import { ListxLogo } from "@/components/ListxLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, BarChart3, Workflow, Sparkles, Layers, RefreshCw } from "lucide-react";
import { NoiseBackground } from "@/components/ui/noise";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-bg-subtle font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to="/">
                            <ListxLogo className="h-8" />
                        </Link>
                        <div className="hidden md:flex gap-6 text-body-sm font-medium text-text-muted">
                            <a href="#features" className="hover:text-brand-dark transition-colors">Features</a>
                            <a href="#how-it-works" className="hover:text-brand-dark transition-colors">How it Works</a>
                            <a href="#pricing" className="hover:text-brand-dark transition-colors">Pricing</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-body-sm font-medium hover:text-brand-jade hidden sm:block">Log in</Link>
                        <Link to="/signup">
                            <Button>Start Free Trial</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-deep text-white">
                <NoiseBackground />
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-jade/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-lake/40 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-display-xl tracking-tight mb-6 max-w-4xl mx-auto">
                        The Operating System for Online Sellers.
                    </h1>
                    <p className="text-body-lg text-brand-tea opacity-80 mb-10 max-w-2xl mx-auto">
                        Unify your inventory, automate logistics, and scale multi-channel sales across Amazon, Flipkart, Shopify, and ONDC with effortless AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link to="/signup">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Start Free <span className="text-brand-deep/60 ml-1">— No Credit Card</span>
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/5 border-white/20 text-white hover:bg-white/10">
                            Watch Demo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm font-medium text-brand-tea/60">
                        <span className="flex items-center backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            ✨ 10,000+ Sellers
                        </span>
                        <span className="flex items-center backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            📦 Amazon Certified Partner
                        </span>
                        <span className="flex items-center backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            🛒 Flipkart Integrated
                        </span>
                    </div>
                </div>
            </section>

            {/* Platform Logos Strip */}
            <section className="py-10 border-b bg-background overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 text-center mb-6">
                    <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">Works seamlessly with your platforms</p>
                </div>
                {/* Simulated Marquee */}
                <div className="flex justify-center flex-wrap gap-8 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="text-xl font-display font-bold">Amazon</span>
                    <span className="text-xl font-display font-bold text-blue-600">Flipkart</span>
                    <span className="text-xl font-display font-bold text-green-600">Shopify</span>
                    <span className="text-xl font-display font-bold text-purple-600">ONDC</span>
                    <span className="text-xl font-display font-bold text-pink-500">Meesho</span>
                    <span className="text-xl font-display font-bold text-purple-800">WooCommerce</span>
                </div>
            </section>

            {/* Feature Highlights */}
            <section id="features" className="py-24 bg-bg-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-display-md mb-4">Everything you need to scale</h2>
                        <p className="text-body-lg text-text-muted">Listx provides a complete suite of tools built specifically for high-volume modern ecommerce operations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Layers, title: "Automated Product Listing", desc: "Push products to all platforms simultaneously with smart mapping." },
                            { icon: Workflow, title: "Smart Logistics Routing", desc: "Auto-assign the cheapest, fastest courier for every pin code." },
                            { icon: Box, title: "Unified Order Management", desc: "Manage all channel orders from a single, lightning-fast dashboard." },
                            { icon: Sparkles, title: "AI Content Generation", desc: "Generate SEO-optimized titles and descriptions in seconds." },
                            { icon: RefreshCw, title: "Real-Time Inventory Sync", desc: "Never oversell again. Quantities update instantly everywhere." },
                            { icon: BarChart3, title: "Analytics & Insights", desc: "Deep dive into your sales velocity, margins, and return rates." },
                        ].map((feature, i) => (
                            <div key={i} className="bg-background p-8 rounded-2xl border hover:shadow-lg transition-shadow duration-300">
                                <div className="w-12 h-12 rounded-xl bg-brand-jade/10 text-brand-jade flex items-center justify-center mb-6">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-h3 mb-2">{feature.title}</h3>
                                <p className="text-body-md text-text-muted">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Placeholder */}
            <footer className="bg-background py-12 border-t text-center">
                <ListxLogo className="h-6 mx-auto mb-6 grayscale opacity-50" />
                <p className="text-body-sm text-text-muted">© 2026 Listx Inc. Prototype Build.</p>
            </footer>
        </div>
    );
}
