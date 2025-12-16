import { LuBuilding2 } from "react-icons/lu";
import { MdOutlineEventAvailable, MdPayment } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import useAuth from "../../../hooks/useAuth";

const MemberOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["member-overview"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/overview`);
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
        <h2 className="text-2xl text-secondary font-bold">
          Welcome back, {user?.displayName}
        </h2>
        <p className="text-accent">Here's what's happening with your clubs.</p>

        {/* Stats */}
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">My Clubs</p>
              <LuBuilding2 size={24} className="text-green-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">
              {stats.totalClubs}
            </h2>
          </div>

          <div className="bg-white border border-base-300 shadow rounded-xl p-5">
            <div className="flex items-center justify-between h-12">
              <p className="text-lg text-accent">Total Events</p>
              <MdOutlineEventAvailable size={24} className="text-purple-500" />
            </div>
            <h2 className="text-secondary font-semibold text-3xl">
              {stats.totalEvents}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
