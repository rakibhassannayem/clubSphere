import Cta from "../../components/Cta/Cta";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";
import Features from "../../components/Features/Features";
import Categories from "../../components/Categories/Categories";
import Testimonials from "../../components/Testimonials/Testimonials";
import BlogSection from "../../components/BlogSection/BlogSection";
import CommunityTrust from "../../components/CommunityTrust/CommunityTrust";
import ServiceHighlights from "../../components/ServiceHighlights/ServiceHighlights";

const Home = () => {
  return (
    <div className="mb-10">
      <HeroBanner />
      <UpcomingEvents />
      <Categories />
      <Features />
      <CommunityTrust />
      <HowItWorks />
      <Testimonials />
      <ServiceHighlights />
      <BlogSection />
      <Cta />
    </div>
  );
};

export default Home;
