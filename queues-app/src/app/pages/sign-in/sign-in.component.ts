import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'
import { AuthService } from '@core/services';
import { Credentials, User } from '@core/interfaces';


@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {

  loading: boolean = false;

  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    const credentials: Credentials = this.loginForm.value;
    this.auth.signIn(credentials).subscribe({
      next: (user: User) => {
        this.loading = false;
        console.log(user);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      }
    })
  }
}
