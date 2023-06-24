import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@artickit/common";
import express , {Request,Response} from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";

const router = express.Router();

router.post('/api/payments',requireAuth,[
    body('token')
    .not()
    .isEmpty(),
    body('orderId')
    .not().isEmpty().withMessage('Provide a valid orderID')
],async(req:Request,res:Response)=>{

    
    const {token,orderId} = req.body;
    console.log(orderId);
    const order = await Order.findById(orderId);

    if(!order) {
        throw new NotFoundError();
    }
    if(order.userId!=req.currentUser!.id)
    {
        throw new NotAuthorizedError();
    }

    if(order.status === OrderStatus.Cancelled)
    {
        throw new BadRequestError('Order is cancelled');

    }

    await stripe.charges.create({
        currency: 'usd',
        amount: (order.price)*100,
        source: token,
        description: "Ticket Bought"
       
    });
    
    res.status(201).send({suceess:true});

});
export {router as createChargeRouter};