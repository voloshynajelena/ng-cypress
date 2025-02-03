import { Routes } from '@angular/router';
import { AuthGuard } from './_auth';
import { LoginComponent } from './_auth/login/login.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
