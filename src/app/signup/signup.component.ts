import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm!: FormGroup;
    firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });
    }

    signup() {
        if (this.signupForm.invalid)
            return;

        this.authService.signupUser(this.signupForm.value).then((result) => {
            if (result == null)
                this.router.navigate(['/dashboard']);
            else if (result.isValid == false)
                this.firebaseErrorMessage = result.message;
        }).catch(() => {

        });
    }
}
