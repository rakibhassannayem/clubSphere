import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";

const ClubMembers = () => {
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
          <h2 className="text-2xl text-secondary font-bold">Club Members</h2>
          <p className="text-accent">
            View and manage members across your clubs.
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
          <h1 className="text-2xl text-secondary font-bold bg-white p-3 pb-0">
            Members ({members.length})
          </h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Member</th>
                <th>Email</th>
                <th>Club</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{member.memberName}</div>
                    </div>
                  </td>
                  <td>{member.memberEmail}</td>
                  <td className="text-secondary">{member.clubName}</td>
                  <td
                    className={`badge text-white font-bold mt-2 ${
                      member.status === "active"
                        ? "bg-primary"
                        : "bg-orange-500"
                    }`}
                  >
                    {member.status}
                  </td>
                  <td>
                    {new Date(member.joinedAt).toISOString().split("T")[0]}
                  </td>
                  <td>
                    <select
                      defaultValue="Change Status"
                      className="select select-accent w-auto border-0"
                    >
                      <option disabled={true}>Change Status</option>
                      <option>active</option>
                      <option>expired</option>
                    </select>
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

export default ClubMembers;
