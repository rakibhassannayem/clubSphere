import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDoneOutline } from "react-icons/md";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post(`/payment-success`, { sessionId });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className="flex justify-center mt-[20vh] px-3">
      <div className="shadow-2xl p-5 text-center rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <MdDoneOutline size={60} className="text-primary" />
          <h1 className="text-4xl text-primary font-semibold">
            Payment Successful!
          </h1>
          <p className="text-accent text-lg">
            Thank you for joining. Please wait for the manager to aprrove you.
          </p>
          <Link
            to={"/dashboard/member-clubs"}
            className="btn btn-primary text-white rounded-lg text-lg"
          >
            Go to My Clubs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
