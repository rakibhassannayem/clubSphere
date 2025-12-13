import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import { MdOutlineEventNote } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const EventsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/club-members/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">
            Events Management
          </h2>
          <p className="text-accent">
            Create and manage events for your clubs.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : members.length !== 0 ? (
        <div className="overflow-x-auto bg-white border border-base-300 rounded-2xl">
          <h1 className="flex items-center gap-1 text-2xl text-secondary font-bold bg-white p-3 pb-0">
            <MdOutlineEventNote /> All Events (4)
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
              {members.map((member) => (
                <tr key={member._id}>
                  <td>Photography Workshop</td>
                  <td>Photography Masters</td>
                  <td>
                    2024-03-20
                    {/* {new Date(member.joinedAt).toISOString().split("T")[0]} */}
                  </td>
                  <td className="text-secondary">Studio A</td>
                  <td
                    className={`badge text-white font-bold mt-2 ${
                      member.status === "active"
                        ? "bg-primary"
                        : "bg-orange-500"
                    }`}
                  >
                    $25/Free
                  </td>

                  <td>
                    <div className="flex items-center gap-1">
                      <LuUsers />
                      24
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-ghost">
                      <FiEdit />
                    </button>
                    <button className="btn btn-ghost text-red-500">
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
          You haven't joined any club yet!
        </p>
      )}
    </div>
  );
};

export default EventsManagement;
