import * as SecureStore from 'expo-secure-store';
import api from './api';

interface AddTaskParams {
    todoId: string;
    title: string;
    done: boolean;
}

interface UpdateTaskParams {
    _id: string | undefined;
    todoId: string;
    title: string;
}

interface UpdateTaskDoneParams {
    _id: string | undefined;
    todoId: string;
    done: boolean;
}

interface DeleteTaskParams {
    _id: string;
    todoId: string;
}

const taskService = {
    addTask: async (params: AddTaskParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');
        
        const response = await api.post(`/todo/${params.todoId}/task`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    updateTask: async (params: UpdateTaskParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');
    
        const response = await api.put(`/todo/${params.todoId}/task/${params._id}`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    updateTaskDone: async (params: UpdateTaskDoneParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');
    
        const response = await api.put(`/todo/${params.todoId}/task/${params._id}/done`, params, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    },

    deleteTask: async (params: DeleteTaskParams) => {
        const token = await SecureStore.getItemAsync('luisapp-token');

        const response = await api.delete(`/todo/${params.todoId}/task/${params._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    }
}

export default taskService;