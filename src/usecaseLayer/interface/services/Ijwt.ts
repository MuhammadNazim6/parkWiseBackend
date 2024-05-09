import { JwtPayload } from "jsonwebtoken";

export interface Ijwt {
  createJWT(userId: string, email: string, role: string, name: string): string;
  createRefreshToken(userId: string, email: string, role: string, name: string): string;
  decodeJWT(refreshToken:string):JwtPayload;
}