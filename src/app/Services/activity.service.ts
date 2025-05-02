import { Injectable } from '@angular/core';
import { Activity } from '../models/activity.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private activities: Activity[] = [];
  private activitiesSubject = new BehaviorSubject<Activity[]>([]);
  private userId: string = '';

  constructor() { }

  setUser(userId: string) {
    this.userId = userId;
    this.loadActivities();
  }

  private loadActivities() {
    const storedActivities = localStorage.getItem(`activities_${this.userId}`);
    if (storedActivities) {
      this.activities = JSON.parse(storedActivities);
      this.activitiesSubject.next(this.activities);
    } else {
      this.activities = [];
      this.activitiesSubject.next([]);
    }
  }

  private saveActivities() {
    localStorage.setItem(`activities_${this.userId}`, JSON.stringify(this.activities));
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
    localStorage.removeItem(`activities_${this.userId}`);
    this.activitiesSubject.next([]);
  }

  getExerciseLabel(exerciseKey: string): string {
    const LABEL_MAP: { [key: string]: string } = {
      basketball: 'Basketball',
      crunches: 'Crunches',
      cycling_leisurely: 'Cycling (Leisurely - 10-12 mph)',
      cycling_moderate: 'Cycling (Moderate - 12-14 mph)',
      cycling_vigorous: 'Cycling (Vigorous - 14-16 mph)',
      dancing_general: 'Dancing',
      hiking_moderate: 'Hiking (Moderate Inclines)',
      hiking_vigorous: 'Hiking (Steep Inclines)',
      jump_rope_fast: 'Jump Rop',
      pilates: 'Pilates',
      pushups: 'Push-ups',
      running_8kph: 'Running (8 kph - Light Jog)',
      running_12kph: 'Running (12 kph - Moderate)',
      running_16kph: 'Running (16 kph - Fast)',
      football: 'Football',
      squats: 'Squats',
      strength_training: 'Strength Training',
      strength_training_light: 'Strength Training (Light)',
      strength_training_moderate: 'Strength Training (Moderate)',
      swimming_leisurely: 'Swimming (Leisurely)',
      swimming_moderate: 'Swimming (Moderate Pace)',
      swimming_vigorous: 'Swimming (Vigorous)',
      tennis: 'Tennis',
      walking_3kph: 'Walking (3 kph - Slow Stroll)',
      walking_5kph: 'Walking (5 kph - Moderate Pace)',
      weightlifting: 'Weightlifting',
      yoga: 'Yoga',
    };

    return LABEL_MAP[exerciseKey] || exerciseKey;
  }

  calculateCalories(
    exercise: string,
    duration: number,
    weight: number,
    height: number,
    age: number,
    gender: string
  ): number {
    const MET_VALUES: { [key: string]: number } = {
      basketball: 6.5,            // General
      crunches: 6.0,
      cycling_leisurely: 4.0,
      cycling_moderate: 6.8,
      cycling_vigorous: 10.0,
      dancing_general: 5.5,
      football: 7.0,
      hiking_moderate: 5.0,
      hiking_vigorous: 7.5,
      jump_rope_fast: 12.0,
      pilates: 3.0,
      pushups: 7.0,
      running_8kph: 6.0,
      running_12kph: 9.8,
      running_16kph: 16.0,
      squats: 5.5,
      strength_training: 6.0,
      strength_training_light: 3.5,
      strength_training_moderate: 5.0,
      swimming_leisurely: 4.0,
      swimming_moderate: 7.0,
      swimming_vigorous: 10.0,
      tennis: 7.3,
      walking_3kph: 2.0,
      walking_5kph: 3.5,
      weightlifting: 5.0,
      yoga: 2.5,
    };

    const met = MET_VALUES[exercise.toLowerCase().replace(/\s+/g, '_')] || 5.0;

    let BMR: number;
    if (gender === 'male') {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const caloriesBurned = (BMR / 24) * (met / 3.5) * (duration / 60);

    return caloriesBurned;
  }
}
