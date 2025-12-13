import Loading from "../components/Shared/Loading/Loading";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const MemberRoutes = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <Loading />;

  if (role === "member") return children;

  return <Navigate to={"/"} />;
};

export default MemberRoutes;
