import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, CheckCircle2, UploadCloud, ImageIcon } from "lucide-react";
import { apiClient } from "@/lib/api-client";

import { Button } from "@/components/ui/button";

const aiSteps = [
    { label: "Analyzing product data...", duration: 1200 },
    { label: "Generating SEO title...", duration: 1000 },
    { label: "Writing description...", duration: 1500 },
    { label: "Extracting keywords...", duration: 800 },
    { label: "Scoring listing quality...", duration: 600 },
];



export default function AIProcessing() {
    const [phase, setPhase] = useState<'idle' | 'processing' | 'preview'>('idle');
    const [currentStep, setCurrentStep] = useState(0);
    const [orbPulse, setOrbPulse] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (phase !== 'processing') return;

        // Orb animation
        const orbInterval = setInterval(() => {
            setOrbPulse(p => (p + 1) % 360);
        }, 50);

        return () => clearInterval(orbInterval);
    }, [phase]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPhase('processing');
        setCurrentStep(0);

        // Simulated steps interval
        const stepInterval = setInterval(() => {
            setCurrentStep(s => (s < aiSteps.length - 1 ? s + 1 : s));
        }, 1200);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await apiClient.post('/ai/extract-from-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            clearInterval(stepInterval);
            setCurrentStep(aiSteps.length);
            
            // Navigate to preview with real data
            setTimeout(() => {
                navigate('/dashboard/products/ai-preview', { state: { products: data.products } });
            }, 800);
            
        } catch (error) {
            clearInterval(stepInterval);
            console.error("AI Extraction failed:", error);
            alert("Failed to process image. Please ensure it's clear and contains product information.");
            setPhase('idle');
        }
    };

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
    if (phase === 'idle') {
        return (
            <div className="max-w-3xl mx-auto py-8">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                        <Link to="/dashboard/products/upload">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Methods
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-saffron/10 flex items-center justify-center text-brand-saffron">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h1 className="text-display-sm font-bold text-brand-dark">AI Image Extraction</h1>
                    </div>
                    <p className="text-body-sm text-text-muted mt-2">
                        Upload a photo of a product list, menu, or catalog page. AI will extract names and prices automatically.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] border border-brand-saffron/20 shadow-sm p-8 sm:p-12">
                    <div
                        className="border-2 border-dashed border-brand-saffron/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all hover:border-brand-saffron/60 hover:bg-brand-saffron/5 cursor-pointer group"
                        onClick={() => document.getElementById('ai-file-input')?.click()}
                    >
                        <input
                            id="ai-file-input"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                        <div className="w-16 h-16 rounded-full bg-brand-saffron/10 flex items-center justify-center text-brand-saffron mb-6 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-8 h-8" />
                        </div>
                        <h3 className="text-body-lg font-bold text-brand-dark mb-2">Upload a photo of your list</h3>
                        <p className="text-body-sm text-text-muted max-w-sm">
                            Snap a picture of your handwritten list, printed catalog, or stock sheet.
                        </p>

                        <div className="flex items-center gap-4 mt-8 text-xs font-semibold text-text-muted/60 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> High Quality</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>PNG, JPG, WEBP</span>
                        </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-brand-jade/5 rounded-xl border border-brand-jade/10 flex gap-3 italic text-xs text-brand-jade/80">
                        <Sparkles className="w-4 h-4 shrink-0" />
                        Tip: "A clear photo with good lighting works best. Even handwritten lists on paper work like magic!"
                    </div>
                </div>
            </div>
        );
    }

    return null; // Navigation happens in handleFileUpload
}
