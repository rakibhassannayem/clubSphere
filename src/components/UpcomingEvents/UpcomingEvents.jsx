import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EventCard from "../Cards/EventCard";
import LoadingSkeleton from "../Shared/LoadingSkeleton/LoadingSkeleton";
import { Link } from "react-router";
import { motion } from "framer-motion";

const UpcomingEvents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/upcoming-events");
      return res.data;
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-4">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bold text-lg text-primary"
        >
          Featured Communities
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-secondary text-4xl font-bold mb-2"
        >
          Upcoming Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-accent"
        >
          Discover vibrant Events that match your interests. From outdoor
          adventures <br /> to creative pursuits, find your perfect group.
        </motion.p>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : events.length !== 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5 px-3"
        >
          {events.map((event) => (
            <motion.div key={event._id} variants={itemVariants}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
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
