export interface Task {
    title: string;
    done: boolean;
}

export interface Todo {
    _id: string;
    title: string;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
}