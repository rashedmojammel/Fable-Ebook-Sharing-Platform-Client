import { redirect } from "next/navigation";
import Link from "next/link";

import { stripe } from "../../lib/stripe";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session ID");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  const customerEmail = session.customer_details?.email;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-green-100 p-10 text-center">
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-zinc-900">
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p className="mt-4 text-zinc-600 leading-7">
          Thank you for purchasing your ebook. Your payment has been confirmed
          and your content is now available in your library.
        </p>

        {/* Customer Info */}
        <div className="mt-6 bg-zinc-50 rounded-2xl p-4 border">
          <p className="text-sm text-zinc-500">
            Confirmation sent to
          </p>

          <p className="mt-1 font-semibold text-zinc-900">
            {customerEmail}
          </p>
        </div>

        {/* Purchase Details */}
        <div className="mt-6 flex items-center justify-center gap-2 text-green-700">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="font-medium">
            Ebook access has been unlocked
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/books"
            className="flex-1 bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-800 transition"
          >
            Continue Reading
          </Link>

          <Link
            href="/library"
            className="flex-1 border border-zinc-300 py-3 rounded-xl font-medium text-zinc-700 hover:bg-zinc-50 transition"
          >
            My Library
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-zinc-500">
          Need help? Contact our support team at{" "}
          <a
            href="mailto:support@ebook.com"
            className="text-primary font-medium hover:underline"
          >
            support@ebook.com
          </a>
        </p>
      </div>
    </main>
  );
}