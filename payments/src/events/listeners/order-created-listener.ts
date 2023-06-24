import { Listener,OrderCreatedEvent, Subjects} from "@artickit/common";
import { queueGroupName } from "../utils/queueGroupName";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data:OrderCreatedEvent['data'],msg:Message)
    {
        const order = Order.build({
            id: data.id,
            userId: data.userId,
            status:data.status,
            version: data.version,
            price: data.ticket.price
        });
        await order.save();
        msg.ack();
    }
}