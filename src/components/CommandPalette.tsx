import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search, FileText, Package, ShoppingCart, BarChart2,
    Settings, Truck, Plug, Sparkles, ArrowRight
} from "lucide-react";

interface CommandItem {
    id: string;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    category: string;
}

const commands: CommandItem[] = [
    { id: 'dashboard', label: 'Dashboard', description: 'Overview & KPIs', icon: BarChart2, href: '/dashboard', category: 'Navigation' },
    { id: 'products', label: 'Products', description: 'Manage product listings', icon: Package, href: '/dashboard/products', category: 'Navigation' },
    { id: 'orders', label: 'Orders', description: 'View & manage orders', icon: ShoppingCart, href: '/dashboard/orders', category: 'Navigation' },
    { id: 'logistics', label: 'Logistics', description: 'Shipments & tracking', icon: Truck, href: '/dashboard/logistics', category: 'Navigation' },
    { id: 'integrations', label: 'Integrations', description: 'Platform connections', icon: Plug, href: '/dashboard/integrations', category: 'Navigation' },
    { id: 'ai-studio', label: 'AI Studio', description: 'AI content & images', icon: Sparkles, href: '/dashboard/ai-studio', category: 'Navigation' },
    { id: 'analytics', label: 'Analytics', description: 'Reports & insights', icon: BarChart2, href: '/dashboard/analytics', category: 'Navigation' },
    { id: 'settings', label: 'Settings', description: 'Account & preferences', icon: Settings, href: '/dashboard/settings', category: 'Navigation' },
    { id: 'add-product', label: 'Add Product', description: 'Create a new listing', icon: Package, href: '/dashboard/products/upload', category: 'Actions' },
    { id: 'bulk-regen', label: 'Bulk Regenerate', description: 'AI content for multiple products', icon: Sparkles, href: '/dashboard/ai-studio/bulk', category: 'Actions' },
    { id: 'seo', label: 'SEO Keywords', description: 'Optimize product SEO', icon: FileText, href: '/dashboard/ai-studio/seo-keywords', category: 'Actions' },
    { id: 'export', label: 'Sales Report', description: 'View revenue analytics', icon: BarChart2, href: '/dashboard/analytics/sales', category: 'Actions' },
];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const filtered = commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
    );

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setOpen(prev => !prev);
            setQuery('');
            setSelectedIndex(0);
        }
        if (e.key === 'Escape') setOpen(false);
    }, []);

    useEffect(() => { document.addEventListener('keydown', handleKeyDown); return () => document.removeEventListener('keydown', handleKeyDown); }, [handleKeyDown]);
    useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

    const handleSelect = (href: string) => { setOpen(false); navigate(href); };
    const handleListKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
        if (e.key === 'Enter' && filtered[selectedIndex]) handleSelect(filtered[selectedIndex].href);
    };

    if (!open) return null;

    const grouped = filtered.reduce((acc, c) => { (acc[c.category] ??= []).push(c); return acc; }, {} as Record<string, CommandItem[]>);

    return (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border/60 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
                    <Search className="w-5 h-5 text-text-muted shrink-0" />
                    <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                        onKeyDown={handleListKeyDown}
                        placeholder="Search commands, pages, actions..."
                        className="flex-1 text-sm text-brand-dark outline-none placeholder:text-text-muted/50 bg-transparent" />
                    <kbd className="text-[10px] text-text-muted bg-bg-subtle px-1.5 py-0.5 rounded border border-border/40 font-mono">ESC</kbd>
                </div>

                <div className="max-h-72 overflow-y-auto p-2">
                    {Object.entries(grouped).map(([cat, items]) => (
                        <div key={cat}>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-3 py-1.5">{cat}</p>
                            {items.map(c => {
                                const globalIdx = filtered.indexOf(c);
                                return (
                                    <button key={c.id}
                                        onClick={() => handleSelect(c.href)}
                                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${globalIdx === selectedIndex ? 'bg-brand-lake/5' : 'hover:bg-bg-subtle'}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${globalIdx === selectedIndex ? 'bg-brand-lake/10' : 'bg-bg-subtle'}`}>
                                            <c.icon className={`w-4 h-4 ${globalIdx === selectedIndex ? 'text-brand-lake' : 'text-text-muted'}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-brand-dark">{c.label}</p>
                                            <p className="text-[10px] text-text-muted">{c.description}</p>
                                        </div>
                                        {globalIdx === selectedIndex && <ArrowRight className="w-4 h-4 text-brand-lake shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-8"><p className="text-sm text-text-muted">No results for "{query}"</p></div>
                    )}
                </div>

                <div className="px-5 py-3 border-t border-border/40 flex items-center gap-4 text-[10px] text-text-muted">
                    <span><kbd className="bg-bg-subtle px-1 py-0.5 rounded border border-border/40 font-mono mr-1">↑↓</kbd> Navigate</span>
                    <span><kbd className="bg-bg-subtle px-1 py-0.5 rounded border border-border/40 font-mono mr-1">↵</kbd> Select</span>
                    <span><kbd className="bg-bg-subtle px-1 py-0.5 rounded border border-border/40 font-mono mr-1">Esc</kbd> Close</span>
                </div>
            </div>
        </div>
    );
}
