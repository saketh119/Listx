import { cn } from "@/lib/utils"

interface AIProcessingOrbProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AIProcessingOrb({ className, ...props }: AIProcessingOrbProps) {
    return (
        <div
            className={cn("ai-processing-orb", className)}
            {...props}
        />
    )
}
