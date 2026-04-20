import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { ListxLogo } from "@/components/ListxLogo";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated, loginWithGoogle } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (err: any) {
            const msg = err.response?.data?.error;
            setError(typeof msg === 'string' ? msg : "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
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

            {error && (
                <div className="p-4 mb-6 text-body-sm text-semantic-error bg-semantic-error/10 border border-semantic-error/20 rounded-xl">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input
                            id="email"
                            name="email"
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
                            name="password"
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

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/60" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-text-muted font-medium">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 bg-white hover:bg-gray-50 border-border/60 text-brand-dark rounded-xl"
                    onClick={() => loginWithGoogle()}
                    disabled={isLoading}
                >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign in with Google
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
