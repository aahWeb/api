export enum Status {
    Winner,
    Loser,
}

export interface User {
    name: string;
    email: string;
    address: string;
    status?: Status;
}