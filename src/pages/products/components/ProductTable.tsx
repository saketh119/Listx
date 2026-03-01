import { useState } from "react";
import { Link } from "react-router-dom";
import {
    MoreHorizontal, ArrowUpDown, Edit, Trash2, Tag,
    Copy, ExternalLink, Image as ImageIcon
} from "lucide-react";


import type { ExtendedProduct } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductTableProps {
    products: ExtendedProduct[];
}

export function ProductTable({ products }: ProductTableProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggleSelectAll = () => {
        if (selectedIds.size === products.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(products.map(p => p.id)));
        }
    };

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const getStatusBadge = (status: ExtendedProduct['status']) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-brand-jade/10 text-brand-jade hover:bg-brand-jade/20 border-transparent">Active</Badge>;
            case 'draft':
                return <Badge className="bg-bg-subtle text-text-muted hover:bg-border/40 border-transparent">Draft</Badge>;
            case 'out_of_stock':
                return <Badge className="bg-semantic-error/10 text-semantic-error hover:bg-semantic-error/20 border-transparent">Out of Stock</Badge>;
            case 'archived':
                return <Badge variant="outline" className="text-text-muted">Archived</Badge>;
            default:
                return null;
        }
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'amazon':
                return <span className="w-6 h-6 rounded bg-brand-saffron/10 flex items-center justify-center text-xs font-bold text-brand-saffron" title="Amazon">A</span>;
            case 'flipkart':
                return <span className="w-6 h-6 rounded bg-[#2874F0]/10 flex items-center justify-center text-xs font-bold text-[#2874F0]" title="Flipkart">F</span>;
            case 'shopify':
                return <span className="w-6 h-6 rounded bg-[#95BF47]/10 flex items-center justify-center text-xs font-bold text-[#95BF47]" title="Shopify">S</span>;
            case 'ondc':
                return <span className="w-6 h-6 rounded bg-brand-cedar/10 flex items-center justify-center text-xs font-bold text-brand-cedar" title="ONDC">O</span>;
            default:
                return null;
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                    <tr className="border-b border-border/60 bg-bg-subtle/50 text-xs font-bold text-text-muted uppercase tracking-wider">
                        <th className="py-4 pl-4 pr-2 w-12">
                            <Checkbox
                                checked={selectedIds.size === products.length && products.length > 0}
                                onCheckedChange={toggleSelectAll}
                                className="rounded border-border"
                            />
                        </th>
                        <th className="py-4 px-4 w-[350px]">Product / Detail</th>
                        <th className="py-4 px-4 w-32 cursor-pointer group hover:text-brand-dark transition-colors">
                            <div className="flex items-center gap-1">
                                Status <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </th>
                        <th className="py-4 px-4 w-32 cursor-pointer group hover:text-brand-dark transition-colors">
                            <div className="flex items-center gap-1">
                                Inventory <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </th>
                        <th className="py-4 px-4 w-[180px]">Sales Channels</th>
                        <th className="py-4 px-4">Performance</th>
                        <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-bg-subtle/30 transition-colors group">
                            <td className="py-4 pl-4 pr-2">
                                <Checkbox
                                    checked={selectedIds.has(product.id)}
                                    onCheckedChange={() => toggleSelect(product.id)}
                                    className="rounded border-border transition-all opacity-0 group-hover:opacity-100 data-[state=checked]:opacity-100"
                                />
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-bg-subtle border border-border/40 overflow-hidden shrink-0 flex items-center justify-center text-text-muted">
                                        {product.image ? (
                                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 opacity-50" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <Link to={`/dashboard/products/${product.id}`} className="text-sm font-bold text-brand-dark truncate block hover:text-brand-lake transition-colors">
                                            {product.title}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                                            <span className="font-mono bg-bg-subtle px-1.5 py-0.5 rounded">{product.sku}</span>
                                            {product.variants && (
                                                <span className="flex items-center gap-1">
                                                    <Tag className="w-3 h-3" /> {product.variants} variants
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                {getStatusBadge(product.status)}
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex flex-col gap-0.5">
                                    <span className={`text-sm font-semibold ${product.stock < 10 && product.stock > 0 ? 'text-brand-saffron' : product.stock === 0 ? 'text-semantic-error' : 'text-brand-dark'}`}>
                                        {product.stock} in stock
                                    </span>
                                    <span className="text-xs text-text-muted">Across {product.platforms.length || 1} platforms</span>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex gap-1.5 flex-wrap">
                                    {product.platforms.length > 0 ? (
                                        product.platforms.map(p => (
                                            <div key={p}>{getPlatformIcon(p)}</div>
                                        ))
                                    ) : (
                                        <span className="text-xs text-text-muted italic">Unpublished</span>
                                    )}
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 relative w-16 bg-bg-subtle rounded-full overflow-hidden">
                                        <div
                                            className={`absolute top-0 left-0 h-full rounded-full ${product.aiScore > 80 ? 'bg-brand-jade' :
                                                product.aiScore > 50 ? 'bg-brand-saffron' : 'bg-semantic-error'
                                                }`}
                                            style={{ width: `${product.aiScore}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-brand-dark">{product.aiScore}/100</span>
                                </div>
                                <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-semibold">Listing Score</div>
                            </td>
                            <td className="py-4 px-4 text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-brand-dark rounded-lg">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/60 shadow-lg shadow-brand-dark/5">
                                        <DropdownMenuLabel className="font-semibold text-xs text-text-muted uppercase tracking-wider">Actions</DropdownMenuLabel>
                                        <DropdownMenuItem className="focus:bg-bg-subtle rounded-lg cursor-pointer">
                                            <Edit className="mr-2 h-4 w-4" /> Edit details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-bg-subtle rounded-lg cursor-pointer">
                                            <ExternalLink className="mr-2 h-4 w-4" /> View active listings
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-bg-subtle rounded-lg cursor-pointer">
                                            <Copy className="mr-2 h-4 w-4" /> Duplicate product
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-border/60" />
                                        <DropdownMenuItem className="text-semantic-error focus:bg-semantic-error/10 focus:text-semantic-error rounded-lg cursor-pointer">
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete product
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
