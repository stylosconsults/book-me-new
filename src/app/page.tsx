import Heading from "@/components/atoms/Heading";
import HomeImageSlider from "@/components/molecules/HomeImageSlider";
import CategoriesList from "@/components/organisms/CategoriesList";
import PopularHotels from "@/components/organisms/PopularHotels";

export default function Home() {
  return (
    <main>
      <HomeImageSlider />
      <CategoriesList />
      <PopularHotels />
    </main>
  );
}
