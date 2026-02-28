import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Package, ShoppingCart, BarChart3, RefreshCw } from "lucide-react";
import { ListxLogo } from "@/components/ListxLogo";

const NOT_FOUND_MESSAGES = [
    { emoji: "🚀", title: "Lost in space", text: "Houston, we have a problem. The page you're looking for has drifted off into the cosmos." },
    { emoji: "🕵️‍♂️", title: "Undercover page", text: "This page is so top-secret, even we can't find it. Maybe try searching?" },
    { emoji: "👻", title: "Ghost town", text: "Spooky! There's nothing here but empty space and digital cobwebs." },
    { emoji: "🦄", title: "Unicorn sighting?", text: "Nope, just a missing page. Keep exploring to find the magical content." },
    { emoji: "🌪️", title: "Swept away", text: "Looks like this link got caught in a digital tornado. Let's get you to safety." },
    { emoji: "🦖", title: "Extinct page", text: "This page is officially prehistoric. Time to hunt for something more evolved." },
    { emoji: "🏝️", title: "Deserted island", text: "You've stumbled upon an unmarked island in our sitemap. Stranded? We can help." },
    { emoji: "🔮", title: "Hazy future", text: "Our crystal ball is cloudy. We can't see the page you're looking for right now." },
    { emoji: "🧩", title: "Missing piece", text: "This URL doesn't fit into our puzzle. Let's try finding a better match." },
    { emoji: "🛸", title: "Abducted link", text: "Aliens might have taken this page. While we negotiate its return, explore elsewhere." }
];

export default function NotFound() {
    const [content, setContent] = useState(NOT_FOUND_MESSAGES[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Set a random message on initial load without animation
        const randomIndex = Math.floor(Math.random() * NOT_FOUND_MESSAGES.length);
        setContent(NOT_FOUND_MESSAGES[randomIndex]);
    }, []);

    const changeMessage = () => {
        setIsAnimating(true);
        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * NOT_FOUND_MESSAGES.length);
            } while (NOT_FOUND_MESSAGES[randomIndex].emoji === content.emoji); // Ensure it's a new one

            setContent(NOT_FOUND_MESSAGES[randomIndex]);
            setIsAnimating(false);
        }, 300); // 300ms for fade out transition
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-subtle p-6 font-sans">
            <div className="absolute top-6 left-6 cursor-pointer">
                <Link to="/">
                    <ListxLogo className="h-6 text-brand-dark hover:opacity-80 transition-opacity" />
                </Link>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] border border-border/60 shadow-xl shadow-brand-lake/5 p-12 text-center relative overflow-hidden group">
                {/* Decorative background blur */}
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-lake/10 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-brand-saffron/10" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-jade/10 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-brand-lake/10" />

                <div className="relative z-10 flex flex-col items-center">
                    <div
                        className={`text-[120px] leading-none mb-6 cursor-pointer select-none transition-all duration-300 transform hover:scale-110 hover:-rotate-6 active:scale-95 ${isAnimating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                        onClick={changeMessage}
                        title="Click for a new vibe!"
                    >
                        {content.emoji}
                    </div>

                    <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <h2 className="text-display-md text-brand-dark mb-4 font-bold tracking-tight">{content.title}</h2>
                        <p className="text-body-lg text-text-muted max-w-md mx-auto mb-10 text-balance leading-relaxed">
                            {content.text}
                        </p>
                    </div>

                    <div className="w-full max-w-md relative mb-12 group/search">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors group-focus-within/search:text-brand-lake z-10">
                            <Search className="w-5 h-5 text-text-muted group-focus-within/search:text-brand-lake" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Try searching for what you need..."
                            className="w-full pl-12 pr-4 h-14 text-base rounded-2xl bg-bg-subtle border-transparent focus:bg-white focus:border-brand-lake/30 focus:ring-4 focus:ring-brand-lake/5 transition-all shadow-sm relative z-0"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full max-w-md sm:max-w-none justify-center">
                        <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-xl shadow-[0_4px_14px_0_rgba(108,72,197,0.25)] hover:shadow-[0_6px_20px_rgba(108,72,197,0.23)] hover:-translate-y-0.5 transition-all" asChild>
                            <Link to="/dashboard">Back to Dashboard</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 rounded-xl border-border/80 hover:bg-bg-subtle hover:text-brand-dark transition-all" asChild>
                            <Link to="/">Go to Home</Link>
                        </Button>
                    </div>

                    <div className="w-full max-w-lg border-t border-border/60 pt-8 mt-4 relative">
                        <p className="text-xs font-bold text-text-muted/50 uppercase tracking-[0.2em] mb-6 absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4">Helpful Links</p>
                        <div className="flex justify-center gap-6 sm:gap-10">
                            <Link to="/dashboard/orders" className="flex flex-col items-center gap-3 text-text-muted hover:text-brand-dark transition-colors group/link cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-bg-subtle flex items-center justify-center group-hover/link:bg-brand-lake/10 group-hover/link:text-brand-lake group-hover/link:shadow-lg group-hover/link:shadow-brand-lake/5 group-active/link:scale-95 transition-all">
                                    <ShoppingCart className="w-6 h-6 transition-transform group-hover/link:-translate-y-0.5" />
                                </div>
                                <span className="text-sm font-semibold">Orders</span>
                            </Link>
                            <Link to="/dashboard/products" className="flex flex-col items-center gap-3 text-text-muted hover:text-brand-dark transition-colors group/link cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-bg-subtle flex items-center justify-center group-hover/link:bg-brand-saffron/10 group-hover/link:text-brand-saffron group-hover/link:shadow-lg group-hover/link:shadow-brand-saffron/5 group-active/link:scale-95 transition-all">
                                    <Package className="w-6 h-6 transition-transform group-hover/link:-translate-y-0.5" />
                                </div>
                                <span className="text-sm font-semibold">Products</span>
                            </Link>
                            <Link to="/dashboard/analytics" className="flex flex-col items-center gap-3 text-text-muted hover:text-brand-dark transition-colors group/link cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-bg-subtle flex items-center justify-center group-hover/link:bg-brand-jade/10 group-hover/link:text-brand-jade group-hover/link:shadow-lg group-hover/link:shadow-brand-jade/5 group-active/link:scale-95 transition-all">
                                    <BarChart3 className="w-6 h-6 transition-transform group-hover/link:-translate-y-0.5" />
                                </div>
                                <span className="text-sm font-semibold">Analytics</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <button
                onClick={changeMessage}
                className="mt-8 text-text-muted/60 hover:text-brand-dark flex items-center gap-2 text-sm font-medium transition-colors group"
            >
                <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" /> Try another vibe
            </button>
        </div>
    );
}
