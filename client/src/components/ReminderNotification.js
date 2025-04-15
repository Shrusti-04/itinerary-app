import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { getReminders, markReminderAsNotified } from "../utils/storage";

const ReminderNotification = () => {
  const [notification, setNotification] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check for reminders every minute
    const checkReminders = () => {
      const reminders = getReminders();
      const now = new Date();

      const dueReminder = reminders.find((reminder) => {
        const reminderDate = new Date(reminder.date);
        return !reminder.isNotified && reminderDate <= now;
      });

      if (dueReminder) {
        setNotification(dueReminder);
        setOpen(true);
        markReminderAsNotified(dueReminder.id);
      }
    };

    checkReminders(); // Check immediately
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (!notification) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default ReminderNotification;
