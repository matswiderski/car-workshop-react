import { createContext, useState } from "react";

export const NotificationContext = createContext({
  notification: "",
  setNotification: () => {},
  notificationType: "",
  setNotificationType: () => {}
});

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");
  const context = {
    notification,
    setNotification,
    notificationType,
    setNotificationType
  };
  return (
    <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>
  );
};
