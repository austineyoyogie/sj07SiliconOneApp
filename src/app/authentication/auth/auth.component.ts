import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginState } from '../interface/appstate';
import { DataState } from '../emum/data-state';
import { AuthService } from '../service/auth.service';
import { KeyType } from '../emum/key-type';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  loginState$: Observable<LoginState> = of({ dataState: DataState.LOADED });
  private phoneSubject = new BehaviorSubject<string | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);
  readonly DataState = DataState;

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.isAuthenticated() ? this.router.navigate(['/profile']) : this.router.navigate(['/login']);
  }

  // https://www.youtube.com/watch?v=qIcizQjdSoA => Angular 17 jwt refresh token

  login(loginForm: NgForm): void {
    this.loginState$ = this.authService.login$(loginForm.value.email, loginForm.value.password)
      .pipe(
        map(response => {
          if (response.data?.user.usingMfa) {
            this.phoneSubject.next(response.data?.user.telephone);
            this.emailSubject.next(response.data?.user.email);
            return {
              dataState: DataState.LOADED, isUsingMfa: true, loginSuccess: false,
              telephone: response.data?.user.telephone?.substring(response.data?.user.telephone.length - 4)
            };
          } else {
            localStorage.setItem(KeyType.TOKEN, response.data?.access_token);
            localStorage.setItem(KeyType.REFRESH_TOKEN, response.data?.refresh_token);
            this.router.navigate(['/profile']);
            return { dataState: DataState.LOADED, loginSuccess: true };
          }
        }),
        startWith({ dataState: DataState.LOADING, isUsingMfa: false }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, isUsingMfa: false, loginSuccess: false, error })
        })
      )
  }
  loginPage(): void {
    this.loginState$ = of({ dataState: DataState.LOADED });
  }
}
