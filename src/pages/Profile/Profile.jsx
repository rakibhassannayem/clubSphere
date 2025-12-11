import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FiMail, FiShield, FiUser } from "react-icons/fi";
import { useState } from "react";
import useRole from "../../hooks/useRole";
import Loading from "../../components/Shared/Loading/Loading";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();

  return (
    <div className="flex justify-center mt-5 px-3">
      <div className="shadow-2xl p-5 rounded-xl w-2xl">
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              user?.photoURL ||
              "https://icons.iconarchive.com/icons/icons8/windows-8/256/City-No-Camera-icon.png"
            }
            alt=""
            className="rounded-full w-20"
          />

          <h2 className="text-xl font-bold">{user?.displayName}</h2>
          <span className=" text-white font-semibold bg-primary w-full text-start pl-2 py-1 rounded-lg">
            {isRoleLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              role.charAt(0).toUpperCase() + role.slice(1)
            )}
          </span>

          <div className="w-full space-y-3">
            <div className="bg-base-200 w-full p-3 rounded-lg text-accent flex items-center gap-3">
              <FiUser size={24} />
              <div>
                <span>Name</span>
                <p className="text-secondary">{user?.displayName}</p>
              </div>
            </div>

            <div className="bg-base-200 w-full p-3 rounded-lg text-accent flex items-center gap-3">
              <FiMail size={23} />
              <div>
                <span>Email</span>
                <p className="text-secondary">{user?.email}</p>
              </div>
            </div>

            <div className="bg-base-200 w-full p-3 rounded-lg text-accent flex items-center gap-3">
              <FiShield size={23} />
              <div>
                <span>Role</span>
                <p className="text-secondary">
                  {isRoleLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    role.charAt(0).toUpperCase() + role.slice(1)
                  )}
                </p>
              </div>
            </div>
          </div>

          <Link className=" text-white font-semibold bg-primary w-full text-center text-lg pl-2 py-2 rounded-lg">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
