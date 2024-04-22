import AdminModel from "../../model/adminModel";

export const loginAdmin = async (
  email : string,
  adminModel: typeof AdminModel
)=> {
  try {
    const adminExists = await adminModel.findOne({email:email})
    return adminExists
  } catch (error) {
    throw error
  }
}