import { AdminAdapter } from "../../../controllerLayer/adminAdapter";
import { AdminUseCase } from "../../../usecaseLayer/usecase/adminUseCase";
import AdminModel from "../../database/model/adminModel";
import { AdminRepository } from "../../database/repository/adminRepository";  
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";


const adminRepository = new AdminRepository(AdminModel);
const bcrypt = new Encrypt();
const jwt = new JwtPassword();
const requestValidator = new RequestValidator();
const adminUseCase = new AdminUseCase(
  adminRepository,
  bcrypt,
  jwt,
  requestValidator
);

const adminAdapter = new AdminAdapter(adminUseCase);

export {adminAdapter, adminRepository};