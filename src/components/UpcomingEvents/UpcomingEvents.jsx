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
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-accent"
          >
            Discover vibrant events that match your interests. From outdoor
            adventures <br className="hidden md:block" /> to creative pursuits, find your perfect group and join the action.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : events.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event) => (
              <motion.div key={event._id} variants={itemVariants}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10">
            <p className="text-2xl text-accent font-medium italic">No upcoming events found!</p>
          </div>
        )}

        <div className="flex justify-center mt-16">
          <Link
            to="/events"
            className="btn btn-primary text-white px-8 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
          >
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
