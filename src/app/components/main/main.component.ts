import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { AuthService } from '../../_auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    NgIf
  ]
})
export class MainComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
