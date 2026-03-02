import { Optional } from "sequelize";

export interface UsersAttributes{
   id : string;
   name : string;
   email : string;
   password : string;
   cpf : string;
   zipcode : string;
}

export interface UsersCreate extends Optional<UsersAttributes, 'id'>{}