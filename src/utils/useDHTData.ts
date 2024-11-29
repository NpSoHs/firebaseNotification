import { database } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export const useDHTData = () => {
    const [temperature, setTemperature] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);
    useEffect(() => {
        const temperatureRef = ref(database, "/temperature");
        const humidityRef = ref(database, "/humidity");
        const unsubscribeTemperature = onValue(temperatureRef, (snapshot) => {
            const temperatureValue = snapshot.val();
            setTemperature(temperatureValue);
            console.log("temperature:", temperatureValue);
        });
        const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
            const humidityValue = snapshot.val();
            setHumidity(humidityValue);
            console.log("huminity:", humidityValue);
        });

        return () => {
            unsubscribeTemperature();
            unsubscribeHumidity()
        };
    }, []);
    return { temperature, humidity };
}