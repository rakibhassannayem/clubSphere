import { FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const ClubCard = ({ club }) => {
  const {
    clubName,
    category,
    description,
    location,
    bannerImage,
    membershipFee,
    members,
  } = club;
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl hover:scale-102 transition cursor-pointer">
      <figure className="relative">
        <img
          src={bannerImage}
          alt={clubName}
          className="h-42 w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        <span className="badge bg-base-300 text-black absolute top-3 right-3 font-bold">
          {membershipFee == 0 ? "free" : <span>${membershipFee}/mo</span>}
        </span>

        <div className="text-white flex items-center gap-1 absolute bottom-3 right-3">
          <FiUsers />
          {members}
        </div>
      </figure>
      <div className="p-3">
        <span className="badge bg-primary/10 text-primary font-medium">{category}</span>
        <h2 className="card-title mt-2">{clubName}</h2>
        <p className="text-accent my-2">{description}</p>
        <p className="text-accent flex items-center gap-1">
          <IoLocationOutline />
          {location}
        </p>
      </div>
    </div>
  );
};

export default ClubCard;
