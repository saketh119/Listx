import { Link } from "react-router-dom";
import { MoreHorizontal, Edit, ExternalLink, Copy, Trash2, ImageIcon } from "lucide-react";

import type { ExtendedProduct } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductGridProps {
    products: ExtendedProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const getStatusBadge = (status: ExtendedProduct['status']) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-brand-jade/10 text-brand-jade hover:bg-brand-jade/20 border-transparent rounded-lg backdrop-blur-sm">Active</Badge>;
            case 'draft':
                return <Badge className="bg-text-muted/10 text-brand-dark hover:bg-text-muted/20 border-transparent rounded-lg backdrop-blur-sm">Draft</Badge>;
            case 'out_of_stock':
                return <Badge className="bg-semantic-error/10 text-semantic-error hover:bg-semantic-error/20 border-transparent rounded-lg backdrop-blur-sm">Out of Stock</Badge>;
            case 'archived':
                return <Badge variant="outline" className="text-text-muted bg-white/50 backdrop-blur-sm rounded-lg">Archived</Badge>;
            default:
                return null;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product.id} className="bg-white rounded-[1.5rem] border border-border/60 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="relative aspect-square bg-bg-subtle overflow-hidden">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted/50">
                                <ImageIcon className="w-12 h-12" />
                            </div>
                        )}

                        <div className="absolute top-3 left-3">
                            {getStatusBadge(product.status)}
                        </div>

                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white text-brand-dark shadow-sm">
                                        <span className="sr-only">Open menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/60 shadow-lg shadow-brand-dark/5">
                                    <DropdownMenuItem className="focus:bg-bg-subtle rounded-lg cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" /> Edit details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-bg-subtle rounded-lg cursor-pointer">
                                        <ExternalLink className="mr-2 h-4 w-4" /> View active listings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="focus:bg-bg-subtle rounded-lg cursor-pointer">
                                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-border/60" />
                                    <DropdownMenuItem className="text-semantic-error focus:bg-semantic-error/10 focus:text-semantic-error rounded-lg cursor-pointer">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <Link to={`/dashboard/products/${product.id}`} className="text-base font-bold text-brand-dark line-clamp-2 hover:text-brand-lake transition-colors tracking-tight leading-tight">
                                {product.title}
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-text-muted">
                            <span className="bg-bg-subtle px-2 py-1 rounded-md font-mono">{product.sku}</span>
                            {product.variants && (
                                <span className="flex items-center gap-1">
                                    • {product.variants} styles
                                </span>
                            )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/40 flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-text-muted/60 uppercase tracking-wider mb-1">Price</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-bold text-brand-dark">{formatCurrency(product.price)}</span>
                                    {product.compareAtPrice && (
                                        <span className="text-sm font-medium text-text-muted line-through">{formatCurrency(product.compareAtPrice)}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-text-muted/60 uppercase tracking-wider mb-1">Stock</span>
                                <span className={`text-base font-bold ${product.stock === 0 ? 'text-semantic-error' :
                                    (product.stock < 10 ? 'text-brand-saffron' : 'text-brand-jade')
                                    }`}>
                                    {product.stock}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
