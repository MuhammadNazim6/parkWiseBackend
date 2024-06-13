import {app} from '../src/infrastructureLayer/config/app'
import { httpServer } from '../src/infrastructureLayer/config/app'
import connectDB from './infrastructureLayer/config/db'

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

startServer()