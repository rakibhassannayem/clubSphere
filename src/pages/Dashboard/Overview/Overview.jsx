import Loading from "../../../components/Shared/Loading/Loading";
import useRole from "../../../hooks/useRole";
import AdminOverview from "../Admin/AdminOverview";
import ManagerOverview from "../Manager/ManagerOverview";
import MemberOverview from "../Member/MemberOverview";

const Overview = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) return <Loading />;
  return (
    <div>
      {role === "admin" ? (
        <AdminOverview />
      ) : role === "manager" ? (
        <ManagerOverview />
      ) : (
        <MemberOverview />
      )}
    </div>
  );
};

export default Overview;
