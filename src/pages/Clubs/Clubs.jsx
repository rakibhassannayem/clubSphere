import { FiFilter } from "react-icons/fi";
import { FaSortAmountUp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ClubCard from "../../components/Cards/ClubCard";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  return (
    <div>
      <div className="bg-base-200 py-10 text-center">
        <h2 className="text-4xl font-semibold">Explore Clubs</h2>
        <p className="text-accent mt-2">
          Discover vibrant communities that match your interests. Join today and
          start connecting.
        </p>

        <div className="mt-5 w-8/12 mx-auto grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-14 gap-3">
          <label className="input h-11 col-span-1 sm:col-span-5 lg:col-span-8 w-full outline-none rounded-xl">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>

          <label className="select h-11 col-span-1 sm:col-span-3 lg:col-span-3 outline-none rounded-xl">
            <span className="label">
              <FiFilter />
            </span>
            <select defaultValue={""} name="filter">
              <option value="" disabled>
                All
              </option>
              <option value="Photography">Photography</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
            </select>
          </label>

          <label className="select h-11 col-span-1 sm:col-span-8 lg:col-span-3 outline-none rounded-xl">
            <span className="label">
              <FaSortAmountUp />
            </span>
            <select defaultValue={""} name="sort">
              <option value="" disabled>
                Most Members
              </option>
              <option value="Lowest Fee">Lowest Fee</option>
              <option value="Highest Fee">Highest Fee</option>
            </select>
          </label>
        </div>
      </div>
      <div className="container mx-auto">
        <p className="text-accent text-lg my-3">
          Showing{" "}
          <span className="font-bold text-secondary">{clubs?.length}</span>{" "}
          clubs
        </p>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubs;
