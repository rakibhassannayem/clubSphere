import { FiUserCheck, FiUsers } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { MdOutlineEventAvailable, MdPayment } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager/overview`);
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
        <h2 className="text-2xl text-secondary font-bold">Manager Overview</h2>
        <p className="text-accent">
          Manage your clubs and track their performance.
        </p>

        {/* Stats */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">My Clubs</p>
              <LuBuilding2 size={24} className="text-green-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">
              {stats.myClubs}
            </h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Total Members</p>
              <FiUsers size={24} className="text-blue-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">
              {stats.totalMembers}
            </h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Total Events</p>
              <MdOutlineEventAvailable size={24} className="text-purple-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">{stats.totalEvents}</h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Revenue</p>
              <MdPayment size={24} className="text-primary" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">Banaaa</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
