import { useNavigate, useRouteError } from "react-router";
import { AlertCircle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen bg-base-100 text-center px-4">
      <div className="text-error">
        <AlertCircle size={80} />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="text-lg opacity-80">
          {error?.status === 404
            ? "The page you are looking for doesn't exist."
            : "Something went wrong."}
        </p>

        {error && error.status !== 404 && (
          <p className="text-sm opacity-60 italic max-w-md mx-auto">
            {error.statusText || error.message}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={() => navigate(-1)} className="btn btn-outline">
          Go Back
        </button>
        <button onClick={() => navigate("/")} className="btn btn-primary text-white">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
