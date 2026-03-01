import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Sparkles, RefreshCw, Copy, Check, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiProducts, sampleStreamingContent } from "@/data/mockAIStudio";

export default function AIContentGenerator() {
    const [selectedProduct, setSelectedProduct] = useState(aiProducts[2]); // ceramic set — has no AI desc
    const [showPicker, setShowPicker] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [streamedText, setStreamedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [copied, setCopied] = useState(false);
    const [tone, setTone] = useState('professional');
    const streamRef = useRef<number>(0);

    const tones = ['professional', 'casual', 'luxury', 'technical', 'friendly'];

    const startStreaming = () => {
        setIsGenerating(true);
        setStreamedText('');
        setIsComplete(false);
        streamRef.current = 0;

        const interval = setInterval(() => {
            streamRef.current += 3;
            if (streamRef.current >= sampleStreamingContent.length) {
                setStreamedText(sampleStreamingContent);
                setIsGenerating(false);
                setIsComplete(true);
                clearInterval(interval);
            } else {
                setStreamedText(sampleStreamingContent.slice(0, streamRef.current));
            }
        }, 20);
    };

    const copyContent = () => {
        navigator.clipboard.writeText(streamedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3">
                        <Sparkles className="w-7 h-7 text-brand-saffron" /> AI Content Generator
                    </h1>
                    <p className="text-body-sm text-text-muted mt-1">Generate premium product descriptions with AI</p>
                </div>
                <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                    <Link to="/dashboard/ai-studio/bulk">Bulk Regenerate →</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Product & Settings */}
                <div className="flex flex-col gap-5">
                    {/* Product Picker */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Select Product</h3>
                        <div className="relative">
                            <button onClick={() => setShowPicker(!showPicker)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/40 hover:border-border transition-colors text-left">
                                <img src={selectedProduct.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-brand-dark truncate">{selectedProduct.title}</p>
                                    <p className="text-[10px] text-text-muted">{selectedProduct.category} • {selectedProduct.platform}</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                            </button>
                            {showPicker && (
                                <div className="absolute z-20 top-full mt-1 left-0 right-0 bg-white border border-border/60 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                                    {aiProducts.map(p => (
                                        <button key={p.id} onClick={() => { setSelectedProduct(p); setShowPicker(false); setStreamedText(''); setIsComplete(false); }}
                                            className={`w-full flex items-center gap-3 p-2.5 text-left hover:bg-bg-subtle transition-colors ${selectedProduct.id === p.id ? 'bg-brand-lake/5' : ''}`}>
                                            <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-brand-dark truncate">{p.title}</p>
                                                <p className="text-[10px] text-text-muted">{p.category}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Original Description */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Original Description</h3>
                        <p className="text-sm text-text-muted leading-relaxed bg-bg-subtle/50 p-3 rounded-xl">{selectedProduct.originalDescription}</p>
                    </div>

                    {/* Tone */}
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Writing Tone</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {tones.map(t => (
                                <button key={t} onClick={() => setTone(t)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${tone === t ? 'bg-brand-lake text-white' : 'bg-bg-subtle text-text-muted hover:bg-brand-lake/10'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <Button onClick={startStreaming} disabled={isGenerating} className="w-full rounded-xl shadow-brand-lake/20 font-medium h-12 text-sm">
                        {isGenerating ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                            : <><Sparkles className="w-4 h-4 mr-2" /> Generate AI Description</>}
                    </Button>
                </div>

                {/* Right — AI Output */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-brand-saffron" /> AI Generated Content
                        </h3>
                        <div className="flex items-center gap-2">
                            {isComplete && (
                                <>
                                    <button onClick={copyContent} className="flex items-center gap-1 text-xs text-text-muted hover:text-brand-lake">
                                        {copied ? <Check className="w-3 h-3 text-brand-jade" /> : <Copy className="w-3 h-3" />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <Badge className="bg-brand-jade/10 text-brand-jade border-transparent text-[10px]">Complete</Badge>
                                </>
                            )}
                            {isGenerating && (
                                <Badge className="bg-brand-lake/10 text-brand-lake border-transparent text-[10px] animate-pulse">
                                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Streaming...
                                </Badge>
                            )}
                        </div>
                    </div>

                    {streamedText ? (
                        <div className="prose prose-sm max-w-none">
                            <div className="text-sm text-brand-dark leading-relaxed whitespace-pre-wrap font-[400]">
                                {streamedText}
                                {isGenerating && <span className="inline-block w-0.5 h-4 bg-brand-lake animate-pulse ml-0.5" />}
                            </div>
                        </div>
                    ) : selectedProduct.aiDescription ? (
                        <div className="text-sm text-brand-dark leading-relaxed whitespace-pre-wrap">{selectedProduct.aiDescription}</div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <Sparkles className="w-12 h-12 text-brand-saffron/20 mb-4" />
                            <p className="text-sm text-text-muted mb-1">No AI content generated yet</p>
                            <p className="text-xs text-text-muted/60">Select a product and click "Generate" to create premium content</p>
                        </div>
                    )}

                    {isComplete && (
                        <div className="mt-6 pt-4 border-t border-border/40 flex gap-2">
                            <Button className="flex-1 rounded-xl bg-brand-jade hover:bg-brand-jade/90 text-white font-medium">
                                <Check className="w-4 h-4 mr-2" /> Approve & Save
                            </Button>
                            <Button variant="outline" onClick={startStreaming} className="rounded-xl border-border/60 font-medium">
                                <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
