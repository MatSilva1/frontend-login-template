import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomePageComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'dashboard', component: DashboardComponent },
  ]},
  { path: 'dashboard', component: DashboardComponent }
];
