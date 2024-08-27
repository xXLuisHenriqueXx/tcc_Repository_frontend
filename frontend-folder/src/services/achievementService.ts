import * as SecureStore from 'expo-secure-store';
import api from './api';

const achievementService = {
    getAll: async () => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.get('/achievement', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },
}