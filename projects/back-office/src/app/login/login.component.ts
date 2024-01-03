import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './login.service';
import { Credentials } from './login.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormlyModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  protected readonly loginService: LoginService = inject(LoginService);
  private readonly _router: Router = inject(Router);

  protected readonly form: FormGroup = new FormGroup({});
  protected readonly fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        required: true,
        type: 'email',
        label: 'Adresse email',
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        required: true,
        type: 'password',
        label: 'Mot de passe',
      },
    },
  ];

  login(credentials: Credentials): void {
    this.loginService.login$(credentials).subscribe((): void => {
      this._router.navigate(['']);
    });
  }
}
