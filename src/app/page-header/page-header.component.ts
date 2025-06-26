import { Component, ViewEncapsulation } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent {

  login(loginForm: NgForm) {

  }
}
