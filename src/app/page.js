import Banner from "./components/Banner";
import ExploreCategories from "./components/ExploreCategories";
import FeaturedIdeas from "./components/FeaturedIdeas";
import WhyIdeaHub from "./components/WhyIdeaHub";

export default function Home() {
  return (
    <main>
      <Banner />
      <ExploreCategories />
      <FeaturedIdeas />
      <WhyIdeaHub />
    </main>
  );
}
