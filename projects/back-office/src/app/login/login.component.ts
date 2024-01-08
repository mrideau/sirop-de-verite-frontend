import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './login.service';
import { Credentials } from './login.models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

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
  private readonly _snackbar: MatSnackBar = inject(MatSnackBar);

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
    this.form.disable();
    this.loginService.login$(credentials).subscribe({
      next: (): void => {
        this._router.navigate(['']);
      },
      error: (err: HttpErrorResponse): void => {
        this.form.enable();
        if (err.status === 400) {
          this._snackbar.open(
            "Échec de l'authentification: Les informations fournies sont incorrectes. Veuillez vérifier votre nom d'utilisateur et votre mot de passe, puis réessayez.",
          );
        }
      },
    });
  }
}
