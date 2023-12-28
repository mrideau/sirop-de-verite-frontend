import { Component, inject } from '@angular/core';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Deck, DeckData } from '../decks.models';
import { DecksService } from '../decks.service';

@Component({
  selector: 'app-edit-deck-dialog',
  standalone: true,
  imports: [
    FormlyModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-deck-dialog.component.html',
  styleUrl: './edit-deck-dialog.component.scss',
})
export class EditDeckDialogComponent {
  private readonly _decksService: DecksService = inject(DecksService);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _dialogRef: MatDialogRef<any> = inject(MatDialogRef);
  private readonly _dialogData: { deck: Deck } = inject(MAT_DIALOG_DATA);

  protected readonly deck: Deck = Object.assign({}, this._dialogData.deck);

  protected readonly form: FormGroup = new FormGroup({});
  protected readonly fields: FormlyFieldConfig[] = [
    {
      type: '#deck-name',
    },
  ];

  protected updateDeck(data: DeckData): void {
    this._decksService.updateDeck$(this.deck.id, data).subscribe({
      next: (): void => {
        this._dialogRef.close(true);
        this._snackBar.open('Deck enregistré avec succès!');
      },
    });
  }
}
