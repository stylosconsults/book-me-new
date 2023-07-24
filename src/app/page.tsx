import HomeImageSlider from "@/components/molecules/HomeImageSlider";
import CategoriesList from "@/components/organisms/CategoriesList";
import HowItWorks from "@/components/organisms/HowItWorks";
import PopularHotels from "@/components/organisms/PopularHotels";

export default function Home() {
  return (
    <main>
      <HomeImageSlider />
      <CategoriesList />
      <PopularHotels />
      <HowItWorks />
    </main>
  );
}
