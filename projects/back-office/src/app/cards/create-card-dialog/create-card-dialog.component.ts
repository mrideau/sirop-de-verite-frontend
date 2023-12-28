import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardsService } from '../cards.service';
import { CardData } from '../cards.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-card-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormlyModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogClose,
  ],
  templateUrl: './create-card-dialog.component.html',
  styleUrl: './create-card-dialog.component.scss',
})
export class CreateCardDialogComponent {
  private readonly _cardsService: CardsService = inject(CardsService);

  private readonly _snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly _dialogRef: MatDialogRef<any> = inject(MatDialogRef);

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
  protected formData = {};

  protected createCard(data: CardData): void {
    this._cardsService.createCard$(data).subscribe({
      next: (): void => {
        this._dialogRef.close(true);
        this._snackBar.open('Carte enregistrée avec succès!');
      },
    });
  }
}
