import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IChart } from '../../../models/IChart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input('chart') chart: IChart[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.chart = this.chart.map(({temperature, time}) => ({
      temperature,
      time: new Date(time).toLocaleString()
    }))
  }
}
