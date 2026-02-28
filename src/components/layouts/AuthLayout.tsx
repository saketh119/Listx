import { Outlet, Link } from "react-router-dom";
import { ListxLogo } from "../ListxLogo";
import { NoiseBackground } from "../ui/noise";

export function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
            {/* Left Side - Dynamic Form Area */}
            <div className="flex flex-col justify-center items-center px-4 sm:px-12 py-12">
                <div className="w-full max-w-[440px]">
                    <div className="mb-10 lg:hidden">
                        <ListxLogo className="h-8" />
                    </div>
                    <Outlet />
                </div>
            </div>

            {/* Right Side - Branding/Marketing (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-col justify-center bg-brand-deep text-white p-12 relative overflow-hidden">

                {/* Decorative Grid/Gradients */}
                <NoiseBackground />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-jade/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-lake/30 blur-[120px] rounded-full"></div>

                <div className="relative z-10 max-w-lg mx-auto">
                    <Link to="/" className="inline-block mb-16">
                        <ListxLogo className="h-10 text-white" />
                    </Link>
                    <h1 className="text-display-lg text-white mb-6">Master your multi-channel sales.</h1>
                    <p className="text-body-lg text-brand-tea mb-12 max-w-md">
                        The platform built for high-volume sellers. Sync inventory, automate logistics, and harness AI across every marketplace.
                    </p>

                    {/* Trust Badge/Stats */}
                    <div className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-lake flex items-center justify-center text-xs overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-body-sm font-semibold text-white">Trusted by 2,000+ brands</p>
                            <p className="text-body-xs text-brand-tea/60">Across India to manage operations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
