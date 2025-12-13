import { FiUserCheck, FiUsers } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { MdEventNote, MdPayment, MdPendingActions } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/overview`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-base-200 p-4">
      <div>
        <h2 className="text-2xl text-secondary font-bold">Admin Overview</h2>
        <p className="text-accent">
          Welcome back! Here's what's happening on ClubSphere.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Total Users</p>
              <FiUsers size={24} className="text-blue-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">
              {stats.totalUsers}
            </h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Total Clubs</p>
              <LuBuilding2 size={24} className="text-green-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">{stats.totalClubs}</h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Active Members</p>
              <FiUserCheck size={24} className="text-purple-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">{stats.activeMembers}</h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Total Events</p>
              <MdEventNote size={24} className="text-orange-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">thik kor</h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Revenue</p>
              <MdPayment size={24} className="text-primary" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">thik kor</h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Pending Clubs</p>
              <MdPendingActions size={24} className="text-orange-400" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">{stats.pendingClubs}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
