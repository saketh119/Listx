import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const getPasswordStrength = () => {
        if (!password) return { label: "", width: "0%", color: "bg-border" };
        if (password.length < 6) return { label: "Too weak", width: "25%", color: "bg-semantic-error" };
        if (password.length < 9) return { label: "Fair", width: "50%", color: "bg-semantic-warning" };
        if (password.length < 12) return { label: "Good", width: "75%", color: "bg-brand-lake" };
        return { label: "Strong", width: "100%", color: "bg-semantic-success" };
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) return;

        setIsLoading(true);
        try {
            await apiClient.post('/auth/reset-password', { password });
            alert("Password updated successfully. Please log in.");
            navigate("/login");
        } catch (error: any) {
            console.error("Failed to reset password:", error);
            alert(error.response?.data?.error || "Reset failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const strength = getPasswordStrength();
    const isMatch = password === confirm && confirm.length > 0;

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="mb-8">
                <h1 className="text-display-sm mb-2 text-brand-dark">Create new password</h1>
                <p className="text-body-md text-text-muted">
                    Must be different from your previous password.
                </p>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
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

                <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm New Password</Label>
                    <Input
                        id="confirm"
                        type="password"
                        placeholder="Re-enter password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        className={confirm && !isMatch ? 'border-semantic-error focus-visible:ring-semantic-error' : ''}
                    />
                    {confirm && (
                        <p className={`text-label-sm font-medium mt-2 ${isMatch ? 'text-semantic-success' : 'text-semantic-error'}`}>
                            {isMatch ? '✓ Passwords match' : 'Passwords do not match'}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full h-11" disabled={isLoading || !password || !isMatch}>
                    {isLoading ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </div>
    );
}
