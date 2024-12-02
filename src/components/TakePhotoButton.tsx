import { database } from "@/app/firebaseConfig";
import { useFirebaseData } from "@/utils/useFirebaseData";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";


const TakePhotoButton = () => {
    const takePhoto = () => {
        const randomNum = Math.floor(Math.random() * 50000);
        const photoUrl = `http://192.168.1.196/capture?_cb=${randomNum}`;
        const photoUrlRef = ref(database, "/doorbell/photoResponse");
        set(photoUrlRef, photoUrl);
    };
    return (
        <button onClick={takePhoto} className="bg-gray-300 flex-1 py-2 rounded text-black text-lg">
            take a photo
        </button>
    )
}

export default TakePhotoButton