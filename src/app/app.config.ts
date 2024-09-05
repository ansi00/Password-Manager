import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'password-manager-ad2ae',
        appId: '1:540299491956:web:98818eebb463fca2686f21',
        storageBucket: 'password-manager-ad2ae.appspot.com',
        apiKey: 'AIzaSyAEQ9ulTj7epH7GZ1gsLlrvGDOLgJZX5tM',
        authDomain: 'password-manager-ad2ae.firebaseapp.com',
        messagingSenderId: '540299491956',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
