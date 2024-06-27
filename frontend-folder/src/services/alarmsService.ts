import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alarm } from "../entities/Alarm";

export async function getAlarms(key: string): Promise<Alarm[]> {
    try {
        const myAlarms = await AsyncStorage.getItem(key);
        let myAlarmsParsed: Alarm[] = myAlarms != null ? JSON.parse(myAlarms) : [];

        myAlarmsParsed = myAlarmsParsed.map(item => ({
            ...item,
            date: new Date(item.date)
        }));

        return myAlarmsParsed;
    } catch (error) {
        console.log(error);
        return [];   
    }
}

export async function saveAlarm(key: string, newAlarm: Alarm): Promise<void> {
    let alarmsStored = await getAlarms(key);

    const hasAlarm = alarmsStored.some(item => item._id === newAlarm._id);

    if (hasAlarm) return;
    alarmsStored.push(newAlarm);

    await AsyncStorage.setItem(key, JSON.stringify(alarmsStored));
}

export async function deleteAlarm(_id: string): Promise<Alarm[]> {
    try {
        const alarmsStored = await getAlarms('@alarms');
        const alarmsFiltered = alarmsStored.filter(item => item._id !== _id);

        await AsyncStorage.setItem('@alarms', JSON.stringify(alarmsFiltered));

        return alarmsFiltered;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function toggleAlarmStatus(_id: string, status: boolean): Promise<Alarm[]> {
    let alarmsStored = await getAlarms("@alarms");
    let alarmToUpdate = alarmsStored.map(item => {
        if (item._id === _id) {
            return { ...item, status: status };
        }
        return item;
    });

    await AsyncStorage.setItem("@alarms", JSON.stringify(alarmToUpdate));

    return alarmToUpdate;
}