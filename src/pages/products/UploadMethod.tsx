import { Link } from "react-router-dom";
import { ArrowLeft, FileSpreadsheet, Keyboard, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UploadMethod() {
    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                    <Link to="/dashboard/products">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </Link>
                </Button>
                <h1 className="text-display-sm font-bold text-brand-dark">Add New Products</h1>
                <p className="text-body-sm text-text-muted mt-2">
                    Choose how you would like to add products to your catalog.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Method 1: CSV/Excel Upload */}
                <div className="group bg-white rounded-3xl border border-border/60 p-8 shadow-sm hover:shadow-xl hover:border-brand-lake/40 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-2xl bg-brand-jade/10 flex items-center justify-center text-brand-jade mb-6 group-hover:scale-110 transition-transform duration-300">
                        <FileSpreadsheet className="w-10 h-10" />
                    </div>
                    <h3 className="text-body-lg font-bold text-brand-dark mb-3">Bulk Upload</h3>
                    <p className="text-body-sm text-text-muted mb-8 leading-relaxed">
                        Upload a CSV or Excel spreadsheet to import multiple products at once. Best for existing catalogs.
                    </p>
                    <div className="mt-auto w-full">
                        <Button asChild className="w-full rounded-xl bg-brand-jade hover:bg-brand-jade/90 shadow-brand-jade/20 font-medium h-12">
                            <Link to="/dashboard/products/upload/csv">
                                Continue with Bulk Upload
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Method 2: Manual Entry */}
                <div className="group bg-white rounded-3xl border border-border/60 p-8 shadow-sm hover:shadow-xl hover:border-brand-lake/40 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lake/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                    <div className="w-20 h-20 rounded-2xl bg-bg-subtle flex items-center justify-center text-brand-dark border border-border/40 mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <Keyboard className="w-10 h-10" />
                    </div>
                    <h3 className="text-body-lg font-bold text-brand-dark mb-3">Manual Entry</h3>
                    <p className="text-body-sm text-text-muted mb-8 leading-relaxed">
                        Create a single product from scratch using our step-by-step form builder.
                    </p>
                    <div className="mt-auto w-full">
                        <Button asChild variant="outline" className="w-full rounded-xl border-border/60 hover:bg-bg-subtle font-medium h-12">
                            <Link to="/dashboard/products/upload/manual">
                                Create Manually
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Method 3: AI Generation */}
                <div className="group bg-white rounded-3xl border border-brand-saffron/30 p-8 shadow-sm hover:shadow-xl hover:border-brand-saffron/60 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center">
                    {/* Magical background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-saffron/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-saffron/20 to-brand-saffron/5 border border-brand-saffron/20 flex items-center justify-center text-brand-saffron mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <Sparkles className="w-10 h-10" />
                    </div>
                    <h3 className="flex items-center gap-2 text-body-lg font-bold text-brand-dark mb-3 relative z-10">
                        AI Generation
                        <span className="bg-brand-saffron text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                            New
                        </span>
                    </h3>
                    <p className="text-body-sm text-text-muted mb-8 leading-relaxed relative z-10">
                        Upload a raw image or a basic description and let our AI instantly generate SEO-optimized titles, descriptions, and keywords.
                    </p>
                    <div className="mt-auto w-full relative z-10">
                        <Button asChild className="w-full rounded-xl bg-brand-dark text-brand-tea hover:bg-brand-dark/90 hover:text-white shadow-brand-dark/20 font-medium h-12 group-hover:shadow-lg transition-all">
                            <Link to="/dashboard/products/upload/ai">
                                Generate with AI
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Help tip */}
            <div className="mt-12 text-center">
                <p className="text-xs text-text-muted">
                    Need help deciding? <a href="#" className="text-brand-lake hover:underline font-medium">Read our guide on product uploading best practices.</a>
                </p>
            </div>
        </div>
    );
}
