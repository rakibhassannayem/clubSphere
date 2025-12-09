import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { GrOverview } from "react-icons/gr";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <TbLayoutSidebarLeftExpand size={18} />
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <img className="rounded w-full" src={logo} alt="" />
                <span className="is-drawer-close:hidden">
                  <p className="text-3xl font-bold">
                    Club<span className="text-primary">Sphere</span>
                  </p>
                </span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to={"/dashboard/admin-overview"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Manage Users"
              >
                <GrOverview />
                <span className="is-drawer-close:hidden">Manage Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/manage-users"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Manage Users"
              >
                <FaUsersCog />
                <span className="is-drawer-close:hidden">Manage Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/manage-clubs"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="Manage Clubs"
              >
                <LuBuilding2 />
                <span className="is-drawer-close:hidden">Manage Clubs</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/payments"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-lg"
                data-tip="View Payments"
              >
                <MdOutlinePayment />
                <span className="is-drawer-close:hidden">View Payments</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
