import { HttpClient } from '@angular/common/http';
import { ClaimsService } from '../services/claims.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartType, ChartOptions, ChartData, Chart } from 'chart.js';
//import { Label, SingleDataSet } from 'ng2-charts';
import * as moment from 'moment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit  {
  myForm!: FormGroup;
  public startDate!: Date | null;
  public endDate!: Date |   null;
  pieChartData!: ChartData<ChartType, number[], string>;
  pieChartLabels: string[] = [];
  chart!: Chart<"pie", number[], string>;
  showCounts: boolean = false;
  showError: boolean = false;
  showChart: boolean = false;
  @ViewChild('showChartBtn') showChartBtn!: ElementRef;
   public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  constructor(private claimService :ClaimsService,private fb: FormBuilder)   {
    this.myForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, {validator: this.endDateValidator});
   }
   endDateValidator(control: AbstractControl)  {
    const startDate = control.get('startDate')!.value;
    const endDate = control.get('endDate')!.value;
    return startDate < endDate ? null : {invalidEndDate: true};
  }
  ngOnInit(): void {

  this.getClaimsByCategory();
}
  getClaimsByCategory():void {
    this.claimService.getClaimsByCategory().subscribe(data => {
      this.pieChartLabels = Object.keys(data);
      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['#FF6384','grey'],
            hoverBackgroundColor: ['#FF6384',   'grey'],
          },
        ],
      };
    });
  }

  getCounts(): void {
    const startDate = moment(this.startDate).toDate();
    const endDate = moment(this.endDate).toDate();
    this.claimService.getCountsByCategory(startDate, endDate).subscribe((data) => {
      if (Object.keys(data).length === 0) { // check if data is empty
        this.showCounts = false;
        this.showError = true;
        this.showChart=false;
      } else {
        this.pieChartData = data;
        this.showCounts = true;
        this.showError = false;
        this.showChart=true;
      const labels = Object.keys(data);
     // const values = Object.values(data);
     const values = Object.values(data).map(val => Number(val));
      this.drawChart(labels, values);
      }
    });
    this.showCounts = true;
  }
  reset(): void {
    this.showCounts = false;
    this.showChart = false;
    this.showError = false;
    this.startDate=null;
    this.endDate = null;
    this.chart?.destroy();
   // this.showChartBtn.nativeElement.click(); // trigger click event on button to show chart
  }

  drawChart(labels: string[], values: number[]): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.showChart = true;
    this.chart = new Chart('chart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              'rgb(255, 102, 255)',
              'rgb(0, 0, 255)',
            ],
          },
        ],
      },
      options: {
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
    //this.showChart = true;
  }

}




