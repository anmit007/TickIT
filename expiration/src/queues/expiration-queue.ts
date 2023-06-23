import  Queue  from "bull";


interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiraion',{
    redis: {
        host: process.env.REDIS_HOST,
    }
});

expirationQueue.process(async(job)=>{

    console.log('i want to publish an exp:complete event',job.data.orderId);
})

export {expirationQueue};
