import { TakeTurnDTO } from "../../turns/inputs/create-job.model";

export class TurnStartedDTO {
    constructor(jobId: string, queue: string, takeTurn: TakeTurnDTO) {
        this.queue = queue;
        this.jobId = jobId;
        this.timestamp = new Date();
        this.takeTurn = takeTurn;
    }
    timestamp: Date;
    jobId: string;
    queue: string;
    takeTurn: TakeTurnDTO;
}