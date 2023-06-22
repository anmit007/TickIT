import { Publisher, OrderCreatedEvent, Subjects } from '@artickit/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
