import { Component } from '@angular/core';
import { IntervalService } from './core/services/interval.service';
import { InvokeMethodExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'where-is-corona';

  constructor(private intervalService: IntervalService) {
    intervalService.wakeMeUp();
  }
}
