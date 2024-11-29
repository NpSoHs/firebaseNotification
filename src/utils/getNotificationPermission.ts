import { messaging } from "@/app/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";

export const getNotificationPermission = async () => {
    const vapidId = "BARZJgUtaLq72mpOUJPOl_kV4etRFIYH-V5fUTG4zoMCvHtmufyUqc1sIKl2mEyqiKFVTg3UyPANchFStithN9E";
    try {
      if (Notification.permission === "granted") {
        const currentToken = await getToken(messaging, { vapidKey: vapidId });
        if (currentToken) {
          console.log("FCM Token:", currentToken);
          return currentToken;
        } else {
          console.log("No registration token available.");
          return ""
        }
      } else if (Notification.permission === "denied") {
        alert("Please enable notifications in your browser settings.");
        return ""
      } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, { vapidKey: vapidId });
          if (currentToken) {
            console.log("FCM Token:", currentToken);
            return currentToken;

          } else {
            console.log("No registration token available.");
            return ""
          }
        } else {
          console.log("Permission not granted for notifications.");
          return ""
        }
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
      return ""
    }
  };

  