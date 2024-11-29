"use client";

import { onValue, ref } from "firebase/database";
import { use, useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import LockButton from "@/components/LockButton";
import TakePhotoButton from "@/components/TakePhotoButton";
import { useDHTData } from "@/utils/useDHTData";
import { useFirebaseData } from "@/utils/useFirebaseData";

const DashboardPage = () => {
    const photoUrl = useFirebaseData("/photoUrl");
    const temperature = useFirebaseData("/temperature");
    const humidity = useFirebaseData("/humidity");
    return (
        <div className="grid grid-cols-[55%_45%] bg-black p-4 gap-4">
            {/* Left Section */}
            <div className="flex flex-col h-[80vh] bg-[#1F1F1F] p-5 rounded-lg">
                <div className="h-full">
                    <div className="text-white text-2xl mb-2">CCTV:</div>
                    <div className="bg-gray-300 w-full h-[70%] aspect-square rounded">{photoUrl}</div>
                    <div className="flex gap-4 w-full mt-4">
                        <TakePhotoButton />
                        <LockButton />
                    </div>
                </div>

            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-start gap-4 text-white bg-[#1F1F1F] p-4 rounded-lg">
                <div className="text-xl">Day Time</div>
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-300 px-4 py-2 rounded text-black">
                        RFID: <span className="text-red-300 ml-5">4444</span>
                    </div>
                    <div className="bg-gray-300 px-4 py-2 rounded text-black">Temperature:<span className="text-black ml-5">{temperature}</span> </div>
                    <div className="bg-gray-300 px-4 py-2 rounded text-black">Humidity:<span className="text-black ml-5">{humidity}</span></div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
