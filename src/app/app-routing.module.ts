import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatbotComponent } from './chatbot/chatbot.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from './services/auth.guard';
import { FitnessTrackerComponent } from './fitness-tracker/fitness-tracker.component';
import { WeightTrackerComponent } from './weight-tracker/weight-tracker.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'chatbot', component: ChatbotComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'fitness-tracker', component: FitnessTrackerComponent, canActivate: [AuthGuard] },
    { path: 'weight-tracker', component: WeightTrackerComponent},
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
