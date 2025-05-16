import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { UserProfile } from '../models/user.model';
import { WeightEntry } from '../models/weight_entry.model';

interface User {
  displayName?: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseErrorMessage: string;
  user$: Observable<User | null | undefined>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.firebaseErrorMessage = '';
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return new Observable<null | undefined>(observer => {
            observer.next(null);
            observer.complete();
          });
        }
      })
    );
  }

  signupUser(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            res.user?.updateProfile({ displayName: value.displayName })
              .then(() => {
                this.createUserDocument(res.user)
                  .then(() => resolve(null))
                  .catch(error => {
                    this.firebaseErrorMessage = error.message;
                    resolve({ isValid: false, message: error.message });
                  });
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
      this.router.navigate(['/login']);
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
        resolve(user);
      }, reject);
    });
  }

  private createUserDocument(user: firebase.User | null): Promise<void> {
    if (!user) {
      return Promise.reject("No user to create document for.");
    }

    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data: User = {
      displayName: user.displayName || '',
      uid: user.uid
    };

    return userRef.set(data, { merge: true });
  }

  getUserProfile(uid: string): Promise<any> {
    return this.firestore.collection('users').doc(uid).get().toPromise().then(docSnap => {
      if (docSnap && docSnap.exists) {
        return docSnap.data();
      } else {
        return null;
      }
    });
  }

  updateUserProfile(displayName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (typeof displayName !== 'string') {
        reject('Invalid display name');
        return;
      }

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

  addWeightToHistory(uid: string, weight: number): Promise<void> {
    const weightEntry: WeightEntry = {
      date: new Date(),
      weight: weight
    };
    return this.firestore.collection('users').doc(uid).update({
      weightHistory: firebase.firestore.FieldValue.arrayUnion(weightEntry)
    });
  }

  updateUserProfileData(uid: string, data: any): Promise<void> {
    const weightEntry: WeightEntry = {
      date: new Date(),
      weight: data.weight
    };
    return this.firestore.collection('users').doc(uid).set(data, { merge: true });
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