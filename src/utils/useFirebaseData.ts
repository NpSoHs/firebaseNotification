import { database } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const useFirebaseData = (path: string) => {
    const [data, setData] = useState<string>("");
    useEffect(() => {
        const dataRef = ref(database, path);

        const unsubscribeData = onValue(dataRef, (snapshot) => {
            const dataValue = snapshot.val();
            setData(dataValue);
            console.log("Data:", dataValue);
        });

        

        return () => {

            unsubscribeData();

        };
    }, []);
    return data;
}