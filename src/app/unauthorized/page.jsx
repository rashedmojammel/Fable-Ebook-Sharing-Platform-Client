// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import {
//     ShieldX,
//     ArrowLeft,
//     LogIn,
//     BookOpen,
//     House,
//     ArrowRightToSquare,
//     ShieldCheck,
// } from "@gravity-ui/icons";

// import { Button } from "@heroui/react";

// export default function UnauthorizedPage() {
//     const router = useRouter();

//     return (
//         <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
//             <div className="max-w-md w-full text-center">
//                 {/* Icon Container */}
//                 <div className="mx-auto w-28 h-28 bg-red-100 rounded-3xl flex items-center justify-center mb-10">
//                     <ShieldCheck size={64} className="text-red-500" />
//                 </div>

//                 {/* Header */}
//                 <div className="mb-8">
//                     <div className="inline-flex items-center gap-2 text-red-600 font-medium mb-3">
//                         <BookOpen size={18} />
//                         PUBLISHER STUDIO
//                     </div>
//                     <h1 className="text-5xl font-semibold text-zinc-900 mb-3">
//                         Access Denied
//                     </h1>
//                     <p className="text-2xl font-medium text-red-600">403 — Unauthorized</p>
//                 </div>

//                 <p className="text-zinc-600 text-lg leading-relaxed mb-12">
//                     You don&apos;t have permission to access this page. 
//                     Please sign in with the appropriate account or contact support.
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col gap-4">
//                     <Button
//                         onClick={() => router.push("/signin")}
//                         className="w-full h-14 bg-zinc-900 hover:bg-black text-white rounded-2xl font-semibold text-base flex items-center justify-center gap-3 transition-all"
//                     >
//                         <ArrowRightToSquare size={20} />
//                         Sign In
//                     </Button>

//                     <div className="grid grid-cols-2 gap-4">
//                         <Button
//                             onClick={() => router.back()}
//                             variant="bordered"
//                             className="h-14 rounded-2xl font-medium flex items-center justify-center gap-3 border-zinc-300 hover:bg-zinc-100"
//                         >
//                             <ArrowLeft size={20} />
//                             Go Back
//                         </Button>

//                         <Button
//                             onClick={() => router.push("/")}
//                             variant="bordered"
//                             className="h-14 rounded-2xl font-medium flex items-center justify-center gap-3 border-zinc-300 hover:bg-zinc-100"
//                         >
//                             <House size={20} />
//                             Home
//                         </Button>
//                     </div>
//                 </div>

//                 <p className="text-xs text-zinc-400 mt-12">
//                     If you believe this is an error, please reach out to support.
//                 </p>
//             </div>
//         </div>
//     );
// }
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, BookOpen, House,
  ArrowRightToSquare, ShieldCheck,
} from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">

        {/* Icon */}
        <div className="mx-auto w-28 h-28 bg-red-100 rounded-3xl flex items-center justify-center mb-10">
          <ShieldCheck className="size-16 text-red-500" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-red-600 font-medium mb-3">
            <BookOpen className="size-4" />
            PUBLISHER STUDIO
          </div>
          <h1 className="text-5xl font-semibold text-zinc-900 mb-3">Access Denied</h1>
          <p className="text-2xl font-medium text-red-600">403 — Unauthorized</p>
        </div>

        <p className="text-zinc-600 text-lg leading-relaxed mb-12">
          You don&apos;t have permission to access this page.
          Please sign in with the appropriate account or contact support.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/signin")}
            className="w-full h-14 bg-zinc-900 hover:bg-black text-white rounded-2xl font-semibold text-base flex items-center justify-center gap-3 transition-colors"
          >
            <ArrowRightToSquare className="size-5" />
            Sign In
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.back()}
              className="h-14 rounded-2xl font-medium flex items-center justify-center gap-2 border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 transition-colors"
            >
              <ArrowLeft className="size-5" />
              Go Back
            </button>

            <button
              onClick={() => router.push("/")}
              className="h-14 rounded-2xl font-medium flex items-center justify-center gap-2 border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-700 transition-colors"
            >
              <House className="size-5" />
              Home
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-400 mt-12">
          If you believe this is an error, please reach out to support.
        </p>
      </div>
    </div>
  );
}