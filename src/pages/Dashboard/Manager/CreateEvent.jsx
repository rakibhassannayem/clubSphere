import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineAdd } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading/Loading";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useNavigate } from "react-router";
import { useState } from "react";
import { imageUpload } from "../../../utils";

const CreateEvent = () => {
  const [isPaid, setIsPaid] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-clubs?email=${user?.email}`);
      return res.data;
    },
  });

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post("/events", payload),
    onSuccess: () => {
      toast.success("Event Created Successfully!");
      mutationReset();
      navigate("/dashboard/events-management");
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

  const axiosSecure = useAxiosSecure();

  const handleCreateEvent = async (data) => {
    const {
      title,
      location,
      description,
      club,
      eventDate,
      bannerImage,
      eventFee,
    } = data;
    const imageFile = bannerImage[0];

    const selectedClub = clubs.find((c) => c._id === club);

    try {
      const imageURL = await imageUpload(imageFile);
      const eventData = {
        bannerImage: imageURL,
        clubId: club,
        clubName: selectedClub?.clubName || "",
        category: selectedClub?.category || "",
        title,
        description,
        eventDate: new Date(eventDate).toISOString(),
        location,
        isPaid: isPaid,
        eventFee: Number(eventFee),
        managerEmail: user.email,
        createdAt: new Date(),
        registrations: 0,
      };

      await mutateAsync(eventData);
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
          <div className="flex items-center text-2xl font-bold text-primary">
            <MdOutlineAdd size={28} /> <span>Create New Event</span>
          </div>

          <form onSubmit={handleSubmit(handleCreateEvent)}>
            <fieldset className="fieldset text-lg ">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-2">
                  <label className="font-medium">Event Title</label>
                  <input
                    type="text"
                    placeholder="Enter event title"
                    className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("title", {
                      required: "Event title is required",
                    })}
                  />
                  {errors.title && (
                    <span className="text-sm text-red-500">
                      {errors.title.message}
                    </span>
                  )}

                  <div>
                    <label className="font-medium">Location</label>
                    <input
                      type="text"
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
                    placeholder="Write event description here..."
                    className="input w-full h-31 py-3 rounded-xl focus:border-0 outline-primary text-lg"
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
                  <label className="font-medium">Club</label>
                  <select
                    defaultValue={""}
                    name="category"
                    className="w-full select h-12 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("club", {
                      required: "Club is required",
                    })}
                  >
                    <option value="" disabled>
                      Select Club
                    </option>
                    {clubs.map((club) => (
                      <option key={club._id} value={club?._id}>
                        {club?.clubName}
                      </option>
                    ))}
                  </select>
                  {errors.club && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.club.message}
                    </p>
                  )}

                  <label className="font-medium">Event Date</label>
                  <input
                    type="date"
                    className="input w-full py-5.5 rounded-xl focus:border-0 outline-primary text-lg"
                    min={today}
                    {...register("eventDate", {
                      required: "Event Date is required",
                    })}
                  />
                  {errors.eventDate && (
                    <span className="text-sm text-red-500">
                      {errors.eventDate.message}
                    </span>
                  )}

                  <label className="font-medium">Banner Image</label>
                  <input
                    type="file"
                    className="file-input w-full h-11.5 rounded-xl text-gray-400 text-lg border focus:border-0 outline-primary"
                    {...register("bannerImage", {
                      required: "Banner image is required",
                    })}
                  />
                  {errors.bannerImage && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.bannerImage.message}
                    </p>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Paid Event</label>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary h-8 w-13"
                      checked={isPaid}
                      onChange={(e) => setIsPaid(e.target.checked)}
                    />
                  </div>

                  {isPaid && (
                    <>
                      <label className="font-medium">Event Fee ($)</label>
                      <input
                        type="number"
                        defaultValue={0}
                        className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                        {...register("eventFee", {
                          required: "Event Fee is required",
                          min: { value: 1, message: "Fee must be positive" },
                        })}
                      />
                      {errors.eventFee && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.eventFee.message}
                        </p>
                      )}
                    </>
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
                  "Create Event"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
