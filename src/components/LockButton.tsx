import { database } from "@/app/firebaseConfig";
import { useFirebaseData } from "@/utils/useFirebaseData";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";


const LockButton = () => {
    const lockStatus = useFirebaseData("/lockStatus");
    const handleUnlock = () => {
        const lockStatusRef = ref(database, "/lockStatus");
        set(lockStatusRef, "UNLOCKED");

        setTimeout(() => {
            set(lockStatusRef, "LOCKED");
        }, 3000);
    };
    return (
        <button onClick={handleUnlock} className="bg-gray-300 flex-1 py-2 rounded text-black text-lg">
            {lockStatus === "LOCKED" ? "Unlock the door" : "Lock the door"}
        </button>
    )
}

export default LockButton