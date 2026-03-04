import { BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "../errors/http-errors";
export class ResponseHandle{
    public async handleResponse<T>(response: Response): Promise<T> {
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
}