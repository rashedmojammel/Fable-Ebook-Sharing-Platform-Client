// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@heroui/react";
// import { toast } from "react-toastify";

// export default function BuyButton({ bookId, price }) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleBuy = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/checkout_sessions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ bookId }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (res.status === 401) {
//           router.push("/auth/signin");
//           return;
//         }
//         toast.error(data.error || "Something went wrong. Please try again.");
//         return;
//       }

//       if (data.url) {
//         window.location.href = data.url;
//       }
//     } catch (err) {
//       toast.error("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button fullWidth color="primary" size="lg" isLoading={loading} onClick={handleBuy}>
//       Buy Now — ${price}
//     </Button>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BuyButton({ bookId, price }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/auth/signin");
          return;
        }
        toast.error(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.url) window.location.href = data.url;
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
    >
      {loading ? "Processing..." : `Buy Now — $${price}`}
    </button>
  );
}