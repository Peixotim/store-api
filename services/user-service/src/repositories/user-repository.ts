import { UsersCreate } from '../dtos/user-dto';
import User from '../models/user';

export class UserRepository {
  public async create(data: UsersCreate): Promise<User> {
    return await User.create({ ...data });
  }

  public async existsById(id: string): Promise<boolean> {
    const count = await User.count({ where: { id } });
    return count > 0;
  }

  public async existsByCpf(cpf: string): Promise<boolean> {
    const count = await User.count({ where: { cpf } });
    return count > 0;
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const count = await User.count({ where: { email } });
    return count > 0;
  }

  public async findByMail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = await User.findOne({ where: { cpf } });
    return user;
  }

  public async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  public async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  public async desactive(id: string): Promise<boolean> {
    const [affectedRows] = await User.update({ isActive: false }, { where: { id } });
    return affectedRows > 0;
  }
}
