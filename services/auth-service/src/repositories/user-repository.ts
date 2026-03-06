import { LoginReciveAPI } from "../dtos/login-payload";
import { RegisterPayload } from "../dtos/register-payload";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/http-errors";

export class UserRepository {
  private apiBase = "http://user-service:3002";

  private async handleResponse<T>(response: Response): Promise<T> {
    const text = await response.text();

    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text };
    }

    if (!response.ok) {
      const message = data.message || "Unexpected error";

      switch (response.status) {
        case 400:
          throw new BadRequestError(message);
        case 401:
          throw new UnauthorizedError(message);
        case 404:
          throw new NotFoundError(message);
        case 409:
          throw new ConflictError(message);
        default:
          throw new InternalServerError(message);
      }
    }

    return data as T;
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const response = await fetch(
      `${this.apiBase}/existsByEmail?email=${encodeURIComponent(email)}`,
    );

    const data = await this.handleResponse<{ exists: boolean }>(response);
    return data.exists;
  }

  public async findByEmail(email: string): Promise<LoginReciveAPI> {
    const response = await fetch(
      `${this.apiBase}/email/${encodeURIComponent(email)}`,
    );

    return this.handleResponse<LoginReciveAPI>(response);
  }

  public async existsByCpf(cpf: string): Promise<boolean> {
    const response = await fetch(
      `${this.apiBase}/existsByCpf?cpf=${encodeURIComponent(cpf)}`,
    );

    const data = await this.handleResponse<{ exists: boolean }>(response);
    return data.exists;
  }

  public async create(user: RegisterPayload): Promise<void> {
    const response = await fetch(`${this.apiBase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    await this.handleResponse<void>(response);
  }
}
