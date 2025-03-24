import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { WorkerDTO } from "../worker.model";

export class RegisterQueueDTO {
    @IsString({ message: 'Queue name must be a string.' })
    @IsNotEmpty({ message: 'Queue name should not be empty.' })
    name: string;

    @IsDateString({}, { message: 'Expiration date must be a valid date.' })
    @IsNotEmpty({ message: 'Expiration date should not be empty.' })
    expires: Date;

    @IsArray()
    @IsOptional()
    workers: WorkerDTO[];
}
