export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            {/* Spinner */}
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>

            <h2 className="mt-6 text-xl font-semibold">
                Loading...
            </h2>

            <p className="text-muted-foreground mt-2">
                Please wait while we prepare your experience.
            </p>
        </div>
    );
}