import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";
import { ListxLogo } from "@/components/ListxLogo";
import { useState, useEffect } from "react";

export default function Maintenance() {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 60));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-subtle p-6 font-sans">
            <div className="w-full max-w-lg text-center relative z-10">
                <div className="flex justify-center mb-8">
                    <ListxLogo className="h-8 text-brand-dark opacity-50 grayscale" />
                </div>

                <div className="mx-auto w-24 h-24 bg-white rounded-3xl shadow-sm border border-border/60 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 border-4 border-brand-saffron/20 rounded-3xl animate-pulse"></div>
                    <Wrench className="w-10 h-10 text-brand-saffron" />
                </div>

                <h1 className="text-display-md text-brand-dark tracking-tight mb-4">
                    We'll be back shortly
                </h1>

                <p className="text-body-lg text-text-muted mb-8">
                    Listx is undergoing scheduled maintenance to improve your experience.
                    Expected back at 1:00 AM IST. We apologize for the inconvenience.
                </p>

                <div className="bg-white border rounded-2xl p-6 mb-8 max-w-sm mx-auto shadow-sm">
                    <p className="text-sm font-medium text-text-muted mb-2">Auto-refreshing in:</p>
                    <div className="text-3xl font-display font-bold text-brand-dark tabular-nums flex items-center justify-center gap-2">
                        <span className="w-12 h-12 bg-bg-subtle rounded-xl flex items-center justify-center border font-mono tracking-tighter shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                            {timeLeft.toString().padStart(2, '0')}
                        </span>
                        <span className="text-sm text-text-muted font-normal">sec</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center">
                    <Button variant="outline" size="lg" className="rounded-xl w-full max-w-sm border-border hover:bg-bg-subtle" onClick={() => window.location.reload()}>
                        Refresh Now
                    </Button>
                    <a href="https://twitter.com/ListxStatus" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-lake hover:underline mt-2 inline-block">
                        Follow @ListxStatus for updates
                    </a>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden mix-blend-multiply opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-saffron/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-jade/10 blur-[120px] rounded-full" />
            </div>
        </div>
    );
}
