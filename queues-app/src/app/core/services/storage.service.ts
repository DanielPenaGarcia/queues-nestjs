import { Injectable } from '@angular/core';
import { InLineDataDTO } from './interfaces/in-line-data.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  private readonly LINE_DATA_KEY: string = 'LINE_DATA';

  constructor() {}

  setLineData(line: InLineDataDTO): void {
    const lineData = JSON.stringify(line);
    localStorage.setItem(this.LINE_DATA_KEY, lineData);
  }

  getLineData(): InLineDataDTO | null {
    const lineData = localStorage.getItem(this.LINE_DATA_KEY);
    return lineData ? JSON.parse(lineData) : null;
  }

  clearLineData(): void {
    localStorage.removeItem(this.LINE_DATA_KEY);
  }
}
