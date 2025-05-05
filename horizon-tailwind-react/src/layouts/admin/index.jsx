import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { InstituteProvider, useInstituteData } from "../../context/InstituteContext";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "../../routes";
import { useAuth } from "../../context/authContext";
import { PolicyProvider } from "context/PolicyContext";
import { PollProvider } from "context/PollContext";


export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const { instituteId } = useInstituteData();
  const [open, setOpen] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("Dashboard");

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  useEffect(() => {
    getActiveRoute(routes);
    console.log("current route is ", currentRoute);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
  
    // Loop over admin routes to check if current path matches
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].layout === "/admin") {
        // Build the expected full path for the route
        const fullRoutePath = `/${instituteId}/${routes[i].path}`;
        if (location.pathname.includes(fullRoutePath)) {
          activeRoute = routes[i].name;
          break;
        }
      }
    }
  
    // Fallback: if the pathname starts with /admin/{instituteId}/ but no specific route matched,
    // then consider it the Admin Panel.
    if (activeRoute === "Main Dashboard" && location.pathname.startsWith(`/${instituteId}/`)) {
      activeRoute = "Admin Panel";
    }
  
    setCurrentRoute(activeRoute);
    return activeRoute;
  };
  
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
  
    // Loop over admin routes to check if current path matches for navbar secondary setting
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].layout === "/admin") {
        const fullRoutePath = `/${instituteId}/${routes[i].path}`;
        if (location.pathname.includes(fullRoutePath)) {
          activeNavbar = routes[i].secondary;
          break;
        }
      }
    }
  
    return activeNavbar;
  };
  

  // Updated getRoutes function: now directly uses the JSX element from the routes file.
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
  key={key}
  path={`/${instituteId}/${prop.path}`}
  element={prop.component}  // ❌ remove <InstituteProvider> here
/>

        );
      }
      return null;
    });
  };

  document.documentElement.dir = "ltr";

  return (
    
     <PolicyProvider instituteId={instituteId}>
      <PollProvider instituteId={instituteId}>
      <div className="flex h-full w-full">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
          <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                logoText={"PublicPulse"}
                brandText={currentRoute}
                secondary={getActiveNavbar(routes)}
                {...rest}
              />
              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to={`/admin/${instituteId}/default`} replace />}
                  />
                </Routes>
              </div>
              <div className="p-3">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
      </PollProvider>
      </PolicyProvider>
    
  );
}
