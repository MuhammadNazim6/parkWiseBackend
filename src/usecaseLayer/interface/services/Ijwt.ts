export interface Ijwt {
  createJWT(userId: string, email: string, role: string, name: string): string;
}