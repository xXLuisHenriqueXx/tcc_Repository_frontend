import * as SecureStore from 'expo-secure-store';
import api from './api';

interface AddParams {
    title: string;
    hour: Date;
    days: {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
    };
    date: Date | null;
}

interface UpdateParams {
    _id: string | undefined;
    title: string;
    hour: Date;
    days: {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
    };
    date: Date | null;
}

interface DeleteParams {
    _id: string;
}

interface ToggleStatusParams {
    _id: string;
}

const alarmsService = {
    getAlarms: async () => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.get('/alarm', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    saveAlarm: async (params: AddParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.post('/alarm', params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    updateAlarm: async (params: UpdateParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.put(`/alarm/${params._id}`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    deleteAlarm: async (params: DeleteParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.delete(`/alarm/${params._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    toggleAlarmStatus: async (params: ToggleStatusParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.put(`/alarm/${params._id}/status`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },
};

export default alarmsService;