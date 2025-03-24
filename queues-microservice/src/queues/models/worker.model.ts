import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { IsStringOrNumber } from "../../utils/validators/is-number-string.validator";

export class WorkerDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty({ message: 'expiresIn should not be empty.' })
    @Validate(IsStringOrNumber, { message: 'expiresIn must be a string or number.' })
    expiresIn: string | number;

    @IsOptional()
    @Validate(IsStringOrNumber, { message: 'additionalTime must be a string or number.' })
    additionalTime: string | number | undefined;

    @IsNumber()
    @IsNotEmpty()
    concurrency: number;
}