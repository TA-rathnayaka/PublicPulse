import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Marketplace from "views/admin/marketplace";
import Dashboard from "layouts/dashboard";
import { AuthProvider } from "context/authContext";
import Landing from "layouts/landing/index";
import InstitutionRegistration from "layouts/register/index"

const App = () => {
  return (
    <AuthProvider>
    <Routes>
      
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Landing/>} />
      <Route path="register/" element={<InstitutionRegistration />} />
      <Route path="dashboard/*" element={<Dashboard />} />

      
    </Routes>
    </AuthProvider>
  );
};

export default App;
