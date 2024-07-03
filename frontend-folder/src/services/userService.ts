import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import api from "./api";

interface updateProfile {
    name: string;
    email: string;
}

const userService = {
    getUserProfile: async () => {
        const token = await SecureStore.getItemAsync("luisapp-token");
        const user = await AsyncStorage.getItem("@user");

        const { _id } = JSON.parse(user || "");
    
        const response = await api.get(`/user/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        return response;
    },

    updateUserProfile: async (params: updateProfile) => {
        const token = await SecureStore.getItemAsync("luisapp-token");

        const response = await api.put("/profile", params, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response;
    }
}

export default userService;