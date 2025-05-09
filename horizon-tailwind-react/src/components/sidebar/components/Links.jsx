/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
import { useInstituteData } from "../../../context/InstituteContext"; // Import useInstituteData
import { useNavigate } from "react-router-dom";

// inside component

export function SidebarLinks(props) {
  let location = useLocation();
  const { routes } = props;
  const navigate = useNavigate();
  // Get instituteData and instituteId from context
  const { instituteId } = useInstituteData();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      // Skip routes that are hidden
      if (route.hidden) {
        return null;
      }
      
      if (route.name === "Go back") {
        return (
          <div key={index} onClick={() => navigate("/dashboard")}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span className="font-medium text-gray-600">{route.icon}</span>
                <p className="leading-1 ml-4 flex font-medium text-gray-600">
                  {route.name}
                </p>
              </li>
            </div>
          </div>
        );
      }
      if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        // Append instituteId to the path dynamically
        let linkPath =
          route.layout === "/admin"
            ? `/admin/${instituteId}/${route.path}`
            : `${route.layout}/${route.path}`;

        return (
          <Link key={index} to={linkPath}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path)
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path)
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) && (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              )}
            </div>
          </Link>
        );
      }
      return null;
    });
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
