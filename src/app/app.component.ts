import {Component, ViewEncapsulation} from '@angular/core';
import {DataState} from "./authentication/emum/data-state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'SJ07SILICONONEAPP';
  protected readonly DataState = DataState;
}
