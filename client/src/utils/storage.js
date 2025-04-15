// Local storage keys
const STORAGE_KEYS = {
  TRIPS: "tripmate_trips",
  REMINDERS: "tripmate_reminders",
};

export const saveTrips = (trips) => {
  localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
};

export const getTrips = () => {
  const trips = localStorage.getItem(STORAGE_KEYS.TRIPS);
  return trips ? JSON.parse(trips) : [];
};

export const saveReminders = (reminders) => {
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
};

export const getReminders = () => {
  const reminders = localStorage.getItem(STORAGE_KEYS.REMINDERS);
  return reminders ? JSON.parse(reminders) : [];
};

export const createReminder = (tripId, message, date) => {
  const reminders = getReminders();
  const newReminder = {
    id: Date.now(),
    tripId,
    message,
    date,
    isNotified: false,
  };
  reminders.push(newReminder);
  saveReminders(reminders);
  return newReminder;
};

export const markReminderAsNotified = (reminderId) => {
  const reminders = getReminders();
  const updatedReminders = reminders.map((reminder) =>
    reminder.id === reminderId ? { ...reminder, isNotified: true } : reminder
  );
  saveReminders(updatedReminders);
};
