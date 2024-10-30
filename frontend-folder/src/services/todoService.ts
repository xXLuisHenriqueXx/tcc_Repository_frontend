import * as SecureStore from 'expo-secure-store';
import api from './api';

interface TaskProps {
    title: string;
    done: boolean;
}

interface AddParams {
    title: string;
    tasks: TaskProps[];
}

interface UpdateParams {
    _id: string | undefined;
    title: string;
    tasks: TaskProps[];
}

interface DeleteParams {
    _id: string;
}

const todoService = {
    getTodos: async () => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.get('/todo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    addTodo: async (params: AddParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.post('/todo', params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    updateTodo: async (params: UpdateParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.put(`/todo/${params._id}`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    deleteTodo: async (params: DeleteParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.delete(`/todo/${params._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    }
}

export default todoService;