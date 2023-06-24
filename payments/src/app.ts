import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import cookieSession from 'cookie-session';
import { errorHandler,NotFoundError,currentUser} from '@artickit/common';




const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed : false,
    secure: true,

}))
app.use(currentUser);


app.get('*',async()=>{
    throw new NotFoundError()
})
app.use(errorHandler);

export {app};