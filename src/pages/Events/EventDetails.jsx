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
import { LuTicket } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { HiOutlineUsers } from "react-icons/hi";

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: event = [], isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure(`/events/${id}`);
      return res.data;
    },
  });
  const {
    _id,
    eventTitle,
    clubId,
    clubName,
    bannerImage,
    category,
    eventFee,
    eventDate,
    description,
    location,
    registrations,
    managerEmail,
    maxAttendees,
  } = event || {};
  const date = new Date(eventDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
  const time = new Date(eventDate).toLocaleString("en-GB", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleRegistration = () => {
    const paymentInfo = {
      paymentType: "eventFee",
      eventId: _id,
      eventTitle,
      description,
      bannerImage,
      managerEmail,
      clubId,
      clubName,
      amount: Number(eventFee),
      member: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
    };

    Swal.fire({
      title: `Registration fee is $${eventFee}. Are you sure?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0e816a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'll register!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!user) {
          return navigate("/login");
        }
        axiosSecure
          .post("/create-checkout-session", paymentInfo)
          .then((res) => {
            window.location.href = res.data.url;
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
            to={"/events"}
            className="text-white absolute top-3 left-3 font-bold flex items-center gap-2 hover:-translate-x-3 transition"
          >
            <MdOutlineKeyboardBackspace size={22} /> Back to Events
          </Link>

          <div className="text-white absolute bottom-3 left-3 space-y-2">
            <span className="badge bg-amber-600 text-white font-semibold border-0">
              {category}
            </span>

            <span className="badge bg-white/20 text-white font-bold ml-2 border-0">
              <LuTicket />
              {eventFee === 0 ? "free" : <span>${eventFee}</span>}
            </span>

            <h1 className="text-5xl font-bold">{eventTitle}</h1>

            <div className="flex gap-5 text-white font-medium mt-3">
              <div className="flex items-center gap-1">
                <IoLocationOutline />
                {location}
              </div>

              <div className="flex items-center gap-1">
                <MdOutlineDateRange />
                {date}
              </div>

              <div className="flex items-center gap-1">
                <IoMdTime />
                {time}
              </div>
            </div>
          </div>
        </div>
      </figure>

      <div className="container mx-auto my-4 flex flex-col lg:flex-row justify-between gap-3">
        <div className="border bg-white border-base-300 rounded-xl p-5 w-full">
          {/* Tabs */}
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
                activeTab === "attendees" ? "tab-active font-bold" : ""
              } text-xl`}
              onClick={() => setActiveTab("attendees")}
            >
              Attendees ({registrations})
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="mt-5">
            {activeTab === "about" && (
              <p className="text-accent leading-relaxed">{description}</p>
            )}

            {activeTab === "attendees" && (
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
          </div>
        </div>

        {/* registration card */}
        <div className="text-center border bg-white border-base-300 rounded-xl p-5 min-w-96">
          <span className="text-4xl font-bold">
            {eventFee === 0 ? "FREE" : `$${eventFee}`}
          </span>

          <p className="text-accent">
            {eventFee === 0 ? "No registration fee" : "per person"}
          </p>
          <div className="text-accent flex justify-between">
            <p>Spots filled</p>
            <span>
              {registrations}/{maxAttendees}
            </span>
          </div>
          <progress
            className="progress progress-primary"
            value={registrations}
            max={maxAttendees}
          ></progress>

          {registrations === maxAttendees ? (
            <button
              onClick={() =>
                Swal.fire({
                  title: "Sorry!",
                  text: "Registration is full",
                  icon: "error",
                  confirmButtonColor: "#0e816a",
                })
              }
              className="btn btn-primary text-white font-bold text-lg rounded-lg w-full mt-4"
            >
              Registration Full
            </button>
          ) : (
            <button
              onClick={handleRegistration}
              className="btn btn-primary text-white font-bold text-lg rounded-lg w-full mt-4"
            >
              {eventFee === 0
                ? "Registration for Free"
                : `Registration for $${eventFee}`}
            </button>
          )}

          <div className="divider"></div>
          <h2 className="text-start font-bold">Event Details</h2>

          <div className="space-y-1 text-primary mt-2">
            <div className="flex items-center gap-1">
              <MdOutlineDateRange />
              <span className="text-accent">{date}</span>
            </div>

            <div className="flex items-center gap-1">
              <IoMdTime />
              <span className="text-accent">{time}</span>
            </div>
            <div className="flex items-center gap-1">
              <IoLocationOutline />
              <span className="text-accent">{location}</span>
            </div>

            <div className="flex items-center gap-1">
              <HiOutlineUsers />
              <span className="text-accent">{registrations} attendees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
