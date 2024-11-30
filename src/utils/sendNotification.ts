import { IAccessTokenResponse } from "@/app/api/route";
import { database } from "@/app/firebaseConfig";
import { ref, set } from "firebase/database";

const getAccessTokenFromApi = async () => {
    try {
      const response = await fetch("/api"); // เรียก API ที่เราได้สร้างไว้
      const data = await response.json();
      console.log("this is data", data);
      return data; // คืนค่า access token ที่ได้จาก API
    } catch (error) {
      console.error("Error fetching access token:", error);
      return null;
    }
  };

const sendNotification = async () => {
    const notificationRef = ref(database, "/notification");
    set(notificationRef, "Someone Arrived");

      const accessTokenRes: IAccessTokenResponse = await getAccessTokenFromApi();
      if (!accessTokenRes.success) {
        console.error("Error getting access token:", accessTokenRes.error);
        return;
      }
      console.log("Access Token:", accessTokenRes.accessToken);
      fetch("https://fcm.googleapis.com/v1/projects/smartdoorbell-f9359/messages:send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenRes.accessToken}`, // ใช้ server key ที่ได้จาก Firebase Console
        },
        body: JSON.stringify({
          message: {
            topic: "eiei",
            notification: {
              title: "Door is Belling",
              body: "Someone is at the door!!!!",
            },
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const randomNum = Math.floor(Math.random() * 100);
          console.log("FCM Notification sent", data)
        })
        .catch((error) => console.error("Error sending FCM notification", error));
  };