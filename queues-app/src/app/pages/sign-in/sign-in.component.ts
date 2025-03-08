import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'


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
  display: boolean;

  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      username: [],
      password: [],
    });
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {}
}
