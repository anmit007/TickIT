import { Publisher, Subjects, PaymentCreatedEvent } from "@artickit/common";

export  class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {

    subject: Subjects.PaymentCreated = Subjects.PaymentCreated

}