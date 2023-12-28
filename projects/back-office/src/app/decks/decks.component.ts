import { Component, inject } from '@angular/core';
import { DecksService } from './decks.service';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Deck, Decks } from './decks.models';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateDeckDialogComponent } from './create-deck-dialog/create-deck-dialog.component';
import { DeleteDeckDialogComponent } from './delete-deck-dialog/delete-deck-dialog.component';
import { EditDeckDialogComponent } from './edit-deck-dialog/edit-deck-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss',
})
export class DecksComponent {
  private readonly _dialog: MatDialog = inject(MatDialog);

  private readonly _decksService: DecksService = inject(DecksService);

  protected readonly refreshDecks$: Subject<void> = new Subject<void>();
  protected readonly decks$: Observable<Decks> = this.refreshDecks$.pipe(
    startWith(null),
    switchMap(() => this._decksService.getDecks$()),
  );

  protected readonly displayedColumns: string[] = ['name', 'actions'];

  openCreateDeckDialog(): void {
    this._dialog
      .open(CreateDeckDialogComponent)
      .afterClosed()
      .subscribe((createdDeck: boolean): void => {
        if (createdDeck) {
          this.refreshDecks$.next();
        }
      });
  }

  openEditDeckDialog(deck: Deck): void {
    this._dialog
      .open(EditDeckDialogComponent, {
        data: { deck },
      })
      .afterClosed()
      .subscribe((editedDeck: boolean): void => {
        if (editedDeck) {
          this.refreshDecks$.next();
        }
      });
  }

  openDeleteDeckDialog(deck: Deck): void {
    this._dialog
      .open(DeleteDeckDialogComponent, {
        data: { deck },
      })
      .afterClosed()
      .subscribe((deletedDeck: boolean): void => {
        if (deletedDeck) {
          this.refreshDecks$.next();
        }
      });
  }
}
