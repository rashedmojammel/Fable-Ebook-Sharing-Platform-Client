// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@heroui/react";
// import { Bookmark } from "@gravity-ui/icons";

// import { useSession } from "@/lib/auth-client";
// import { addBookmark, removeBookmark, checkBookmark } from "@/lib/actions/bookmark";

// export default function BookmarkButton({ book }) {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const [bookmarked, setBookmarked] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!session?.user?.email) return;

//     checkBookmark(book._id, session.user.email).then((res) => {
//       setBookmarked(res.bookmarked);
//     });
//   }, [session?.user?.email, book._id]);

//   const handleToggle = async () => {
//     if (!session?.user?.email) {
//       router.push("/auth/signin");
//       return;
//     }

//     setLoading(true);

//     try {
//       if (bookmarked) {
//         await removeBookmark(book._id, session.user.email);
//         setBookmarked(false);
//       } else {
//         await addBookmark({
//           bookId: book._id,
//           userEmail: session.user.email,
//           bookTitle: book.title,
//           bookCoverImage: book.coverImage,
//           price: book.price,
//           writerName: book.authorName,
//         });
//         setBookmarked(true);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       fullWidth
//       variant="bordered"
//       size="lg"
//       isLoading={loading}
//       startContent={<Bookmark />}
//       onClick={handleToggle}
//     >
//       {bookmarked ? "Bookmarked" : "Bookmark"}
//     </Button>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "@gravity-ui/icons";

import { useSession } from "@/lib/auth-client";
import { addBookmark, removeBookmark, checkBookmark } from "@/lib/actions/bookmark";

export default function BookmarkButton({ book }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;
    checkBookmark(book._id, session.user.email).then((res) => {
      setBookmarked(res.bookmarked);
    });
  }, [session?.user?.email, book._id]);

  const handleToggle = async () => {
    if (!session?.user?.email) {
      router.push("/auth/signin");
      return;
    }

    setLoading(true);
    try {
      if (bookmarked) {
        await removeBookmark(book._id, session.user.email);
        setBookmarked(false);
      } else {
        await addBookmark({
          bookId: book._id,
          userEmail: session.user.email,
          bookTitle: book.title,
          bookCoverImage: book.coverImage,
          price: book.price,
          writerName: book.authorName,
        });
        setBookmarked(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl border text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed
        ${bookmarked
          ? "border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
        }`}
    >
      <Bookmark className="size-4" />
      {loading ? "..." : bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}