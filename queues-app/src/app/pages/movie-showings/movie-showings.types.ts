export interface ScreenDTO {
  id: number;
  name: string;
}

export interface ShowingDTO {
  id: number;
  screen: ScreenDTO;
}

export interface MovieDTO {
  id: string;
  name: string;
  description: string;
  duration: number;
  isAvailable: boolean;
  posterUrl: string;
  movieLanguages: MovieLanguageDTO[];
}

export interface MovieLanguageDTO {
  id: string;
  type: string;
  language: LanguageDTO;
}

export interface LanguageDTO {
  id: string;
  name: string;
}
