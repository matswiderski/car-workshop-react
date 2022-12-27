import React, { useEffect, useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useNotification from "../hooks/useNotification";

function Notification() {
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    notification.setNotification(null);
  };
  useEffect(() => {
    if (notification.notification !== null) setOpen(true);
  }, [notification.notification]);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity="success"
        sx={{ width: "100%" }}
      >
        {notification.notification}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
