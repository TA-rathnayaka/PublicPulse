import { useNotifications } from "context/NotificationsContext";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsArrowBarUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Dropdown from "components/dropdown";


const NotificationDropdown = () => {
  const { notifications, markAsRead } = useNotifications();
  const navigate = useNavigate();
  
  console.log("notifications:", notifications);

  const unreadCount = notifications.filter((n) => n.status === "pending").length;

  const handleNotificationClick = async (notif) => {
    await markAsRead(notif.id);

    const route =
      notif.type === "polls"
        ? `${notif.instituteId}/polls/${notif.pollId}`
        : `${notif.instituteId}/policies/${notif.policyId}`;

    navigate(route);
  };

  return (
    <Dropdown
      button={
        <div className="relative cursor-pointer">
          <IoMdNotificationsOutline className="h-5 w-5 text-gray-600 dark:text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>
      }
      animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
      classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
      children={
        <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-navy-700 dark:text-white">
              Notifications
            </p>
          </div>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-300">
              No new notifications.
            </p>
          ) : (
            notifications.map((notif) => (
                <button
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={clsx(
                  "flex w-full items-start gap-3 rounded-md p-3 transition-colors duration-200",
                  notif.status === "pending"
                    ? "bg-blue-100 dark:bg-navy-700"
                    : "hover:bg-gray-100 dark:hover:bg-navy-800"
                )}
              >
                {notif.photoURL ? (
  <img
    src={notif.photoURL}
    alt="icon"
    className="h-10 w-10 rounded-full object-cover"
  />
) : (
  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A9 9 0 1119.879 6.196 9 9 0 015.12 17.804z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </div>
)}

                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {notif.title}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {notif.message}
                  </span>
                  {notif.createdAt && (
                    <span className="text-[10px] text-gray-400 mt-1">
                      {notif.createdAt.toLocaleString()}
                    </span>
                  )}
                </div>
              </button>
              
            ))
          )}
        </div>
      }
    />
  );
};

export default NotificationDropdown;
