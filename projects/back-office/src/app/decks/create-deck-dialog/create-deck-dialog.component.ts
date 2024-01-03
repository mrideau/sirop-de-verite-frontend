import { Component, inject } from '@angular/core';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeckData } from '../decks.models';
import { DecksService } from '../decks.service';

@Component({
  selector: 'app-create-deck-dialog',
  standalone: true,
  imports: [
    FormlyModule,
    FormsModule,
    JsonPipe,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogClose,
  ],
  templateUrl: './create-deck-dialog.component.html',
  styleUrl: './create-deck-dialog.component.scss',
})
export class CreateDeckDialogComponent {
  private readonly _decksService: DecksService = inject(DecksService);

  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _dialogRef: MatDialogRef<any> = inject(MatDialogRef);

  protected readonly form: FormGroup = new FormGroup({});
  protected readonly fields: FormlyFieldConfig[] = [
    {
      type: '#deck-name',
    },
  ];
  protected formData = {};

  protected createDeck(data: DeckData): void {
    this._decksService.createDeck$(data).subscribe({
      next: (): void => {
        this._dialogRef.close(true);
        this._snackBar.open('Carte enregistrée avec succès!');
      },
    });
  }
}
