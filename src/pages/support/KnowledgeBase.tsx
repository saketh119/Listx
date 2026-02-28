import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Search, ThumbsUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { kbArticles } from "@/data/mockSupport";

const categories = ['All', ...Array.from(new Set(kbArticles.map(a => a.category)))];

const categoryColors: Record<string, string> = {
    Integrations: 'bg-brand-lake/10 text-brand-lake',
    Orders: 'bg-brand-saffron/10 text-brand-saffron',
    Returns: 'bg-semantic-error/10 text-semantic-error',
    'AI Studio': 'bg-purple-500/10 text-purple-600',
    Settings: 'bg-cyan-500/10 text-cyan-600',
    Products: 'bg-brand-jade/10 text-brand-jade',
    Logistics: 'bg-brand-lake/10 text-brand-lake',
    Analytics: 'bg-brand-saffron/10 text-brand-saffron',
};

export default function KnowledgeBase() {
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All');

    const filtered = kbArticles
        .filter(a => catFilter === 'All' || a.category === catFilter)
        .filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/support"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Support</Link>
            </Button>

            {/* Hero */}
            <div className="bg-gradient-to-br from-brand-lake/5 to-brand-jade/5 rounded-2xl border border-border/60 p-8 mb-6 text-center">
                <BookOpen className="w-10 h-10 text-brand-lake mx-auto mb-3" />
                <h1 className="text-display-sm font-bold text-brand-dark mb-2">Knowledge Base</h1>
                <p className="text-sm text-text-muted mb-4">{kbArticles.length} articles to help you get the most out of ListX</p>
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
                        className="pl-10 rounded-xl bg-white border-border/60 h-11 shadow-sm" />
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-1.5 overflow-x-auto mb-5">
                {categories.map(c => (
                    <button key={c} onClick={() => setCatFilter(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${catFilter === c ? 'bg-brand-lake text-white' : 'bg-white text-text-muted border border-border/40 hover:border-brand-lake/30'}`}>
                        {c}
                    </button>
                ))}
            </div>

            {/* Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(a => (
                    <div key={a.id} className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 hover:shadow-md transition-shadow group cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge className={`${categoryColors[a.category] || 'bg-bg-subtle text-text-muted'} border-transparent text-[9px]`}>{a.category}</Badge>
                            <span className="text-[9px] text-text-muted">Updated {a.updatedAt}</span>
                        </div>
                        <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-lake transition-colors mb-1">{a.title}</h3>
                        <p className="text-xs text-text-muted leading-relaxed mb-3">{a.summary}</p>
                        <div className="flex items-center gap-4 text-[10px] text-text-muted">
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{a.views.toLocaleString()} views</span>
                            <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{a.helpful} helpful</span>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && <div className="text-center py-12 text-sm text-text-muted">No articles found for "{search}"</div>}
        </div>
    );
}
