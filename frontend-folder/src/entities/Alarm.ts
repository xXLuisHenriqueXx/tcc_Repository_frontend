export interface Alarm {
    _id: string;
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
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}