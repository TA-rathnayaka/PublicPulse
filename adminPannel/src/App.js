import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthProvider } from "./context/authContext";
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
import ManagePolicies from './pages/managePolicies/managePolicies';
import PollDetails from "./pages/pollDetails/pollDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <AuthProvider>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Layout> 
            <Routes>
              <Route path="login" element={<Login />} />
              

              <Route 
                path="/" 
                element={
                  <ProtectedRoute adminOnly>
                    <Home />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute adminOnly>
                    <Notifications />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/polls" 
                element={
                  <ProtectedRoute adminOnly>
                    <ManagePolls />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/polls/:pollId" 
                element={
                  <ProtectedRoute adminOnly>
                    <PollDetails />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute adminOnly>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute adminOnly>
                    <Settings />
                  </ProtectedRoute>
                } 
              />

              {/* Routes accessible to super admins only */}
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute superAdminOnly>
                    <List />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/users/:userId" 
                element={
                  <ProtectedRoute superAdminOnly>
                    <Single />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/users/new" 
                element={
                  <ProtectedRoute superAdminOnly>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/policies" 
                element={
                  <ProtectedRoute adminOnly>
                    <ManagePolicies />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/policies/:policyId" 
                element={
                  <ProtectedRoute adminOnly>
                    <PolicyDetails />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout> 
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
