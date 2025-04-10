// import React, { useContext } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthProvider } from "./context/authContext";
// import Layout from "./layout";
// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import List from "./pages/list/List";
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";
// import Profile from "./pages/profile/Profile";
// import { productInputs, userInputs } from "./formSource";
// import "./style/dark.scss";
// import Settings from "./pages/settins/Settings";
// import ManagePolls from "./pages/managePoll/ManagePolls";
// import PolicyDetails from "./pages/policyDetails/PolicyDetails";
// import Notifications from "./pages/notifications/notifications";
// import ManagePolicies from "./pages/managePolicies/managePolicies";
// import PollDetails from "./pages/pollDetails/pollDetails";
// import ProtectedRoute from "./components/ProtectedRoute";
// import StatisticsPage from "./pages/statistics/statistics";
// import LandingPage from "./pages/landing/LandingPage.js";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);

//   return (
//     <AuthProvider>
//       <div className={darkMode ? "app dark" : "app"}>
//         <BrowserRouter>
//           <Routes>
//             {/* Non-admin routes (without Layout) */}
//             <Route path="login" element={<Login />} />
//             {/* Admin Panel Routes (with Layout) */}
//             <Route
//               path="/admin-panel/*"
//               element={
//                 <ProtectedRoute adminOnly>
//                   <Layout>
//                     <Routes>
//                       <Route path="/" element={<Home />} />
//                       <Route path="/statistics" element={<StatisticsPage />} />
//                       <Route
//                         path="/notifications"
//                         element={<Notifications />}
//                       />
//                       <Route path="/polls" element={<ManagePolls />} />
//                       <Route path="/polls/:pollId" element={<PollDetails />} />
//                       <Route path="/profile" element={<Profile />} />
//                       <Route path="/settings" element={<Settings />} />
//                       <Route path="/users" element={<List />} />
//                       <Route path="/users/:userId" element={<Single />} />
//                       <Route
//                         path="/users/new"
//                         element={
//                           <New inputs={userInputs} title="Add New User" />
//                         }
//                       />
//                       <Route path="/policies" element={<ManagePolicies />} />
//                       <Route
//                         path="/policies/:policyId"
//                         element={<PolicyDetails />}
//                       />
//                     </Routes>
//                   </Layout>
//                 </ProtectedRoute>
//               }
//             />
//             {/* More non-admin routes */}
//             <Route path="/some-other-page" element={<div>helooo</div>} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
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
import PolicyDetails from "./pages/policyDetails/PolicyDetails";
import Notifications from "./pages/notifications/notifications";
import ManagePolicies from "./pages/managePolicies/managePolicies";
import PollDetails from "./pages/pollDetails/pollDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import StatisticsPage from "./pages/statistics/statistics";
import LandingPage from "./pages/landing/LandingPage";
import ScrollToTop from "./components/landingPage/ScrollTop.js"; // Fixed typo: ScrollTop -> ScrollToTop
import UserDashboard from "./pages/user-dashboard/UserDashboard.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <AuthProvider>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />{" "}
            {/* Root shows landing page */}
            <Route path="/login" element={<Login />} />{" "}
            {/* Absolute path for login */}
            <Route
              path="/sign-up"
              element={<New inputs={userInputs} title="Register Department" />}
            />{" "}

            {/* User dashboard - accessible only when logged in */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Navbar showName={false}/>
                  <UserDashboard/>
                </ProtectedRoute>
              } 
            />
            {/* Absolute path for sign-up */}
            {/* Admin Panel Routes (protected) */}
            <Route
              path="/admin-panel/*"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/statistics" element={<StatisticsPage />} />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                      <Route path="/polls" element={<ManagePolls />} />
                      <Route path="/polls/:pollId" element={<PollDetails />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/users" element={<List />} />
                      <Route path="/users/:userId" element={<Single />} />
                      <Route
                        path="/users/new"
                        element={
                          <New inputs={userInputs} title="Add New User" />
                        }
                      />
                      <Route path="/policies" element={<ManagePolicies />} />
                      <Route
                        path="/policies/:policyId"
                        element={<PolicyDetails />}
                      />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
            {/* Other public routes */}
            <Route path="/" element={<div>helooo</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;