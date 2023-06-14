
import mongoose from 'mongoose';

import { app } from './app';

const startDB = async () => {
    if(!process.env.JWT_KEY)
      {
        throw new Error('JWT NOT DEFINED') ;
      }
      
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('db connected');
    } catch (error) {
        console.log(error);
    }
    app.listen(3000,()=>{
    console.log('Auth Server Stared at Port 3000');
    })
 
};

startDB();