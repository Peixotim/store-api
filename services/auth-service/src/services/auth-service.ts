import { LoginPayload } from "../dtos/login-payload";
import { RegisterPayload } from "../dtos/register-payload";
import {
  BadRequestError,
  ConflictError,
  HttpError,
  InternalServerError,
  UnauthorizedError,
} from "../errors/http-errors";
import { PasswordService } from "./passsword-service";
import { UserRepository } from "../repositories/user-repository";
import { JwtService } from "./jwt-service";
import { AuthTokens } from "../dtos/token-payload";
import { isValidCpf } from "./cpf-validator";
export class AuthService {
  private passwordService = new PasswordService();
  private userRepository = new UserRepository();
  private jwtService = new JwtService();

  private buildToken(payload: { sub: string; email: string }): AuthTokens {
    return {
      accessToken: this.jwtService.generateAccessToken(payload),
      refreshToken: this.jwtService.generateRefreshToken(payload),
    };
  }
  public async login(payload: LoginPayload): Promise<AuthTokens> {
    if (!payload?.email || !payload?.password) {
      throw new BadRequestError(`Payload was empty or invalid`);
    }

    try {
      const user = await this.userRepository.findByEmail(payload.email);

      const passwordMatch = await this.passwordService.verify(
        user.password,
        payload.password,
      );
      if (!passwordMatch)
        throw new UnauthorizedError(`Your credentials are incorrect!`);

      return this.buildToken({
        sub: user.id,
        email: user.email,
      });
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error on login: ${error}`);
    }
  }

  public async register(payload: RegisterPayload): Promise<void> {
    if (!isValidCpf(payload.cpf)) {
      throw new BadRequestError(`The provided CPF is invalid.`);
    }

    if (!payload?.email) {
      throw new BadRequestError(`Payload was empty or invalid`);
    }

    try {
      const existsCpf = await this.userRepository.existsByCpf(payload.cpf);
      if (existsCpf) {
        throw new ConflictError(`A user with this CPF already exists.`);
      }

      const exists = await this.userRepository.existsByEmail(payload.email);
      if (exists) {
        throw new ConflictError(`A user with this email already exists.`);
      }

      const passwordHashed = await this.passwordService.hash(payload.password);

      await this.userRepository.create({
        ...payload,
        password: passwordHashed,
      });
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error on register: ${error}`);
    }
  }

  public async refresh(refreshToken: string): Promise<AuthTokens> {
    if (!refreshToken) {
      throw new BadRequestError("Refresh token was not provided");
    }

    try {
      const decoded = this.jwtService.verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findByEmail(decoded.email);
      return this.buildToken({
        sub: user.id,
        email: user.email,
      });
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error on refresh: ${error}`);
    }
  }
}
