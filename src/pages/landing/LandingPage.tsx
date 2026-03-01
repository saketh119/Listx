import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ListxLogo } from "@/components/ListxLogo";
import {
    BarChart3, Sparkles,
    CheckCircle2, Package, TrendingUp, Search, Bell, ChevronDown,
    LayoutDashboard, ShoppingBag, Boxes, ClipboardList, Truck,
    Plug, Wand2, LineChart, Users, Settings, ChevronLeft
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
    return (
        <div className="min-h-screen bg-white font-sans text-brand-dark overflow-x-hidden">

            {/* ═══ NAVBAR — floating pill, centered ═══ */}
            <nav className="fixed top-0 w-full z-50">
                <div className="max-w-[860px] mx-auto px-4 mt-4">
                    <div className="bg-brand-dark backdrop-blur-xl rounded-full px-6 h-[52px] flex items-center justify-between shadow-2xl">
                        <Link to="/" className="flex items-center shrink-0">
                            <ListxLogo className="h-[22px] brightness-0 invert" />
                        </Link>
                        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-white/55">
                            <a href="#" className="text-white/90 transition-colors">Home</a>
                            <a href="#features" className="hover:text-white/90 transition-colors">Product</a>
                            <a href="#how-it-works" className="hover:text-white/90 transition-colors">Solution</a>
                            <a href="#pricing" className="hover:text-white/90 transition-colors">Pricing</a>
                            <a href="#integrations" className="hover:text-white/90 transition-colors">About us</a>
                        </div>
                        <Link to="/login">
                            <button className="h-[34px] px-5 rounded-full bg-white text-brand-dark text-[12px] font-semibold hover:bg-white/90 transition-all">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ═══ HERO — gradient + text + dashboard mockup ═══ */}
            <section className="relative pt-28 pb-0 overflow-visible">
                {/* Mint gradient background — strong at top, fading to white */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#c5ffe0] via-[#e8fff1] to-white" />
                    {/* Subtle radial glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-[radial-gradient(ellipse_at_center,_#b2ffc6_0%,_transparent_70%)] opacity-40" />
                </div>

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    {/* Badge */}
                    <Reveal>
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-spruce mb-6">
                            India's Best Multi-Channel Platform
                        </p>
                    </Reveal>

                    {/* Main heading */}
                    <Reveal delay={80}>
                        <h1 className="font-display text-[42px] sm:text-[52px] lg:text-[64px] font-bold tracking-[-0.02em] leading-[1.08] text-brand-dark mb-6">
                            Manage & scale your<br />ecommerce effortlessly
                        </h1>
                    </Reveal>

                    {/* Subtitle */}
                    <Reveal delay={150}>
                        <p className="text-[16px] text-brand-dark/45 mb-9 max-w-lg mx-auto leading-relaxed">
                            List once, sell everywhere. ListX syncs products, orders, and inventory across Amazon, Flipkart, Shopify & ONDC — from one dashboard.
                        </p>
                    </Reveal>

                    {/* CTA */}
                    <Reveal delay={220}>
                        <Link to="/signup">
                            <button className="h-[46px] px-8 rounded-full bg-brand-dark text-white text-[14px] font-semibold hover:bg-brand-nocturn transition-all shadow-lg hover:shadow-xl active:scale-[0.97]">
                                Get Started
                            </button>
                        </Link>
                    </Reveal>
                </div>

                {/* ── Dashboard Mockup — matching reference exactly ── */}
                <Reveal delay={320}>
                    <div className="relative mt-14 mx-auto max-w-[1100px] px-4">
                        <div className="bg-white rounded-2xl shadow-[0_20px_80px_rgba(0,73,99,0.12)] border border-black/[0.05] overflow-hidden">
                            {/* App Layout */}
                            <div className="flex">
                                {/* Sidebar */}
                                <div className="w-[200px] bg-white border-r border-gray-100 p-3 hidden md:block shrink-0">
                                    <div className="flex items-center gap-2 mb-5 px-1">
                                        <div className="w-7 h-7 rounded-lg bg-brand-jade flex items-center justify-center">
                                            <Sparkles className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-[13px] font-bold text-brand-dark">Listx</span>
                                    </div>
                                    <div className="space-y-0.5">
                                        {[
                                            { icon: LayoutDashboard, label: 'Dashboard', active: true },
                                            { icon: ShoppingBag, label: 'Products', active: false },
                                            { icon: Boxes, label: 'Inventory', active: false },
                                            { icon: ClipboardList, label: 'Orders', active: false },
                                            { icon: Truck, label: 'Logistics', active: false },
                                            { icon: Plug, label: 'Integrations', active: false },
                                            { icon: Wand2, label: 'AI Studio', active: false },
                                            { icon: LineChart, label: 'Analytics', active: false },
                                            { icon: Users, label: 'Customers', active: false },
                                        ].map(item => (
                                            <div key={item.label} className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[12px] font-medium transition-colors ${item.active ? 'bg-brand-tea text-brand-dark' : 'text-brand-dark/40 hover:text-brand-dark/60'}`}>
                                                <item.icon className="w-[15px] h-[15px]" />
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 space-y-0.5">
                                        <div className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[12px] font-medium text-brand-dark/40">
                                            <Settings className="w-[15px] h-[15px]" />Settings
                                        </div>
                                        <div className="flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[12px] font-medium text-brand-dark/30">
                                            <ChevronLeft className="w-[15px] h-[15px]" />Collapse
                                        </div>
                                    </div>
                                </div>

                                {/* Main content */}
                                <div className="flex-1 bg-[#f8faf9]">
                                    {/* Top bar */}
                                    <div className="h-[44px] bg-white border-b border-gray-100 flex items-center justify-between px-4">
                                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 w-[300px]">
                                            <Search className="w-3 h-3 text-gray-300" />
                                            <span className="text-[10px] text-gray-300">Search orders, products, or customers...</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Bell className="w-[14px] h-[14px] text-gray-400" />
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-jade to-brand-cedar" />
                                        </div>
                                    </div>

                                    {/* Dashboard body */}
                                    <div className="p-4">
                                        {/* Title row */}
                                        <div className="mb-4">
                                            <p className="text-[10px] text-brand-dark/30 font-medium">Overview</p>
                                            <p className="text-[15px] font-bold text-brand-dark">Dashboard</p>
                                        </div>

                                        {/* KPI Row + Chart Row */}
                                        <div className="flex gap-3">
                                            {/* Left: KPIs */}
                                            <div className="w-[240px] shrink-0 space-y-2">
                                                <p className="text-[10px] font-semibold text-brand-dark/50 mb-1">KPIs</p>
                                                {[
                                                    { label: 'Current MRR', value: '₹8,73,400', change: '+12%', up: true },
                                                    { label: 'Current Customers', value: '1,24,970', change: '+8%', up: true },
                                                    { label: 'Active Customers', value: '80.20%', change: '+16%', up: true },
                                                ].map(kpi => (
                                                    <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                                                        <p className="text-[9px] text-brand-dark/35 mb-0.5">{kpi.label}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[22px] font-bold text-brand-jade">{kpi.value}</span>
                                                            <span className="flex items-center gap-0.5 text-[9px] font-semibold text-brand-jade bg-brand-jade/10 px-1.5 py-0.5 rounded-full">
                                                                <span className="text-[8px]">▲</span>{kpi.change}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Right: Chart */}
                                            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-[11px] font-semibold text-brand-dark">This years growth</p>
                                                    <div className="flex items-center gap-1 text-[9px] text-brand-dark/30 bg-gray-50 px-2 py-1 rounded-md">
                                                        Yearly <ChevronDown className="w-2.5 h-2.5" />
                                                    </div>
                                                </div>
                                                {/* Bar chart */}
                                                <div className="flex items-end gap-[6px] h-[130px] mt-2">
                                                    {[
                                                        [75, 50], [60, 40], [85, 55], [45, 30], [90, 60],
                                                        [55, 35], [70, 45], [80, 50], [65, 40], [90, 55],
                                                        [50, 30], [75, 45]
                                                    ].map((pair, i) => (
                                                        <div key={i} className="flex-1 flex gap-[2px] items-end h-full">
                                                            <div className="flex-1 rounded-t-[3px] bg-brand-jade/80 transition-all duration-700" style={{ height: `${pair[0]}%` }} />
                                                            <div className="flex-1 rounded-t-[3px] bg-brand-mint transition-all duration-700" style={{ height: `${pair[1]}%` }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Soft glow behind mockup */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-brand-jade/10 blur-[60px] rounded-full -z-10" />
                    </div>
                </Reveal>
            </section>

            {/* ═══ TRUSTED BY — text left, scrolling logos right ═══ */}
            <section className="py-10 mt-8 border-t border-black/[0.04]">
                <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                    <p className="text-[22px] font-bold text-brand-dark leading-snug shrink-0 max-w-[260px]">
                        The world's best<br />companies trust ListX
                    </p>
                    {/* Scrolling marquee */}
                    <div className="flex-1 relative overflow-hidden h-[50px] flex items-center">
                        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap items-center">
                            {[...Array(3)].map((_, j) => (
                                <div key={j} className="flex items-center gap-14 shrink-0 mr-14">
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
            </section>

            {/* ═══ HOW IT WORKS (alternating rows) ═══ */}
            <section id="how-it-works" className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1100px] mx-auto px-6">
                    {/* Curved mint decorative arc */}
                    <div className="relative mb-14">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[500px] h-[60px]">
                            <svg viewBox="0 0 500 60" className="w-full h-full opacity-[0.15]">
                                <path d="M0,60 Q250,0 500,60" fill="none" stroke="#42D49C" strokeWidth="2" />
                            </svg>
                        </div>
                        <Reveal>
                            <div className="text-center">
                                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-spruce mb-4">How ListX Works</p>
                                <h2 className="font-display text-[36px] sm:text-[44px] font-bold tracking-[-0.02em] leading-[1.08]">One platform to run<br />your entire ecommerce</h2>
                            </div>
                        </Reveal>
                    </div>

                    {/* ── Card 1: Real-Time Insights — text left, mockup right ── */}
                    <Reveal>
                        <div className="bg-white rounded-[24px] border border-gray-200 p-8 lg:p-10 mb-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row items-center gap-10">
                                <div className="lg:w-[45%]">
                                    <div className="w-11 h-11 rounded-full bg-brand-jade/15 flex items-center justify-center mb-5">
                                        <TrendingUp className="w-5 h-5 text-brand-jade" />
                                    </div>
                                    <h3 className="text-[28px] font-bold text-brand-dark mb-3 leading-tight">Multi-Platform Sync</h3>
                                    <p className="text-[14px] text-brand-dark/40 leading-relaxed mb-6">Push products to Amazon, Flipkart, Shopify & ONDC simultaneously. Smart category mapping keeps listings optimized for each marketplace.</p>
                                    <Link to="/signup" className="inline-flex items-center h-10 px-6 rounded-full border border-brand-dark/15 text-[13px] font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                                        Learn More
                                    </Link>
                                </div>
                                <div className="lg:w-[55%]">
                                    <div className="bg-[#f8faf9] rounded-2xl border border-gray-100 p-5">
                                        <div className="flex gap-3">
                                            {/* KPI mini card */}
                                            <div className="w-[160px] shrink-0">
                                                <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm mb-2">
                                                    <p className="text-[9px] text-brand-dark/35 mb-0.5">Current MRR</p>
                                                    <span className="text-[20px] font-bold text-brand-jade">₹8,73,400</span>
                                                </div>
                                                <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                                                    <p className="text-[9px] text-brand-dark/35 mb-0.5">Growth</p>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[16px] font-bold text-brand-jade">+12%</span>
                                                        <span className="text-[8px] bg-brand-jade/10 text-brand-jade px-1.5 py-0.5 rounded-full font-semibold">▲</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Chart */}
                                            <div className="flex-1 bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-[10px] font-semibold text-brand-dark">This years growth</p>
                                                    <span className="text-[8px] text-brand-dark/30 bg-gray-50 px-2 py-0.5 rounded">Yearly</span>
                                                </div>
                                                <div className="flex items-end gap-[4px] h-[90px]">
                                                    {[70, 50, 85, 45, 90, 55, 75, 60, 80, 50, 70, 55].map((h, i) => (
                                                        <div key={i} className="flex-1 flex gap-[2px] items-end h-full">
                                                            <div className="flex-1 rounded-t-[2px] bg-brand-jade/80" style={{ height: `${h}%` }} />
                                                            <div className="flex-1 rounded-t-[2px] bg-brand-mint" style={{ height: `${h * 0.6}%` }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* ── Card 2: Data-Driven Decisions — mockup left, text right ── */}
                    <Reveal>
                        <div className="bg-white rounded-[24px] border border-gray-200 p-8 lg:p-10 mb-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row items-center gap-10">
                                <div className="lg:w-[55%] order-2 lg:order-1">
                                    <div className="bg-[#f8faf9] rounded-2xl border border-gray-100 p-5">
                                        {/* Activity mockup */}
                                        <div className="flex gap-3">
                                            {/* Donut/progress */}
                                            <div className="w-[140px] shrink-0 bg-white rounded-xl border border-gray-100 p-3 shadow-sm flex flex-col items-center justify-center">
                                                <div className="relative w-[80px] h-[80px] mb-2">
                                                    <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                                                        <circle cx="40" cy="40" r="32" fill="none" stroke="#f0f0f0" strokeWidth="6" />
                                                        <circle cx="40" cy="40" r="32" fill="none" stroke="#42D49C" strokeWidth="6" strokeDasharray="160" strokeDashoffset="32" strokeLinecap="round" />
                                                    </svg>
                                                    <span className="absolute inset-0 flex items-center justify-center text-[14px] font-bold text-brand-dark">80%</span>
                                                </div>
                                                <p className="text-[9px] text-brand-dark/35 text-center">Fulfillment Rate</p>
                                            </div>
                                            {/* Order list */}
                                            <div className="flex-1 space-y-2">
                                                {[
                                                    { id: 'ORD-0189', status: 'Delivered', time: '2 hrs ago', color: 'bg-brand-jade/10 text-brand-jade' },
                                                    { id: 'ORD-0188', status: 'In Transit', time: '3 hrs ago', color: 'bg-amber-50 text-amber-600' },
                                                    { id: 'ORD-0187', status: 'Processing', time: '5 hrs ago', color: 'bg-blue-50 text-blue-600' },
                                                    { id: 'ORD-0186', status: 'Delivered', time: '6 hrs ago', color: 'bg-brand-jade/10 text-brand-jade' },
                                                ].map(o => (
                                                    <div key={o.id} className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-3 py-2">
                                                        <div>
                                                            <p className="text-[11px] font-medium text-brand-dark">{o.id}</p>
                                                            <p className="text-[8px] text-brand-dark/25">{o.time}</p>
                                                        </div>
                                                        <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full ${o.color}`}>{o.status}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-[45%] order-1 lg:order-2">
                                    <div className="w-11 h-11 rounded-full bg-brand-jade/15 flex items-center justify-center mb-5">
                                        <Package className="w-5 h-5 text-brand-jade" />
                                    </div>
                                    <h3 className="text-[28px] font-bold text-brand-dark mb-3 leading-tight">Unified Order Hub</h3>
                                    <p className="text-[14px] text-brand-dark/40 leading-relaxed mb-6">Every channel, one dashboard. Track orders from placement to delivery with real-time status updates, bulk actions, and AI-powered courier selection.</p>
                                    <Link to="/signup" className="inline-flex items-center h-10 px-6 rounded-full border border-brand-dark/15 text-[13px] font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* ── Card 3: Customize Dashboards — text left, mockup right ── */}
                    <Reveal>
                        <div className="bg-white rounded-[24px] border border-gray-200 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col lg:flex-row items-center gap-10">
                                <div className="lg:w-[45%]">
                                    <div className="w-11 h-11 rounded-full bg-brand-jade/15 flex items-center justify-center mb-5">
                                        <LayoutDashboard className="w-5 h-5 text-brand-jade" />
                                    </div>
                                    <h3 className="text-[28px] font-bold text-brand-dark mb-3 leading-tight">Smart Dashboards</h3>
                                    <p className="text-[14px] text-brand-dark/40 leading-relaxed mb-6">Sales velocity, return analysis, SEO scores, and courier performance — all visualized with actionable KPIs to help you scale faster.</p>
                                    <Link to="/signup" className="inline-flex items-center h-10 px-6 rounded-full border border-brand-dark/15 text-[13px] font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                                        Learn More
                                    </Link>
                                </div>
                                <div className="lg:w-[55%]">
                                    <div className="bg-[#f8faf9] rounded-2xl border border-gray-100 p-4 overflow-hidden">
                                        <div className="flex gap-2">
                                            {/* Mini sidebar */}
                                            <div className="w-[80px] shrink-0 hidden sm:block">
                                                <div className="flex items-center gap-1.5 mb-3 px-1">
                                                    <div className="w-5 h-5 rounded bg-brand-jade flex items-center justify-center">
                                                        <Sparkles className="w-2.5 h-2.5 text-white" />
                                                    </div>
                                                    <span className="text-[8px] font-bold text-brand-dark">Listx</span>
                                                </div>
                                                {['Overview', 'Products', 'Orders', 'Analytics'].map((n, i) => (
                                                    <div key={n} className={`text-[7px] px-1.5 py-1 rounded mb-0.5 ${i === 0 ? 'bg-brand-tea font-semibold text-brand-dark' : 'text-brand-dark/30'}`}>{n}</div>
                                                ))}
                                            </div>
                                            {/* Dashboard content */}
                                            <div className="flex-1 space-y-2">
                                                {/* KPI row */}
                                                <div className="grid grid-cols-3 gap-1.5">
                                                    {[
                                                        { label: 'MRR', value: '₹8,73.4k', color: 'text-brand-jade' },
                                                        { label: 'Customers', value: '1,24,970', color: 'text-brand-dark' },
                                                        { label: 'Active', value: '80.20%', color: 'text-brand-jade' },
                                                    ].map(k => (
                                                        <div key={k.label} className="bg-white rounded-lg border border-gray-100 p-2">
                                                            <p className="text-[7px] text-brand-dark/30 mb-0.5">{k.label}</p>
                                                            <p className={`text-[12px] font-bold ${k.color}`}>{k.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Bottom charts */}
                                                <div className="flex gap-1.5">
                                                    <div className="flex-1 bg-white rounded-lg border border-gray-100 p-2">
                                                        <p className="text-[7px] font-semibold text-brand-dark mb-1.5">Analytics</p>
                                                        <div className="flex items-end gap-[2px] h-[50px]">
                                                            {[60, 40, 75, 50, 85, 45, 70, 55, 80, 60].map((h, i) => (
                                                                <div key={i} className="flex-1 rounded-t-sm bg-brand-jade/70" style={{ height: `${h}%` }} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="w-[90px] bg-white rounded-lg border border-gray-100 p-2">
                                                        <p className="text-[7px] font-semibold text-brand-dark mb-1.5">Brand Safety</p>
                                                        <div className="relative w-[50px] h-[50px] mx-auto">
                                                            <svg viewBox="0 0 50 50" className="w-full h-full -rotate-90">
                                                                <circle cx="25" cy="25" r="20" fill="none" stroke="#f0f0f0" strokeWidth="4" />
                                                                <circle cx="25" cy="25" r="20" fill="none" stroke="#42D49C" strokeWidth="4" strokeDasharray="100" strokeDashoffset="15" strokeLinecap="round" />
                                                            </svg>
                                                            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-brand-dark">85%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ═══ FEATURES — Problem-Solving Showcase ═══ */}
            <section id="features" className="relative">
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[1px]">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-20 sm:h-28">
                        <path d="M0,120 C360,0 1080,0 1440,120 L1440,0 L0,0 Z" fill="white" />
                    </svg>
                </div>
                <div className="bg-gradient-to-b from-[#e5f9ee]/60 via-[#edfaf3]/40 to-white pt-24 pb-20 lg:pt-32 lg:pb-28">
                    <div className="max-w-[1100px] mx-auto px-6">
                        <Reveal>
                            <div className="text-center mb-5">
                                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-spruce mb-4">Why Sellers Choose ListX</p>
                                <h2 className="font-display text-[36px] sm:text-[44px] font-bold tracking-[-0.02em] leading-[1.08] mb-5 italic">Stop juggling 10 tabs<br />to run your store</h2>
                                <p className="text-[15px] text-brand-dark/40 max-w-lg mx-auto leading-relaxed">Most sellers waste hours switching between platforms. ListX replaces the chaos with one calm, powerful dashboard.</p>
                            </div>
                        </Reveal>

                        {/* Stat highlight row */}
                        <Reveal delay={60}>
                            <div className="flex justify-center gap-8 sm:gap-14 mb-14 mt-10">
                                {[
                                    { value: '6+', label: 'Platforms synced' },
                                    { value: '10x', label: 'Faster listing' },
                                    { value: '99.9%', label: 'Inventory accuracy' },
                                ].map((s, i) => (
                                    <div key={i} className="text-center">
                                        <p className="text-[32px] sm:text-[38px] font-bold text-brand-jade leading-none">{s.value}</p>
                                        <p className="text-[12px] text-brand-dark/35 font-medium mt-1.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* Premium Feature cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Sparkles,
                                    tag: 'AI-Powered',
                                    title: 'List once, sell everywhere',
                                    problem: 'Manually creating listings on 5 platforms?',
                                    solution: 'AI generates optimized titles, descriptions & images for every marketplace — push to all channels in one click.',
                                    stat: '60%',
                                    statLabel: 'less time listing'
                                },
                                {
                                    icon: TrendingUp,
                                    tag: 'Real-Time',
                                    title: 'Never oversell again',
                                    problem: 'Stock mismatches causing cancellations?',
                                    solution: 'Inventory syncs in real-time across every platform. Smart reorder alerts ensure you never miss a sale.',
                                    stat: '0',
                                    statLabel: 'overselling incidents'
                                },
                                {
                                    icon: BarChart3,
                                    tag: 'Analytics',
                                    title: 'Know what\'s really working',
                                    problem: 'Flying blind on which platform drives profit?',
                                    solution: 'Deep analytics on sales velocity, margins, returns, and SEO scores — per platform, per product.',
                                    stat: '3x',
                                    statLabel: 'faster decisions'
                                },
                            ].map((f, i) => (
                                <Reveal key={i} delay={i * 100}>
                                    <div className="relative bg-white rounded-[20px] p-7 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(66,212,156,0.12)] hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col overflow-hidden group">
                                        {/* Jade accent bar on left */}
                                        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-brand-jade to-brand-cedar opacity-60 group-hover:opacity-100 transition-opacity" />

                                        {/* Tag + Icon row */}
                                        <div className="flex items-center justify-between mb-5 pl-3">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-jade bg-brand-jade/8 px-3 py-1 rounded-full">{f.tag}</span>
                                            <div className="w-10 h-10 rounded-xl bg-brand-jade/10 flex items-center justify-center">
                                                <f.icon className="w-[18px] h-[18px] text-brand-jade" />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[19px] font-bold text-brand-dark mb-3 pl-3 leading-snug">{f.title}</h3>

                                        {/* Problem callout */}
                                        <div className="bg-brand-saffron/5 border border-brand-saffron/10 rounded-xl px-4 py-3 mb-4 ml-3">
                                            <p className="text-[12px] text-brand-saffron font-semibold flex items-center gap-1.5">
                                                <span className="text-[14px]">⚡</span> {f.problem}
                                            </p>
                                        </div>

                                        {/* Solution */}
                                        <p className="text-[13px] text-brand-dark/45 leading-[1.7] pl-3 flex-1">{f.solution}</p>

                                        {/* Stat bottom */}
                                        <div className="mt-5 pt-4 border-t border-gray-100 pl-3 flex items-baseline gap-2">
                                            <span className="text-[28px] font-bold text-brand-jade leading-none">{f.stat}</span>
                                            <span className="text-[12px] text-brand-dark/35 font-medium">{f.statLabel}</span>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PRICING ═══ */}
            <section id="pricing" className="py-20 lg:py-28 bg-white">
                <div className="max-w-[1100px] mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-14">
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-spruce mb-4">Pricing</p>
                            <h2 className="font-display text-[36px] sm:text-[44px] font-bold tracking-[-0.02em] leading-[1.08] mb-5 italic">Simple pricing that<br />grows with you</h2>
                            <p className="text-[14px] text-brand-dark/40 max-w-lg mx-auto leading-relaxed">Start free. Upgrade when you're ready. No hidden fees, cancel anytime.</p>
                        </div>
                    </Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
                        {[
                            { name: 'Starter', desc: 'Perfect for new sellers exploring multi-channel selling.', price: '₹999', popular: false },
                            { name: 'Pro', desc: 'For growing brands scaling across platforms.', price: '₹2,999', popular: true },
                            { name: 'Enterprise', desc: 'For large operations with custom requirements.', price: 'Custom', popular: false },
                        ].map((p, i) => (
                            <Reveal key={i} delay={i * 100}>
                                <div className={`relative rounded-[20px] border p-7 transition-all duration-300 hover:shadow-lg h-full flex flex-col ${p.popular ? 'bg-white border-brand-jade/30 shadow-lg' : 'bg-white border-gray-200 shadow-sm'}`}>
                                    {p.popular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-brand-jade text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-sm">
                                            Popular
                                        </div>
                                    )}
                                    <h3 className="text-[18px] font-bold text-brand-dark mb-2">{p.name}</h3>
                                    <p className="text-[13px] text-brand-dark/40 leading-relaxed mb-5">{p.desc}</p>

                                    {p.price !== 'Custom' ? (
                                        <p className="text-[12px] text-brand-jade font-semibold mb-2">Save up to 15%</p>
                                    ) : (
                                        <p className="text-[12px] text-brand-dark/20 font-semibold mb-2">Contact sales</p>
                                    )}
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-[32px] font-bold text-brand-dark">{p.price}</span>
                                        <span className="text-[14px] text-brand-dark/30">{p.price !== 'Custom' ? '/month' : ''}</span>
                                    </div>

                                    <Link to="/signup">
                                        <button className={`w-full h-[44px] rounded-full text-[13px] font-semibold transition-all active:scale-[0.97] ${p.popular ? 'bg-brand-dark text-white hover:bg-brand-nocturn shadow-md' : 'bg-white text-brand-dark border border-gray-200 hover:bg-gray-50'}`}>
                                            {p.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                                        </button>
                                    </Link>

                                    <div className="mt-6 pt-5 border-t border-gray-100 space-y-3.5 flex-1">
                                        {(i === 0 ? ['Up to 100 products', '2 marketplace channels', 'Basic sales analytics', 'Email support'] : i === 1 ? ['Unlimited products', 'All platforms connected', 'AI Studio + bulk tools', 'Priority chat support'] : ['Everything in Pro', 'Unlimited team members', 'Dedicated success manager', 'Custom API integrations']).map((f, fi) => (
                                            <div key={fi} className="flex items-center gap-2.5 text-[13px] text-brand-dark/50">
                                                <CheckCircle2 className="w-[16px] h-[16px] text-brand-jade shrink-0" />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ INTEGRATIONS ═══ */}
            <section id="integrations" className="relative">
                <div className="bg-gradient-to-b from-[#e5f9ee]/60 via-[#edfaf3]/40 to-white py-20 lg:py-28">
                    <div className="max-w-[1100px] mx-auto px-6 text-center">
                        <Reveal>
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-spruce mb-4">Integrations</p>
                            <h2 className="font-display text-[36px] sm:text-[44px] font-bold tracking-[-0.02em] leading-[1.08] mb-5">Connect every platform<br />in minutes</h2>
                            <p className="text-[14px] text-brand-dark/40 max-w-lg mx-auto mb-8 leading-relaxed">One-click OAuth. Zero downtime. ListX connects your marketplaces, couriers, and tools — seamlessly.</p>
                            <Link to="/dashboard/integrations">
                                <button className="h-[42px] px-7 rounded-full border border-brand-dark/15 text-[13px] font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-all mb-12">
                                    Learn More
                                </button>
                            </Link>
                        </Reveal>

                        {/* Two rows of logo pills */}
                        <Reveal delay={100}>
                            <div className="space-y-4">
                                {/* Row 1 */}
                                <div className="flex flex-wrap justify-center gap-3">
                                    {[
                                        { emoji: '�', name: 'Amazon', color: 'text-gray-800' },
                                        { emoji: '�', name: 'Flipkart', color: 'text-blue-600' },
                                        { emoji: '🟢', name: 'Shopify', color: 'text-green-600' },
                                        { emoji: '🔵', name: 'ONDC', color: 'text-blue-500' },
                                        { emoji: '🟣', name: 'Meesho', color: 'text-pink-500' },
                                    ].map((p, i) => (
                                        <div key={i} className="h-[48px] px-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center gap-2.5 hover:shadow-md transition-shadow">
                                            <span className="text-[16px]">{p.emoji}</span>
                                            <span className={`text-[15px] font-bold ${p.color}`}>{p.name}</span>
                                        </div>
                                    ))}
                                </div>
                                {/* Row 2 */}
                                <div className="flex flex-wrap justify-center gap-3">
                                    {[
                                        { emoji: '�', name: 'Delhivery', color: 'text-red-500' },
                                        { emoji: '�', name: 'Blue Dart', color: 'text-blue-700' },
                                        { emoji: '🚀', name: 'Shiprocket', color: 'text-purple-600' },
                                        { emoji: '📱', name: 'WooCommerce', color: 'text-purple-700' },
                                        { emoji: '🏪', name: 'Myntra', color: 'text-pink-600' },
                                        { emoji: '�', name: 'Ekart', color: 'text-blue-600' },
                                    ].map((p, i) => (
                                        <div key={i} className="h-[48px] px-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center gap-2.5 hover:shadow-md transition-shadow">
                                            <span className="text-[16px]">{p.emoji}</span>
                                            <span className={`text-[15px] font-bold ${p.color}`}>{p.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="relative">
                <div className="bg-gradient-to-b from-[#e5f9ee]/60 via-[#edfaf3]/40 to-white py-20 lg:py-28 text-center">
                    <div className="max-w-[700px] mx-auto px-6">
                        <Reveal>
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-spruce mb-5">Get Started Free</p>
                            <h2 className="font-display text-[36px] sm:text-[44px] font-bold tracking-[-0.02em] mb-5 leading-[1.08]">Start selling on<br />every channel today</h2>
                            <p className="text-[14px] text-brand-dark/40 max-w-md mx-auto mb-8 leading-relaxed">Join 10,000+ Indian sellers who trust ListX to manage their multi-channel ecommerce business.</p>
                            <Link to="/signup">
                                <button className="h-[46px] px-8 rounded-full bg-brand-dark text-white text-[14px] font-semibold hover:bg-brand-nocturn transition-all shadow-lg hover:shadow-xl active:scale-[0.97]">
                                    Get Started
                                </button>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="bg-white border-t border-gray-100">
                <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-6">
                    {/* Main footer grid */}
                    <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
                        {/* Logo + description */}
                        <div>
                            <div className="flex items-center gap-2 mb-5">
                                <ListxLogo className="h-7" />
                            </div>
                            <p className="text-[13px] text-brand-dark/35 leading-[1.7] pr-4">India's fastest-growing multi-channel ecommerce platform. List, ship, and scale — from one dashboard.</p>
                        </div>
                        {/* Useful Link */}
                        <div>
                            <h4 className="text-[14px] font-semibold text-brand-dark/70 mb-5">Useful Links</h4>
                            <div className="space-y-3">
                                {['Home', 'Solutions', 'Pricing', 'Contact'].map(l => (
                                    <a key={l} href="#" className="block text-[14px] text-brand-dark/35 hover:text-brand-dark/60 transition-colors">{l}</a>
                                ))}
                            </div>
                        </div>
                        {/* Product */}
                        <div>
                            <h4 className="text-[14px] font-semibold text-brand-dark/70 mb-5">Product</h4>
                            <div className="space-y-3">
                                {['Multi-Platform', 'AI Studio', 'Analytics', 'Logistics'].map(l => (
                                    <a key={l} href="#" className="block text-[14px] text-brand-dark/35 hover:text-brand-dark/60 transition-colors">{l}</a>
                                ))}
                            </div>
                        </div>
                        {/* Company */}
                        <div>
                            <h4 className="text-[14px] font-semibold text-brand-dark/70 mb-5">Company</h4>
                            <div className="space-y-3">
                                {['Sign up', 'Login', 'Privacy Policy', 'Terms'].map(l => (
                                    <a key={l} href="#" className="block text-[14px] text-brand-dark/35 hover:text-brand-dark/60 transition-colors">{l}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright bar — rounded gray card */}
                    <div className="bg-gray-50 rounded-2xl px-6 py-4 flex items-center justify-between">
                        <p className="text-[13px] text-brand-dark/30">Copyright © 2026 ListX.in</p>
                        <div className="flex gap-2.5">
                            {/* X (Twitter) */}
                            <a href="#" className="w-9 h-9 rounded-full bg-brand-jade/10 flex items-center justify-center text-brand-jade hover:bg-brand-jade/20 transition-all">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            {/* Facebook */}
                            <a href="#" className="w-9 h-9 rounded-full bg-brand-jade/10 flex items-center justify-center text-brand-jade hover:bg-brand-jade/20 transition-all">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" className="w-9 h-9 rounded-full bg-brand-jade/10 flex items-center justify-center text-brand-jade hover:bg-brand-jade/20 transition-all">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
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
