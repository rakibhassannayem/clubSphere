import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EventCard from "../Cards/EventCard";
import LoadingSkeleton from "../Shared/LoadingSkeleton/LoadingSkeleton";
import { Link } from "react-router";

const UpcomingEvents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-events");
      return res.data;
    },
  });
  return (
    <div className="container mx-auto">
      <div className="text-center mb-4">
        <p className="font-bold text-lg text-primary">Featured Communities</p>
        <h1 className="text-secondary text-4xl font-bold mb-2">
          Upcoming Events
        </h1>
        <p className="text-accent">
          Discover vibrant Events that match your interests. From outdoor
          adventures <br /> to creative pursuits, find your perfect group.
        </p>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : events.length !== 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5 px-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl mt-10">No clubs found!</p>
      )}

      <div className="flex justify-center">
        <Link
          to={"/events"}
          className="btn btn-outline border-2 mt-3 mb-10 text-primary text-lg hover:bg-primary hover:text-white rounded-xl"
        >
          View All Events →
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
