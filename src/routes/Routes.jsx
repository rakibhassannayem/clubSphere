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
import MemberOverview from "../pages/Dashboard/Member/MemberOverview";
import ManagerClubs from "../pages/Dashboard/Manager/ManagerClubs";
import MemberClubs from "../pages/Dashboard/Member/MemberClubs";
import Overview from "../pages/Dashboard/Overview/Overview";
import ManagerRoutes from "./ManagerRoutes";
import AdminRoutes from "./AdminRoutes";
import MemberRoutes from "./MemberRoutes";

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
        path: "overview",
        Component: Overview,
      },
      // Admin Routes
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-clubs",
        element: (
          <AdminRoutes>
            <ManageClubs />
          </AdminRoutes>
        ),
      },
      {
        path: "payments",
        element: (
          <AdminRoutes>
            <Payments />
          </AdminRoutes>
        ),
      },

      // Manager's Routes
      {
        path: "create-club",
        element: (
          <ManagerRoutes>
            <CreateClub />
          </ManagerRoutes>
        ),
      },
      {
        path: "manager-clubs",
        element: (
          <ManagerRoutes>
            <ManagerClubs />
          </ManagerRoutes>
        ),
      },
      {
        path: "club-members",
        element: (
          <ManagerRoutes>
            <ClubMembers />
          </ManagerRoutes>
        ),
      },
      {
        path: "events-management",
        element: (
          <ManagerRoutes>
            <EventsManagement />
          </ManagerRoutes>
        ),
      },
      {
        path: "event-registrations",
        element: (
          <ManagerRoutes>
            <EventRegistrations />
          </ManagerRoutes>
        ),
      },

      // Member's Routes
      {
        path: "member-clubs",
        element: (
          <MemberRoutes>
            <MemberClubs />
          </MemberRoutes>
        ),
      },
      {
        path: "payment-history",
        element: (
          <MemberRoutes>
            <PaymentHistory />
          </MemberRoutes>
        ),
      },
      {
        path: "my-events",
        Component: MyEvents,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
    ],
  },
]);
