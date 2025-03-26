export interface QueueDTO {
    name: string;
    expires: Date;
}

export interface TakeTurnDTO {
    queue: string;
    data: DataDTO;
}

export interface DataDTO {
    key: string;
    event: string;
}

export interface TurnTakedDTO {
    jobId: string | number;
}