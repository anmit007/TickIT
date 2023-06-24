import { BadRequestError, NotFoundError, requireAuth, validateRequest } from "@artickit/common";
import express , {Request,Response} from "express";
import { body } from "express-validator";
import { Order } from "../models/order";



const router = express.Router();

router.post('/api/payments',requireAuth,[
    body('token')
    .not()
    .isEmpty(),
    body('orderId')
    .not().isEmpty().withMessage('Provide a valid orderID')
],(req:Request,res:Response)=>{

    res.send({suceess:true});

});
export {router as createChargeRouter};