import React, { useState } from "react";
import { FaSortAmountUp } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EventCard from "../../components/Cards/EventCard";
import LoadingSkeleton from "../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import { motion, AnimatePresence } from "framer-motion";

const Events = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", search, category, sort],
    queryFn: async () => {
      const res = await axiosSecure.get("/events", {
        params: {
          search,
          category,
          sort,
        },
      });
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
    <div>
      <div className="bg-base-200 py-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold"
        >
          Explore Events
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-accent mt-2"
        >
          Find exciting events from clubs in your area. Workshops, meetups,
          adventures, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 w-8/12 mx-auto grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-14 gap-3"
        >
          {/* search */}
          <label className="input h-11 col-span-1 sm:col-span-5 lg:col-span-8 w-full outline-none rounded-xl">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              required
              placeholder="Search"
            />
          </label>

          {/* filter */}
          <label className="select h-11 col-span-1 sm:col-span-3 lg:col-span-3 outline-none rounded-xl">
            <span className="label">
              <FiFilter />
            </span>
            <select
              defaultValue={""}
              onChange={(e) => setCategory(e.target.value)}
              name="filter"
            >
              <option value="">All</option>
              <option value="Photography">Photography</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
              <option value="Music">Music</option>
              <option value="Outdoor">Outdoor</option>
            </select>
          </label>

          {/* sort */}
          <label className="select h-11 col-span-1 sm:col-span-8 lg:col-span-3 outline-none rounded-xl">
            <span className="label">
              <FaSortAmountUp />
            </span>
            <select defaultValue="" onChange={(e) => setSort(e.target.value)}>
              <option value="">Default</option>
              <option value="mostMembers">Most Members</option>
              <option value="lowestFee">Lowest Fee</option>
              <option value="highestFee">Highest Fee</option>
            </select>
          </label>
        </motion.div>
      </div>
      <div className="container mx-auto">
        <p className="text-accent text-lg my-3 px-3">
          Showing{" "}
          <span className="font-bold text-secondary">{events?.length}</span>{" "}
          events
        </p>

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
            animate="show"
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5 px-3"
          >
            <AnimatePresence>
              {events.map((event) => (
                <motion.div
                  layout
                  key={event._id}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p className="text-center text-2xl mt-10">No events found!</p>
        )}
      </div>
    </div>
  );
};

export default Events;
