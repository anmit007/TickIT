import { Subjects } from "./subjects";

export interface TicketCreatedInterface {
    subject: Subjects.TicketCreated;
    data: {
        id: string,
        title: string,
        price: number;
    };
}
