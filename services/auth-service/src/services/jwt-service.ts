import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from '../dtos/token-payload';
import { InternalServerError, UnauthorizedError } from '../errors/http-errors';

export class JwtService {

  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpiresIn: SignOptions['expiresIn'];
  private readonly refreshExpiresIn: SignOptions['expiresIn'];

  constructor() {
    const accessSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const accessExpiresIn = process.env.JWT_EXPIRES_IN;
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;

    if (!accessSecret)    throw new InternalServerError('JWT_SECRET is not defined');
    if (!refreshSecret)   throw new InternalServerError('JWT_REFRESH_SECRET is not defined');
    if (!accessExpiresIn) throw new InternalServerError('JWT_EXPIRES_IN is not defined');
    if (!refreshExpiresIn) throw new InternalServerError('JWT_REFRESH_EXPIRES_IN is not defined');

    this.accessSecret     = accessSecret;
    this.refreshSecret    = refreshSecret;
    this.accessExpiresIn  = accessExpiresIn as SignOptions['expiresIn'];
    this.refreshExpiresIn = refreshExpiresIn as SignOptions['expiresIn'];
  }

  public generateAccessToken(payload: JwtPayload): string {
    const { iat, exp, ...cleanPayload } = payload;
    return jwt.sign(cleanPayload, this.accessSecret, {
      expiresIn: this.accessExpiresIn,
    });
  }

  public generateRefreshToken(payload: JwtPayload): string {
    const { iat, exp, ...cleanPayload } = payload;
    return jwt.sign(cleanPayload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
    });
  }

  public verifyAccessToken(token: string): JwtPayload {
    return this.verify(token, this.accessSecret);
  }

  public verifyRefreshToken(token: string): JwtPayload {
    return this.verify(token, this.refreshSecret);
  }

  private verify(token: string, secret: string): JwtPayload {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token has expired');
      }
      if (error instanceof jwt.NotBeforeError) {
        throw new UnauthorizedError('Token not yet valid');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid token');
      }
      throw new InternalServerError(`Unexpected error verifying token: ${error}`);
    }
  }
}