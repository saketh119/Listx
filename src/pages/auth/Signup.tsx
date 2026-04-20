import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { signup, loginWithGoogle, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const getPasswordStrength = () => {
        if (!password) return { label: "", width: "0%", color: "bg-border" };
        if (password.length < 6) return { label: "Too weak", width: "25%", color: "bg-semantic-error" };
        if (password.length < 9) return { label: "Fair", width: "50%", color: "bg-semantic-warning" };
        if (password.length < 12) return { label: "Good", width: "75%", color: "bg-brand-lake" };
        return { label: "Strong", width: "100%", color: "bg-semantic-success" };
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const fullName = formData.get('fullName') as string;

        try {
            await signup({ 
                email, 
                password, 
                metadata: { full_name: fullName } 
            });
            navigate("/signup/step-2");
        } catch (err: any) {
            const msg = err.response?.data?.error;
            setError(typeof msg === 'string' ? msg : "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const strength = getPasswordStrength();

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="mb-8">
                <h1 className="text-display-sm mb-2 text-brand-dark">Create your account</h1>
                <p className="text-body-md text-text-muted">
                    Start your 14-day free trial. No credit card required.
                </p>
                <div className="mt-4 flex gap-1">
                    <div className="h-1 flex-1 bg-brand-jade rounded-full" />
                    <div className="h-1 flex-1 bg-border rounded-full" />
                    <div className="h-1 flex-1 bg-border rounded-full" />
                </div>
            </div>

            {error && (
                <div className="p-4 mb-6 text-body-sm text-semantic-error bg-semantic-error/10 border border-semantic-error/20 rounded-xl">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" placeholder="Rohan Sharma" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@yourbusiness.com" required />
                    <p className="text-label-sm text-text-muted">We'll send a verification link here.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand-dark transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {password && (
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${strength.color}`}
                                    style={{ width: strength.width }}
                                />
                            </div>
                            <span className={`text-label-sm font-medium ${strength.color.replace('bg-', 'text-')}`}>
                                {strength.label}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-start space-x-2 pt-2">
                    <Checkbox id="terms" required className="mt-1" />
                    <Label htmlFor="terms" className="text-body-sm font-normal text-text-muted leading-snug">
                        I agree to the{" "}
                        <a href="#" className="text-brand-dark hover:underline font-medium">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-brand-dark hover:underline font-medium">Privacy Policy</a>.
                    </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Continue"}
                </Button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
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
                    className="w-full bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    onClick={() => loginWithGoogle()}
                    disabled={isLoading}
                >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </Button>
            </form>

            <p className="mt-8 text-center text-body-sm text-text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-dark hover:underline font-medium">
                    Log in
                </Link>
            </p>
        </div>
    );
}
