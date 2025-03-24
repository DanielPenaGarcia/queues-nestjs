export class MinuteAddedToJob {

    constructor(jobId: string | number){
        this.jobId = jobId;
    }
    jobId: string | number;
    expires: Date;
}