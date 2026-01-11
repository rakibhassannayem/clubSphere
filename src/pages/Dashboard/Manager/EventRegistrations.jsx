import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import { HiOutlineClipboardList } from "react-icons/hi";

const EventRegistrations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["members", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-members`);
      return res.data;
    },
  });

  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">
            Event Registrations
          </h2>
          <p className="text-accent">View registrations for your events.</p>
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
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-2xl">
          <h1 className="flex items-center gap-1 text-2xl text-secondary font-bold p-3 pb-0">
            <HiOutlineClipboardList /> Registrations ({members.length})
          </h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Attendee</th>
                <th>Email</th>
                <th>Event</th>
                <th>Club</th>
                <th>Status</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id}>
                  <td>{member.memberName}</td>
                  <td>{member.memberEmail}</td>

                  <td className="text-secondary">{member.eventTitle}</td>
                  <td className="text-secondary">{member.clubName}</td>
                  <td
                    className={`badge text-white font-bold mt-2 ${
                      member.status === "registered"
                        ? "bg-primary"
                        : "bg-orange-600"
                    }`}
                  >
                    {member.status}
                  </td>

                  <td>
                    {member.registeredAt
                      ? new Date(member.registeredAt).toLocaleDateString(
                          "en-CA"
                        )
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-2xl mt-10">
          No one registered to your events yet!
        </p>
      )}
    </div>
  );
};

export default EventRegistrations;
