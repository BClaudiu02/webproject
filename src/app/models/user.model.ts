import { WeightEntry } from "./weight_entry.model";

export interface UserProfile {
    displayName: string;
    gender: string;
    birthDate: Date | null; 
    weight: number | null;
    height: number | null;
    weightHistory: WeightEntry[];
  }