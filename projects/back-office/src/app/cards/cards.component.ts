import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardDialogComponent } from './create-card-dialog/create-card-dialog.component';
import {
  BehaviorSubject,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { Card, Cards } from './cards.models';
import { CardsService } from './cards.service';
import { CommonModule } from '@angular/common';
import { EditCardDialogComponent } from './edit-card-dialog/edit-card-dialog.component';
import { DeleteCardDialogComponent } from './delete-card-dialog/delete-card-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  private readonly _dialog: MatDialog = inject(MatDialog);

  private readonly _cardsService: CardsService = inject(CardsService);

  protected readonly refreshPaginatedCards$: Subject<void> =
    new Subject<void>();

  protected readonly currentPage$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  protected readonly paginatedCards$: Observable<Cards> =
    this.refreshPaginatedCards$.pipe(
      startWith(null),
      switchMap(() => this._cardsService.getCards$()),
    );

  protected readonly dataSource$ = this.paginatedCards$.pipe(
    map((cards: Cards) => {
      return new MatTableDataSource<Card>(cards);
    }),
    tap((dataSource) => (dataSource.paginator = this.paginator)),
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected readonly displayedColumns: string[] = ['name', 'actions'];

  openCreateCardDialog(): void {
    this._dialog
      .open(CreateCardDialogComponent)
      .afterClosed()
      .subscribe((cardCreated: boolean): void => {
        if (cardCreated) {
          this.refreshPaginatedCards$.next();
        }
      });
  }

  openEditCardDialog(card: Card): void {
    this._dialog
      .open(EditCardDialogComponent, {
        data: { card },
      })
      .afterClosed()
      .subscribe((cardEdited: boolean): void => {
        if (cardEdited) {
          this.refreshPaginatedCards$.next();
        }
      });
  }

  openDeleteCardDialog(card: Card): void {
    this._dialog
      .open(DeleteCardDialogComponent, {
        data: { card },
      })
      .afterClosed()
      .subscribe((cardDeleted: boolean): void => {
        if (cardDeleted) {
          this.refreshPaginatedCards$.next();
        }
      });
  }
}
