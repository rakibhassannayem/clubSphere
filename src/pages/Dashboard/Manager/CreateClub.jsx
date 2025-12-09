import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineAdd } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading/Loading";
import ErrorPage from "../../ErrorPage/ErrorPage";

const CreateClub = () => {
  const { user } = useAuth();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/clubs", payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Club Created Successfully!");
      mutationReset();
    },
    onError: (error) => {
      toast.error('Please try again.');
    },
    // onMutate: (payload) => {
    //   console.log("i will post this data-------->", payload);
    // },
    // onSettled: (data, error) => {
    //   if (data) console.log(data);
    //   if (error) console.log(error);
    // },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const handleCreateClub = async (data) => {
    const {
      clubName,
      description,
      location,
      category,
      bannerImage,
      membershipFee,
    } = data;
    const imageFile = bannerImage[0];

    try {
      const imageURL = await imageUpload(imageFile);
      const clubData = {
        bannerImage: imageURL,
        clubName,
        description,
        location,
        category,
        membershipFee: Number(membershipFee),
        managerEmail: user.email,
        createdAt: new Date(),
        members: 0,
        status: "pending",
      };

      await mutateAsync(clubData);
      reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  if (isPending) return <Loading />;

  if (isError) return <ErrorPage />;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-5xl rounded-2xl shrink-0 shadow-2xl my-5">
        <div className="card-body">
          <div className="flex items-center text-2xl font-bold text-primary">
            <MdOutlineAdd size={28} /> <span>Create New Club</span>
          </div>

          <form onSubmit={handleSubmit(handleCreateClub)}>
            <fieldset className="fieldset text-lg ">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-2">
                  <label className="font-medium">Club Name</label>
                  <input
                    type="text"
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
                      placeholder="City, State"
                      className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                      {...register("location", {
                        required: "Location name is required",
                      })}
                    />
                    {errors.location && (
                      <span className="text-sm text-red-500">
                        {errors.location.message}
                      </span>
                    )}
                  </div>

                  <label className="font-medium">Dscription</label>
                  <textarea
                    type="text"
                    placeholder="Write club description here..."
                    className="input w-full h-20 py-3 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("description", {
                      required: "Description name is required",
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
                    defaultValue={""}
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
                    {...register("bannerImage", {
                      required: "Banner image name is required",
                    })}
                  />
                  {errors.bannerImage && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.bannerImage.message}
                    </p>
                  )}

                  <label className="font-medium">Membership Fee ($)</label>
                  <input
                    type="number"
                    defaultValue={0}
                    className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("membershipFee", {
                      required: "Membership Fee is required",
                      min: { value: 0, message: "Price must be positive" },
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
                className="btn btn-primary text-white rounded-xl text-lg mt-4 py-6"
              >
                {isPending ? (
                  <p className="loading loading-spinner text-success"></p>
                ) : (
                  "Create Club"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
