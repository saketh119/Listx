import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
    size?: "sm" | "md" | "lg" | "xl";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-7 h-7",
        xl: "w-10 h-10",
    };

    return (
        <Loader2
            className={cn("spinner", sizeClasses[size], className)}
            {...props}
        />
    );
}
