import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { GatewayService } from './services/gateway.service';
import { TemperatureDisplayComponent } from './components/temperature-display/temperature-display.component';
import { NumbersComponent } from './components/temperature-display/numbers/numbers.component';
import { ChartComponent } from './components/temperature-display/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperatureDisplayComponent,
    NumbersComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GatewayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
