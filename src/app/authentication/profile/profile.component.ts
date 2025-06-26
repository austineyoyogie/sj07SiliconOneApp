import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { CustomHttpResponse, Profile } from '../interface/appstate';
import { State } from '../interface/state';
import { DataState } from '../emum/data-state';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
   
    profileState$: Observable<State<CustomHttpResponse<Profile>>>;
    private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();
    private readonly DataState = DataState; 

    private authService = inject(AuthService);
    
    ngOnInit(): void {
      this.profileState$ = this.authService.profile$()
      .pipe(
        map(response => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({ dataState: DataState.LOADING }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, appData: this.dataSubject.value, error })
        })
      )
    }
    updateProfile(profileForm: NgForm): void {
      this.isLoadingSubject.next(true);
      this.profileState$ = this.authService.update$(profileForm.value)
        .pipe(
          map(response => {
            console.log(response);
            this.dataSubject.next({ ...response, data: response.data });
            this.isLoadingSubject.next(false);
            return { dataState: DataState.LOADED, appData: this.dataSubject.value };
          }),
          startWith({ dataState: DataState.LOADED, appData: this.dataSubject.value }),
          catchError((error: string) => {
            this.isLoadingSubject.next(false);
            return of({ dataState: DataState.LOADED, appData: this.dataSubject.value, error })
          })
        )
    }

  }
