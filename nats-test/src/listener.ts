import nats,{Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear();

const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url: 'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log('listner connected to NATS');


    stan.on('close',()=>{
        console.log('NATS connection close');
        process.exit();
    })



    const options = stan
    .subscriptionOptions()
    .setManualAckMode(true);


    const subscription  = stan.subscribe(
        'ticket:created',
        'orders-service-queue-group',
        options
        );

    subscription.on('message',(msg:Message)=>{
        console.log(msg.getSequence());
        console.log(msg.getData());
        console.log('Message Recieved');
        msg.ack();
    })
})


process.on('SIGINT',()=>stan.close());
process.on('SIGTERM',()=>stan.close());
