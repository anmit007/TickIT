import { Publisher,Subjects,TicketUpdatedEvent } from "@artickit/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> 
{

    subject: Subjects.TicketUpdated= Subjects.TicketUpdated


}

