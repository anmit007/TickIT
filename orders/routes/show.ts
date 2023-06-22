import { NotAuthorizedError, NotFoundError, requireAuth } from '@artickit/common';
import express , {Request,Response} from 'express'
import { Order } from '../src/models/order';

const router = express.Router();

router.get('/api/orders/:orderId',requireAuth,async(req:Request,res:Response)=>{

    const order = await Order.findById(req.params.id).populate('ticket');
    if(!order)
    {
        throw new NotFoundError()
    };

    if(order.userId !== req.currentUser!.id)
    {
        throw new NotAuthorizedError();
    }
    res.send(order);
})

export {router as showOrderRouter};