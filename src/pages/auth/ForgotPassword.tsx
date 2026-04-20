import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, MailCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await apiClient.post('/auth/forgot-password', { email });
            setIsSent(true);
        } catch (error: any) {
            console.error("Failed to send reset link:", error);
            // Optional: show error message
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="w-full max-w-sm mx-auto text-center">
                <div className="w-16 h-16 bg-semantic-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MailCheck className="w-8 h-8 text-semantic-success" />
                </div>

                <h1 className="text-display-sm mb-2 text-brand-dark">Check your inbox</h1>
                <p className="text-body-md text-text-muted mb-8">
                    Reset link sent to <span className="font-semibold text-brand-dark">{email}</span>. Valid for 15 minutes.
                </p>

                <Button className="w-full h-11 mb-6 bg-[#EA4335] hover:bg-[#D93025] text-white">
                    Open Gmail
                </Button>

                <Link to="/login" className="text-body-sm font-medium text-brand-lake hover:text-brand-deep transition-colors inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-dark transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back
            </Link>

            <div className="w-16 h-16 bg-brand-cake/10 rounded-2xl flex items-center justify-center mb-6">
                <KeyRound className="w-8 h-8 text-brand-cake" />
            </div>

            <div className="mb-8">
                <h1 className="text-display-sm mb-2 text-brand-dark">Forgot your password?</h1>
                <p className="text-body-md text-text-muted">
                    Enter your email and we'll send reset instructions.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@business.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" className="w-full h-11" disabled={isLoading || !email}>
                    {isLoading ? "Sending Link..." : "Send Reset Link"}
                </Button>
            </form>
        </div>
    );
}
