import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import { MdOutlineAdd, MdOutlineEventNote } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import Swal from "sweetalert2";

const EventsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-events?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(events)

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0e816a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/events/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
            icon: "success",
          });
          refetch();
        });
      }
    });
  };

  return (
    <div className="bg-base-200 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">
            Events Management
          </h2>
          <p className="text-accent">
            Create and manage events for your clubs.
          </p>
        </div>
        <Link
          to={"/dashboard/create-event"}
          className="btn btn-primary text-white rounded-lg"
        >
          <MdOutlineAdd size={18} /> Create Event
        </Link>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : events.length !== 0 ? (
        <div className="overflow-x-auto bg-white border border-base-300 rounded-2xl">
          <h1 className="flex items-center gap-1 text-2xl text-secondary font-bold bg-white p-3 pb-0">
            <MdOutlineEventNote /> All Events ({events.length})
          </h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Event</th>
                <th>Club</th>
                <th>Date</th>
                <th>Location</th>
                <th>Fee</th>
                <th>Registrations</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.clubName}</td>
                  <td>
                    {new Date(event.eventDate).toISOString().split("T")[0]}
                  </td>
                  <td className="text-secondary">{event.location}</td>
                  <td>
                    <div
                      className={`badge font-bold rounded-full ${
                        event.eventFee && "bg-orange-500 text-white"
                      }`}
                    >
                      {event.eventFee ? `$${event.eventFee}` : "Free"}
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-1">
                      <LuUsers />
                      {event.registrations}/{event.maxAttendees}
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/event-details/${event._id}`}
                      className="btn btn-ghost"
                    >
                      <FiEye />
                    </Link>
                    <Link
                      to={`/dashboard/edit-event/${event._id}`}
                      className="btn btn-ghost"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-ghost text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-2xl mt-10">
          You haven't created any event yet!
        </p>
      )}
    </div>
  );
};

export default EventsManagement;
