export interface QueueDTO {
    name: string;
    expires: Date;
}

export interface TakeTurnDTO {
    queue: string;
    room: string;
    data: DataDTO;
}

export interface DataDTO {
    listen: string;
    data: any;
}

export interface TurnTakedDTO {
    jobId: string | number;
}

export interface TurnStartedDTO {
  timestamp: Date;
}
