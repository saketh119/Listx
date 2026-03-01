import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, Search, TrendingUp, Check, Plus,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { seoKeywords } from "@/data/mockAIStudio";

export default function AISEOKeywords() {
    const [search, setSearch] = useState('');
    const [addedKeywords, setAddedKeywords] = useState<Set<string>>(new Set());

    const filtered = seoKeywords.filter(k =>
        k.keyword.toLowerCase().includes(search.toLowerCase())
    );

    const addKeyword = (kw: string) => setAddedKeywords(prev => new Set(prev).add(kw));

    const difficultyColor = { easy: 'text-brand-jade bg-brand-jade/10', medium: 'text-brand-saffron bg-brand-saffron/10', hard: 'text-semantic-error bg-semantic-error/10' };

    const avgRelevance = Math.round(seoKeywords.reduce((sum, k) => sum + k.relevance, 0) / seoKeywords.length);
    const recommendedCount = seoKeywords.filter(k => k.recommended).length;

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/ai-studio"><ArrowLeft className="w-4 h-4 mr-2" /> Back to AI Studio</Link>
            </Button>

            <div className="mb-6">
                <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3">
                    <TrendingUp className="w-7 h-7 text-brand-jade" /> SEO Keywords
                </h1>
                <p className="text-body-sm text-text-muted mt-1">AI-powered keyword suggestions to improve product discoverability</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-dark">{seoKeywords.length}</p>
                    <p className="text-[10px] text-text-muted font-medium">Keywords Found</p>
                </div>
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-jade">{recommendedCount}</p>
                    <p className="text-[10px] text-text-muted font-medium">Recommended</p>
                </div>
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-dark">{avgRelevance}%</p>
                    <p className="text-[10px] text-text-muted font-medium">Avg. Relevance</p>
                </div>
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-dark">{addedKeywords.size}</p>
                    <p className="text-[10px] text-text-muted font-medium">Added to Content</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search keywords..."
                    className="pl-10 rounded-xl bg-white border-border/60 h-11" />
            </div>

            {/* Keywords Table */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border/40">
                            <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Keyword</th>
                            <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Volume</th>
                            <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Difficulty</th>
                            <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Relevance</th>
                            <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Current Density</th>
                            <th className="p-4 text-center text-[11px] font-bold text-text-muted uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(k => (
                            <tr key={k.keyword} className="border-b border-border/20 hover:bg-bg-subtle/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-brand-dark">{k.keyword}</span>
                                        {k.recommended && <Badge className="bg-brand-jade/10 text-brand-jade border-transparent text-[8px]">Recommended</Badge>}
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-sm font-bold text-brand-dark">{k.volume.toLocaleString()}</span>
                                        <ArrowUpRight className="w-3 h-3 text-brand-jade" />
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <Badge className={`${difficultyColor[k.difficulty]} border-transparent text-[10px] capitalize`}>{k.difficulty}</Badge>
                                </td>
                                <td className="p-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className={`text-sm font-bold ${k.relevance >= 80 ? 'text-brand-jade' : k.relevance >= 60 ? 'text-brand-saffron' : 'text-semantic-error'}`}>{k.relevance}%</span>
                                        <div className="w-12 h-1 bg-bg-subtle rounded-full mt-1">
                                            <div className={`h-full rounded-full ${k.relevance >= 80 ? 'bg-brand-jade' : 'bg-brand-saffron'}`} style={{ width: `${k.relevance}%` }} />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className={`text-sm font-bold ${k.currentDensity > 0 ? 'text-brand-dark' : 'text-text-muted/40'}`}>
                                        {k.currentDensity > 0 ? `${k.currentDensity}%` : '—'}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    {addedKeywords.has(k.keyword) ? (
                                        <Badge className="bg-brand-jade/10 text-brand-jade border-transparent text-[10px]"><Check className="w-3 h-3 mr-1" /> Added</Badge>
                                    ) : (
                                        <Button size="sm" variant="outline" onClick={() => addKeyword(k.keyword)}
                                            className="h-7 px-3 rounded-lg text-[10px] border-brand-lake/30 text-brand-lake hover:bg-brand-lake/5">
                                            <Plus className="w-3 h-3 mr-1" /> Add
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
