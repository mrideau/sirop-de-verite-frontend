import { Component, inject } from '@angular/core';
import { CardsService } from '../cards.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { Card, CardData } from '../cards.models';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-card-dialog',
  standalone: true,
  imports: [
    FormlyModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './edit-card-dialog.component.html',
  styleUrl: './edit-card-dialog.component.scss',
})
export class EditCardDialogComponent {
  private readonly _cardsService: CardsService = inject(CardsService);
  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _dialogRef: MatDialogRef<any> = inject(MatDialogRef);
  private readonly _dialogData: { card: Card } = inject(MAT_DIALOG_DATA);

  protected readonly card: Card = Object.assign({}, this._dialogData.card);

  protected readonly form: FormGroup = new FormGroup({});
  protected readonly fields: FormlyFieldConfig[] = [
    {
      type: '#card-name',
    },
    {
      type: '#card-content',
    },
    {
      type: '#card-alcohol',
    },
    {
      type: '#card-deck',
    },
  ];

  protected updateCard(data: CardData): void {
    this._cardsService.updateCard$(this.card.id, data).subscribe({
      next: (): void => {
        this._dialogRef.close(true);
        this._snackBar.open('Carte enregistrée avec succès!');
      },
    });
  }
}
