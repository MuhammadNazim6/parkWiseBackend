
export interface IUser {
  _id?: string;
  name: string;
  password: string;
  email: string;
  mobile: number;
  profilePic?: string | null;
  google?:boolean;
  wallet?: {
    balance: number | null;
    history: {
      amount: number | null;
      transactionType: string | null;
    };
  };
  isBlocked?:Boolean;
}
