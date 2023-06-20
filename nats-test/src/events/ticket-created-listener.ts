import { Message} from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedInterface } from './ticket-created-event';
import { Subjects } from './subjects';
export class TicketCreatedListener extends Listener<TicketCreatedInterface> {
    subject:  Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
  
    onMessage(data: TicketCreatedInterface['data'], msg: Message) {
      console.log(data.price);
      console.log('Event data!', data);
      
      msg.ack();
    }
  }
  