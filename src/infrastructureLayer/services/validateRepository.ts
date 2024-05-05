import { IRequestValidator } from "../../usecaseLayer/interface/repository/IvalidateRepository";

interface ValidationResult {
  success: boolean;
  message?: string;
}

export class RequestValidator implements IRequestValidator {
  
  validateRequiredFields(
    data: Record<string, any>,
    requiredFields: string[]
  ): ValidationResult {
    for (const field of requiredFields) {
      if (data[field] === undefined) {
        return {
          success: false,
          message: `Missing required parameter: ${field}`,
        };
      }
      
      if (field === "email") {
        const emailValidationResult = this.validateEmail(data[field]);
        if (!emailValidationResult.success) {
          return emailValidationResult;
        }
      }
    }
    
    return { success: true };
  }

  private validateEmail(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email format",
      };
    }
    return { success: true };
  }
  
}

export default RequestValidator;