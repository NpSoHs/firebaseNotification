import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { onMessage } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging/sw';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmxKXgOdnnPvPsxOWc_fYRXjqkka7sjqs",
  authDomain: "smartdoorbell-f9359.firebaseapp.com",
  databaseURL: "https://smartdoorbell-f9359-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartdoorbell-f9359",
  storageBucket: "smartdoorbell-f9359.firebasestorage.app",
  messagingSenderId: "974346063979",
  appId: "1:974346063979:web:2695b2fd11063aeb2de12e"
};
// Initialize Firebase using the modular approach
const app = initializeApp(firebaseConfig);
// Get Firebase Database instance
const database = getDatabase(app);
// Initialize Firebase Messaging using the modular SDK
let messaging:any;
if (typeof window !== "undefined") {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((err) => {
        console.log('Service Worker registration failed:', err);
      });
  }
  // Initialize Firebase Messaging
  messaging = getMessaging(app);
  // Handle foreground messages
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    // Handle foreground notification here (you can display a notification or handle the data)
  });
}
export { database, messaging };