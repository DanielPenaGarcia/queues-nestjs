export interface SectionDTO {
  id: string;
  row: string;
  seats: SeatDTO[];
}

export interface SeatDTO {
  id: string;
  row: string;
  value: string | null;
  position: number;
}
