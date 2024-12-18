"use client";
import LockButton from "@/components/LockButton";
import TakePhotoButton from "@/components/TakePhotoButton";
import { fetchPhoto } from "@/utils/takePhoto";
import { useFirebaseData } from "@/utils/useFirebaseData";
import { useNotification } from "@/utils/ีuseNotification";
import Image from "next/image";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const photoUrl = useFirebaseData("/doorbell/photoResponse");
  const temperature = useFirebaseData("/temperature");
  const humidity = useFirebaseData("/humidity");
  const rfidId = useFirebaseData("/rfid/lastUID");
  const dayTime = useFirebaseData("/lightState")
  const [photo, setPhoto] = useState("");
  useNotification();

  useEffect(() => {
    const takePhoto = async()=>{
      const data = await fetchPhoto(photoUrl);
      if(data){
        setPhoto(data);
      }
    }
    takePhoto();
  }, [photoUrl]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] bg-black p-4 gap-4">
      {/* Left Section */}
      <div className="flex flex-col sm:h-fit lg:h-[80vh] bg-[#1F1F1F] p-5 rounded-lg">
        <div className="h-full">
          <div className="text-white text-lg sm:text-2xl mb-2">CCTV:</div>
          <div className="bg-gray-300 w-full h-[80%] rounded">
            {photo!=="" ? (
              <Image
                src={photo} // ใช้ URL หรือ path ของภาพที่ได้จาก Blob
                alt="Doorbell Photo"
                width={0}
                height={0}
                className="object-cover rounded w-full h-full"
              />
            ) : (
              <p className="text-white">Loading photo...</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <TakePhotoButton />
            <LockButton />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-start gap-4 text-white bg-[#1F1F1F] p-4 rounded-lg">
        <div className="text-lg sm:text-xl">{dayTime}</div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-300 px-4 py-2 rounded text-black">
            RFID:{" "}
            <span className="text-black-300 font-bold ml-5">{rfidId}</span>
          </div>
          <div className="bg-gray-300 px-4 py-2 rounded text-black">
            Temperature:
            <span className="text-black ml-5">{temperature}</span>
          </div>
          <div className="bg-gray-300 px-4 py-2 rounded text-black">
            Humidity:
            <span className="text-black ml-5">{humidity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
