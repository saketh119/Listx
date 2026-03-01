import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { returnReasons, analyticsKPIs } from "@/data/mockAnalytics";

export default function ReturnsReport() {
    const totalReturns = returnReasons.reduce((s, r) => s + r.count, 0);
    const maxCount = Math.max(...returnReasons.map(r => r.count));

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <Button variant="ghost" asChild className="mb-4 -ml-4 text-text-muted hover:text-brand-dark">
                <Link to="/dashboard/analytics"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Analytics</Link>
            </Button>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-display-sm font-bold text-brand-dark flex items-center gap-3"><RotateCcw className="w-7 h-7 text-semantic-error" /> Returns Report</h1>
                    <p className="text-body-sm text-text-muted mt-1">Return rates, reasons, and cost impact analysis</p>
                </div>
                <Button variant="outline" className="rounded-xl border-border/60 text-sm font-medium"><Download className="w-4 h-4 mr-2" /> Export</Button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-white rounded-2xl border border-semantic-error/30 shadow-sm p-4">
                    <p className="text-2xl font-bold text-semantic-error">{analyticsKPIs.returnRate}%</p>
                    <p className="text-[10px] text-text-muted">Return Rate</p>
                </div>
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-dark">{totalReturns}</p>
                    <p className="text-[10px] text-text-muted">Total Returns (30d)</p>
                </div>
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-dark">₹42K</p>
                    <p className="text-[10px] text-text-muted">Return Cost Impact</p>
                </div>
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-4">
                    <p className="text-2xl font-bold text-brand-jade">72%</p>
                    <p className="text-[10px] text-text-muted">Refund Processed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Reasons Chart */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-5">Return Reasons</h3>
                    <div className="space-y-3">
                        {returnReasons.map(r => (
                            <div key={r.reason}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-brand-dark font-medium">{r.reason}</span>
                                    <span className="font-bold text-brand-dark">{r.count} ({r.percentage}%)</span>
                                </div>
                                <div className="w-full h-3 bg-bg-subtle rounded-full overflow-hidden">
                                    <div className="h-full rounded-full bg-gradient-to-r from-semantic-error/40 to-semantic-error/70" style={{ width: `${(r.count / maxCount) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insights */}
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
                    <h3 className="text-sm font-bold text-brand-dark mb-5">AI Insights</h3>
                    <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-semantic-error/5 border border-semantic-error/20">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-semantic-error shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-semantic-error">High Transit Damage</p>
                                    <p className="text-[11px] text-text-muted mt-0.5">37.6% of returns are due to transit damage. Consider upgrading packaging for fragile items or switching couriers for high-damage routes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-brand-saffron/5 border border-brand-saffron/20">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-brand-saffron shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-brand-saffron">Wrong Items</p>
                                    <p className="text-[11px] text-text-muted mt-0.5">21.2% from wrong items. Review warehouse picking process — barcode verification could reduce this.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-brand-jade/5 border border-brand-jade/20">
                            <div className="flex items-start gap-2">
                                <RotateCcw className="w-4 h-4 text-brand-jade shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-brand-jade">Positive Trend</p>
                                    <p className="text-[11px] text-text-muted mt-0.5">Return rate decreased 0.8% from last month. Quality improvements in Saree packaging are showing results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
