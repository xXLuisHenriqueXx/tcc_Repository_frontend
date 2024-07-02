export interface Alarm {
    _id: string;
    title: string;
    hour: Date;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    status: boolean;
}