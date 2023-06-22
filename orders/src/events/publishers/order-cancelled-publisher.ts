import { Subjects, Publisher, OrderCancelledEvent } from '@artickit/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
