import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ListxLogo } from "@/components/ListxLogo";

export default function OnboardingWelcome() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-subtle p-4 font-sans text-brand-dark relative overflow-hidden">
            {/* Extremely subtle background gradient decoration */}
            <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-brand-jade/5 to-transparent pointer-events-none" />

            <div className="w-full max-w-[520px] relative z-10 pt-8 pb-12">
                <div className="flex justify-center mb-12">
                    <ListxLogo className="h-8 text-brand-dark" />
                </div>

                <div className="text-center mb-10 slide-up-fade">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-jade/10 text-brand-jade mb-6">
                        <span className="text-4xl">🎉</span>
                    </div>
                    <h1 className="text-display-md tracking-tight mb-3 text-brand-dark">
                        Welcome aboard, Rohan!
                    </h1>
                    <p className="text-body-md text-text-muted max-w-sm mx-auto">
                        Your account is ready. Let's finish setting up your workspace to get you selling.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] border border-border/60 shadow-sm p-8 sm:p-10 mb-8 slide-up-fade" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-xs font-bold text-text-muted/60 uppercase tracking-widest mb-8">Setup Progress</h3>

                    <div className="relative">
                        {/* Background line */}
                        <div className="absolute left-[15px] top-2 bottom-4 w-[2px] bg-border/50" />

                        {/* Active progress line */}
                        <div className="absolute left-[15px] top-2 h-[50%] w-[2px] bg-brand-jade" />

                        <div className="space-y-8 relative z-10">
                            {/* Step 1 */}
                            <div className="flex gap-5">
                                <div className="w-8 h-8 rounded-full bg-brand-jade text-white flex flex-col items-center justify-center shrink-0 shadow-[0_0_0_8px_white]">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="pt-1 mt-0.5">
                                    <h4 className="text-base font-semibold text-brand-dark leading-tight mb-1">Account Created</h4>
                                    <p className="text-sm text-text-muted">Basic profile and business info saved.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-5">
                                <div className="w-8 h-8 rounded-full bg-white border-2 border-brand-jade text-brand-jade flex flex-col items-center justify-center shrink-0 shadow-[0_0_0_8px_white] font-bold">
                                    2
                                </div>
                                <div className="pt-1 mt-0.5">
                                    <h4 className="text-base font-semibold text-brand-dark leading-tight mb-1">Connect Platforms</h4>
                                    <p className="text-sm text-text-muted">Sync your inventory and orders.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-5">
                                <div className="w-8 h-8 rounded-full bg-transparent border-2 border-border text-text-muted/50 flex flex-col items-center justify-center shrink-0 shadow-[0_0_0_8px_white] font-bold text-sm">
                                    3
                                </div>
                                <div className="pt-1 mt-0.5 opacity-60">
                                    <h4 className="text-base font-semibold text-brand-dark leading-tight mb-1">Connect Logistics</h4>
                                    <p className="text-sm text-text-muted">Setup shipping and delivery partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 slide-up-fade" style={{ animationDelay: '200ms' }}>
                    <Link to="/onboarding/platforms" className="block w-full">
                        <Button size="lg" className="w-full h-14 text-base font-medium rounded-2xl shadow-md hover:shadow-lg transition-all group">
                            Start Setup
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link to="/dashboard" className="text-center text-sm font-medium text-text-muted hover:text-brand-dark transition-colors py-3 inline-block">
                        Skip for now, go to dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
