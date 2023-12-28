import { Component, inject } from '@angular/core';
import { StatsService } from './stats.service';
import { Observable } from 'rxjs';
import { Stats } from './stats.models';
import { AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [AsyncPipe, MatListModule, RouterLink],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  private readonly _statsService: StatsService = inject(StatsService);

  protected readonly stats$: Observable<Stats> = this._statsService.getStats$();
}
