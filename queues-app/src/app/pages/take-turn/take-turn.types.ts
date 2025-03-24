export interface QueueDTO {
    name: string;
    expires: Date;
}

export interface TakeTurnDTO {
    queue: string;
    data: any;
}
