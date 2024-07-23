import * as SecureStore from 'expo-secure-store';
import api from './api';

interface AddParams {
    title: string;
    content: string;
}

interface UpdateParams {
    _id: string | undefined;
    title: string;
    content: string;
}

interface DeleteParams {
    _id: string;
}

const noteService = {
    getNotes: async () => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.get('/note', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    addNote: async (params: AddParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');
        
        const response = await api.post('/note', params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    updateNote: async (params: UpdateParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.put(`/note/${params._id}`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    deleteNote: async (params: DeleteParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.delete(`/note/${params._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    }
}

export default noteService;