import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Deck } from '../decks.models';
import { DecksService } from '../decks.service';

@Component({
  selector: 'app-delete-deck-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './delete-deck-dialog.component.html',
  styleUrl: './delete-deck-dialog.component.scss',
})
export class DeleteDeckDialogComponent {
  private readonly _decksService: DecksService = inject(DecksService);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _dialogRef: MatDialogRef<any> = inject(MatDialogRef);
  private readonly _dialogData: { deck: Deck } = inject(MAT_DIALOG_DATA);

  protected readonly deck: Deck = this._dialogData.deck;

  deleteDeck$(): void {
    this._decksService.deleteDeck$(this.deck.id).subscribe({
      next: (): void => {
        this._dialogRef.close(true);
        this._snackBar.open('Deck supprimé avec succès!');
      },
    });
  }
}
