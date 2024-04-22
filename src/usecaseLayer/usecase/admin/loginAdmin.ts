import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import { IAdminRepsitory } from "../../interface/repository/IAdminRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { Ijwt } from "../../interface/services/Ijwt";
import { ILoginResponse } from "../../interface/services/IResponses";
import ErrorResponse from "../../handler/errorResponse";
import RequestValidator from "../../../infrastructureLayer/services/validateRepository";

export const loginAdmin = async (
  requestValidator: IRequestValidator,
  adminRepository: IAdminRepsitory,
  bcrypt: IHashpassword,
  jwt:Ijwt,
  email: string,
  password:string
): Promise<ILoginResponse>=>{
  try {
    const validation = requestValidator.validateRequiredFields(
      {email,password},
      ['email','password']
    );

    if(!validation.success){
      throw ErrorResponse.badRequest(validation.message as string);
    }
    const admin = await adminRepository.findAdmin(email);
    if(!admin){
      throw ErrorResponse.badRequest("No admin found with this email");
    }

    const matchedPassword = await bcrypt.compare(password,admin.password)
    if(!matchedPassword){
      throw ErrorResponse.badRequest('Passwords do not match')
    }

    const token = jwt.createJWT(admin._id as string , email, 'admin', admin.name);
    return{
      status: 200,
      success: true,
      message: `Admin ${admin.name} logged in successfully`,
      token: token,
      data: admin
    }
  } catch (error) {
    throw error
  }
}