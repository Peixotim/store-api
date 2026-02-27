import * as argon2 from 'argon2';

export class PasswordService{

  public async hash(password : string):Promise<string>{
    try{
        return await argon2.hash(password,{
          type: argon2.argon2id,
          memoryCost: 2 ** 16,
          timeCost: 3,
          parallelism: 1,
        })
    }catch(error){
      throw new Error(`Error hashing password: ${error}`);
    }
  }

  public async verify(hash: string,password:string):Promise<boolean>{
    try{
      return await argon2.verify(hash,password);
    }catch(error){
      throw new Error(`Error verifying password: ${error}`);
    }
  }
}