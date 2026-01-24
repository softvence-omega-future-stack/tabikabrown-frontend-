// import DashboardLayout from "@/layout/DashboardLayout";
// import Complains from "@/pages/Complains";
// import Dashboard from "@/pages/Dashboard";
// import DriverManagement from "@/pages/DriverManagement";
// import NotificationsManagement from "@/pages/NotificationsManagement";
// import PricingConfiguration from "@/pages/PricingConfiguration";
// import Riders from "@/pages/Riders";
// import TransactionHistory from "@/pages/TransactionHistory";
// import TipManagement from "@/pages/TripManagement";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import UserManagmentPage from "../pages/UserManagmentPage";
import Settings from "../pages/Settings";
import Analytics from "../pages/Analytics";
import ProviderManagment from "../pages/ProviderManagment";
import ContentManagment from "../pages/ContentManagment";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    //   {
    //     index: true,
    //     element: <LoginPage />,
    //   },
    //   {
    //     path: "/login",
    //     element: <LoginPage />,
    //   },
    //   {
    //     path: "/signup",
    //     element: <SignupPage />,
    //   },
    //   {
    //     path: "/forget_password",
    //     element: <ForgotPasswordPage />,
    //   },
    //   {
    //     path: "/otp",
    //     element: <OTPPage />,
    //   },
    //   {
    //     path: "/new_password",
    //     element: <CreateNewPasswordPage />,
    //   },
    //   {
    //     path: "/successfull",
    //     element: <SuccessFullPage />,
    //   },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
        //   { path: '', element: <Dashboard /> },
       { path: "users-managment", element: <UserManagmentPage /> },
       { path: "content-managment", element: <ContentManagment /> },
       { path: "provider-managment", element: <ProviderManagment /> },
       { path: "analytics", element: <Analytics /> },
       { path: "settings", element: <Settings /> },

        ],
      },
    ],
  },
]);

export default routes;
