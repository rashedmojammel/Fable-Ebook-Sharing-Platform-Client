import Footer from "@/components/Layout/Footer";
import EbookGenres from "@/components/Sections/EbookGenresSection";
import FeaturedEbooks from "@/components/Sections/FeaturedEbook";
import HeroBanner from "@/components/Sections/HeroBanner";
import TopWriters from "@/components/Sections/TopWriterSection";
import Image from "next/image";

export default function Home() {
  return (
   
    <>

      <HeroBanner/>
      <FeaturedEbooks/>
      <TopWriters></TopWriters>
      <EbookGenres></EbookGenres>
      <Footer/>
    
    </>
  );
}
