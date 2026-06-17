import Image from "next/image";
import HeroBanner from "./components/Sections/HeroBanner";
import FeaturedEbooks from "./components/Sections/FeaturedEbook";
import TopWriters from "./components/Sections/TopWriterSection";
import EbookGenres from "./components/Sections/EbookGenresSection";

export default function Home() {
  return (
   
    <>

      <HeroBanner/>
      <FeaturedEbooks/>
      <TopWriters></TopWriters>
      <EbookGenres></EbookGenres>
    
    </>
  );
}
