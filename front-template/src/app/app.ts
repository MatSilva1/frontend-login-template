import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoginComponent],
  template: `
    <app-login></app-login>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
