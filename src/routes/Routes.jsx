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
import ClubDetails from "../pages/Clubs/ClubDetails";
import MyEvents from "../pages/Dashboard/Member/MyEvents";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import ClubMembers from "../pages/Dashboard/Manager/ClubMembers";
import Profile from "../pages/Profile/Profile";
import EventRegistrations from "../pages/Dashboard/Manager/EventRegistrations";
import EventsManagement from "../pages/Dashboard/Manager/EventsManagement";
import ManagerOverview from "../pages/Dashboard/Manager/ManagerOverview";
import MemberOverview from "../pages/Dashboard/Member/MemberOverview";
import ManagerClubs from "../pages/Dashboard/Manager/ManagerClubs";
import MemberClubs from "../pages/Dashboard/Member/MemberClubs";

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
        path: "/club-details/:id",
        Component: ClubDetails,
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
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
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
      {
        path: "manager-overview",
        Component: ManagerOverview,
      },
      {
        path: "manager-clubs",
        Component: ManagerClubs,
      },

      {
        path: "club-members",
        Component: ClubMembers,
      },
      {
        path: "event-management",
        Component: EventsManagement,
      },
      {
        path: "event-registration",
        Component: EventRegistrations,
      },
      {
        path: "member-overview",
        Component: MemberOverview,
      },
      {
        path: "member-clubs",
        Component: MemberClubs,
      },
      {
        path: "my-events",
        Component: MyEvents,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
    ],
  },
]);
