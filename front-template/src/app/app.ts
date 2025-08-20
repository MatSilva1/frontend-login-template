import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    LoginComponent,
    RegisterComponent
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
