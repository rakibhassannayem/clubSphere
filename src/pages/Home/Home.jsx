import HeroBanner from "../../components/HeroBanner/HeroBanner";
import UpcomingEvents from "../../components/UpcomingEvents/UpcomingEvents";

const Home = () => {
  return (
    <div className=" mb-10">
      <HeroBanner />
      <UpcomingEvents />
    </div>
  );
};

export default Home;
