import {app} from '../src/infrastructureLayer/config/app'
import { httpServer } from '../src/infrastructureLayer/config/app'
import connectDB from './infrastructureLayer/config/db'
import cron from "node-cron";
import axios from 'axios';

const SERVER = 'https://parkwisebackend.onrender.com'

const startServer = ()=>{
  const port = process.env.PORT || 3000
  app.get('/',(req,res)=>{
    res.send('Hello world')
  })

  httpServer.listen(port,()=>{
    console.log(`server running  at ${port}`);
    connectDB()
  })
}

cron.schedule('*/10 * * * *', () => {
  axios
      .get(SERVER)
      .then((response) => {
          console.log(`Request sent successfully at ${new Date()}`);
      })
      .catch((error) => {
          console.error(`Error sending request: ${error.message}`);
      });
});

startServer()