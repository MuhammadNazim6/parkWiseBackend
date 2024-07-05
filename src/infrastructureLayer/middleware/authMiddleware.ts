import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserRepository } from '../database/repository/userRepository'
import UserModel from '../database/model/userModel'
import { ProviderRepository } from '../database/repository/providerRepository'
import ParkingProviderModel from '../database/model/providerModel'


// User auth
export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  const userRepository = new UserRepository(UserModel);

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
      if (decodedToken.role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      const user = await userRepository.findUser(decodedToken.email)
      if (user?.isBlocked) {
        return res.status(403).json({ message: 'You have been blocked, contact the admin' });
      }
      next()

    } catch (error) {
      console.log('Error in user jwt matching');
      res.status(401).send('User not found')
    }
  }
}


// Provider auth
export const providerAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }
  const token = authHeader.split(' ')[1];
  const provRepository = new ProviderRepository(ParkingProviderModel);

  if (token) {
        
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
      if (decodedToken.role !== 'provider') {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      const prov = await provRepository.findProvider(decodedToken.email)
      if (prov?.isBlocked) {
        return res.status(403).json({ message: 'You have been blocked, contact the admin' });
      }
      next()

    } catch (error) {
      console.log('Error in user jwt matching');
      res.status(401).send('User not found')
    }
  }
}


// Admin auth
export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }
  const token = authHeader.split(' ')[1];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
      if (decodedToken.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      next()

    } catch (error) {
      console.log('Error in user jwt matching');
      res.status(401).send('User not found')
    }
  }
}

