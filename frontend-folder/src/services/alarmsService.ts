import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alarm } from "../entities/Alarm";

const alarmsService = {
    getAlarms: async (key: string): Promise<Alarm[]> => {
        try {
            const alarms = await AsyncStorage.getItem(key);
            return alarms ? JSON.parse(alarms) : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    saveAlarm: async (key: string, newAlarm: Alarm) => {
        try {
            let alarmsStored = await alarmsService.getAlarms(key);

            const hasAlarm = alarmsStored.some(item => item._id === newAlarm._id);

            if (hasAlarm) return;
            alarmsStored.push(newAlarm);

            await AsyncStorage.setItem(key, JSON.stringify(alarmsStored));
        } catch (error) {
            console.log(error);
        }
    },

    deleteAlarm: async (_id: string) => {
        try {
            const alarmsStored = await alarmsService.getAlarms('@alarms');
            const alarmsFiltered = alarmsStored.filter(item => item._id !== _id);

            await AsyncStorage.setItem('@alarms', JSON.stringify(alarmsFiltered));

            return alarmsFiltered;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    toggleAlarmStatus: async (_id: string, status: boolean) => {
        try {
            const alarmsStored = await alarmsService.getAlarms('@alarms');
            const alarmsUpdated = alarmsStored.map(item => {
                if (item._id === _id) {
                    return { ...item, status: status };
                }
                return item;
            });
    
            await AsyncStorage.setItem('@alarms', JSON.stringify(alarmsUpdated));
            
            return alarmsUpdated;

        } catch (error) {
            console.log(error);
            return [];
        }
    }
};

export default alarmsService;