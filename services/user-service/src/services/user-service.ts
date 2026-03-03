import { UsersCreate } from '../dtos/user-dto';
import {
  BadRequestError,
  ConflictError,
  HttpError,
  InternalServerError,
  NotFoundError,
} from '../errors/http-errors';
import User from '../models/user';
import { UserRepository } from '../repositories/user-repository';
import { UniqueConstraintError } from 'sequelize';

export class UserService {
  private readonly userRepository = new UserRepository();

  public async findAll(): Promise<User[] | null> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async create(payload: UsersCreate): Promise<User> {
    if (!payload || Object.keys(payload).length === 0) {
      throw new BadRequestError('Payload is empty!');
    }

    if (await this.existsByCpf(payload.cpf)) {
      throw new ConflictError('A user with this CPF already exists.');
    }

    if (await this.existsByEmail(payload.email)) {
      throw new ConflictError('A user with this email already exists.');
    }

    try {
      return await this.userRepository.create(payload);
    } catch (error) {
      if (error instanceof HttpError) throw error;

      if (error instanceof UniqueConstraintError) {
        throw new ConflictError('Database constraint violation: Data already exists.');
      }

      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async existsByCpf(cpf: string): Promise<boolean> {
    try {
      return await this.userRepository.existsByCpf(cpf);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async existsByEmail(email: string): Promise<boolean> {
    try {
      return await this.userRepository.existsByEmail(email);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findByMail(email);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async findByCpf(cpf: string): Promise<User> {
    try {
      const user = await this.userRepository.findByCpf(cpf);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundError('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async desactive(id: string): Promise<boolean> {
    try {
      const exists = await this.userRepository.existsById(id);

      if (!exists) {
        throw new NotFoundError('User not found');
      }

      return await this.userRepository.desactive(id);
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }
}
