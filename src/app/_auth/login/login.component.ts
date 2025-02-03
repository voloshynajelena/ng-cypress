import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FloatLabel,
    Password,
    Button,
    AsyncPipe,
    ReactiveFormsModule,
    NgIf,
    InputText
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  submitted = false;
  returnUrl: string | undefined;
  error: string | undefined;

  private readonly loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this.loading.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Convenience getter for easy access to form fields
  get f(): any {
    // @ts-ignore
    return this.loginForm.controls;
  }

  enterSubmit(event: any): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // @ts-ignore
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.next(true);

    this.authService.login(
      this.f.username.value,
      this.f.password.value
    ).subscribe(
      (userData) => {

        // @ts-ignore
        if (userData?.['error']) {
          this.error = 'Invalid credentials';
          return;
        }

        this.router.navigate([this.returnUrl])
        this.loading.next(false);
      },
      (err) => {
        this.error = 'Login failed. Please try again.';
        this.loading.next(false);
      }
    );
  }
}
