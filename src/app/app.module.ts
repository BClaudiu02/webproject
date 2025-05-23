import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChatbotComponent } from './chatbot/chatbot.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { firebaseConfig } from './config';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FitnessTrackerComponent } from './fitness-tracker/fitness-tracker.component';
import { BmiCalculatorComponent } from './bmi-calculator/bmi-calculator.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatbotComponent,
        HomeComponent,
        SignupComponent,
        LoginComponent,
        DashboardComponent,
        UserProfileComponent,
        FitnessTrackerComponent,
        BmiCalculatorComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        AngularFireModule.initializeApp(firebaseConfig.firebase),
        AngularFirestoreModule,

        MatButtonModule,
        MatCardModule,
        MatInputModule,

        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
