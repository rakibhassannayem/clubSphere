import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Auth/Login/Login";
import Registration from "../pages/Auth/Registration/Registration";
import Clubs from "../pages/Clubs/Clubs";
import Events from "../pages/Events/Events";
import PrivateRoutes from "./PrivateRoutes";
import CreateClub from "../pages/Dashboard/Manager/CreateClub";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import ManageClubs from "../pages/Dashboard/Admin/ManageClubs";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Payments from "../pages/Dashboard/Admin/Payments";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "clubs",
        Component: Clubs,
      },
      {
        path: "/events",
        element: (
          <PrivateRoutes>
            <Events />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Registration,
      },
      {
        path: "/create-club",
        Component: CreateClub,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "admin-overview",
        Component: AdminOverview,
      },
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: "manage-clubs",
        Component: ManageClubs,
      },
      {
        path: "payments",
        Component: Payments,
      },
    ],
  },
]);
