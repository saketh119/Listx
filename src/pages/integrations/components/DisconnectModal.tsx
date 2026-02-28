import { AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    name: string;
    type: 'platform' | 'logistics';
}

export function DisconnectModal({ open, onOpenChange, name, type }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-semantic-error/10 flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-semantic-error" />
                        </div>
                        <DialogTitle className="text-lg font-bold text-brand-dark">Disconnect {name}?</DialogTitle>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4">
                    <div className="p-3 rounded-xl bg-semantic-error/5 border border-semantic-error/20 mb-4">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-semantic-error shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-semantic-error">This action cannot be undone immediately</p>
                                <p className="text-[11px] text-semantic-error/70 mt-0.5">
                                    {type === 'platform'
                                        ? 'Product listings and orders will stop syncing. You will need to reconnect to resume operations.'
                                        : 'Active shipments will not be affected, but you won\'t be able to create new bookings with this partner.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-xs text-text-muted">
                        <p>• Existing data will be preserved</p>
                        <p>• {type === 'platform' ? 'Pending orders will remain accessible' : 'Active tracking will continue'}</p>
                        <p>• You can reconnect anytime</p>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t border-border/40 flex-row gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 rounded-xl">Keep Connected</Button>
                    <Button onClick={() => onOpenChange(false)} className="flex-1 rounded-xl bg-semantic-error hover:bg-semantic-error/90 text-white">
                        <XCircle className="w-4 h-4 mr-2" /> Disconnect
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
