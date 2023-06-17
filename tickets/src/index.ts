
import {app} from './app';

const startDB = async () => {
    if(!process.env.JWT_KEY)
      {
        throw new Error('JWT NOT DEFINED') ;
      }
      
    
    app.listen(3000,()=>{
    console.log('Ticket Server Stared at Port 3000');
    })
 
};

startDB();