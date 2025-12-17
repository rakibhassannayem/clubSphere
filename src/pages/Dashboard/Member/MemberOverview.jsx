import { LuBuilding2 } from "react-icons/lu";
import { MdOutlineEventAvailable } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import useAuth from "../../../hooks/useAuth";
import { BsCalendar2Event } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const MemberOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["member-overview"],
    queryFn: async () => {
      const res = await axiosSecure(`/member/overview`);
      return res.data;
    },
  });

  const { data: events = {}, isLoading: eventLoading } = useQuery({
    queryKey: ["member-events"],
    queryFn: async () => {
      const res = await axiosSecure(`/member-events`);
      return res.data;
    },
  });

  if (isLoading || eventLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  const today = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return eventDate > today;
  });

  return (
    <div className="bg-base-200 p-4">
      <div>
        <h2 className="text-2xl text-secondary font-bold">
          Welcome back, {user?.displayName}
        </h2>
        <p className="text-accent">Here's what's happening with your clubs.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">My Clubs</p>
              <LuBuilding2 size={24} className="text-green-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">
              {stats.totalClubs}
            </h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">My Events</p>
              <MdOutlineEventAvailable size={24} className="text-purple-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">
              {stats.totalEvents}
            </h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl mt-4 shadow">
          <div className="flex items-center justify-between">
            <div className="text-2xl text-secondary font-bold flex items-center gap-2">
              <BsCalendar2Event size={22} className="text-primary" />
              <h2>Upcoming Events</h2>
            </div>
            <Link
              to={"/events"}
              className="flex items-center gap-2 hover:translate-x-1 transition cursor-pointer font-semibold"
            >
              View All <FaArrowRightLong />
            </Link>
          </div>
          {events.length ? (
            <div className="mt-5 space-y-5">
              {upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex items-center justify-between bg-base-200 p-3 rounded-xl"
                >
                  <div>
                    <h3 className="font-medium">{event.eventTitle}</h3>
                    <p>{event.clubName}</p>
                  </div>

                  <div
                    className={`badge font-bold rounded-full ${
                      event.eventFee && "bg-orange-500 text-white"
                    }`}
                  >
                    {event.eventFee ? `$${event.eventFee}` : "Free"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center my-6 text-xl font-medium text-accent">
              No Upcoming Events!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
