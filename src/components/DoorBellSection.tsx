"use client";
import { useEffect, useState } from "react";
import { database } from "../app/firebaseConfig"; // นำเข้าการตั้งค่า firebase
import { ref, set, onValue } from "firebase/database"; // นำเข้า Firebase SDK สำหรับ Realtime Database
import { messaging } from "../app/firebaseConfig"; // นำเข้าการตั้งค่า Firebase Messaging
import { getToken, onMessage } from "firebase/messaging"; // ฟังก์ชันที่ใช้ในการรับ token และการรับการแจ้งเตือน
import { AccessTokenResponse, getAccessToken } from "../app/api/route";
import { getNotificationPermission } from "@/utils/getNotificationPermission";

interface INotification {
  name:String
}

const DoorBellSection = () => {
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [lockStatus, setLockStatus] = useState<string>("");
  const [notification, setNotification] = useState<string>("");
  const [fcmToken, setFcmToken] = useState<string>("");
  const [notificationData, setNotificationData] = useState<INotification>({name:""});
  const vapidId = "BARZJgUtaLq72mpOUJPOl_kV4etRFIYH-V5fUTG4zoMCvHtmufyUqc1sIKl2mEyqiKFVTg3UyPANchFStithN9E";


  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received.", payload);
      setNotification(payload.notification?.body || "No notification message");
    });
  }, []);

  

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
    
  }, []);
  

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

  const sendNotification = async() => {
    const notificationRef = ref(database, "/notification");
    set(notificationRef, "Someone Arrived");
  
    if (fcmToken) {
      const accessTokenRes:AccessTokenResponse = await getAccessTokenFromApi();
      if(!accessTokenRes.success){
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
            token: fcmToken,
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
          setNotificationData({...data,["name"]:data.name + randomNum})
        })
        .catch((error) => console.error("Error sending FCM notification", error));
    }
  };
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received.", payload);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const currentToken = await getNotificationPermission();
      setFcmToken(currentToken);
    };
    fetchData();
  }, []);

  return (
    <div className="w-11">
      <h1>Realtime Firebase with Next.js</h1>
      <div className="flex gap-4">
    
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={sendNotification}
        >
          Send Notification
        </button>
        
      </div>

      <div className="flex flex-col text-wrap w-fit">
        {photoUrl && 
          (<div>
            Photo URL
            <img src={photoUrl} alt="Captured Photo" />
          </div>
        )}

          <div>
            Lock Status: {lockStatus}
          </div>

          <div>
            Notification: {notification}
          </div>

          <div className="text-wrap w-screen token-container break-words">
            Token: {fcmToken || "No token available"}
          </div>

          <div>
            Notification: {notificationData.name}
          </div>


      </div>
    </div>
  );
};

export default DoorBellSection;
