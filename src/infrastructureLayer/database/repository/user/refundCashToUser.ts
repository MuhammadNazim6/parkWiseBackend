import { ObjectId } from "mongoose";
import UserModel from "../../model/userModel";


export const refundCashToUser = async (
  userId: ObjectId,
  amount: number,
  userModels: typeof UserModel
): Promise<{}> => {
  try {
    const refundedUser = await userModels.findByIdAndUpdate(
      userId,
      {
        $inc: { 'wallet.balance': amount },
        $push: {
          'wallet.history': {
            amount: amount,
            transactionType: 'Credit',
          }
        }
      },
      { new: true }
    )
    if (refundedUser) {
      return refundedUser
    } else {
      return false
    }

  } catch (error) {
    throw error
  }
}