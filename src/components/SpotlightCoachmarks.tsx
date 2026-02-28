import { useState, useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
    { target: 'Products', title: 'Product Management', description: 'Add, edit, and manage your product listings across all platforms. Use AI to generate descriptions and optimize SEO.', position: 'right' as const },
    { target: 'Orders', title: 'Order Management', description: 'View and manage all your orders from every sales channel in one place. Track status and handle fulfilment.', position: 'right' as const },
    { target: 'AI Studio', title: 'AI-Powered Tools', description: 'Generate product content, enhance images, and optimize SEO keywords with our AI engine.', position: 'right' as const },
    { target: 'Analytics', title: 'Analytics & Reports', description: 'Deep-dive into sales, inventory, logistics, and SEO performance with detailed reports.', position: 'right' as const },
    { target: 'Cmd+K', title: 'Quick Navigation', description: 'Press Ctrl+K (or Cmd+K) anytime to quickly search and navigate across the entire app.', position: 'center' as const },
];

export function SpotlightCoachmarks() {
    const [currentStep, setCurrentStep] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem('listx_coachmarks_seen');
        if (!seen) { setTimeout(() => setVisible(true), 1500); }
    }, []);

    const handleDismiss = () => { setDismissed(true); setVisible(false); localStorage.setItem('listx_coachmarks_seen', 'true'); };
    const handleNext = () => { if (currentStep < steps.length - 1) setCurrentStep(s => s + 1); else handleDismiss(); };

    if (dismissed || !visible) return null;

    const step = steps[currentStep];

    return (
        <div className="fixed inset-0 z-[9998]">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" onClick={handleDismiss} />
            <div className={`fixed bg-white rounded-2xl shadow-2xl border border-border/60 p-6 w-80 animate-in fade-in slide-in-from-bottom-4 duration-300 ${step.position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-1/3 left-72'
                }`}>
                <button onClick={handleDismiss} className="absolute top-3 right-3 text-text-muted hover:text-brand-dark"><X className="w-4 h-4" /></button>

                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-saffron/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-brand-saffron" />
                    </div>
                    <div>
                        <p className="text-[10px] text-text-muted">Step {currentStep + 1} of {steps.length}</p>
                        <h3 className="text-sm font-bold text-brand-dark">{step.title}</h3>
                    </div>
                </div>

                <p className="text-xs text-text-muted leading-relaxed mb-4">{step.description}</p>

                {/* Progress Bar */}
                <div className="flex gap-1 mb-4">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= currentStep ? 'bg-brand-saffron' : 'bg-bg-subtle'}`} />
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={handleDismiss} className="text-xs text-text-muted hover:underline">Skip tour</button>
                    <Button onClick={handleNext} className="rounded-xl text-xs h-8 px-4 shadow-brand-lake/20">
                        {currentStep < steps.length - 1 ? <>Next <ArrowRight className="w-3 h-3 ml-1" /></> : 'Get Started!'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
