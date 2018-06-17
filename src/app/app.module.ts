import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-chartjs';
import { AppComponent } from './components/app.component';
import { GatewayService } from './services/gateway.service';
import { TemperatureDisplayComponent } from './components/temperature-display/temperature-display.component';
import { NumbersComponent } from './components/temperature-display/numbers/numbers.component';
import { ChartDisplayComponent } from './components/temperature-display/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureDisplayComponent,
    NumbersComponent,
    ChartDisplayComponent
  ],
  imports: [
    BrowserModule,
    // ChartsModule,
    ChartModule
  ],
  providers: [
    GatewayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
