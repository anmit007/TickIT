import { Publisher,Subjects,TicketCreatedInterface } from "@artickit/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedInterface> 
{

    subject: Subjects.TicketCreated = Subjects.TicketCreated;


}

