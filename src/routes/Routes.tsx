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
import LoginPage from "../auth/Login";
import SignUpPage from "../auth/SignUp";
import ForgetPassword from "../auth/ForgetPassword";
import VerifyOTP from "../auth/VerifyOTP";
import ResetPassword from "../auth/ResetPassword";
import ProfilePage from "../Component/settings/Profile";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
 
      {
        path: "/forget_password",
        element: <ForgetPassword />,
      },
      {
        path: "/otp",
        element: <VerifyOTP />,
      },
      {
        path: "/reset_password",
        element: <ResetPassword />,
      },
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
       { path: "profile", element: <ProfilePage /> },
           
        ],
      },
    ],
  },
]);

export default routes;
