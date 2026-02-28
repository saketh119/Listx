import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, Sparkles, RefreshCw, Check, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiProducts } from "@/data/mockAIStudio";

export default function AIBulkRegenerate() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isProcessing, setIsProcessing] = useState(false);
    const [completed, setCompleted] = useState<Set<string>>(new Set());
    const [allDone, setAllDone] = useState(false);

    const toggleProduct = (id: string) => {
        setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    };
    const selectAll = () => setSelectedIds(new Set(aiProducts.map(p => p.id)));

    const startBulkRegenerate = () => {
        setIsProcessing(true);
        setCompleted(new Set());
        const ids = Array.from(selectedIds);
        ids.forEach((id, i) => {
            setTimeout(() => {
                setCompleted(prev => new Set(prev).add(id));
                if (i === ids.length - 1) {
                    setTimeout(() => { setIsProcessing(false); setAllDone(true); }, 500);
                }
            }, (i + 1) * 1200);
        });
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/ai-studio"><ArrowLeft className="w-4 h-4 mr-2" /> Back to AI Studio</Link>
            </Button>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3">
                        <RefreshCw className="w-7 h-7 text-brand-lake" /> Bulk Regenerate
                    </h1>
                    <p className="text-body-sm text-text-muted mt-1">Regenerate AI descriptions for multiple products at once</p>
                </div>
            </div>

            {allDone ? (
                <div className="bg-white rounded-2xl border border-brand-jade/30 shadow-sm p-10 text-center">
                    <div className="w-20 h-20 rounded-full bg-brand-jade/10 flex items-center justify-center mx-auto mb-5 animate-in zoom-in-50 duration-500">
                        <CheckCircle2 className="w-10 h-10 text-brand-jade" />
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark mb-2">All Descriptions Generated!</h2>
                    <p className="text-sm text-text-muted mb-6">{selectedIds.size} products updated with AI-generated content</p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" asChild className="rounded-xl"><Link to="/dashboard/products">View Products</Link></Button>
                        <Button asChild className="rounded-xl shadow-brand-lake/20"><Link to="/dashboard/ai-studio">Back to AI Studio</Link></Button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-brand-dark">Select Products</h3>
                            <button onClick={selectAll} className="text-xs text-brand-lake hover:underline">Select All ({aiProducts.length})</button>
                        </div>
                        <div className="space-y-2">
                            {aiProducts.map(p => {
                                const isDone = completed.has(p.id);
                                const isInProgress = isProcessing && selectedIds.has(p.id) && !isDone;
                                return (
                                    <label key={p.id} className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${isDone ? 'bg-brand-jade/5 border border-brand-jade/20' :
                                            isInProgress ? 'bg-brand-lake/5 border border-brand-lake/20' :
                                                selectedIds.has(p.id) ? 'bg-brand-lake/5 border border-brand-lake/20' :
                                                    'hover:bg-bg-subtle border border-transparent'
                                        }`}>
                                        {isDone ? (
                                            <div className="w-5 h-5 rounded-full bg-brand-jade flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
                                        ) : isInProgress ? (
                                            <RefreshCw className="w-5 h-5 text-brand-lake animate-spin" />
                                        ) : (
                                            <input type="checkbox" checked={selectedIds.has(p.id)} onChange={() => toggleProduct(p.id)}
                                                disabled={isProcessing} className="w-4 h-4 rounded accent-brand-lake" />
                                        )}
                                        <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-brand-dark truncate">{p.title}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-text-muted">{p.category}</span>
                                                <Badge className={`border-transparent text-[9px] ${p.contentStatus === 'approved' ? 'bg-brand-jade/10 text-brand-jade' :
                                                        p.contentStatus === 'ai_generated' ? 'bg-brand-lake/10 text-brand-lake' :
                                                            p.contentStatus === 'needs_review' ? 'bg-brand-saffron/10 text-brand-saffron' :
                                                                'bg-bg-subtle text-text-muted'
                                                    }`}>{p.contentStatus.replace('_', ' ')}</Badge>
                                            </div>
                                        </div>
                                        {p.seoScore !== undefined && (
                                            <div className="text-right shrink-0">
                                                <p className={`text-sm font-bold ${p.seoScore >= 80 ? 'text-brand-jade' : p.seoScore >= 60 ? 'text-brand-saffron' : 'text-semantic-error'}`}>{p.seoScore}</p>
                                                <p className="text-[9px] text-text-muted">SEO</p>
                                            </div>
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <Button disabled={selectedIds.size === 0 || isProcessing} onClick={startBulkRegenerate}
                        className="w-full rounded-xl shadow-brand-lake/20 font-medium h-12 text-sm">
                        {isProcessing ? <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Processing {completed.size}/{selectedIds.size}...</>
                            : <><Sparkles className="w-4 h-4 mr-2" /> Regenerate {selectedIds.size} Descriptions</>}
                    </Button>
                </>
            )}
        </div>
    );
}
