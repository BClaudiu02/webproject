export interface Activity {
  id?: string;
  userId: string;
  exercise: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  weight: number;
}