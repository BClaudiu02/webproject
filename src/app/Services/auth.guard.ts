import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators'; import { from, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';


export const AuthGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return from (afAuth.authState).pipe(
        take(1),
        map(user => {
            if (user) {
                return true;
            } else {
                console.log('Auth Guard: user is not logged in');
                router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
                return false;
      }
    })
  );

};
