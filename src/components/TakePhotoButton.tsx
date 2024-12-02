"use client";
import { database } from "@/app/firebaseConfig";
import { useFirebaseData } from "@/utils/useFirebaseData";
import { onValue, ref, set } from "firebase/database";

const TakePhotoButton = () => {
  const photoUrlString = useFirebaseData("/doorbell/photoResponse");
  const takePhoto = () => {
    const randomNum = Math.floor(Math.random() * 50000);
    const photoUrlCut = photoUrlString.substring(0, 20);
    console.log(photoUrlCut);
    const photoUrl = `${photoUrlCut}/capture?_cb=${randomNum}`;
    const photoUrlRef = ref(database, "/doorbell/photoResponse");
    set(photoUrlRef, photoUrl);
  };
  return (
    <button
      onClick={takePhoto}
      className="bg-gray-300 flex-1 py-2 rounded text-black text-lg"
    >
      take a photo
    </button>
  );
};

export default TakePhotoButton;
