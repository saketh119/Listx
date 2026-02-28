import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, CheckCircle2, Wand2, Copy, Edit, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const aiSteps = [
    { label: "Analyzing product data...", duration: 1200 },
    { label: "Generating SEO title...", duration: 1000 },
    { label: "Writing description...", duration: 1500 },
    { label: "Extracting keywords...", duration: 800 },
    { label: "Scoring listing quality...", duration: 600 },
];

const aiResult = {
    title: "Premium Ergonomic Office Chair – Breathable Mesh Back, Adjustable Lumbar Support & Armrests, 360° Swivel",
    description: "Transform your workspace with this premium ergonomic office chair designed for all-day comfort. The breathable mesh backrest promotes airflow to keep you cool during long work sessions, while the adjustable lumbar support conforms to your spine's natural curve. Features include height-adjustable armrests, a 360° smooth-swivel base, and a heavy-duty gas lift cylinder rated for up to 120kg. The waterfall seat edge design reduces pressure on your thighs, improving circulation. Perfect for home offices, corporate environments, and gaming setups.",
    keywords: ["ergonomic chair", "office chair", "mesh back chair", "adjustable armrests", "lumbar support", "home office furniture", "swivel chair", "breathable chair", "desk chair", "work from home"],
    score: 94,
};

export default function AIProcessing() {
    const [phase, setPhase] = useState<'processing' | 'preview'>('processing');
    const [currentStep, setCurrentStep] = useState(0);
    const [orbPulse, setOrbPulse] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (phase !== 'processing') return;

        let stepIndex = 0;
        const runSteps = () => {
            if (stepIndex >= aiSteps.length) {
                setTimeout(() => setPhase('preview'), 400);
                return;
            }
            setCurrentStep(stepIndex);
            stepIndex++;
            setTimeout(runSteps, aiSteps[stepIndex - 1].duration);
        };
        runSteps();

        // Orb animation
        const orbInterval = setInterval(() => {
            setOrbPulse(p => (p + 1) % 360);
        }, 50);

        return () => clearInterval(orbInterval);
    }, [phase]);

    if (phase === 'processing') {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[70vh]">
                <div className="text-center max-w-md mx-auto">
                    {/* AI Processing Orb */}
                    <div className="relative w-40 h-40 mx-auto mb-10">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(from ${orbPulse}deg, #1B9B5E, #3B82F6, #F59E0B, #1B9B5E)`,
                                filter: 'blur(20px)',
                                opacity: 0.4,
                            }}
                        />
                        <div
                            className="absolute inset-2 rounded-full"
                            style={{
                                background: `conic-gradient(from ${orbPulse + 90}deg, #1B9B5E, #F59E0B, #3B82F6, #1B9B5E)`,
                                filter: 'blur(10px)',
                                opacity: 0.6,
                            }}
                        />
                        <div className="absolute inset-4 rounded-full bg-white shadow-xl flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-brand-saffron animate-pulse" />
                        </div>
                    </div>

                    <h2 className="text-display-sm font-bold text-brand-dark mb-3">AI is working its magic</h2>
                    <p className="text-body-sm text-text-muted mb-8">Generating SEO-optimized content for your product...</p>

                    <div className="space-y-3 text-left">
                        {aiSteps.map((step, i) => (
                            <div key={i} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${i < currentStep ? 'bg-brand-jade/5 text-brand-jade' :
                                    i === currentStep ? 'bg-brand-lake/5 text-brand-lake font-medium' :
                                        'text-text-muted/50'
                                }`}>
                                {i < currentStep ? (
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                ) : i === currentStep ? (
                                    <span className="w-4 h-4 border-2 border-brand-lake/40 border-t-brand-lake rounded-full animate-spin shrink-0" />
                                ) : (
                                    <span className="w-4 h-4 rounded-full border-2 border-border/40 shrink-0" />
                                )}
                                <span className="text-sm">{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 pb-16">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products/upload">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Methods
                    </Link>
                </Button>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-saffron/20 to-brand-saffron/5 border border-brand-saffron/20 flex items-center justify-center text-brand-saffron">
                        <Wand2 className="w-5 h-5" />
                    </div>
                    <h1 className="text-display-sm font-bold text-brand-dark">AI Generated Preview</h1>
                </div>
                <p className="text-body-sm text-text-muted">
                    Review and edit the AI-generated content below before saving to your catalog.
                </p>
            </div>

            {/* Score Badge */}
            <div className="bg-white rounded-2xl border border-brand-jade/30 shadow-sm p-6 mb-6 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-jade/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-black text-brand-jade">{aiResult.score}</span>
                </div>
                <div>
                    <h3 className="text-sm font-bold text-brand-dark mb-0.5">Listing Quality Score</h3>
                    <p className="text-xs text-text-muted">Your AI-generated listing scores in the <strong className="text-brand-jade">Excellent</strong> range. It's optimized for discoverability on Amazon, Flipkart, and Shopify.</p>
                </div>
            </div>

            {/* Generated Title */}
            <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider">Generated Title</h2>
                    <Button variant="ghost" size="sm" className="text-text-muted hover:text-brand-dark rounded-lg h-8 text-xs">
                        <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                </div>
                <h3 className="text-body-lg font-bold text-brand-dark leading-relaxed">{aiResult.title}</h3>
            </section>

            {/* Generated Description */}
            <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider">Generated Description</h2>
                    <Button variant="ghost" size="sm" className="text-text-muted hover:text-brand-dark rounded-lg h-8 text-xs">
                        <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                </div>
                <p className="text-body-sm text-brand-dark/80 leading-relaxed">{aiResult.description}</p>
            </section>

            {/* Keywords */}
            <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sm:p-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider">SEO Keywords</h2>
                    <Button variant="ghost" size="sm" className="text-text-muted hover:text-brand-dark rounded-lg h-8 text-xs">
                        <Copy className="w-3 h-3 mr-1" /> Copy All
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {aiResult.keywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-brand-lake/10 text-brand-lake text-xs font-semibold border border-brand-lake/20">
                            {kw}
                        </span>
                    ))}
                </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => { setPhase('processing'); setCurrentStep(0); }} className="rounded-xl h-11 border-border/60">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Re-generate
                </Button>
                <Button onClick={() => navigate('/dashboard/products')} className="rounded-xl h-11 px-8 bg-brand-jade hover:bg-brand-jade/90 shadow-sm">
                    Save to Catalog
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
