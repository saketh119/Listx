import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, ImageIcon, Sparkles, Check, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { imageEnhancements } from "@/data/mockAIStudio";

export default function AIImageEnhancement() {
    const [selectedImage, setSelectedImage] = useState(imageEnhancements[0]);
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        setSliderPos(x);
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/ai-studio"><ArrowLeft className="w-4 h-4 mr-2" /> Back to AI Studio</Link>
            </Button>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3">
                        <ImageIcon className="w-7 h-7 text-purple-500" /> Image Enhancement
                    </h1>
                    <p className="text-body-sm text-text-muted mt-1">AI-powered product image improvement</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Image List */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Enhanced Images</h3>
                    <div className="space-y-2">
                        {imageEnhancements.map(img => (
                            <button key={img.id} onClick={() => { setSelectedImage(img); setSliderPos(50); }}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${selectedImage.id === img.id ? 'bg-brand-lake/5 border border-brand-lake/20' : 'hover:bg-bg-subtle border border-transparent'}`}>
                                <img src={img.originalUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-brand-dark truncate">{img.productTitle}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] text-semantic-error">{img.qualityBefore}%</span>
                                        <ArrowRight className="w-3 h-3 text-text-muted" />
                                        <span className="text-[10px] text-brand-jade font-bold">{img.qualityAfter}%</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right — Before/After Slider */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-brand-dark">{selectedImage.productTitle}</h3>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-semantic-error/10 text-semantic-error border-transparent text-[10px]">Before: {selectedImage.qualityBefore}%</Badge>
                            <Badge className="bg-brand-jade/10 text-brand-jade border-transparent text-[10px]">After: {selectedImage.qualityAfter}%</Badge>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="relative rounded-xl overflow-hidden cursor-col-resize select-none mb-4"
                        style={{ aspectRatio: '1/1', maxHeight: '400px' }}
                        onMouseMove={handleMouseMove}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}>
                        {/* Enhanced (full) */}
                        <img src={selectedImage.enhancedUrl} alt="Enhanced" className="absolute inset-0 w-full h-full object-cover" />
                        {/* Original (clipped) */}
                        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                            <img src={selectedImage.originalUrl} alt="Original" className="absolute inset-0 w-full h-full object-cover"
                                style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: 'none' }} />
                        </div>
                        {/* Slider Handle */}
                        <div className="absolute top-0 bottom-0" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
                            <div className="w-0.5 h-full bg-white shadow-lg" />
                            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                                <div className="flex items-center gap-0.5">
                                    <ArrowLeft className="w-3 h-3 text-brand-dark" />
                                    <ArrowRight className="w-3 h-3 text-brand-dark" />
                                </div>
                            </div>
                        </div>
                        {/* Labels */}
                        <div className="absolute top-3 left-3"><Badge className="bg-black/60 text-white border-transparent text-[10px]">Before</Badge></div>
                        <div className="absolute top-3 right-3"><Badge className="bg-black/60 text-white border-transparent text-[10px]">After</Badge></div>
                    </div>

                    {/* Enhancements Applied */}
                    <div className="mb-4">
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Enhancements Applied</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {selectedImage.enhancements.map(e => (
                                <Badge key={e} className="bg-purple-500/10 text-purple-600 border-transparent text-[10px]">
                                    <Sparkles className="w-3 h-3 mr-1" />{e}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button className="flex-1 rounded-xl bg-brand-jade hover:bg-brand-jade/90 text-white font-medium">
                            <Check className="w-4 h-4 mr-2" /> Use Enhanced Image
                        </Button>
                        <Button variant="outline" className="rounded-xl border-border/60 font-medium">
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
