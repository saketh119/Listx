import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/api-client";

export default function ConnectPlatforms() {
    const [platforms, setPlatforms] = useState([
        { id: "amazon", name: "Amazon", domain: "amazon.in", status: "disconnected" },
        { id: "flipkart", name: "Flipkart", domain: "flipkart.com", status: "disconnected" },
        { id: "shopify", name: "Shopify", domain: "shopify.com", status: "disconnected" },
        { id: "ondc", name: "ONDC", domain: "ondc.org", status: "disconnected" },
        { id: "meesho", name: "Meesho", domain: "meesho.com", status: "disconnected" },
        { id: "woo", name: "WooCommerce", domain: "woocommerce.com", status: "disconnected" },
    ]);

    const navigate = useNavigate();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [credentials, setCredentials] = useState({ sellerId: "", authToken: "" });
    const [isSaving, setIsSaving] = useState(false);

    const handleConnect = async (id: string, e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await apiClient.post('/integrations/connect', {
                platformId: id,
                apiKey: credentials.authToken
            });
            setPlatforms(current => current.map(p =>
                p.id === id ? { ...p, status: "connected" } : p
            ));
            setActiveModal(null);
            setCredentials({ sellerId: "", authToken: "" });
        } catch (error) {
            console.error("Connection failed:", error);
            alert("Failed to connect platform. Please check your credentials.");
        } finally {
            setIsSaving(false);
        }
    };

    const hasConnected = platforms.some(p => p.status === "connected");

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <div className="mb-10">
                <div className="flex items-center gap-2 text-label-sm text-text-muted mb-4 font-medium uppercase tracking-wider">
                    <span>Step 1 of 2</span>
                </div>
                <h1 className="text-display-md mb-2 text-brand-dark">Connect your selling platforms</h1>
                <p className="text-body-md text-text-muted">
                    Select the platforms you sell on to get started. Don't worry — you can connect more later in Settings.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {platforms.map((platform) => (
                    <div
                        key={platform.id}
                        className={`bg-background border rounded-2xl p-6 transition-all duration-300 ${platform.status === 'connected' ? 'border-brand-jade shadow-sm ring-1 ring-brand-jade/20' : 'hover:border-text-muted/40 hover:shadow-sm'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white border border-border/50 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                                <img
                                    src={`https://logo.clearbit.com/${platform.domain}`}
                                    alt={platform.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        (e.currentTarget.parentElement as HTMLElement).innerHTML = `<span class="font-display font-medium text-lg uppercase">${platform.name.substring(0, 1)}</span>`;
                                    }}
                                />
                            </div>
                            {platform.status === "connected" && (
                                <span className="flex items-center text-xs font-medium text-brand-jade bg-brand-jade/10 px-2 py-1 rounded-md">
                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                                </span>
                            )}
                            {platform.status === "connecting" && (
                                <span className="flex items-center text-xs font-medium text-semantic-warning bg-semantic-warning/10 px-2 py-1 rounded-md">
                                    <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Connecting...
                                </span>
                            )}
                            {platform.status === "disconnected" && (
                                <span className="text-xs font-medium text-text-muted bg-bg-subtle px-2 py-1 rounded-md">
                                    Not Connected
                                </span>
                            )}
                        </div>

                        <h3 className="font-display font-semibold text-brand-dark mb-4">{platform.name}</h3>

                        {platform.status === "disconnected" ? (
                            <Button
                                variant="outline"
                                className="w-full h-10 border-border hover:bg-bg-subtle"
                                onClick={() => setActiveModal(platform.id)}
                            >
                                Connect Credentials
                            </Button>
                        ) : platform.status === "connecting" ? (
                            <Button variant="outline" className="w-full h-10" disabled>
                                Connecting...
                            </Button>
                        ) : (
                            <Button variant="outline" className="w-full h-10 text-semantic-error border-transparent hover:bg-semantic-error/5 hover:border-semantic-error/20"
                                onClick={() => setPlatforms(platforms.map(p => p.id === platform.id ? { ...p, status: 'disconnected' } : p))}
                            >
                                Disconnect
                            </Button>
                        )}

                        {/* Connection Modal */}
                        {activeModal === platform.id && (
                            <div className="absolute inset-0 z-50 rounded-2xl flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.1)]">
                                <div className="bg-card w-full max-w-sm rounded-2xl border shadow-xl p-6 relative text-left">
                                    <h3 className="text-h3 mb-2 flex items-center gap-2">
                                        <img src={`https://logo.clearbit.com/${platform.domain}`} className="w-5 h-5 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                        Connect {platform.name}
                                    </h3>
                                    <p className="text-body-sm text-text-muted mb-6">Enter your API credentials to authorize Listx.</p>
                                    <form onSubmit={(e) => handleConnect(platform.id, e)} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="sellerId">Seller ID / Username</Label>
                                            <Input
                                                id="sellerId"
                                                placeholder="e.g. A1B2C3D4E5"
                                                value={credentials.sellerId}
                                                onChange={(e) => setCredentials({ ...credentials, sellerId: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="authToken">Auth Token / API Key</Label>
                                            <Input
                                                id="authToken"
                                                type="password"
                                                placeholder="*************"
                                                value={credentials.authToken}
                                                onChange={(e) => setCredentials({ ...credentials, authToken: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end gap-3 mt-8">
                                            <Button variant="outline" onClick={() => setActiveModal(null)} type="button">Cancel</Button>
                                            <Button type="submit" disabled={isSaving || !credentials.sellerId || !credentials.authToken}>
                                                {isSaving ? (
                                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting</>
                                                ) : "Authorize"}
                                            </Button>
                                        </div>
                                    </form>
                                    <div className="mt-4 pt-4 border-t text-center">
                                        <a href="#" className="text-xs text-brand-lake hover:underline">How to find these keys?</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-end border-t pt-8">
                <Button
                    size="lg"
                    disabled={!hasConnected}
                    className="h-12 px-8"
                    onClick={() => navigate("/onboarding/logistics")}
                >
                    Continue →
                </Button>
            </div>
        </div>
    );
}
