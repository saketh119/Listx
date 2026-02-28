import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { ListxLogo } from "@/components/ListxLogo";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request for prototype
        setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard"); // We will build dashboard next
        }, 1500);
    };

    return (
        <div className="w-full flex flex-col pt-8">
            <div className="mb-8 hidden lg:block">
                <ListxLogo className="h-8" />
            </div>
            <div className="mb-8">
                <h2 className="text-display-md mb-2">Welcome back</h2>
                <p className="text-body-md text-text-muted">Enter your details to access your workspace.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            disabled={isLoading}
                            className="font-mono text-[14px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link to="/forgot-password" className="text-label-sm text-brand-jade hover:text-brand-cedar">
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            className="font-mono text-[20px] tracking-widest pt-3 pb-1"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2 border border-border p-4 rounded-xl bg-bg-subtle">
                    <Checkbox id="remember" disabled={isLoading} className="data-[state=checked]:bg-brand-jade data-[state=checked]:text-brand-dark" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="remember"
                            className="text-body-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember this device
                        </label>
                        <p className="text-body-xs text-text-muted">
                            Keep me logged in for 30 days.
                        </p>
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Spinner size="sm" className="mr-2 text-brand-dark" />
                            Signing in...
                        </>
                    ) : (
                        "Log in to Listx"
                    )}
                </Button>

                <div className="text-center text-body-sm mt-8">
                    <span className="text-text-muted">Don't have an account? </span>
                    <Link to="/signup" className="text-brand-dark font-semibold hover:underline decoration-brand-jade underline-offset-4">
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
}
