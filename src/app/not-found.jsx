import Link from "next/link";
import { House } from "@gravity-ui/icons";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-md">
                
                {/* 404 Number */}
                <h1 className="text-7xl font-bold text-primary">
                    404
                </h1>

                {/* Message */}
                <h2 className="mt-4 text-2xl font-semibold">
                    Page Not Found
                </h2>

                <p className="mt-2 text-muted-foreground">
                    The page you are looking for does not exist or has been moved.
                </p>

                {/* Back Home Button */}
                <Link
                    href="/"
                    className="inline-flex mt-8 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground font-medium hover:opacity-90 transition"
                >
                    <House className="size-5" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}