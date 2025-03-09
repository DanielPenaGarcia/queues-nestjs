import { Provider } from "@angular/core";
import { AuthService } from "@core/services";

export const AUTH_PROVIDER = "AUTH_PROVIDER";

export const AuthProvider: Provider = {
  provide: AUTH_PROVIDER,
  useClass: AuthService
}
