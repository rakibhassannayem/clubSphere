import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading/Loading";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useNavigate, useParams } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const EditEvent = () => {
  const [isPaidCheck, setIsPaidCheck] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const { data: clubs = {}, isLoading: clubsLoading } = useQuery({
    queryKey: ["clubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager-clubs?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: event = {}, isLoading } = useQuery({
    queryKey: ["event", id],
    staleTime: 0,
    enabled: !!id,
    refetchOnMount: "always",
    queryFn: async () => {
      const res = await axiosSecure(`/events/${id}`);
      return res.data;
    },
  });
  // console.log(event)

  const {
    eventTitle,
    location,
    description,
    club,
    eventDate,
    eventFee,
    maxAttendees,
    isPaid,
  } = event || {};

  useEffect(() => {
    // console.log(isPaid)
    setIsPaidCheck(isPaid);
  }, [isPaid]);

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axiosSecure.patch(`/events/${id}`, payload),
    onSuccess: () => {
      toast.success("Event updated Successfully!");
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

  const handleUpdateEvent = async (data) => {
    const {
      eventTitle,
      location,
      description,
      club,
      eventDate,
      bannerImage,
      eventFee,
      maxAttendees,
      category,
    } = data;
    const selectedClub = clubs.find((c) => c._id === club);

    try {
      let imageURL = club?.bannerImage;
      setImgLoading(true);
      if (bannerImage && bannerImage.length > 0) {
        imageURL = await imageUpload(bannerImage[0]);
        setImgLoading(false);
      }

      const eventData = {
        eventTitle,
        bannerImage: imageURL,
        clubId: club,
        clubName: selectedClub.clubName,
        category,
        description,
        eventDate,
        location,
        isPaid: isPaidCheck,
        eventFee: isPaidCheck ? Number(eventFee) : 0,
        maxAttendees: Number(maxAttendees),
        updatedAt: new Date(),
      };

      await mutateAsync(eventData);
      reset();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  if (isLoading || clubsLoading) return <Loading />;
  if (isError) return <ErrorPage />;
  const formattedDate = eventDate.split("T")[0];

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-5xl rounded-2xl shrink-0 shadow-2xl my-5">
        <div className="card-body">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <FaRegEdit size={24} /> <span>Edit Event</span>
          </div>

          <form onSubmit={handleSubmit(handleUpdateEvent)}>
            <fieldset className="fieldset text-lg ">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-2">
                  <label className="font-medium">Event Title</label>
                  <input
                    type="text"
                    defaultValue={eventTitle}
                    placeholder="Enter event title"
                    className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("eventTitle", {
                      required: "Event title is required",
                    })}
                  />
                  {errors.eventTitle && (
                    <span className="text-sm text-red-500">
                      {errors.eventTitle.message}
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
                    placeholder="Write event description here..."
                    className="input w-full h-20 py-3 rounded-xl focus:border-0 outline-primary text-lg resize-none whitespace-pre-wrap"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <span className="text-sm text-red-500">
                      {errors.description.message}
                    </span>
                  )}

                  <label className="font-medium">Club</label>
                  <select
                    defaultValue={club}
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
                </div>

                <div className="flex-1 space-y-2">
                  <label className="font-medium">Event Date</label>
                  <input
                    type="date"
                    defaultValue={formattedDate}
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
                    {...register("bannerImage")}
                  />
                  <label className="font-medium">Max Attendees</label>
                  <input
                    type="number"
                    defaultValue={maxAttendees}
                    className="input w-full py-6 rounded-xl focus:border-0 outline-primary text-lg"
                    {...register("maxAttendees", {
                      required: "Max Attendees is required",
                      min: {
                        value: 1,
                        message: "Max attendee  must be at least 1.",
                      },
                    })}
                  />
                  {errors.maxAttendees && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.maxAttendees.message}
                    </p>
                  )}

                  <div className="flex flex-col gap-2">
                    <label className="font-medium">Paid Event</label>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary h-8 w-13"
                      checked={isPaidCheck && "checked"}
                      onChange={(e) => setIsPaidCheck(e.target.checked)}
                    />
                  </div>

                  {isPaidCheck && (
                    <>
                      <label className="font-medium">Event Fee ($)</label>
                      <input
                        type="number"
                        defaultValue={eventFee}
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
                {isPending || imgLoading ? (
                  <div>
                    <p className="loading loading-spinner text-success"></p>
                  </div>
                ) : (
                  "Update Event"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
