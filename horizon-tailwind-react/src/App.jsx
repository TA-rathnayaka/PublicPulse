import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Marketplace from "views/admin/marketplace";
import Dashboard from "layouts/dashboard";
import { AuthProvider } from "context/authContext";
import Landing from "layouts/landing/index";
import InstitutionRegistration from "layouts/register/index";
import { InstituteProvider } from "context/InstituteContext";
import { NotificationsProvider } from "context/NotificationsContext"
import { SearchProvider } from "context/SearchContext";

const App = () => {
  return (
    <AuthProvider>
      <InstituteProvider>
        <NotificationsProvider>
          <SearchProvider>
            <Routes>
              <Route path="auth/*" element={<AuthLayout />} />

              <Route path="admin/*" element={<AdminLayout />} />
              <Route path="dashboard/*" element={<Dashboard />} />

              <Route path="/" element={<Landing />} />
              <Route path="register/" element={<InstitutionRegistration />} />
              
            </Routes>
          </SearchProvider>
        </NotificationsProvider>
      </InstituteProvider>
    </AuthProvider>
  );
};

export default App;
