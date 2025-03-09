import { IsEmail, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class SignUpDTO {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    names: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    lastNames: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    sexId: string;
}