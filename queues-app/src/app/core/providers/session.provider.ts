import { inject, provideAppInitializer, Provider } from "@angular/core";
import { SessionService } from "@core/services";

export const SESSION_PROVIDER = 'SESSION_PROVIDER';

export const SessionProvider = provideAppInitializer(() => {
  const sessionService: SessionService = inject(SessionService);
  return sessionService.init();
});
