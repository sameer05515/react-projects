import { toast } from "react-toastify";
import LoaderWithTitle, { LoaderStates } from "./LoaderWithTitle";

// Utility to clear previous notifications
const clearPreviousNotifications = () => {
  toast.dismiss();
  toast.clearWaitingQueue();
};

// Utility to show a notification
const notify = (message = "Processing your request...") => {
  clearPreviousNotifications();
  return toast(
    <LoaderWithTitle title={message} state={LoaderStates.spinner} />
  );
};

// Utility to update an existing notification
const updateNotification = (toastId, message, state = LoaderStates.spinner) => {
  if (toastId) {
    toast.update(toastId, {
      type: toast.TYPE.INFO,
      render: <LoaderWithTitle title={message} state={state} />,
    });
  }
};

export { clearPreviousNotifications, notify, updateNotification };
