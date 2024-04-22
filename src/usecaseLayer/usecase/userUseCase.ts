import { IUser } from "../../domainLayer/users";
import { IRequestValidator } from "../interface/repository/IvalidateRepository";
import { IUserRepository } from "../interface/repository/IUserRepository";
import  IHashpassword  from "../interface/services/IHashpassword";
import { Ijwt } from "../interface/services/Ijwt";
import { INodemailer } from "../interface/services/INodemailer";

import { createUser } from "./user/createUser";
import {loginUser } from "./user/loginUser"
import { logoutUser } from "./user/logoutUser";

export class UserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailer;
  private readonly requestValidator: IRequestValidator

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailer,
    requestValidator: IRequestValidator,
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
  }

  // creating user
  async createUser({
    name,
    mobile,
    email,
    password,
  }: {
    name: string;
    mobile: number;
    email: string;
    password: string;
  }) {
    return createUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      name,
      mobile,
      email,
      password
    );
  }


  // logging in user
  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return loginUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }
  
  // logging out user
  async logoutUser() {
    return logoutUser(
      this.userRepository,
    );
  }
}