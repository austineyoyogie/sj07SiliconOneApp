import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { CreateComponent } from './authentication/create/create.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { AdminComponent } from './authentication/admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './authentication/guard/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', title: "Dashboard", component: AuthComponent},
  {path: 'register', title: "Create", component: CreateComponent},
  {path: 'profile', title: "Profile", component: ProfileComponent, canActivate: [authGuard]},
  {path: 'admin', title: "Admin Panel", component: AdminComponent, canActivate: [authGuard]},
  {path: '404',title: "NotFound",  component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
