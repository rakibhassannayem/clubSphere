import useAuth from "../hooks/useAuth";
import Loading from "../components/Shared/Loading/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }
  return children;
};

export default PrivateRoutes;
