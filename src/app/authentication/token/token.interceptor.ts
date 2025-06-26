import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { CustomHttpResponse, Profile } from '../interface/appstate';
import { AuthService } from '../service/auth.service';
import { KeyType } from '../emum/key-type';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isTokenRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<CustomHttpResponse<Profile>> = new BehaviorSubject(null);

  private authUserService = inject(AuthService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<HttpResponse<any>> {
    if(request.url.includes('login') || request.url.includes('register')
      || request.url.includes('resetpassword') || request.url.includes('refresh')) {
      return next.handle(request);
    }

    return next.handle(this.addAuthorizationTokenHeader(request, localStorage.getItem(KeyType.TOKEN)))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error instanceof HttpErrorResponse && error.status === 401 && error.error.reason.includes('expired')) {
            return this.handleRefreshToken(request, next);
          } else {
            return throwError(() => error);
          }
        })
      );
  }

  private handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.isTokenRefreshing) {
      console.log('Refreshing Token...');
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authUserService.refreshToken$().pipe(
        switchMap((response) => {
          console.log('Token Refresh Response:', response);
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(response);
          console.log('New Token:', response.data.access_token);
          console.log('Sending original request:', request);
          return next.handle(this.addAuthorizationTokenHeader(request, response.data.access_token))
        })
      );
    } else {
      this.refreshTokenSubject.pipe(
        switchMap((response) => {
          return next.handle(this.addAuthorizationTokenHeader(request, response.data.access_token))
        })
      )
    }
  }

  private addAuthorizationTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
  }
  
}
