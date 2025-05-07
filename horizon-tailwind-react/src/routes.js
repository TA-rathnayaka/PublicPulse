import React from "react";
import MainDashboard from "views/admin/default";
import Policies from "views/admin/policies";
import Polls from "views/admin/polls";
import PollCreate from "views/admin/polls/components/PollCreate";
import PolicyCreate from "views/admin/policies/components/PolicyCreate";
import DataTables from "views/admin/tables";
import SignIn from "views/auth/SignIn";
import PolicyDetails from 'views/admin/policies/components/PolicyDetails';
import PolicyHistory from 'views/admin/policies/components/PolicyHistory';
import PollHistory from 'views/admin/polls/components/PollHistory';
import PollDetails from 'views/admin/polls/components/PollDetails';



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
  MdExitToApp,
  MdPeople,
} from "react-icons/md";
import ManageEmployees from "views/admin/employees";
import SignUp from "views/auth/SignUp";
import ForgotPassword from "views/auth/ForgotPassword";



const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
    isDefault: true
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
    component: <Polls />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    hidden: true
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
    hidden: true
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgotPassword />,
    hidden: true
  },
  {
    name: "Manage Employees",
    layout: "/admin",
    path: "manage-employees",
    icon: <MdPeople className="h-6 w-6" />,
    component: <ManageEmployees/>,
 
    
  },

  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
 
  {
    name: "Go back",
    layout: "/dashboard",
    path: "",
    icon: <MdExitToApp className="h-6 w-6" />,
    
  },
  {
    name: "Policy Details",
    layout: "/admin",
    path: "policies/:policyId",
    icon: <MdPolicy className="h-6 w-6" />,
    component: <PolicyDetails />, 
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
  {
    name: "Poll Details",
    layout: "/admin",
    path: "polls/:pollId",
    icon: <MdPolicy className="h-6 w-6" />,
    component: <PollDetails />, 
    hidden: true
  },
  {
    name: "Polls History",
    layout: "/admin",
    path: "polls/all",
    icon: <MdHistory className="h-6 w-6" />,
    component: <PollHistory/>,
    hidden: true
    
  },
  {
    name: "Poll",
    layout: "/admin",
    path: "polls/create",
    icon: <MdHistory className="h-6 w-6" />,
    component: <PollCreate/>,
    hidden: true
    
  },
  
  {
    name: "Policy",
    layout: "/admin",
    path: "policies/create",
    icon: <MdHistory className="h-6 w-6" />,
    component: <PolicyCreate/>,
    hidden: true
    
  },
];

export default routes;