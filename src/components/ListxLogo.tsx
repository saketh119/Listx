import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> { }

export function ListxLogo({ className, ...props }: LogoProps) {
    return (
        <svg
            viewBox="0 0 120 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-brand-dark w-auto h-8", className)}
            {...props}
        >
            <path d="M12 28L28 12L20 4L4 20L12 28Z" fill="#42D49C" />
            <path d="M28 28L12 12V4L28 20V28Z" fill="#00A68A" />
            <text x="36" y="28" fill="currentColor" fontFamily="'Sora', sans-serif" fontWeight="700" fontSize="24" letterSpacing="-1px">Listx</text>
        </svg>
    );
}
