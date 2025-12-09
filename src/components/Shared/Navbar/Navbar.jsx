import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import { FiLogIn } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/clubs"}>Clubs</NavLink>
      </li>
      <li>
        <NavLink to={"/create-club"}>Create Club</NavLink>
      </li>
      <li>
        <NavLink to={"/events"}>Events</NavLink>
      </li>
      {!user && (
        <div className="sm:hidden space-y-2">
          <li>
            <Link to={"/login"} className="btn btn-ghost text-lg">
              <FiLogIn />
              Login
            </Link>
          </li>
          <li>
            <Link
              to={"/register"}
              className="btn btn-primary text-white text-lg"
            >
              <RiUserAddLine />
              Register
            </Link>
          </li>
        </div>
      )}
    </>
  );

  const handleLogout = () => {
    logout()
      .then(toast.success("Logout successful!"))
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            <Logo></Logo>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end ">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://icons.iconarchive.com/icons/dakirby309/windows-8-metro/256/Folders-OS-User-No-Frame-Metro-icon.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to={"/profile"}>Profile</NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard"}>Dashboard</NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn bg-red-500 text-white text-lg"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-2 hidden sm:block">
              <Link to={"/login"} className="btn btn-ghost text-lg">
                <FiLogIn />
                Login
              </Link>
              <Link
                to={"/register"}
                className="btn btn-primary text-white rounded-xl text-lg"
              >
                <RiUserAddLine />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
