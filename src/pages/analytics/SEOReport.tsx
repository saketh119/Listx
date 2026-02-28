import { Link } from "react-router-dom";
import { ArrowLeft, Search, Download, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { seoScoresByProduct } from "@/data/mockAnalytics";

const statusCfg = { excellent: { label: 'Excellent', color: 'text-brand-jade bg-brand-jade/10' }, good: { label: 'Good', color: 'text-brand-lake bg-brand-lake/10' }, needs_work: { label: 'Needs Work', color: 'text-brand-saffron bg-brand-saffron/10' }, poor: { label: 'Poor', color: 'text-semantic-error bg-semantic-error/10' } };
const avgScore = Math.round(seoScoresByProduct.reduce((s, p) => s + p.score, 0) / seoScoresByProduct.length);

export default function SEOReport() {
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/analytics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Analytics</Link>
            </Button>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><Search className="w-7 h-7 text-purple-500" /> SEO Report</h1>
                    <p className="text-body-sm text-text-muted mt-1">Product discoverability and optimization scores</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild className="rounded-xl border-border/60 text-sm font-medium">
                        <Link to="/dashboard/ai-studio/seo-keywords"><TrendingUp className="w-4 h-4 mr-2" /> Keyword Tool</Link>
                    </Button>
                    <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium"><Download className="w-4 h-4 mr-2" /> Export</Button>
                </div>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4 text-center">
                    <p className={`text-3xl font-bold ${avgScore >= 70 ? 'text-brand-jade' : avgScore >= 50 ? 'text-brand-saffron' : 'text-semantic-error'}`}>{avgScore}</p>
                    <p className="text-[10px] text-text-muted">Avg. SEO Score</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-jade/30 shadow-sm p-4 text-center">
                    <p className="text-2xl font-bold text-brand-jade">{seoScoresByProduct.filter(p => p.score >= 80).length}</p>
                    <p className="text-[10px] text-text-muted">Optimized</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-saffron/30 shadow-sm p-4 text-center">
                    <p className="text-2xl font-bold text-brand-saffron">{seoScoresByProduct.filter(p => p.score >= 40 && p.score < 80).length}</p>
                    <p className="text-[10px] text-text-muted">Needs Work</p>
                </div>
                <div className="bg-white rounded-2xl border border-semantic-error/30 shadow-sm p-4 text-center">
                    <p className="text-2xl font-bold text-semantic-error">{seoScoresByProduct.filter(p => p.score < 40).length}</p>
                    <p className="text-[10px] text-text-muted">Poor</p>
                </div>
            </div>

            {/* Product Scores */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden mb-6">
                <table className="w-full">
                    <thead><tr className="border-b border-border/40">
                        <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Product</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">SEO Score</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Score Bar</th>
                        <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Action</th>
                    </tr></thead>
                    <tbody>
                        {seoScoresByProduct.map(p => {
                            const cfg = statusCfg[p.status];
                            return (
                                <tr key={p.product} className="border-b border-border/20 hover:bg-bg-subtle/30">
                                    <td className="p-4 text-sm font-medium text-brand-dark">{p.product}</td>
                                    <td className="p-4 text-center"><span className={`text-lg font-bold ${p.score >= 80 ? 'text-brand-jade' : p.score >= 50 ? 'text-brand-saffron' : 'text-semantic-error'}`}>{p.score}</span></td>
                                    <td className="p-4 text-center"><Badge className={`${cfg.color} border-transparent text-[10px]`}>{cfg.label}</Badge></td>
                                    <td className="p-4"><div className="w-full h-2 bg-bg-subtle rounded-full mx-auto max-w-24"><div className={`h-full rounded-full ${p.score >= 80 ? 'bg-brand-jade' : p.score >= 50 ? 'bg-brand-saffron' : 'bg-semantic-error'}`} style={{ width: `${p.score}%` }} /></div></td>
                                    <td className="p-4 text-center">{p.score < 80 && <Button size="sm" variant="outline" asChild className="h-7 px-3 rounded-lg text-[10px] border-brand-lake/30 text-brand-lake"><Link to="/dashboard/ai-studio">Optimize</Link></Button>}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-brand-saffron" /> Optimization Suggestions</h3>
                <div className="space-y-2 text-xs text-text-muted">
                    <p>• <strong className="text-brand-dark">Ayurvedic Hair Oil</strong> — Missing target keywords: "natural hair growth oil", "ayurvedic hair care". Add to title and description.</p>
                    <p>• <strong className="text-brand-dark">Steel Water Bottle</strong> — Title too short. Expand with material, capacity, and use-case keywords.</p>
                    <p>• <strong className="text-brand-dark">Ceramic Dinner Set</strong> — Add bullet points with "stoneware", "microwave safe", "handmade pottery" keywords.</p>
                    <p>• <strong className="text-brand-dark">Leather Laptop Sleeve</strong> — Needs backend keywords. Add "macbook sleeve", "business laptop case" etc.</p>
                </div>
            </div>
        </div>
    );
}
