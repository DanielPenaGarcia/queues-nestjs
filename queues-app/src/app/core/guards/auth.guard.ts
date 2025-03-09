import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, StorageService } from '@core/services';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const storage: StorageService = inject(StorageService);
  if (!auth.getSession()) {
    //Obtener a partir de /
    const url = state.url;
    storage.saveRedirectUrl(url);
    return router.navigate(['/sign-in']);
  }
  return true;
};
