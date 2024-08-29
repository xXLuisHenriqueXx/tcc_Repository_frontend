export interface User {
    _id: string;
    name: string;
    email: string;
    achievements: string[];
    level: number;
    experience: number;
    experienceToNextLevel: number;
    numberCreateNotes: number;
    numberCreateTodos: number;
    numberCreateTasks: number;
    numberUpdateNotes: number;
    numberUpdateTodos: number;
    numberUpdateTasks: number;
    numberDeleteNotes: number;
    numberDeleteTodos: number;
    numberDeleteTasks: number;
    createdAt: string;
    updatedAt: string;
}