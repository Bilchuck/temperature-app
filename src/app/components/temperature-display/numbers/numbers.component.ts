import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {
  @Input('temperature') temperature: string = '..';

  constructor() { }

  ngOnInit() {
  }

}
