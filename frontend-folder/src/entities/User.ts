export interface User {
    _id: string;
    name: string;
    email: string;
    achievements: string[];
    numberCreateNotes: number;
    numberCreateTodos: number;
    numberCreateTasks: number;
    numberUpdateNotes: number;
    numberUpdateTodos: number;
    numberUpdateTasks: number;
    numberDeleteNotes: number;
    numberDeleteTodos: number;
    numberDeleteTasks: number;
    level: number;
    experience: number;
    createdAt: string;
    updatedAt: string;
}