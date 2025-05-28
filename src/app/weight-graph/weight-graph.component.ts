import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Activity } from '../models/activity.model';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-weight-graph',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #weightChartCanvas width="400" height="200"></canvas>`,
  styles: [`
    canvas {
      width: 700px;
      height: 400px;
    }
  `]
})
export class WeightGraphComponent implements OnChanges {
  @Input() activities: Activity[] = [];
  @ViewChild('weightChartCanvas') weightChartCanvas!: ElementRef;
  public chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activities']) {
      this.renderChart();
    }
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const weightData = this.activities
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(activity => ({
        x: new Date(activity.date).toLocaleDateString(),
        y: activity.weight
      }));

    const labels = weightData.map(data => data.x);
    const data = weightData.map(data => data.y);

    if (labels.length === 0 || data.length === 0) {
      return;
    }
    Chart.register(...registerables);
    this.chart = new Chart(this.weightChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Weight Over Time',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          tension: 0.4
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}