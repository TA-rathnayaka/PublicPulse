import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Policies from "views/admin/policies";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";


// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdPages,
  MdHowToVote,
  MdPolicy,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Policies",
    layout: "/admin",
    path: "policies",
    icon: <MdPolicy className="h-6 w-6" />,
    component: <Policies />,
    secondary: true,
  },
  {
    name: "Polls",
    layout: "/admin",
    path: "polls",
    icon: <MdHowToVote className="h-6 w-6" />,
    component: <Policies />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  }
];
export default routes;
