import { FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { LuTicket } from "react-icons/lu";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const {
    _id,
    eventTitle,
    clubName,
    category,
    location,
    bannerImage,
    eventFee,
    registrations,
    eventDate,
    maxAttendees
  } = event || {};
  const date = new Date(eventDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
  
  return (
    <Link
      to={`/event-details/${_id}`}
      className="card bg-base-100 shadow-sm hover:shadow-xl hover:scale-102 transition cursor-pointer"
    >
      <figure className="relative">
        <img
          src={bannerImage}
          alt={eventTitle}
          className="h-42 w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        <span className="badge bg-base-300 text-black absolute top-3 right-3 font-bold">
          <LuTicket />
          {eventFee === 0 ? "free" : <span>${eventFee}</span>}
        </span>

        <div className="text-white font-bold text-lg absolute bottom-3 left-3">
          {date}
        </div>

        <div className="text-white flex items-center gap-1 absolute bottom-3 right-3">
          <FiUsers />
          {registrations}/{maxAttendees}
        </div>
      </figure>
      <div className="p-3">
        <span className="badge bg-orange-50 text-orange-400">{category}</span>
        <h2 className="card-title font-semibold text-xl mt-2">{eventTitle}</h2>
        <p className="text-accent my-2">
          by <span className="text-primary">{clubName}</span>
        </p>
        <p className="text-accent flex items-center gap-1">
          <IoLocationOutline />
          {location}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
