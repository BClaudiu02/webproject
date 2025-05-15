import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WeightEntry } from '../models/weight_entry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightHistoryService {

  constructor(private firestore: AngularFirestore) { }

  getWeightHistory(userId: string, months: number): Observable<WeightEntry[]> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    return this.firestore.collection<WeightEntry>(`users/${userId}/weightHistory`, ref =>
      ref.where('date', '>=', startDate)
      .orderBy('date')
    ).valueChanges();
  }
}