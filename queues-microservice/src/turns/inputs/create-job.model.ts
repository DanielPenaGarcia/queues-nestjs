import { DataJob } from "../models/data-job.model";

export class TakeTurnDTO {
    queue: string;
    data: DataJob;
}