import { LoginReciveAPI } from "../dtos/login-payload";
import { RegisterPayload } from "../dtos/register-payload";
import { InternalServerError, NotFoundError } from "../errors/http-errors";

export class UserRepository{
  private apiBase = 'http://user_service/';

  public async existsByEmail(email :string):Promise<boolean>{
    const response = await fetch(
    `${this.apiBase}exists?email=${encodeURIComponent(email)}`
  );
    if(!response.ok){
      throw new InternalServerError(`Failed to verify email`);
    }
    const { exists } = await response.json() as { exists : boolean }

    return exists;
  }


  public async findByEmail(email : string):Promise<LoginReciveAPI>{
    const response = await fetch(`${this.apiBase}findByEmail?email=${encodeURIComponent(email)}`);
    if(!response.ok){
      throw new NotFoundError(`User not found`);
    }
    
    return response.json() as Promise<LoginReciveAPI>;
  }

  public async existsByCpf(cpf :string):Promise<boolean>{
    const response = await fetch(
    `${this.apiBase}existsByCpf?cpf=${encodeURIComponent(cpf)}`
  );
    if(!response.ok){
      throw new InternalServerError(`Failed to verify cpf`);
    }
    const { exists } = await response.json() as { exists : boolean }

    return exists;
  }

  public async create(user : RegisterPayload){
    const response = await fetch(this.apiBase,{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(user)
    })

    if(!response.ok){
      throw new InternalServerError(`Failed to create user: ${response.statusText}`)
    }
  }
}