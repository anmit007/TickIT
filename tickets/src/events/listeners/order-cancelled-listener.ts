import { Listener,NotFoundError,OrderCancelledEvent, Subjects } from "@artickit/common";
import { QueueGroupName } from "./utils/queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener <OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName =  QueueGroupName
    async onMessage(data: OrderCancelledEvent['data'],msg:Message){
        const ticket = await Ticket.findById(data.ticket.id);
        if(!ticket)
        {
            throw new NotFoundError();
        }
        ticket.set({orderId:undefined});
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            title: ticket.title,
            price: ticket.price,
            version: ticket.version
        });
    }

}