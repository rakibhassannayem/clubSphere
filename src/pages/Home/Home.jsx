import Cta from "../../components/CTA/Cta";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";

const Home = () => {
  return (
    <div className=" mb-10">
      <HeroBanner />
      <UpcomingEvents />
      <HowItWorks />
      <Cta />
    </div>
  );
};

export default Home;
