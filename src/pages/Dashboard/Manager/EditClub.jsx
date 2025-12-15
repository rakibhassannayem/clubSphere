import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading/Loading";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useNavigate, useParams } from "react-router";
import { FaRegEdit } from "react-icons/fa";

const EditClub = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: club = [], isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure(`/clubs/${id}`);
      return res.data;
    },
  });
  const { clubName, category, membershipFee, description, location } =
    club || {};

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.patch(`/clubs/${id}`, payload),
    onSuccess: () => {
      toast.success("Club updated Successfully!");
      mutationReset();
      navigate(`/club-details/${id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdateClub = async (data) => {
    const {
      clubName,
      bannerImage,
      category,
      membershipFee,
      description,
      location,
    } = data;

    try {
      let imageURL = club?.bannerImage;

      if (bannerImage && bannerImage.length > 0) {
        imageURL = await imageUpload(bannerImage[0]);
      }

      const clubData = {
        bannerImage: imageURL,
        clubName,
        description,
        location,
        category,
        membershipFee: Number(membershipFee),
        updatedAt: new Date(),
      };

      await mutateAsync(clubData);
      reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-5xl rounded-2xl shrink-0 shadow-2xl my-5">
        <div className="card-body">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <FaRegEdit size={24} /> <span>Edit Club</span>
          </div>

          <form onSubmit={handleSubmit(handleUpdateClub)}>
            <fieldset className="fieldset text-lg ">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-2">
                  <label className="font-medium">Club Name</label>
                  <input
                    type="text"
                    defaultValue={clubName}
                    placeholder="Enter club name"
                    className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("clubName", {
                      required: "Club name is required",
                    })}
                  />
                  {errors.clubName && (
                    <span className="text-sm text-red-500">
                      {errors.clubName.message}
                    </span>
                  )}

                  <div>
                    <label className="font-medium">Location</label>
                    <input
                      type="text"
                      defaultValue={location}
                      placeholder="City, State"
                      className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                      {...register("location", {
                        required: "Location is required",
                      })}
                    />
                    {errors.location && (
                      <span className="text-sm text-red-500">
                        {errors.location.message}
                      </span>
                    )}
                  </div>

                  <label className="font-medium">Description</label>
                  <textarea
                    type="text"
                    defaultValue={description}
                    placeholder="Write club description here..."
                    className="input w-full h-20 py-3 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <span className="text-sm text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <label className="font-medium">Category</label>
                  <select
                    defaultValue={category}
                    name="category"
                    className="w-full select h-12 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Photography">Photography</option>
                    <option value="Sports">Sports</option>
                    <option value="Tech">Tech</option>
                  </select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.category.message}
                    </p>
                  )}

                  <label className="font-medium">Banner Image</label>
                  <input
                    type="file"
                    className="file-input w-full h-11.5 rounded-xl text-gray-400 text-lg border focus:border-0 outline-primary"
                    {...register("bannerImage")}
                  />

                  <label className="font-medium">Membership Fee ($)</label>
                  <input
                    type="number"
                    defaultValue={membershipFee}
                    className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("membershipFee", {
                      required: "Membership Fee is required",
                      min: { value: 0, message: "Fee must be positive" },
                    })}
                  />
                  {errors.membershipFee && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.membershipFee.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary text-white rounded-xl text-lg mt-4 py-6"
              >
                {isPending ? (
                  <p className="loading loading-spinner text-success"></p>
                ) : (
                  "Update Club"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClub;
