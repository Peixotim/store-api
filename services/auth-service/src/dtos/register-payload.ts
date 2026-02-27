import { IsEmail, IsString, MinLength, IsPostalCode } from 'class-validator';

export class RegisterPayload {
  @IsString({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsString()
  @MinLength(11, { message: 'CPF must have 11 digits' })
  cpf!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;

  @IsPostalCode('BR', { message: 'Invalid zipcode' })
  zipcode!: string;
}