import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { IChart } from '../../../models/IChart';
import { ChartComponent } from 'angular2-chartjs';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartDisplayComponent implements OnInit, OnChanges {
  @Input('chart') chart: any[];
  type: string;
  data: any;
  options: any;
  @ViewChild(ChartComponent) chartComponent;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.chart = this.chart && this.chart.map(({temperature, time}) => ({
      temperature: parseFloat(temperature),
      time: new Date(time).toLocaleTimeString().split(' PM')[0].split(' AM')
    }))
    if (this.chart) { 
      const data = this.chart.map(chart => chart.temperature)
      const labels = this.chart.map(chart => chart.time)
      if (this.chartComponent.chart.data.datasets.length) {
        this.chartComponent.chart.data.labels = labels
        this.chartComponent.chart.data.datasets[0].data = data
        this.chartComponent.chart.update()
      } else {
        this.type = 'line';
        this.data = {
          labels: labels,
          datasets: [
            {
              data: data,
              fill: false,
              borderColor: '#000',
              borderWidth: 2,
              pointBackgroundColor: 'transparent',
              pointBorderColor: '#000',
              pointBorderWidth: 3,
              pointHoverBorderColor: 'rgba(255, 255, 255, 0.2)',
              pointHoverBorderWidth: 10,
              lineTension: 0,
            }
          ]
        };
        this.options = {
          elements: { point: { radius: 0 } },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
                display: true,
                ticks: {
                    min: 20,   // minimum value will be 0.
                    max: 35,
                    callback: function(value, index, values) {
                      return value + '°C';
                  },
                  fontColor: "#000"
                },
                gridLines: {
                  color: '#ddd'
                }
            }],
            xAxes: [{
              gridLines: {
                color: '#ddd'
              },
              ticks: {
                fontColor: "#000"
              }
            }]
        }
        };
      }
    }
  }
}

const initFake = (chart) => {
  if (window.chart) {
    window.chart.config.data.datasets[0].data = chart.map(chart => chart.temperature)
    window.chart.config.data.labels = chart.map(chart => chart.time)
    window.chart.update()
    return 
  }
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;

  // Apply multiply blend when drawing datasets
  var multiply = {
    beforeDatasetsDraw: function(chart, options, el) {
      chart.ctx.globalCompositeOperation = 'multiply';
    },
    afterDatasetsDraw: function(chart, options) {
      chart.ctx.globalCompositeOperation = 'source-over';
    },
  };

  // Gradient color - this week
  var gradientThisWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
  gradientThisWeek.addColorStop(0, '#5555FF');
  gradientThisWeek.addColorStop(1, '#9787FF');

  // Gradient color - previous week
  var gradientPrevWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
  gradientPrevWeek.addColorStop(0, '#FF55B8');
  gradientPrevWeek.addColorStop(1, '#FF8787');

  var config = {
      type: 'line',
      data: {
          labels: chart.map(chart => chart.time),
          datasets: [
            {
                label: 'Temperature',
                data: chart.map(chart => chart.temperature),
                fill: false,
                borderColor: '#000',
                backgroundColor: '#000',
                borderWidth: 2,
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#000',
                pointBorderWidth: 3,
                pointHoverBorderColor: '#000',
                pointHoverBorderWidth: 10,
                lineTension: 0,
            }
          ]
      },
      options: {
        responsive: false,
        elements: { 
          point: {
            radius: 6,
            hitRadius: 6, 
            hoverRadius: 6 
          } 
        },
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: 'transparent',
          displayColors: false,
          bodyFontSize: 14,
          callbacks: {
            label: function(tooltipItems, data) { 
              return tooltipItems.yLabel + '°C';
            }
          }
        },
        scales: {
          xAxes: [{
            display: false,
          }],
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
            },
          }]
        }
      },
      plugins: [multiply],
  };

  window.chart = new Chart(canvas, config);
}