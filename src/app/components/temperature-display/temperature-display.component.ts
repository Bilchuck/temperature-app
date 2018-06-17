import { GatewayService } from './../../services/gateway.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map, flatMap } from "rxjs/operators";
import { from } from 'rxjs';
import { IChart } from '../../models/IChart';

@Component({
  selector: 'app-temperature-display',
  templateUrl: './temperature-display.component.html',
  styleUrls: ['./temperature-display.component.css']
})
export class TemperatureDisplayComponent implements OnInit {
  temperature: Observable<number>;
  chart: Observable<IChart[]>;

  constructor(private gs: GatewayService) { }

  async ngOnInit() {
    this.temperature = interval(1000)
      .pipe(flatMap(() => from(this.gs.getTemperature())))
      .pipe(map((resp) => resp.temperature));

    this.chart = interval(1000)
      .pipe(flatMap(() => from(this.gs.getChart())))
  }

}
