import jwt, { JwtPayload } from "jsonwebtoken";
import { Ijwt } from "../../usecaseLayer/interface/services/Ijwt";

class JwtPassword implements Ijwt {
  //to create jwt token
  createJWT(userId: string, email: string, role: string, name: string): string {
    const jwtKey = process.env.JWT_KEY;
    if (jwtKey) {
      const token: string = jwt.sign(
        { id: userId, email: email, role: role, name: name },
        jwtKey,
        { expiresIn: '1d' }
      );
      console.log('Inside the jwt config file');
      return token;
    }
    throw new Error("JWT_KEY is not defined");
  }


  //to create refresh jwt token
  createRefreshToken(userId: string, email: string, role: string, name: string): string {
    const jwtKey = process.env.JWT_KEY;
    if (jwtKey) {
      const token: string = jwt.sign(
        { id: userId, email: email, role: role, name: name },
        jwtKey,
        { expiresIn: '30d' }
      );
      console.log('Inside the createRefreshToken ');
      return token;
    }
    throw new Error("JWT_KEY is not defined");
  }


  //for decoding the jwt token
  decodeJWT(refreshToken:string): JwtPayload {
    console.log('Reaching in decodeJWT');
    
    const jwtKey = process.env.JWT_KEY;
    console.log(jwtKey);
    
    if (jwtKey) {
      console.log('refreshToken ',refreshToken);
      
      const decoded = jwt.verify(refreshToken, jwtKey) as JwtPayload
      
      return decoded
    }
    throw new Error("JWT_KEY is not defined");
  }
}

export default JwtPassword;