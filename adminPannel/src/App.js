import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import Layout from "./layout"; 
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Profile from "./pages/profile/Profile";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import Settings from "./pages/settins/Settings"; 
import ManagePolls from "./pages/managePoll/ManagePolls";
import Policies from "./pages/policies/PoliciesPage";
import PolicyDetails from "./pages/policyDetails/PolicyDetails";
import Notifications from "./pages/notifications/notifications";
import { NotificationsProvider, useNotifications } from "./context/NotificationsContext";
import PoliciesPage from './pages/policies/PoliciesPage';
import PollDetails from "./pages/pollDetails/pollDetails";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Layout > 
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/polls" element={<ManagePolls />} />
            <Route path="/polls/:pollId" element={<PollDetails/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="/policies" element={<Policies />} />
            <Route path="/policies/:policyId" element={<PolicyDetails />} />
            <Route path="/products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Routes>
          </Layout > 
        </BrowserRouter>
     
    </div>
  );
}

export default App;
