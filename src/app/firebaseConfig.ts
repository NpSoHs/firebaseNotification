// Import specific modules from Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { onMessage } from 'firebase/messaging';
import { getMessaging } from 'firebase/messaging/sw';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0Pp8bt8ASUbf0EVJ4iVhXpymI-dxVIQc",
  authDomain: "smartdoorbell-49fd1.firebaseapp.com",
  databaseURL: "https://smartdoorbell-49fd1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartdoorbell-49fd1",
  storageBucket: "smartdoorbell-49fd1.firebasestorage.app",
  messagingSenderId: "163361561997",
  appId: "1:163361561997:web:3d248b9e5380ac0cfff1c4"
};

// Initialize Firebase using the modular approach
const app = initializeApp(firebaseConfig);

// Get Firebase Database instance
const database = getDatabase(app);


const messaging = getMessaging(app);

export { database, messaging };
