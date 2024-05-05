import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserRepository } from '../database/repository/userRepository'
import { IUser } from '../../domainLayer/users'
import UserModel from '../database/model/userModel'

export const protectUser = async(req:Request,res:Response,next:NextFunction) => {
  let token;
  token = req.cookies.userjwt;

  const userRepository = new UserRepository(UserModel);
  if(token){
    console.log('Inside token');
    
    try {
      const decoded = jwt.verify(token,process.env.JWT_KEY as string)
    console.log('DECODE', decoded);

      const user = await userRepository.findUser(decoded.email)
      console.log('USER', user);
      

      if(user){
        req.user = user;
        console.log('req.user',req.user);
        
        next();
      }else{
        console.log('User not found, Invalid token sent');
        res.status(404).send('User not found');
        
      }
    } catch (error) {
      console.log('Error in user jwt matching');
      res.status(401).send('User not found')
      
    }
  }
}