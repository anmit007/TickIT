import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedInterface} from "@artickit/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./utils/queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedInterface> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: TicketCreatedInterface['data'],msg: Message)
    {
        const {id,title,price} = data;
        const ticket = Ticket.build({
           id,
           title,
           price,
        });

        await ticket.save();
        
        msg.ack();
    }
} 