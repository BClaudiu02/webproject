import { Injectable } from '@angular/core';
import { WeightEntry } from '../models/weight_entry.model';

@Injectable({
  providedIn: 'root'
})
export class WeightPredictionService {

  predictWeight(weightHistory: WeightEntry[]): number | null {
    if (weightHistory.length < 2) {
      return null; // Not enough data for prediction
    }

    // Simple Linear Regression: y = mx + b
    const n = weightHistory.length;
    let sumX = 0; // Sum of dates (as numbers)
    let sumY = 0; // Sum of weights
    let sumXY = 0; // Sum of date * weight
    let sumX2 = 0; // Sum of date^2

    for (let i = 0; i < n; i++) {
      const x = weightHistory[i].date.getTime(); // Convert date to timestamp
      const y = weightHistory[i].weight;

      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
    }

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX); // Slope
    const b = (sumY - m * sumX) / n; // Y-intercept

    // Predict weight 1 month from now
    const predictionDate = new Date();
    predictionDate.setMonth(predictionDate.getMonth() + 1);
    const x = predictionDate.getTime();
    const predictedWeight = m * x + b;

    return predictedWeight;
  }
}