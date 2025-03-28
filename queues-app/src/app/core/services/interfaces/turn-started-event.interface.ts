import { EventDTO } from "./event.interface";
import { TurnStartedDataDTO } from "./turn-started-data.interface";

export interface TurnStartedEventDTO extends EventDTO {
  data: TurnStartedDataDTO;
}
