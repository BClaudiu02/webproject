import { Component } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../models/activity.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-fitness-tracker',
  templateUrl: './fitness-tracker.component.html',
  styleUrls: ['./fitness-tracker.component.css'],
})
export class FitnessTrackerComponent {
  exercise: string = '';
  duration: number = 0;
  weight: number = 93;
  height: number = 175;
  age: number = 22;
  gender: string = 'male';
  caloriesBurned: number = 0;
  activities: Activity[] = [];

  constructor(private activityService: ActivityService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.activityService.setUser(userId);

        this.activityService.getActivities().subscribe((activities) => {
          this.activities = activities;
        });
      }
    });
  }

  calculateCalories() {
    if (!this.exercise || this.duration <= 0 || this.weight <= 0 || this.height <= 0 || this.age <= 0) return;
    this.caloriesBurned = this.activityService.calculateCalories(
      this.exercise,
      this.duration,
      this.weight,
      this.height,
      this.age,
      this.gender
    );
  }

  saveActivity() {
    if (!this.exercise || this.duration <= 0 || this.weight <= 0 || this.height <= 0 || this.age <= 0) return;

    const newActivity: Activity = {
      userId: this.activityService['userId'],
      exercise: this.activityService.getExerciseLabel(this.exercise),
      durationMinutes: this.duration,
      caloriesBurned: this.caloriesBurned,
      date: new Date(),
    };

    this.activityService.addActivity(newActivity);
    this.exercise = '';
    this.duration = 0;
    this.caloriesBurned = 0;
  }

  clearHistory() {
    this.activityService.clearHistory();
  }
}
