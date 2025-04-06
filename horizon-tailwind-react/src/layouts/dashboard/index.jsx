import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Footer from "components/footer/Footer";
import Marketplace from "views/admin/marketplace";
import ManageUsers from "views/admin/users";
import ManageInstitutes from "views/admin/institutes";

export default function Dashboard(props) {
  const { ...rest } = props;
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  const getBrandText = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/manage-users":
        return "Manage Users";
      case "/dashboard/manage-institutes":
        return "Manage Institutes";
      default:
        return "Dashboard";
    }
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <div
            className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
              open ? "translate-x-0" : "-translate-x-96"
            }`}
          >

      
            <div className={`mx-[56px] mt-[50px] flex items-center`}>
              <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                Public <span class="font-medium">Pulse</span>
              </div>
            </div>
            <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
            {/* Nav item */}
      
            {/* Nav item end */}
          </div>
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"PublicPulse"}
              brandText={getBrandText()}
              secondary={""}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                <Route
                  path="/"
                  element={<Marketplace/>}
                />
                <Route
                  path="/manage-users"
                  element={<ManageUsers/>}
                />
                <Route
                  path="/manage-institutes"
                  element={<ManageInstitutes/>}
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
  );
}
