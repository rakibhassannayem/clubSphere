import Loading from "../components/Shared/Loading/Loading";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const ManagerRoutes = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <Loading />;

  if (role === "manager") return children;

  return <Navigate to={"/"} />;
};

export default ManagerRoutes;
