import { BaseModel } from "./BaseModel";

export class RegisterModel extends BaseModel { 
    user_username:string = "";
    user_email:string = "";
    user_password:string = "";
  }