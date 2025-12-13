import Loading from "../components/Shared/Loading/Loading";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminRoutes = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <Loading />;

  if (role === "admin") return children;

  return <Navigate to={"/"} />;
};

export default AdminRoutes;