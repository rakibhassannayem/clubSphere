import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Shared/Loading/Loading";
import { FiUsers } from "react-icons/fi";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineDateRange, MdOutlineKeyboardBackspace } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const ClubDetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: club = [], isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure(`/clubs/${id}`);
      return res.data;
    },
  });
  const {
    _id,
    clubName,
    bannerImage,
    category,
    membershipFee,
    members,
    description,
    location,
    createdAt,
    managerEmail
  } = club || {};

  const handleJoinClub = () => {
    const paymentInfo = {
      clubId: _id,
      clubName,
      category,
      membershipFee,
      description,
      bannerImage,
      member: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
    };

    Swal.fire({
      title: `Membership fee is $${membershipFee}/month. Are you sure?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0e816a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'll join!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/create-checkout-session", paymentInfo)
          .then((res) => {
            window.location.href = res.data.url;
            // Swal.fire({
            //   title: "Joined!",
            //   text: "You have been joined to the club.",
            //   icon: "success",
            // });
          });
      }
    });
  };

  if (isLoading) return <Loading />;
  return (
    <div className="card bg-base-200">
      <figure className="relative rounded-none">
        <img
          src={bannerImage}
          alt={clubName}
          className="h-[60vh] w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* on the image */}
        <div className="absolute inset-0 container mx-auto">
          <Link
            to={"/clubs"}
            className="text-white absolute top-3 left-3 font-bold flex items-center gap-2 hover:-translate-x-3 transition"
          >
            <MdOutlineKeyboardBackspace size={22} /> Back to Clubs
          </Link>

          <div className="text-white absolute bottom-3 left-3 space-y-2">
            <span className="badge bg-amber-600 text-white font-semibold border-0">
              {category}
            </span>

            <h1 className="text-5xl font-bold">{clubName}</h1>

            <div className="flex gap-5 text-gray-200 font-medium">
              <div className="flex items-center gap-1">
                <IoLocationOutline />
                {location}
              </div>
              <div className="flex items-center gap-1">
                <FiUsers />
                {members} members
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineDateRange />
                Est. {new Date(createdAt).getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </figure>

      <div className="container mx-auto my-4 flex flex-col lg:flex-row justify-between gap-3">
        <div className="border bg-white border-base-300 rounded-xl p-5 w-full">
          {/* Tabs + Content */}
          <div className="tabs tabs-boxed w-full font-semibold">
            <button
              className={`tab ${
                activeTab === "about" ? "tab-active font-bold" : ""
              } text-xl`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>

            <button
              className={`tab ${
                activeTab === "members" ? "tab-active font-bold" : ""
              } text-xl`}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>

            <button
              className={`tab ${
                activeTab === "events" ? "tab-active font-bold" : ""
              } text-xl`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="mt-5">
            {activeTab === "about" && (
              <p className="text-accent leading-relaxed">{description}</p>
            )}

            {activeTab === "members" && (
              <div className="bg-base-200 p-2 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">Hart Hagerty</div>
                    <div className="opacity-90">Joind May 2025</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "events" && (
              <div className="bg-base-200 p-2 rounded-xl">
                <div className="flex items-center gap-3 justify-between">
                  <div>
                    <div className="text-xl font-bold">Weekly Meetup</div>
                    <div className="flex flex-col md:flex-row gap-5 opacity-80 mt-1">
                      <div className="flex items-center gap-1">
                        <MdOutlineDateRange />
                        Est. {new Date(createdAt).getFullYear()}
                      </div>

                      <div className="flex items-center gap-1">
                        <IoTimeOutline />
                        2:00 PM
                      </div>
                      <div className="flex items-center gap-1">
                        <IoLocationOutline />
                        {location}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiUsers />
                        {members} members
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">$12</span>
                    <button className="btn btn-primary text-white font-bold rounded-lg">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* join card */}
        <div className="text-center border bg-white border-base-300 rounded-xl p-5 min-w-96">
          <span className="text-4xl font-bold">
            {membershipFee === 0 ? "FREE" : `$${membershipFee}`}
          </span>

          <p className="text-accent">
            {membershipFee === 0 ? "No membership fee" : "per month"}
          </p>
          <button
            onClick={handleJoinClub}
            className="btn btn-primary text-white font-bold text-lg rounded-lg w-full mt-4"
          >
            Join Club
          </button>
          <p className="text-accent text-sm mt-2">
            Join instantly with no commitment
          </p>
          <div className="divider"></div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-accent">
              <p>Members</p>
              <span className="text-secondary">{members}</span>
            </div>

            <div className="flex items-center justify-between text-accent">
              <p>Established</p>
              <span className="text-secondary">
                {new Date(createdAt).getFullYear()}
              </span>
            </div>

            <div className="flex items-center justify-between text-accent">
              <p>Manager</p>
              <span className="text-secondary">{managerEmail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
