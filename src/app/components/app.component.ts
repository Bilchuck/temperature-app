import { Component } from '@angular/core';
import { GatewayService } from '../services/gateway.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isConnected: boolean;
  connectionMessage: string = 'Connecting..'

  constructor (private gs: GatewayService) {
    this.checkConnection()
  }

  async checkConnection (): Promise<void> {
    this.connectionMessage = 'Connecting..';

    await this.gs.checkConnection();
    this.isConnected = this.gs.isConnected;
    
    if (this.isConnected) {
      this.connectionMessage = 'Conected!'
    } else {
      this.connectionMessage = 'gateway not found!'
    }
  }
  async reconnectHandler (): Promise<void> {
    await this.checkConnection();
  }
}
