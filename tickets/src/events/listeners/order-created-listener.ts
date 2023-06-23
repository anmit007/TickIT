import { Listener, NotFoundError, OrderCreatedEvent, Subjects } from "@artickit/common";
import { QueueGroupName } from "./utils/queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = QueueGroupName;
    async onMessage(data: OrderCreatedEvent['data'],msg:Message){

        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id)
        // if no ticket throw an error 
        if(!ticket)
        {
            throw new NotFoundError();
        }
        // Mark the ticket as being reserved by setting orderId property
        ticket.set({orderId: data.id});
        // save the ticket
        await ticket.save();
        // emit the event

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version
        });
        // acknowledge the message
        msg.ack();
    }

}

