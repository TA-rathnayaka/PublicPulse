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
                  "flex w-full items-center rounded-lg transition-colors duration-200",
                  notif.status === "pending"
                    ? "bg-gray-100 dark:bg-navy-600"
                    : "hover:bg-gray-50 dark:hover:bg-navy-800"
                )}
              >
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <img
                    src={notif.photoUrl}
                    alt="icon"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm text-left">
                  <p className="mb-1 text-base font-bold text-gray-900 dark:text-white">
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {notif.message}
                  </p>
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
