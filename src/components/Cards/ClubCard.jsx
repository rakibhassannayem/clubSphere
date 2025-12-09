import { IoLocationOutline } from "react-icons/io5";

const ClubCard = ({ club }) => {
  const {
    clubName,
    category,
    description,
    location,
    bannerImage,
    membershipFee,
  } = club;
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="">
        <img
          src={bannerImage}
          alt={clubName}
          className="h-48 w-full object-cover"
        />
        <span className="badge bg-base-200 text-black absolute top-3 right-3 font-bold">
          {membershipFee == 0 ? "free" : <span>${membershipFee}/mo</span>}
        </span>
      </figure>
      <div className="p-3">
        <span className="badge bg-primary/10 text-primary">{category}</span>
        <h2 className="card-title">{clubName}</h2>
        <p className="text-accent">{description}</p>
        <p className="text-accent flex items-center gap-1">
          <IoLocationOutline />
          {location}
        </p>
      </div>
    </div>
  );
};

export default ClubCard;
