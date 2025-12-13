import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleUpdateRole = async (email, role) => {
    try {
      const res = await axiosSecure.patch("/update-role", {
        email: email,
        role: role,
      });
      if (res.data?.modifiedCount > 0) {
        toast.success("Role has been changed");
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
          <h2 className="text-2xl text-secondary font-bold">Manage Users</h2>
          <p className="text-accent">View and manage all registered users.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : users.length !== 0 ? (
        <div className="overflow-x-auto bg-white border border-base-300 rounded-2xl">
          <h1 className="text-2xl text-secondary font-bold bg-white p-3 pb-0">
            All Users ({users.length})
          </h1>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>

                      <div className="font-bold">{user.name}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td
                    className={`badge text-white font-bold mt-2 ${
                      user.role === "admin"
                        ? "bg-primary"
                        : user.role === "manager"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td>
                    {new Date(user.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleUpdateRole(user.email, e.target.value)
                      }
                      defaultValue={user.role}
                      className="select select-accent w-auto border-primary outline-primary font-medium"
                    >
                      <option value="member" disabled={user.role === "member"}>
                        member
                      </option>
                      <option
                        value="manager"
                        disabled={user.role === "manager"}
                      >
                        manager
                      </option>
                      <option value="admin" disabled={user.role === "admin"}>
                        admin
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

export default ManageUsers;
