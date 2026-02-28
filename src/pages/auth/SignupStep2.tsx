import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PLATFORMS = ["Amazon", "Flipkart", "Shopify", "ONDC", "Meesho", "Own Website", "Other"];

export default function SignupStep2() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const navigate = useNavigate();

    const togglePlatform = (platform: string) => {
        if (selectedPlatforms.includes(platform)) {
            setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
        } else {
            setSelectedPlatforms([...selectedPlatforms, platform]);
        }
    };

    const handleComplete = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/verify-email");
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-label-sm text-text-muted mb-4 font-medium uppercase tracking-wider">
                    <span>Step 2 of 2</span>
                </div>
                <h1 className="text-display-sm mb-2 text-brand-dark">Tell us about your business</h1>
                <p className="text-body-md text-text-muted">
                    This helps us set up Listx perfectly for you.
                </p>
                <div className="mt-4 flex gap-1">
                    <div className="h-1 flex-1 bg-brand-jade rounded-full" />
                    <div className="h-1 flex-1 bg-brand-jade rounded-full" />
                    <div className="h-1 flex-1 bg-border rounded-full" />
                </div>
            </div>

            <form onSubmit={handleComplete} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" placeholder="e.g. Krishna Enterprises" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <select id="businessType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                        <option value="" disabled selected>Select business type</option>
                        <option value="individual">Individual Seller</option>
                        <option value="small_business">Small Business</option>
                        <option value="brand">Brand / Company</option>
                        <option value="agency">Agency / Consultant</option>
                    </select>
                </div>

                <div className="space-y-3">
                    <Label>Primary Selling Platforms</Label>
                    <div className="flex flex-wrap gap-2">
                        {PLATFORMS.map(platform => (
                            <button
                                key={platform}
                                type="button"
                                onClick={() => togglePlatform(platform)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${selectedPlatforms.includes(platform)
                                        ? 'bg-brand-jade/10 border-brand-jade text-brand-jade'
                                        : 'bg-background border-border text-text-muted hover:border-text-muted'
                                    }`}
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="volume">Monthly Order Volume</Label>
                    <select id="volume" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                        <option value="" disabled selected>Select order volume</option>
                        <option value="0-50">Just starting (0–50)</option>
                        <option value="51-500">51–500 orders</option>
                        <option value="501-2000">501–2000 orders</option>
                        <option value="2000+">2000+ orders</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Primary Phone Number</Label>
                    <div className="flex gap-2">
                        <select className="flex h-10 w-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option>+91</option>
                            <option>+1</option>
                            <option>+44</option>
                        </select>
                        <Input id="phone" type="tel" placeholder="98765 43210" className="flex-1" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gst" className="flex items-center gap-2">
                        GST Number <Badge variant="neutral" className="font-normal text-[10px] py-0">Optional</Badge>
                    </Label>
                    <Input id="gst" placeholder="22AAAAA0000A1Z5" />
                </div>

                <Button type="submit" className="w-full h-11" disabled={isLoading || selectedPlatforms.length === 0}>
                    {isLoading ? "Saving..." : "Complete Setup →"}
                </Button>
                {selectedPlatforms.length === 0 && (
                    <p className="text-center text-xs text-semantic-error mt-2">Please select at least one platform.</p>
                )}
            </form>
        </div>
    );
}
