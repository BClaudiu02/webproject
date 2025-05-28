import { Component } from '@angular/core';
import { ActivityService } from '../Services/activity.service';
import { Activity } from '../models/activity.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WeightGraphComponent } from '../weight-graph/weight-graph.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fitness-tracker',
  standalone: true,
  imports: [WeightGraphComponent, CommonModule, FormsModule, RouterModule, MatButtonModule],
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

  manualWeight: number = 0;
  manualDate: string = '';

  activities: Activity[] = [];
  manualWeightEntries: Activity[] = [];

  constructor(private activityService: ActivityService, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.activityService.setUser(userId);

        this.activityService.getActivities().subscribe((activities) => {
          this.activities = activities;
          this.manualWeightEntries = activities.filter(a => a.exercise === 'Manual Entry');
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
      weight: this.weight,
    };

    this.activityService.addActivity(newActivity);
    this.exercise = '';
    this.duration = 0;
    this.caloriesBurned = 0;
  }

  clearHistory() {
    const remainingManualWeights = this.activities.filter(a => a.exercise === 'Manual Entry');

    this.activityService.setActivities(remainingManualWeights);

    this.activities = remainingManualWeights;
    this.manualWeightEntries = remainingManualWeights;
  }

  addManualWeightEntry() {
    if (!this.manualWeight || !this.manualDate) return;

    const manualEntry: Activity = {
      userId: this.activityService['userId'],
      exercise: 'Manual Entry',
      durationMinutes: 0,
      caloriesBurned: 0,
      date: new Date(this.manualDate),
      weight: this.manualWeight,
    };

    this.activityService.addActivity(manualEntry);
    this.manualWeightEntries.push(manualEntry);

    this.manualWeight = 0;
    this.manualDate = '';
  }

  clearManualWeightEntries() {
    this.manualWeightEntries.forEach(entry => {
      this.activityService.deleteActivity(entry);
    });
    this.manualWeightEntries = [];
  }
}
