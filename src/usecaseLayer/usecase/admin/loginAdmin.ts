import { IRequestValidator } from "../../interface/repository/IvalidateRepository";
import { IAdminRepsitory } from "../../interface/repository/IAdminRepository";
import IHashpassword from "../../interface/services/IHashpassword";
import { Ijwt } from "../../interface/services/Ijwt";
import { ILoginResponse,IErrorResponse } from "../../interface/services/IResponses";
import ErrorResponse from "../../handler/errorResponse";
import RequestValidator from "../../../infrastructureLayer/services/validateRepository";

export const loginAdmin = async (
  requestValidator: IRequestValidator,
  adminRepository: IAdminRepsitory,
  bcrypt: IHashpassword,
  jwt:Ijwt,
  email: string,
  password:string
): Promise<ILoginResponse | IErrorResponse>=>{
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
      return{
        status: 401,
        success: false,
        message: `The name or password is incorrect`, 
      }
    }

    const matchedPassword = await bcrypt.compare(password,admin.password)
    if(!matchedPassword){
      return{
        status: 401,
        success: false,
        message: `The name or password is incorrect`, 
      }
    }

    const token = jwt.createJWT(admin._id as string , email, 'admin', admin.name);
    return{
      status: 200,
      success: true,
      token: token,
      data: {
        name:admin.name,
        role:'admin',
        email:admin.email
      }
    }
  } catch (error) {
    throw error
  }
}