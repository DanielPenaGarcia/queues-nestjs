export class TurnTakedDTO {

    constructor(
        jobId: string | number,
    ) {
        this.jobId = jobId;
    }

    jobId: string | number;
}