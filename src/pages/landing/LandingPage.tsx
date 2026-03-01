import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ListxLogo } from "@/components/ListxLogo";
import {
    BarChart3, Sparkles,
    CheckCircle2, Truck,
    RefreshCcw, Globe, ShieldCheck, Menu, X, ArrowRight
} from "lucide-react";

/* ─── Scroll-reveal ─── */
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
        if (ref.current) o.observe(ref.current);
        return () => o.disconnect();
    }, []);
    return (
        <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}>{children}</div>
    );
}




export function LandingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activePricingTab, setActivePricingTab] = useState<'Starter' | 'Growth' | 'Scale'>('Growth');

    const pricingPlans = [
        { name: 'Starter' as const, desc: 'Perfect for new sellers exploring multi-channel selling.', price: 'Free', popular: false },
        { name: 'Growth' as const, desc: 'For scaling brands needing advanced analytics and tools.', price: '₹2,999', popular: true },
        { name: 'Scale' as const, desc: 'For high-volume operations requiring dedicated support.', price: 'Custom', popular: false },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-brand-dark overflow-x-hidden">

            {/* ═══ NAVBAR — Premium Floating Pill ═══ */}
            <nav className="fixed top-0 w-full z-50 transition-all duration-300">
                <div className="max-w-[860px] mx-auto px-4 mt-6">
                    <div className="relative group rounded-full overflow-hidden p-[1px] shadow-[0_8px_32px_rgba(1,43,58,0.15)] bg-gradient-to-r from-white/10 via-brand-jade/30 to-emerald-300/10">
                        <div className="bg-brand-dark/90 backdrop-blur-2xl rounded-full px-7 h-[56px] flex items-center justify-between">
                            <Link to="/" className="flex items-center shrink-0">
                                <ListxLogo className="h-[20px] brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                            </Link>
                            <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-white/55">
                                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">Home</a>
                                <a href="#features" className="hover:text-white transition-colors duration-200">Product</a>
                                <a href="#how-it-works" className="hover:text-white transition-colors duration-200">Solution</a>
                                <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
                                <a href="#integrations" className="hover:text-white transition-colors duration-200">About us</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="hidden sm:block text-[13px] font-bold text-white/80 hover:text-white transition-colors">
                                    Log in
                                </Link>
                                <Link to="/signup" className="hidden sm:block">
                                    <button className="h-[36px] px-6 rounded-full bg-gradient-to-r from-brand-jade to-emerald-400 text-[#00394d] text-[13px] font-bold tracking-tight hover:shadow-[0_0_20px_rgba(66,212,156,0.4)] transition-all duration-300 active:scale-[0.98]">
                                        Start Free
                                    </button>
                                </Link>
                                <button
                                    className="md:hidden p-1 text-white/80 hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                >
                                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div className={`md:hidden absolute top-[calc(100%+12px)] left-4 right-4 bg-brand-dark/95 backdrop-blur-3xl rounded-[24px] border border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                        <div className="p-6 flex flex-col gap-6 text-center">
                            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-white/90 hover:text-brand-jade transition-colors">Product</a>
                            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-white/90 hover:text-brand-jade transition-colors">Solution</a>
                            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-white/90 hover:text-brand-jade transition-colors">Pricing</a>
                            <a href="#integrations" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-white/90 hover:text-brand-jade transition-colors">About us</a>

                            <div className="h-[1px] w-full bg-white/10 my-2" />

                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-[16px] font-bold text-white hover:text-brand-jade transition-colors">Log in</Link>
                            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="w-full h-[48px] rounded-full bg-brand-jade text-[#00394d] text-[16px] font-bold tracking-tight active:scale-[0.98]">
                                    Start 14-day Free Trial
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ═══ HERO — Next-Gen Modern SaaS ═══ */}
            <section className="relative pt-[120px] sm:pt-[160px] pb-16 sm:pb-24 overflow-visible">
                {/* Modern subtle dot pattern + mesh gradient background */}
                <div className="absolute inset-0 bg-[#FAFCFB] -z-20">
                    <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/eldoraui/image/upload/v1734020993/dot-pattern_pwj8s0.svg')] opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                </div>

                {/* Floating ambient orbs for mesh gradient effect */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[500px] bg-brand-jade/20 rounded-full blur-[120px] -z-10 mix-blend-multiply opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[400px] bg-emerald-300/20 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60 animate-pulse" style={{ animationDuration: '12s' }} />

                <div className="max-w-[1100px] mx-auto px-4 relative z-10 text-center">
                    {/* Glowing Modern Badge */}
                    <Reveal>
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-12 relative group cursor-pointer hover:bg-white hover:shadow-[0_4px_32px_rgba(66,212,156,0.15)] transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-x-0 w-full h-[1px] bottom-0 bg-gradient-to-r from-transparent via-brand-jade/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-jade opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-mint"></span>
                            </span>
                            <p className="text-[13px] font-bold tracking-[0.15em] text-brand-dark uppercase">
                                ListX 1.0 is Live
                            </p>
                            <ArrowRight className="w-4 h-4 text-brand-dark/50 group-hover:text-brand-jade group-hover:translate-x-1 transition-all" />
                        </div>
                    </Reveal>

                    {/* Main heading - Cleaner, tighter sizing */}
                    <Reveal delay={80}>
                        <h1 className="font-display text-[42px] sm:text-[64px] lg:text-[76px] font-extrabold tracking-[-0.04em] leading-[1.0] text-brand-dark mb-6 sm:mb-8">
                            Sell everywhere.<span className="block h-1 sm:h-3"></span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-jade via-emerald-400 to-teal-400 pb-2">
                                Manage in one place.
                            </span>
                        </h1>
                    </Reveal>

                    {/* Subtitle */}
                    <Reveal delay={150}>
                        <p className="text-[16px] sm:text-[18px] text-brand-dark/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                            Stop juggling tabs. ListX unifies Amazon, Flipkart, Shopify, and more into a single, shockingly fast workflow.
                        </p>
                    </Reveal>

                    {/* Premium Dual CTAs */}
                    <Reveal delay={220}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 px-4 sm:px-0">
                            <Link to="/signup" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto relative group h-[56px] sm:h-[60px] px-8 sm:px-10 rounded-full bg-brand-dark text-white text-[15px] sm:text-[16px] font-bold tracking-tight hover:bg-[#1a2f36] transition-all shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] active:scale-[0.98] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-jade/0 via-white/20 to-brand-jade/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    Start your 14-day free trial
                                </button>
                            </Link>
                            <Link to="/contact" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto h-[56px] sm:h-[60px] px-8 sm:px-10 rounded-full bg-white/50 backdrop-blur-md border border-gray-200 text-brand-dark text-[15px] sm:text-[16px] font-bold tracking-tight hover:border-brand-jade hover:bg-white transition-all active:scale-[0.98] shadow-sm">
                                    Book a demo
                                </button>
                            </Link>
                        </div>
                    </Reveal>
                </div>

                {/* ── Dashboard Mockup — Glassmorphic Container & 3D Depth ── */}
                <Reveal delay={340}>
                    <div className="relative mt-16 sm:mt-28 mx-auto max-w-[1240px] px-4 sm:px-6 perspective-[2000px] hidden sm:block">
                        {/* Ambient glow specifically for the mockup */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-gradient-to-r from-brand-jade/30 to-emerald-300/30 blur-[100px] -z-10 rounded-full opacity-60" />

                        <div className="bg-white/80 rounded-[32px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15),0_30px_60px_-30px_rgba(66,212,156,0.3)] ring-1 ring-black/[0.05] overflow-hidden relative border-[1px] border-white/50 backdrop-blur-2xl transform rotate-x-[2deg] translate-y-[-10px] hover:rotate-x-0 hover:translate-y-0 transition-all duration-700">
                            {/* Glassmorphic Top Highlight */}
                            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 z-10" />

                            {/* Actual Dashboard Image */}
                            <div className="relative w-full overflow-hidden bg-[#FAFCFB]">
                                <img
                                    src="/assets/logistics_dashboard_mockup.png"
                                    alt="ListX Central Logistics Dashboard Mockup"
                                    className="w-full h-auto object-cover object-top scale-100 origin-top hover:scale-[1.02] transition-transform duration-[1.5s] ease-out"
                                />
                                {/* Bottom fade gradient to blend smoothly */}
                                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
                            </div>
                        </div>

                        {/* Soft glow behind mockup */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-brand-jade/10 blur-[60px] rounded-full -z-10" />
                    </div>
                </Reveal>
            </section>

            {/* ═══ TRUSTED BY — text left, scrolling logos right ═══ */}
            <section className="py-8 sm:py-10 mt-0 sm:mt-8 border-y border-black/[0.04] bg-white">
                <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                    <p className="text-[20px] sm:text-[22px] font-bold text-brand-dark leading-snug shrink-0 text-center sm:text-left max-w-[260px] mx-auto sm:mx-0">
                        The world's best<br className="hidden sm:block" /> companies trust ListX
                    </p>
                    {/* Scrolling marquee */}
                    <div className="flex-1 relative overflow-hidden h-[50px] flex items-center w-full">
                        <div className="absolute left-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 w-12 sm:w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap items-center">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="flex items-center gap-10 sm:gap-14 shrink-0 mr-10 sm:mr-14">
                                    {[
                                        { name: '🔶 Logoipsum', color: 'text-gray-500' },
                                        { name: '✳️ Logoipsum', color: 'text-orange-500' },
                                        { name: '🟣 Logoipsum', color: 'text-purple-500' },
                                        { name: 'Amazon', color: 'text-gray-800' },
                                        { name: 'Flipkart', color: 'text-blue-600' },
                                        { name: 'Shopify', color: 'text-green-600' },
                                    ].map(p => (
                                        <span key={`${j}-${p.name}`} className={`text-[20px] font-bold ${p.color} opacity-50 hover:opacity-80 transition-opacity cursor-default`}>
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* ═══ FEATURES — Premium Modern Cards ═══ */}
            < section id="features" className="py-16 sm:py-24 lg:py-32 bg-[#FAFCFB] relative overflow-hidden" >
                {/* Subtle background glow for features */}
                <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-jade/5 rounded-full blur-[80px] sm:blur-[100px] mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-300/10 rounded-full blur-[100px] sm:blur-[120px] mix-blend-multiply pointer-events-none" />

                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
                    <Reveal>
                        <div className="text-center mb-12 sm:mb-16 relative">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-jade/10 text-brand-jade text-[11px] sm:text-[12px] font-bold tracking-[0.2em] mb-4 sm:mb-6">
                                <Sparkles className="w-3.5 h-3.5" /> PLATFORM CAPABILITIES
                            </div>
                            <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.1] sm:leading-[1.05] text-brand-dark mb-4 sm:mb-5">
                                Everything you need.<br />Nothing you don't.
                            </h2>
                            <p className="text-[15px] sm:text-[18px] text-brand-dark/50 max-w-2xl mx-auto leading-relaxed font-medium">Most sellers waste hours piecing together separate tools. ListX provides a unified, deeply integrated suite.</p>
                        </div>
                    </Reveal>

                    {/* Stat highlight row */}
                    <Reveal delay={60}>
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-10 sm:gap-24 mb-16 sm:mb-20">
                            {[
                                { value: '6+', label: 'Platforms Synced' },
                                { value: '10x', label: 'Faster Listing' },
                                { value: '99.9%', label: 'Inventory Accuracy' },
                            ].map((s, i) => (
                                <div key={i} className="text-center group cursor-default">
                                    <p className="text-[44px] sm:text-[52px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-jade to-emerald-500 leading-none tracking-tight group-hover:scale-110 transition-transform duration-500">{s.value}</p>
                                    <p className="text-[12px] sm:text-[13px] text-brand-dark/40 font-bold uppercase tracking-widest mt-2 sm:mt-3 group-hover:text-brand-dark/60 transition-colors">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Premium Glassmorphic Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Sparkles,
                                title: 'AI-Powered Listings',
                                desc: 'Generate optimized titles, descriptions, and keywords for every marketplace from a single product photo or brief description.',
                            },
                            {
                                icon: RefreshCcw,
                                title: 'Continuous Sync',
                                desc: 'Stock levels synchronize across all channels in milliseconds. The moment an item sells on Shopify, it drops on Amazon.',
                            },
                            {
                                icon: BarChart3,
                                title: 'Deep Analytics',
                                desc: 'Stop flying blind. See which products and platforms drive actual profit with our comprehensive margin and return analytics.',
                            },
                            {
                                icon: Truck,
                                title: 'Smart Logistics',
                                desc: 'Automatically select the cheapest, fastest courier for every pin code. Generate labels and manifests in bulk.',
                            },
                            {
                                icon: Globe,
                                title: 'B2B & B2C Unified',
                                desc: 'Manage wholesale orders alongside direct-to-consumer sales in one seamless dashboard without separated inventory pools.',
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Brand Safety',
                                desc: 'Automated MAP monitoring and unauthorized seller alerts keep your brand reputation pristine across channels.',
                            },
                        ].map((f, i) => (
                            <Reveal key={i} delay={i * 100}>
                                <div className="relative group h-full rounded-[32px] p-[1px] bg-gradient-to-b from-gray-200/50 to-transparent hover:from-brand-jade/40 hover:to-emerald-300/10 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(66,212,156,0.1)]">
                                    <div className="h-full bg-white/80 backdrop-blur-xl rounded-[31px] p-8 flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-jade/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150 group-hover:bg-brand-jade/10" />

                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm ring-1 ring-black/[0.04] flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:shadow-[0_8px_20px_rgba(66,212,156,0.2)] group-hover:ring-brand-jade/20 transition-all duration-500">
                                            <f.icon className="w-6 h-6 text-brand-jade" />
                                        </div>
                                        <h3 className="text-[22px] font-bold text-brand-dark mb-4 leading-snug relative z-10">{f.title}</h3>
                                        <p className="text-[16px] text-brand-dark/50 leading-relaxed relative z-10">{f.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PRICING (Ultra-Clean Aesthetic) ═══ */}
            < section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-white" >
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
                    <Reveal>
                        <div className="text-center mb-12 sm:mb-16">
                            <p className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-brand-jade mb-3 sm:mb-4 uppercase">Pricing</p>
                            <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.1] sm:leading-[1.05] text-brand-dark mb-4 sm:mb-5">
                                Transparent pricing.<br />No surprises.
                            </h2>
                            <p className="text-[15px] sm:text-[18px] text-brand-dark/50 max-w-2xl mx-auto leading-relaxed font-medium px-2 sm:px-0">Start for free. Scale when it makes sense. Every plan includes full access to our core multi-channel engine.</p>
                        </div>
                    </Reveal>

                    {/* Mobile Pricing Tabs (Hidden on Desktop) */}
                    <div className="flex md:hidden bg-gray-100 p-1 rounded-full w-fit mx-auto mb-8 shadow-inner">
                        {pricingPlans.map((p) => (
                            <button
                                key={p.name}
                                onClick={() => setActivePricingTab(p.name)}
                                className={`px-5 py-2 rounded-full text-[13px] font-bold tracking-tight transition-all duration-300 ${activePricingTab === p.name
                                    ? 'bg-white text-brand-dark shadow-sm'
                                    : 'text-brand-dark/50 hover:text-brand-dark'
                                    }`}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-[1100px] mx-auto">
                        {pricingPlans.map((p, i) => (
                            <Reveal key={i} delay={i * 100} className={activePricingTab === p.name ? 'block' : 'hidden md:block'}>
                                <div className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 h-full flex flex-col ${p.popular ? 'border-brand-jade/30 shadow-xl md:scale-105 z-10 ring-1 ring-brand-jade/10' : 'border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'}`}>
                                    {p.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-jade text-[11px] font-bold uppercase tracking-[0.1em] text-[#00394d]">
                                            Most Popular
                                        </div>
                                    )}
                                    <h3 className="text-[22px] font-display font-extrabold text-brand-dark mb-2 tracking-tight">{p.name}</h3>
                                    <p className="text-[14px] text-brand-dark/50 leading-relaxed mb-8">{p.desc}</p>

                                    <div className="flex items-baseline gap-1 mb-10">
                                        <span className="text-[44px] font-extrabold tracking-tight text-brand-dark">{p.price}</span>
                                        {p.price !== 'Free' && p.price !== 'Custom' && (
                                            <span className="text-[15px] text-brand-dark/40 font-semibold">/month</span>
                                        )}
                                    </div>

                                    <Link to="/signup" className="mt-auto">
                                        <button className={`w-full h-[48px] rounded-full text-[15px] font-bold transition-all active:scale-[0.98] ${p.popular ? 'bg-brand-jade text-[#00394d] hover:bg-[#34c68d]' : 'bg-white text-brand-dark border border-gray-200 hover:bg-gray-50'}`}>
                                            {p.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                                        </button>
                                    </Link>

                                    <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                                        {(i === 0 ? ['Up to 100 listings', '2 marketplace connections', 'Basic sync', 'Community support'] : i === 1 ? ['Unlimited listings', 'All supported marketplaces', 'AI Listing Studio', 'Priority chat support'] : ['Everything in Growth', 'Dedicated Account Manager', 'Custom API access', 'SLA guarantees']).map((f, fi) => (
                                            <div key={fi} className="flex items-center gap-3 text-[14px] text-brand-dark/70 font-medium">
                                                <CheckCircle2 className={`w-[18px] h-[18px] shrink-0 ${p.popular ? 'text-brand-jade' : 'text-gray-300'}`} />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section >

            {/* ═══ INTEGRATIONS — Clean & Light ═══ */}
            < section id="integrations" className="py-16 sm:py-24 lg:py-32 bg-[#FAFCFB] relative overflow-hidden" >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(66,212,156,0.05)_0%,_transparent_60%)] opacity-80 blur-[80px]" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 text-center relative z-10">
                    <Reveal>
                        <p className="text-[12px] sm:text-[13px] font-bold tracking-[0.2em] text-brand-jade mb-3 sm:mb-4 uppercase">Integrations</p>
                        <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.1] sm:leading-[1.05] text-brand-dark mb-4 sm:mb-5">
                            Connect your entire stack.
                        </h2>
                        <p className="text-[15px] sm:text-[18px] font-medium text-brand-dark/50 max-w-2xl mx-auto mb-10 sm:mb-16 leading-relaxed px-2 sm:px-0">
                            Marketplaces, logistics, ERPs, and accounting software. ListX connects with every tool you use to run your business.
                        </p>
                    </Reveal>

                    {/* Floating pill integrations with modern hover */}
                    <Reveal delay={100}>
                        <div className="space-y-4 sm:space-y-5">
                            {/* Row 1 */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {[
                                    { emoji: '🔶', name: 'Amazon' },
                                    { emoji: '✳️', name: 'Flipkart' },
                                    { emoji: '🟢', name: 'Shopify' },
                                    { emoji: '🌐', name: 'Magento' },
                                    { emoji: '🟣', name: 'Meesho' },
                                ].map((p, i) => (
                                    <div key={i} className="h-[56px] px-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center gap-3 hover:-translate-y-1 hover:shadow-md hover:border-brand-jade/30 transition-all duration-300 cursor-pointer group">
                                        <span className="text-[24px] group-hover:scale-110 transition-transform">{p.emoji}</span>
                                        <span className="text-[15px] font-bold text-brand-dark tracking-tight">{p.name}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Row 2 */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {[
                                    { emoji: '🔴', name: 'Delhivery' },
                                    { emoji: '🔵', name: 'Blue Dart' },
                                    { emoji: '🚀', name: 'Shiprocket' },
                                    { emoji: '📱', name: 'WooCommerce' },
                                    { emoji: '🏪', name: 'Myntra' },
                                ].map((p, i) => (
                                    <div key={i} className="h-[48px] sm:h-[56px] px-6 sm:px-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center gap-2 sm:gap-3 hover:-translate-y-1 hover:shadow-md hover:border-brand-jade/30 transition-all duration-300 cursor-pointer group">
                                        <span className="text-[20px] sm:text-[24px] group-hover:scale-110 transition-transform">{p.emoji}</span>
                                        <span className="text-[14px] sm:text-[15px] font-bold text-brand-dark tracking-tight">{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={200}>
                        <Link to="/dashboard/integrations">
                            <button className="mt-12 sm:mt-16 h-[50px] px-8 rounded-full bg-transparent border border-gray-200 text-brand-dark text-[14px] sm:text-[15px] font-bold tracking-tight hover:border-brand-jade hover:text-brand-jade transition-all active:scale-[0.98]">
                                View all integrations
                            </button>
                        </Link>
                    </Reveal>
                </div>
            </section >

            {/* ═══ CTA — ULTRA CLEAN & UNIQUE ═══ */}
            < section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-brand-jade/5 border-y border-brand-jade/10" >
                {/* Clean, simple decorative elements */}
                <div className="absolute top-0 right-[-10%] w-[40%] h-[200%] bg-emerald-300/10 rounded-full blur-[100px] rotate-12 pointer-events-none" />
                <div className="absolute bottom-0 left-[-10%] w-[30%] h-[150%] bg-brand-tea/40 rounded-full blur-[100px] -rotate-12 pointer-events-none" />

                <div className="max-w-[700px] mx-auto px-4 sm:px-6 text-center relative z-10">
                    <Reveal>
                        <h2 className="font-display text-[36px] sm:text-[44px] lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.0] text-brand-dark mb-4 sm:mb-6">
                            Ready to scale?
                        </h2>
                        <p className="text-[15px] sm:text-[18px] text-brand-dark/60 mb-8 sm:mb-10 leading-relaxed font-medium">
                            Join the fastest-growing multi-channel platform in India. Set up your fully synced store in under 5 minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
                            <Link to="/signup" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto h-[56px] px-8 sm:px-10 rounded-full bg-brand-jade text-[#00394d] text-[15px] sm:text-[16px] font-bold tracking-tight hover:bg-[#34c68d] transition-all shadow-[0_8px_24px_rgba(66,212,156,0.3)] hover:shadow-[0_12px_30px_rgba(66,212,156,0.4)] active:scale-[0.98]">
                                    Start your 14-day free trial
                                </button>
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section >

            {/* ═══ FOOTER — PREMIUM MINIMAL ═══ */}
            <footer className="relative bg-white pt-16 sm:pt-20 pb-10 overflow-hidden">
                {/* Premium subtle gradient top border */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-jade/30 to-transparent opacity-70" />
                {/* Soft ambient corner glow */}
                <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[200px] bg-brand-jade/10 rounded-[100%] blur-[80px] pointer-events-none" />

                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-16 sm:mb-20">
                        {/* Brand */}
                        <div className="md:col-span-1 border-b border-gray-100 pb-8 md:border-0 md:pb-0">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                                <ListxLogo className="h-7 text-brand-dark" />
                            </div>
                            <p className="text-[14px] text-brand-dark/50 leading-relaxed md:pr-8 mb-6 text-center md:text-left">
                                ListX is the modern multi-channel commerce engine built specifically for ambitious Indian brands.
                            </p>
                            <div className="flex justify-center md:justify-start">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-jade/10 text-brand-jade text-[11px] font-bold tracking-widest uppercase border border-brand-jade/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-jade animate-pulse" />
                                    Systems Operational
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3 text-center md:text-left">
                            <div>
                                <h4 className="text-[12px] font-extrabold tracking-widest uppercase text-brand-dark mb-6">Platform</h4>
                                <div className="space-y-3">
                                    {['Platform Sync', 'Inventory Intelligence', 'Order Management', 'AI Studio', 'Analytics'].map(l => (
                                        <a key={l} href="#" className="block text-[14px] text-brand-dark/60 font-medium hover:text-brand-jade transition-colors">{l}</a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[12px] font-extrabold tracking-widest uppercase text-brand-dark mb-6">Resources</h4>
                                <div className="space-y-3">
                                    {['Help Center', 'API Documentation', 'Seller University', 'Blog', 'Case Studies'].map(l => (
                                        <a key={l} href="#" className="block text-[14px] text-brand-dark/60 font-medium hover:text-brand-jade transition-colors">{l}</a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[12px] font-extrabold tracking-widest uppercase text-brand-dark mb-6">Company</h4>
                                <div className="space-y-3">
                                    {['About the Team', 'Careers', 'Contact Sales', 'Privacy Policy', 'Terms of Service'].map(l => (
                                        <a key={l} href="#" className="block text-[14px] text-brand-dark/60 font-medium hover:text-brand-jade transition-colors">{l}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <p className="text-[13px] text-brand-dark/40 font-medium">© 2026 ListX Inc. All rights reserved.</p>
                            <span className="hidden sm:block text-gray-200">|</span>
                            <div className="flex gap-4">
                                <a href="#" className="text-[13px] text-brand-dark/40 font-medium hover:text-brand-jade transition-colors">Privacy</a>
                                <a href="#" className="text-[13px] text-brand-dark/40 font-medium hover:text-brand-jade transition-colors">Terms</a>
                            </div>
                        </div>
                        <div className="flex justify-center gap-5">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark/40 hover:bg-brand-jade/10 hover:text-brand-jade transition-all border border-gray-100">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark/40 hover:bg-brand-jade/10 hover:text-brand-jade transition-all border border-gray-100">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Global animation keyframes */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
            `}</style>
        </div>
    );
}
