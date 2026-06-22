import { getFeaturedBooks } from "@/lib/api/home";
import { getTopWriters } from "@/lib/api/home";

import HeroBanner from "@/components/Sections/HeroBanner";
import FeaturedEbooks from "@/components/Sections/FeaturedEbook";
import TopWriters from "@/components/Sections/TopWriterSection";
import EbookGenres from "@/components/Sections/EbookGenresSection";
import Footer from "@/components/Layout/Footer";

export default async function Home() {
  const featuredBooks = (await getFeaturedBooks()) || [];
  const topWriters = (await getTopWriters()) || [];

  return (
    <>
      <HeroBanner />
      <FeaturedEbooks books={featuredBooks} />
      <TopWriters writers={topWriters} />
      <EbookGenres />
      <Footer />
    </>
  );
}