import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSkeleton from "../../../components/Shared/LoadingSkeleton/LoadingSkeleton";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ClubCard from "../../../components/Cards/ClubCard";
import useAuth from "../../../hooks/useAuth";

const MyClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-clubs/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">My Clubs</h2>
          <p className="text-accent">Clubs you're a member of.</p>
        </div>
        <Link to={"/clubs"} className="btn btn-primary text-white rounded-lg">
          Browse More Clubs
        </Link>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      ) : clubs.length !== 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl mt-10">
          You haven't joined any club yet!
        </p>
      )}
    </div>
  );
};

export default MyClubs;
