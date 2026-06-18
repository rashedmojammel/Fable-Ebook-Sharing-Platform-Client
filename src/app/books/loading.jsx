export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Optional subtle header */}
      <div className="flex justify-center mb-12">
        <div className="h-2.5 w-24 bg-zinc-200 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Image Skeleton with Shimmer */}
            <div className="relative h-72 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer" />
              
              {/* Optional subtle badge placeholder */}
              <div className="absolute top-4 right-4 h-6 w-20 bg-white/80 dark:bg-zinc-900/80 rounded-full backdrop-blur-sm" />
            </div>

            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-4/5" />
                <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-11/12" />
              </div>

              {/* Subtitle / Meta */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-24" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-16" />
              </div>

              {/* Description lines */}
              <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
              </div>

              {/* Price + Button area */}
              <div className="flex items-end justify-between pt-4">
                <div className="space-y-1">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
                  <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-28" />
                </div>
                
                <div className="h-11 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
              </div>
            </div>

            {/* Bottom shine line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}