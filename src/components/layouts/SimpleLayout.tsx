import { Outlet, Link } from "react-router-dom";
import { ListxLogo } from "../ListxLogo";

export function SimpleLayout() {
    return (
        <div className="min-h-screen bg-bg-subtle flex flex-col pt-12">
            <div className="absolute top-8 left-8">
                <Link to="/">
                    <ListxLogo className="h-8 text-brand-dark" />
                </Link>
            </div>
            <div className="flex-1 flex flex-col items-center pt-16 px-4 w-full">
                <Outlet />
            </div>
        </div>
    );
}
