import mongoose from 'mongoose';
import express , {Request,Response} from 'express'
import { BadRequestError, NotFoundError, OrderStatus, requireAuth,validateRequest} from '@artickit/common';
import {body} from 'express-validator'
import { Ticket } from '../src/models/ticket';
import { Order } from '../src/models/order';
import { natsWrapper } from '../src/nats-wrapper';
import { OrderCreatedPublisher } from '../src/events/publishers/order-created-publisher';


const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15;

router.post('/api/orders',requireAuth,[
    body('tickerId')
    .not()
    .isEmpty()
    .custom((input: string)=>mongoose.Types.ObjectId.isValid(input))
    .withMessage('Ticket Id must be provided')
    

],validateRequest,async(req:Request,res:Response)=>{

    // find the ticket the user is trying to order in the DB
    const {tickerId} = req.body;
    const ticket = await Ticket.findById(tickerId);
    if(!ticket)
    {
        throw new  NotFoundError();
    }
    

    // make sure that this ticket is not already reserved

        // run a query to look at all orders. find an order where the ticket
        // we just found and orders status is not cancelled
        // if we find an order -> ticket is reserved
    
        const isReserved  = await ticket.isReserved()
        if(isReserved)
        {
            throw new BadRequestError('Ticket is reserved');
        }

    // Calculate an expiration for this order

        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds()+EXPIRATION_WINDOW_SECONDS);

    // build the order and save in DB
        
        const order = Order.build({
            userId : req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket
        })
    
        await order.save();
       
        // Publish an event saying that an order was created 

        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            status: order.status,
            userId: order.userId,
            expiresAt: order.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price
            }
        });

        res.status(201).send(order);
})

export {router as newOrderRouter};