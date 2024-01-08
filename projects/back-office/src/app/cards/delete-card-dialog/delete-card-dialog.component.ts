import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '../cards.models';
import { CardsService } from '../cards.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-card-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatButtonModule, MatDialogClose, MatDialogActions],
  templateUrl: './delete-card-dialog.component.html',
  styleUrl: './delete-card-dialog.component.scss',
})
export class DeleteCardDialogComponent {
  private readonly _cardsService: CardsService = inject(CardsService);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _dialogRef: MatDialogRef<any> = inject(MatDialogRef);
  private readonly _dialogData: { card: Card } = inject(MAT_DIALOG_DATA);
  protected isLoading = false;

  protected readonly card: Card = this._dialogData.card;

  deleteCard$(): void {
    this._cardsService.deleteCard$(this.card.id).subscribe({
      next: (): void => {
        this._dialogRef.close(true);
        this._snackBar.open('Carte supprimée avec succès!');
      },
      error: (): void => {
        this.isLoading = false;
        this._snackBar.open('Échec de la suppression. Veuillez réessayer.');
      },
    });
  }
}
