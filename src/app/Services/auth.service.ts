import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseErrorMessage: string;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.firebaseErrorMessage = '';
  }

  signupUser(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            // Update display name
            res.user?.updateProfile({ displayName: value.displayName })
              .then(() => {
                resolve(null); // Success
              })
              .catch((error) => {
                this.firebaseErrorMessage = error.message;
                resolve({ isValid: false, message: error.message });
              });
          },
          err => {
            this.firebaseErrorMessage = err.message;
            resolve({ isValid: false, message: err.message });
          });
    });
  }


  loginUser(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(null);
          },
          err => {
            this.firebaseErrorMessage = err.message;
            resolve({ isValid: false, message: err.message });
          });
    });
  }


  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']); // Redirect to login page after logout
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.authState.subscribe(user => {
        resolve(user ? true : false);
      });
    });
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        resolve(user); // Return the Firebase user object
      }, reject);
    });
  }

  updateUserProfile(displayName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          user.updateProfile({ displayName: displayName })
            .then(() => {
              resolve();
            })
            .catch(error => {
              this.firebaseErrorMessage = error.message;
              reject(error);
            });
        } else {
          reject("No user logged in.");
        }
      });
    });
  }


  deleteUserAccount(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          user.delete()
            .then(() => {
              resolve();
            })
            .catch(error => {
              this.firebaseErrorMessage = error.message;
              reject(error);
            });
        } else {
          reject("No user logged in.");
        }
      });
    });
  }

}