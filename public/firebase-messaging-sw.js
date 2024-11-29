// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
// import { getMessaging } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js';
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCmxKXgOdnnPvPsxOWc_fYRXjqkka7sjqs",
  authDomain: "smartdoorbell-f9359.firebaseapp.com",
  databaseURL: "https://smartdoorbell-f9359-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartdoorbell-f9359",
  storageBucket: "smartdoorbell-f9359.firebasestorage.app",
  messagingSenderId: "974346063979",
  appId: "1:974346063979:web:2695b2fd11063aeb2de12e"
});

const messaging = firebase.messaging();



messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title + "on Background";
  const notificationOptions = {
    body: payload.notification.body+"  On Background ja",
    icon: '/firebase-logo.png',
    data: {
      url: "https://firebase-notification-inky.vercel.app/" // URL ที่จะเปิดเมื่อกดการแจ้งเตือน
    }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received:', event);

  // กำหนดให้เมื่อคลิกที่การแจ้งเตือน, เปิดหน้าเว็บ
  const url = event.notification.data.url; // รับ URL จาก data ที่ตั้งไว้
  console.log(event.notification.data.url);
  event.notification.close(); // ปิดการแจ้งเตือน

  // เปิดหน้าเว็บในแท็บใหม่ (หรือในหน้าเดียวกันก็ได้)
  event.waitUntil(
    clients.openWindow(url) // เปิด URL ที่กำหนด
  );
});
