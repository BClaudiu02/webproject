import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { WeightHistoryService } from '../services/weight-history.service';
import { WeightPredictionService } from '../services/weight-prediction.service';
import { WeightEntry } from '../models/weight_entry.model';

@Component({
  selector: 'app-weight-tracker',
  templateUrl: './weight-tracker.component.html',
  styleUrls: ['./weight-tracker.component.css']
})
export class WeightTrackerComponent implements OnInit {

  weightForm: FormGroup;
  weightHistory: WeightEntry[] = [];
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private weightHistoryService: WeightHistoryService
  ) {
    this.weightForm = this.fb.group({
      weight: [null, [Validators.required, Validators.min(30), Validators.max(300)]]
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.userId = user.uid;
        this.loadWeightHistory();
      } else {
        console.warn('User not logged in.');
      }
    });
  }

  loadWeightHistory(): void {
    if (this.userId) {
      this.weightHistoryService.getWeightHistory(this.userId, 3).subscribe(history => {
        this.weightHistory = history;
      });
    }
  }

  addWeightEntry(): void {
    if (this.weightForm.valid && this.userId) {
      const weight = this.weightForm.value.weight;

      this.authService.addWeightToHistory(this.userId, weight).then(() => {
        this.weightForm.reset();
        this.loadWeightHistory(); // Refresh the weight history
      });
    }
  }
}