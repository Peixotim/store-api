import { UsersCreate } from "../dtos/user-dto";
import { BadRequestError, ConflictError, HttpError, InternalServerError } from "../errors/http-errors";
import { UserRepository } from "../repositories/user-repository";
import { UniqueConstraintError } from "sequelize";
export class UserService{

  private userRepository = new UserRepository();

  public async create(payload : UsersCreate){
    
    if (!payload || Object.keys(payload).length === 0) {
      throw new BadRequestError(`Payload is empty!`);
    }
    if(await this.existsByCpf(payload.cpf)){
      throw new ConflictError(`A user with this CPF already exists.`);
    }
      
    if(await this.existsByEmail(payload.email)){
      throw new ConflictError(`A user with this email already exists.`);
    }

    try{
      const createUser = await this.userRepository.create(payload);
      return createUser;
    }catch(error){
      if (error instanceof HttpError) throw error;

      if (error instanceof UniqueConstraintError) {
        throw new ConflictError(`Database constraint violation: Data already exists.`);
      }
      
      throw new InternalServerError(`Unexpected error on register: ${error}`);
    }
  }

  public async existsByCpf(cpf : string){
    try{
      return await this.userRepository.existsByCpf(cpf);
    }catch(error){
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error on register: ${error}`);
    }
    }
  
    public async existsByEmail(email : string){
      try{
        return await this.userRepository.existsByEmail(email);
      }catch(error){
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error on register: ${error}`);
      }
    }
  }