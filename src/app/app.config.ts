import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(SweetAlert2Module.forRoot())
  ]
};
