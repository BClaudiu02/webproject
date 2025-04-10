import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private activities: Activity[] = [];
  private activitiesSubject = new BehaviorSubject<Activity[]>([]);

  constructor() {
    this.loadActivities();
  }

  private loadActivities() {
    const storedActivities = localStorage.getItem('activities');
    if (storedActivities) {
      this.activities = JSON.parse(storedActivities);
      this.activitiesSubject.next(this.activities);
    }
  }

  private saveActivities() {
    localStorage.setItem('activities', JSON.stringify(this.activities));
  }

  getActivities() {
    return this.activitiesSubject.asObservable();
  }

  addActivity(activity: Activity) {
    activity.id = Math.random().toString(36).substr(2, 9);
    this.activities.push(activity);
    this.saveActivities();
    this.activitiesSubject.next(this.activities);
  }

  clearHistory() {
    this.activities = [];
    this.saveActivities();
    this.activitiesSubject.next(this.activities);
  }

  calculateCalories(
    exercise: string, 
    duration: number, 
    weight: number = 70, 
    height: number = 170, 
    age: number = 25, 
    gender: string = 'male'
  ): number {
    const MET_VALUES: { [key: string]: number } = {
      running_5mph: 8.3,
      cycling_moderate: 8.0,
      swimming_moderate: 7.0,
      walking_moderate: 3.5,
      hiking: 6.5,
      yoga: 3.0,
      strength_training: 6.0,
      weightlifting: 5.0,
      crunches: 6.0,
      pushups: 7.0,
      squats: 5.5,
      jump_rope_fast: 12.0,
    };

    const met = MET_VALUES[exercise.toLowerCase().replace(/\s+/g, '_')] || 5.0;

    let BMR: number;
    if (gender === 'male') {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const caloriesBurned = (met * weight * duration) / 60;

    return caloriesBurned;
  }
}
