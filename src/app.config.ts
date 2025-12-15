import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { charactersReducer } from './app/components/shared/state/character.reducer';
import { provideStore } from '@ngrx/store';
import { CharactersEffects } from './app/components/shared/state/characters.effects';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideStore({ characters: charactersReducer }),
    provideEffects([CharactersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ]
};
