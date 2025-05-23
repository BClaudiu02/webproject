import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent implements OnInit {

  bmiForm: FormGroup;
  bmi: number | null = null;
  interpretation: string = '';

  constructor(private fb: FormBuilder) {
    this.bmiForm = this.fb.group({
      height: [null, [Validators.required, Validators.min(50), Validators.max(250)]],
      weight: [null, [Validators.required, Validators.min(20), Validators.max(300)]]
    });
  }

  ngOnInit(): void {
  }

  calculateBMI(): void {
    if (this.bmiForm.valid) {
      const heightCm = this.bmiForm.value.height;
      const weightKg = this.bmiForm.value.weight;

      const heightM = heightCm / 100;
      this.bmi = weightKg / (heightM * heightM);

      this.interpretation = this.interpretBMI(this.bmi);
    }
  }

  interpretBMI(bmi: number): string {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi < 25) {
      return 'Normal weight';
    } else if (bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
}