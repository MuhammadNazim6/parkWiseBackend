import { Next, Req, Res } from "../../infrastructureLayer/types/expressTypes";
import ErrorResponse from "./errorResponse";

const errorHandler = (error: any, req: Req, res: Res, next: Next) => {

  console.error(error);
  console.log('ERROR HANDLER INNNNNNNNNNN');
  
  if (error instanceof ErrorResponse) {
    return res.status(error.status).json({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
  return res.status(500).json({
    success: false,
    status: 500,
    message: "Something went wrong, Try again later"
  });
};

export default errorHandler;