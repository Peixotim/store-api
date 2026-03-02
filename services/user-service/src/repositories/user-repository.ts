import { UsersCreate } from "../dtos/user-dto";
import User from "../models/user";

export class UserRepository{
  public async create(data : UsersCreate):Promise<User>{
    return await User.create({...data});
  }

  public async existsByCpf(cpf : string):Promise<boolean>{
    const count = await User.count({where:{cpf}});
    return count > 0;
  }

  public async existsByEmail(email : string):Promise<boolean>{
    const count = await User.count({where:{email}});
    return count > 0;
  }

  //Criar os metodos depois de findBy...
}