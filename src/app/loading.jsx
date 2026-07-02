export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .spin-ring { animation: spin 1s linear infinite; }
        .ping-ring { animation: ping 1.5s ease-out infinite; }
      `}</style>

      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Logo mark */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-violet-200">
          <span className="text-4xl">📚</span>
        </div>

        <div className="spin-ring absolute -inset-2 rounded-full border-4 border-transparent border-t-violet-500 border-r-fuchsia-500" />
        <div className="ping-ring absolute -inset-4 rounded-full border border-violet-200" />
      </div>

      {/* Brand */}
      <h1
        className="text-3xl font-black bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent tracking-tight"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Fable
      </h1>

      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-violet-400"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>

      <p className="text-gray-400 text-sm mt-5 tracking-wide">
        Preparing your library...
      </p>

      {/* Book spines */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1.5">
        {[60, 80, 50, 90, 70, 55, 85, 65, 75, 45].map((h, i) => (
          <div
            key={i}
            className="w-5 rounded-t-sm"
            style={{
              height: h,
              background: `hsl(${260 + i * 12}, 70%, 65%)`,
              animation: `pulse 2s ease-in-out ${i * 0.15}s infinite`,
              opacity: 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}