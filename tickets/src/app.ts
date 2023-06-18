import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import { createTicketRouter } from './routes/new';
import cookieSession from 'cookie-session';
import { errorHandler,NotFoundError,currentUser} from '@artickit/common';
import { ShowTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';



const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed : false,
    secure: true,

}))
app.use(currentUser);
app.use(createTicketRouter);
app.use(ShowTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.get('*',async()=>{
    throw new NotFoundError()
})
app.use(errorHandler);

export {app};