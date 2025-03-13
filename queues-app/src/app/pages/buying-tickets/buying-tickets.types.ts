export interface MovieDTO {
  name: string;
  description: string;
  duration: number;
  isAvailable: boolean;
  posterUrl: string;
}

export interface ScreenDTO {
  id: string;
  name: string;
  seats: SeatDTO[];
}

export interface SeatDTO {
  id: string;
  row: string;
  value: string | null;
  position: number;
}

export interface TicketDTO {
  token: string;
  seat: string;
  row: string;
}

export interface ShowingDTO {
  id: string;
  movie: MovieDTO;
  screen: ScreenDTO;
  tickets: TicketDTO[];
}


export interface SectionDTO {
  id: string;
  row: string;
  seats: SeatDTO[];
}
