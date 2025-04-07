import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (): Observable<boolean> => {
  const afAuth = inject(AngularFireAuth);  
  const router = inject(Router);  

  return new Observable<boolean>((observer) => {
    afAuth.onAuthStateChanged((user) => {
      if (user) {
        observer.next(true);
      } else {
        console.log('Auth Guard: user is not logged in');
        router.navigate(['/home']);  
        observer.next(false);
      }
    });
  });
};
