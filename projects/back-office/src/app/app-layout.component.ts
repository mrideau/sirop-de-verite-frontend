import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from './app.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  private readonly _appService: AppService = inject(AppService);
  private readonly _router: Router = inject(Router);

  logout(): void {
    this._appService.logout$().subscribe((): void => {
      this._router.navigate(['login']);
    });
  }
}
