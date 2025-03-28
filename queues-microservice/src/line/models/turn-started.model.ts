import { TurnDTO } from "../../turns/inputs/create-job.model";

export class TurnStartedDTO {
    event: string;
    data: {
        accessToken: string;
        expires: Date;
        payload: TurnDTO;
    }
}