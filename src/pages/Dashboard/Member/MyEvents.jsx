import { MdOutlineDateRange } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import useAuth from "../../../hooks/useAuth";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { HiOutlineUsers } from "react-icons/hi";
import { Link } from "react-router";
import { FiExternalLink } from "react-icons/fi";

const MyEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: events = {}, isLoading } = useQuery({
    queryKey: ["member-events"],
    queryFn: async () => {
      const res = await axiosSecure(`/member-events`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">
            Welcome back, {user?.displayName}
          </h2>
          <p className="text-accent">
            Here's what's happening with your clubs.
          </p>
        </div>
        <Link to={"/events"} className="btn btn-primary text-white rounded-lg">
          Browse More Events
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl mt-4 shadow grid grid-cols-2 gap-5">
        {events.map((event) => (
          <div className="border border-base-300 p-4 rounded-xl">
            <div className="flex justify-between flex-col gap-2 sm:flex-row">
              <div>
                <h3 className="text-lg font-semibold">{event.eventTitle}</h3>
                <p className="text-accent">{event.clubName}</p>
              </div>
              <span className="badge badge-primary text-white font-bold">
                {event.category}
              </span>
            </div>
            <div className="space-y-1 text-primary mt-2">
              <div className="flex items-center gap-1">
                <MdOutlineDateRange />
                <span className="text-accent">
                  {new Date(event.eventDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IoMdTime />
                <span className="text-accent">
                  {new Date(event.eventDate).toLocaleString("en-GB", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IoLocationOutline />
                <span className="text-accent">{event.location}</span>
              </div>
            </div>
            <div className="divider m-1"></div>
            <div className="flex items-center justify-between">
              <span>{event.eventFee ? `$${event.eventFee}` : "FREE"}</span>
              <Link
                to={`/event-details/${event._id}`}
                className="btn btn-outline border-primary border-2 rounded-2xl text-primary h-10 p-2 hover:text-white hover:bg-primary"
              >
                View
                <FiExternalLink />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
