
import mongoose from 'mongoose';

import { app } from './app';

const startDB = async () => {
    if(!process.env.JWT_KEY)
      {
        throw new Error('JWT NOT DEFINED') ;
      }
      if(!process.env.MONGO_URI)
      {
        throw new Error('MONGO_URI NOT DEFINED')
      }
      
    try {
        await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
    } catch (error) {
        console.log(error);
    }
    app.listen(3000,()=>{
    console.log('Ticketing Server Stared at Port 3000');
    })
 
};

startDB();