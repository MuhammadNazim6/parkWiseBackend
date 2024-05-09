import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserRepository } from '../database/repository/userRepository'
import { IUser } from '../../domainLayer/users'
import UserModel from '../database/model/userModel'

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  const userRepository = new UserRepository(UserModel);
  if (token) {
    console.log('Inside token');
    console.log(token);
    console.log(process.env.JWT_KEY);
        

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
      console.log('DECODE', decodedToken);
      if (decodedToken.role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      // To check weather user exists to check if blocked/unblocked
      // const user = await userRepository.findUser(decodedToken.email)
      // if (!user) {
      //   return res.status(403).json({ message: 'Invalid or expired token' });
      // }
      // req.user = user;
      console.log('Checked the token and is fine in auth middleware');
      
      // next()

    } catch (error) {
      console.log('Error in user jwt matching');
      console.log('Checked token NOT FINE SO SENDING ERROR TO RESPONE AXIOS SEE YOU THERE');
      res.status(401).send('User not found')

    }
  }
}