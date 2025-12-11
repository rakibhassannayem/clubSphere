import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
    <div>
      <h1 className="text-4xl text-primary p-5">Payemnt Successful!</h1>
    </div>
  );
};

export default PaymentSuccess;
