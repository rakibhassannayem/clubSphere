import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import toast from "react-hot-toast";
import { LuBuilding2 } from "react-icons/lu";

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs`);
      return res.data;
    },
  });

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axiosSecure.patch("/update-status", {
        id: id,
        status: status,
      });
      if (res.data?.modifiedCount > 0) {
        toast.success("Status has been changed");
        refetch();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">Manage Clubs</h2>
          <p className="text-accent">
            Review and manage all club registrations.
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
      ) : clubs.length !== 0 ? (
        <div className="overflow-x-auto bg-white border border-base-300 rounded-2xl">
          <h1 className="flex items-center gap-1 text-2xl text-secondary font-bold bg-white p-3 pb-0">
            <LuBuilding2 />
            All Clubs ({clubs.length})
          </h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Club Name</th>
                <th>Manager</th>
                <th>Category</th>
                <th>Members</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club) => (
                <tr key={club._id}>
                  <td className="font-medium">{club.clubName}</td>
                  <td>{club.managerEmail}</td>
                  <td className="font-medium">{club.category}</td>
                  <td className="font-medium">{club.members}</td>
                  <td className="font-medium">
                    {club.membershipFee == 0 ? (
                      "Free"
                    ) : (
                      <span>${club.membershipFee}</span>
                    )}
                  </td>
                  <td
                    className={`badge text-white font-bold mt-2 ${
                      club.status === "approved"
                        ? "bg-primary"
                        : club.status === "pending"
                        ? "bg-orange-400"
                        : "bg-red-600"
                    }`}
                  >
                    {club.status}
                  </td>

                  <td>
                    <select
                      onChange={(e) =>
                        handleUpdateStatus(club._id, e.target.value)
                      }
                      defaultValue={club.status}
                      className="select select-accent w-auto border-primary outline-primary font-medium"
                    >
                      <option
                        value="approved"
                        disabled={club.status === "approved"}
                      >
                        Approved
                      </option>
                      <option
                        value="pending"
                        disabled={club.status === "pending"}
                      >
                        Pending
                      </option>
                      <option
                        value="rejected"
                        disabled={club.status === "rejected"}
                      >
                        Reject
                      </option>
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

export default ManageClubs;
