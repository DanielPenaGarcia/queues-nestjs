import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { InLineDataDTO } from '@core/services/interfaces/in-line-data.interface';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@env/environment';

export const queuesApiInterceptor: HttpInterceptorFn = (req, next) => {

  const storage = inject(StorageService);

  const turn: InLineDataDTO = storage.getLineData();
  
  const apiReq = req.clone({
    setHeaders: {
      'x-api-key': environment.apiKey,
      Authorization: turn?.accessToken ? `Bearer ${turn.accessToken}` : '',
    },
  });

  return next(apiReq);
};
