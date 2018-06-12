import { Injectable } from '@angular/core';
import { IChart } from '../models/IChart';

const GATEWAY_KEY = 'GATEWAY_URL'
const IS_GATEWAY = 'is_gateway'
const GATEWAY_PORT = '1332'
const TEMPERATURE_ENDPOINT = 'temperature'
const CHART_ENDPOINT = 'chart'
@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  isConnected: boolean = false;
  url: string = null;

  constructor() { }

  async gateWayUrl (): Promise<string> {
    let url: string = localStorage.getItem(GATEWAY_KEY)
    if (!url) {
      url = await this.findUrl()
      localStorage.setItem(GATEWAY_KEY, url)
    }
    return url
  }

  async checkUrl (url) {
    try {
      await new Promise(async (resolve, reject) => {
        console.log(`Checking ${url}`);
        const timeOut = setTimeout(() => {
          console.log(`Timeout error`);
          reject();
        }, 1000)
        await fetch(`${url}/${IS_GATEWAY}`);
        clearTimeout(timeOut);
        resolve()
      })
      console.log(`Found!`);
      return true;
    } catch (err) {
      console.log(`Error`);
      return false;
    }
  }

  async findUrl (): Promise<string> {
    const urlStart = 'http://192.168';
    const masks = [0, 1];
    const from = 100;
    const to = 150;
    let url = null;

    for (let i = from; i <= to; i++) {
        for (const mask of masks) {
          const indexUrl = `${urlStart}.${mask}.${i}:${GATEWAY_PORT}`;
          const isGateWay = await this.checkUrl(indexUrl)
          if (isGateWay) {
            url = indexUrl;
          }
        }
        if (url) {
          break;
        }
    }
    return url;
  }

  async checkConnection (): Promise<void> {
    let url = localStorage.getItem(GATEWAY_KEY)
    if (url) {
      try {
        await fetch(`${url}/${IS_GATEWAY}`);
        this.isConnected = true;
        this.url = url
        return;
      } catch (err) { }
    }
    url = await this.findUrl()
    if (url) {
      this.isConnected = true
      this.url = url
      localStorage.setItem(GATEWAY_KEY, this.url)
    } else {
      this.isConnected = false
    }
  }

  async getTemperature(): Promise<any> {
    if (this.isConnected) {
      const buffer = await fetch(`${this.url}/${TEMPERATURE_ENDPOINT}`);
      const response = await buffer.json()
      return response
    }
  }

  async getChart(): Promise<IChart[]> {
    const buffer = await fetch(`${this.url}/${CHART_ENDPOINT}`)
    const chart = await buffer.json()
    return chart
  }
}
