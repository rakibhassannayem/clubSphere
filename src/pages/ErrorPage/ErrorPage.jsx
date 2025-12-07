import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 items-center justify-center min-h-screen">
      <button onClick={() => navigate(-1)} className="btn btn-outline">
        Go Back
      </button>
      <button onClick={() => navigate("/")} className="btn btn-outline">
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
