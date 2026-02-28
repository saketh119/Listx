import { X, Globe, BarChart3, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    selectedCount: number;
    onClear: () => void;
}

export function BulkActionBar({ selectedCount, onClear }: Props) {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className="max-w-6xl mx-auto px-4 pb-4">
                <div className="bg-brand-dark rounded-2xl shadow-2xl shadow-brand-dark/30 px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-jade/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-brand-jade">{selectedCount}</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{selectedCount} product{selectedCount > 1 ? 's' : ''} selected</p>
                            <p className="text-[11px] text-white/50">Choose an action below</p>
                        </div>
                        <button onClick={onClear} className="ml-2 w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                            <X className="w-3.5 h-3.5 text-white/70" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary"
                            className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 text-xs font-medium">
                            <Globe className="w-3.5 h-3.5 mr-1.5" /> Publish
                        </Button>
                        <Button size="sm" variant="secondary"
                            className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 text-xs font-medium">
                            <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> Update Stock
                        </Button>
                        <Button size="sm" variant="secondary"
                            className="rounded-xl bg-white/10 hover:bg-white/20 text-white border-0 h-9 px-4 text-xs font-medium">
                            <Download className="w-3.5 h-3.5 mr-1.5" /> Export
                        </Button>
                        <div className="w-px h-6 bg-white/15 mx-1" />
                        <Button size="sm" variant="secondary"
                            className="rounded-xl bg-semantic-error/20 hover:bg-semantic-error/30 text-semantic-error border-0 h-9 px-4 text-xs font-medium">
                            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
