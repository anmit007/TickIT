import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'

import cookieSession from 'cookie-session';
import { errorHandler,NotFoundError,currentUser} from '@artickit/common';
import { newOrderRouter } from '../routes/new';
import { deleteOrderRouter } from '../routes/delete';
import { indexOrderRouter } from '../routes';
import { showOrderRouter } from '../routes/show';


const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed : false,
    secure: true,

}))
app.use(currentUser);
app.use(newOrderRouter);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);

app.get('*',async()=>{
    throw new NotFoundError()
})
app.use(errorHandler);

export {app};