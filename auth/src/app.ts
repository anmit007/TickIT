import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/sigin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler,NotFoundError } from '@artickit/common';


const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed : false,
    secure: true,

}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get('*',async()=>{
    throw new NotFoundError()
})
app.use(errorHandler);

export {app};