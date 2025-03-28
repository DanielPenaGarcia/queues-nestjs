export interface QueueDTO {
  id: string;
  name: string;
  expires: Date;
}

export interface TakeTurnDTO {
  queue: string;
  room: string;
  data: any;
}

export interface TakeTurnResponseDTO {
  jobId: string;
}
