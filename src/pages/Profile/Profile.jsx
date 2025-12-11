import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FiMail, FiSave, FiShield, FiUser } from "react-icons/fi";
import { useState } from "react";
import useRole from "../../hooks/useRole";
import { FaTimes } from "react-icons/fa";

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

          {!edit ? (
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
          ) : (
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-lg">Name</legend>
              <input
                type="text"
                className="input w-full rounded-lg"
                defaultValue={user?.displayName}
              />

              <legend className="fieldset-legend text-lg">Photo</legend>
              <input
                type="text"
                className="input w-full rounded-lg"
                defaultValue={user?.displayName}
              />

              <div className="flex gap-2 mt-3">
                <button className="btn text-white bg-primary hover:bg-primary/80 text-lg rounded-lg flex-1">
                  <FiSave />
                  Save Change
                </button>
                <button onClick={() => setEdit(false)} className="btn btn-outline border-2 text-primary text-lg rounded-lg hover:text-white hover:bg-primary flex-1">
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </fieldset>
          )}

          <button
            onClick={() => setEdit(true)}
            className="btn text-white bg-primary hover:bg-primary/80 text-lg rounded-lg w-full"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
