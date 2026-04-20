import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function EmailVerification() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const { login } = useAuth(); // We'll log them in now
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError(false);

        // Auto focus next
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }

        // Auto submit if last
        if (index === 5 && value && newOtp.every(v => v !== "")) {
            handleSubmit(newOtp.join(""));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").slice(0, 6).split("");
        if (pastedData.some(char => !/^[0-9]$/.test(char))) return;

        const newOtp = [...otp];
        pastedData.forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        if (pastedData.length === 6) {
            inputsRef.current[5]?.focus();
            handleSubmit(newOtp.join(""));
        } else {
            inputsRef.current[pastedData.length]?.focus();
        }
    };

    const handleSubmit = (code: string) => {
        if (code !== "123456" && code.length === 6) { // mock valid code
            setError(true);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            navigate("/onboarding/welcome");
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-brand-lake/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-brand-lake animate-pulse" />
            </div>

            <h1 className="text-display-sm mb-2 text-brand-dark">Verify your email</h1>
            <p className="text-body-md text-text-muted mb-8">
                We've sent a 6-digit code to <span className="font-semibold text-brand-dark">rohan@example.com</span>. Check your inbox.
            </p>

            <div className="flex justify-center gap-2 sm:gap-4 mb-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputsRef.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-display font-medium rounded-xl border-2 transition-all 
                            ${error ? 'border-semantic-error bg-semantic-error/5 animate-shake' :
                                digit ? 'border-brand-jade focus:border-brand-jade bg-brand-jade/5' :
                                    'border-input focus:border-brand-lake'
                            } focus:outline-none`}
                        disabled={isLoading}
                    />
                ))}
            </div>

            {error && (
                <p className="text-semantic-error text-sm font-medium mt-3 animate-fade-in">
                    Invalid code. Try again. (Hint: Use 123456)
                </p>
            )}

            <Button
                className="w-full mt-8 h-12 text-base"
                onClick={() => handleSubmit(otp.join(""))}
                disabled={isLoading || otp.some(v => v === "")}
            >
                {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="mt-8 flex flex-col items-center gap-4 text-sm font-medium">
                <button
                    disabled={timeLeft > 0}
                    className={`transition-colors ${timeLeft > 0 ? 'text-text-muted cursor-not-allowed' : 'text-brand-lake hover:text-brand-deep'}`}
                >
                    {timeLeft > 0 ? `Resend code in 0:${timeLeft.toString().padStart(2, '0')}` : "Resend Code"}
                </button>

                <Link to="/signup" className="text-text-muted hover:text-brand-dark transition-colors">
                    Change email address
                </Link>
            </div>
        </div>
    );
}
