import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "components/navbar";
import Footer from "components/footer/Footer";
import Marketplace from "views/admin/marketplace";
import ManageUsers from "views/admin/users";
import ManageInstitutes from "views/admin/institutes";
import { MdHome, MdPerson, MdBusiness, MdMan } from "react-icons/md";
import { useAuth } from "../../context/authContext";
import Profile from "views/admin/profile";

export default function Dashboard(props) {
  const { ...rest } = props;
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole } = useAuth();

  React.useEffect(() => {
    const handleResize = () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true);
    handleResize(); // call once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getBrandText = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/manage-users":
        return "Manage Users";
        case "/dashboard/manage-institutes":
          return "Manage Institutes";
      case "/dashboard/Profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  const activeRoute = (routePath) => {
    return location.pathname === routePath;
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <MdHome className="h-6 w-6" />,
      path: "/dashboard",
      showAlways: true,
    },
    {
      title: "Manage Users",
      icon: <MdPerson className="h-6 w-6" />,
      path: "/dashboard/manage-users",
      showForRole: "super-admin",
    },
    {
      title: "Manage Institutes",
      icon: <MdBusiness className="h-6 w-6" />,
      path: "/dashboard/manage-institutes",
      showForRole: "super-admin",
    },
    {
      title: "Profile",
      icon: <MdMan className="h-6 w-6" />,
      path: "/dashboard/Profile",
      showAlways: true,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  document.documentElement.dir = "ltr";

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div
        className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
          open ? "translate-x-0" : "-translate-x-96"
        }`}
      >
        <div className="mx-[56px] mt-[50px] flex items-center">
          <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            Public <span className="font-medium">Pulse</span>
          </div>
        </div>
        <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

        {/* Nav Items */}
        <div className="flex flex-col">
          {sidebarItems.map((item) =>
            item.showAlways || userRole === item.showForRole ? (
              <div
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`mb-2 flex cursor-pointer items-center px-8 py-3  ${
                  activeRoute(item.path)
                    ? ""
                    : ""
                }`}
              >
                <div
                  className={`${
                    activeRoute(item.path)
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`leading-1 ml-4 flex ${
                    activeRoute(item.path)
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText="PublicPulse"
              brandText={getBrandText()}
              secondary=""
              {...rest}
            />
            <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                <Route path="/" element={<Marketplace />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="manage-institutes" element={<ManageInstitutes />} />
                <Route path="Profile" element={<Profile />} />
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
