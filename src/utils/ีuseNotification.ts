import { messaging } from "@/app/firebaseConfig";
import { onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { getNotificationPermission } from "./getNotificationPermission";
import { subscribeToTopic } from "./subscribeTopic";

export const useNotification = ()=>{
    useEffect(() => {
        onMessage(messaging, (payload) => {
          console.log("Message received.", payload);
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
    
      useEffect(() => {
        const fetchData = async () => {
          const currentToken = await getNotificationPermission();
          if (currentToken) {
            subscribeToTopic(currentToken, "bells");
          }
        };
        fetchData();
      }, []);
      
      
}