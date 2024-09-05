import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private passwordManagerService: PasswordManagerService,
    private router: Router
  ) {}

  isError: boolean = false;

  onSubmit(values: any) {
    this.passwordManagerService
      .login(values.email, values.password)
      .then(() => {
        this.router.navigate(['/site-list']);
      })
      .catch((err) => {
        this.isError = true;
      });
  }
}
