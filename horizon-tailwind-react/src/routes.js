import React from "react";
import MainDashboard from "views/admin/default";
import Policies from "views/admin/policies";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import SignIn from "views/auth/SignIn";
import Details from 'views/admin/policies/components/Details';
import PolicyHistory from 'views/admin/policies/components/PolicyHistory';


// Icon Imports
import {
  MdHome,
  MdHistory,
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
  },
  {
    name: "Polls",
    layout: "/admin",
    path: "polls",
    icon: <MdHowToVote className="h-6 w-6" />,
    component: <Policies />,
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
  },
  {
    name: "Policy Details",
    layout: "/admin",
    path: "policy/:policyId",
    icon: <MdPolicy className="h-6 w-6" />,
    component: <Details />, 
    hidden: true
  },
  {
    name: "Policy History",
    layout: "/admin",
    path: "policies/all",
    icon: <MdHistory className="h-6 w-6" />,
    component: <PolicyHistory/>,
    hidden: true
    
  },
];

export default routes;