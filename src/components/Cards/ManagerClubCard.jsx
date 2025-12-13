import React from "react";
import { FiEdit, FiUsers } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";

const ManagerClubCard = ({ club }) => {
  const {
    _id,
    clubName,
    description,
    location,
    bannerImage,
    membershipFee,
    members,
    status,
  } = club || {};
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="relative">
        <img
          src={bannerImage}
          alt={clubName}
          className="h-42 w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </figure>

      <div className="card-body pt-1">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{clubName}</h2>
          <span
            className={`badge text-white font-bold mt-2 ${
              status === "approved" ? "bg-primary" : "bg-orange-500"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-accent">{description}</p>
        <div className="flex gap-0.5 items-center justify-between flex-wrap text-base text-accent">
          <div className="flex items-center gap-1">
            <FiUsers />
            {members} members
          </div>
          <div className="flex items-center gap-1">
            <IoLocationOutline />
            {location}
          </div>
          <div>
            {membershipFee === 0 ? "FREE" : `$ ${membershipFee}/mo`}
          </div>
        </div>
        <Link className="btn btn-outline text-primary rounded-lg text-lg"><FiEdit />Edit Club</Link>
      </div>
    </div>
  );
};

export default ManagerClubCard;
