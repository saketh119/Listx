import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ConnectLogistics() {
    const [partners, setPartners] = useState([
        { id: "delhivery", name: "Delhivery", desc: "Best for pan-India delivery", domain: "delhivery.com", status: "disconnected" },
        { id: "shiprocket", name: "Shiprocket", desc: "Aggregator for 10+ partners", domain: "shiprocket.in", status: "disconnected" },
        { id: "bluedart", name: "Blue Dart", desc: "Fastest air shipments", domain: "bluedart.com", status: "disconnected" },
        { id: "ecom", name: "Ecom Express", desc: "Great for tier 2/3 cities", domain: "ecomexpress.in", status: "disconnected" },
        { id: "xpressbees", name: "XpressBees", desc: "Reliable B2C shipping", domain: "xpressbees.com", status: "disconnected" },
        { id: "shadowfax", name: "Shadowfax", desc: "Hyperlocal & same-day", domain: "shadowfax.in", status: "disconnected" },
    ]);

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Building your workspace...");
    const navigate = useNavigate();

    const handleConnect = (id: string, e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setPartners(partners.map(p =>
                p.id === id ? { ...p, status: "connected" } : p
            ));
            setActiveModal(null);
            setApiKey("");
        }, 1500);
    };

    const handleFinishSetup = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsFinishing(true);

        setTimeout(() => setLoadingMessage("Syncing platform data..."), 1500);
        setTimeout(() => setLoadingMessage("Configuring intelligent routing..."), 3000);
        setTimeout(() => setLoadingMessage("Finalizing dashboard view..."), 4000);

        setTimeout(() => {
            navigate("/dashboard");
        }, 5000);
    };

    if (isFinishing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-bg-subtle fixed inset-0 z-50 overflow-hidden p-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-jade/5 blur-[100px] rounded-full mix-blend-multiply pointer-events-none animate-pulse-slow" />

                <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full bg-white p-12 rounded-3xl shadow-xl border border-border/60 slide-up-fade">
                    <div className="w-24 h-24 mb-8 relative flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-brand-jade/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-brand-jade rounded-full border-t-transparent animate-spin duration-1000"></div>
                        <span className="text-4xl animate-pulse">🚀</span>
                    </div>

                    <h2 className="text-display-sm text-brand-dark mb-3">Almost there</h2>
                    <div className="h-6 overflow-hidden relative w-[250px] flex justify-center">
                        <p className="text-body-md text-text-muted font-medium transition-opacity duration-300 absolute w-full text-center -translate-x-1/2 left-1/2" key={loadingMessage}>
                            {loadingMessage}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <div className="mb-10">
                <div className="flex items-center gap-2 text-label-sm text-text-muted mb-4 font-medium uppercase tracking-wider">
                    <span>Step 2 of 2</span>
                </div>
                <h1 className="text-display-md mb-2 text-brand-dark">Connect logistics partners</h1>
                <p className="text-body-md text-text-muted">
                    Listx will auto-assign the best courier for every order using smart routing.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {partners.map((partner) => (
                    <div
                        key={partner.id}
                        className={`bg-background border rounded-2xl p-6 transition-all duration-300 ${partner.status === 'connected' ? 'border-brand-jade shadow-sm ring-1 ring-brand-jade/20' : 'hover:border-text-muted/40 hover:shadow-sm'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-border/50 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                                <img
                                    src={`https://logo.clearbit.com/${partner.domain}`}
                                    alt={partner.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        (e.currentTarget.parentElement as HTMLElement).innerHTML = `<span class="font-display font-medium text-lg uppercase">${partner.name.substring(0, 1)}</span>`;
                                    }}
                                />
                            </div>
                            {partner.status === "connected" && (
                                <span className="flex items-center text-xs font-medium text-brand-jade bg-brand-jade/10 px-2 py-1 rounded-md">
                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                                </span>
                            )}
                        </div>

                        <h3 className="font-display font-semibold text-brand-dark">{partner.name}</h3>
                        <p className="text-xs text-text-muted mt-1 mb-6">{partner.desc}</p>

                        {partner.status === "disconnected" ? (
                            <Button
                                variant="outline"
                                className="w-full h-10 border-border hover:bg-bg-subtle"
                                onClick={() => setActiveModal(partner.id)}
                            >
                                Connect Settings
                            </Button>
                        ) : (
                            <Button variant="outline" className="w-full h-10 text-semantic-error border-transparent hover:bg-semantic-error/5 hover:border-semantic-error/20"
                                onClick={() => setPartners(partners.map(p => p.id === partner.id ? { ...p, status: 'disconnected' } : p))}
                            >
                                Disconnect
                            </Button>
                        )}

                        {/* Inline Mock Modal for API Key Input */}
                        {activeModal === partner.id && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                                <div className="bg-card w-full max-w-sm rounded-2xl border shadow-xl p-6">
                                    <h3 className="text-h3 mb-2 flex items-center gap-2">
                                        <img src={`https://logo.clearbit.com/${partner.domain}`} className="w-5 h-5 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                        Connect {partner.name}
                                    </h3>
                                    <p className="text-body-sm text-text-muted mb-6">Enter your API credentials to sync shipments.</p>
                                    <form onSubmit={(e) => handleConnect(partner.id, e)} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="apiKey">API Key / Token</Label>
                                            <Input
                                                id="apiKey"
                                                placeholder="sk_live_..."
                                                value={apiKey}
                                                onChange={(e) => setApiKey(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end gap-3 mt-8">
                                            <Button variant="outline" onClick={() => setActiveModal(null)} type="button">Cancel</Button>
                                            <Button type="submit" disabled={isSaving || !apiKey}>
                                                {isSaving ? "Connecting..." : "Save & Connect"}
                                            </Button>
                                        </div>
                                    </form>
                                    <div className="mt-4 pt-4 border-t text-center">
                                        <a href="#" className="text-xs text-brand-lake hover:underline">How to find my API key?</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-between border-t pt-8 gap-4">
                <button
                    onClick={handleFinishSetup}
                    className="text-body-sm font-medium text-text-muted hover:text-brand-dark transition-colors bg-transparent border-none cursor-pointer"
                >
                    Skip — I'll connect later
                </button>
                <Button
                    size="lg"
                    className="h-12 px-8 w-full sm:w-auto shadow-sm"
                    onClick={handleFinishSetup}
                >
                    Complete Setup →
                </Button>
            </div>
        </div>
    );
}
