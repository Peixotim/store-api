import { IsEmail, IsString , MinLength} from "class-validator";

export class LoginPayload{
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password!: string;
}

export interface LoginReciveAPI{
    id : string;
    name : string;
    email : string;
    cpf: string;
    password: string;
    zipcode : string;
}