import {Publisher} from './base-publisher'
import { TicketCreatedInterface } from './ticket-created-event'
import { Subjects } from './subjects'

export class TicketCreatedPublisher extends Publisher <TicketCreatedInterface>{

    subject: Subjects.TicketCreated =  Subjects.TicketCreated;
    

}