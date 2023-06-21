export enum Status {
    Winner,
    Loser,
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    address: string;
    status?: Status;
}