import { Routes } from '@angular/router';
import { DecksComponent } from './decks.component';
import { importProvidersFrom } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

export default [
  {
    path: '',
    component: DecksComponent,
    providers: [
      importProvidersFrom(
        FormlyModule.forChild({
          presets: [
            {
              name: 'deck-name',
              config: {
                key: 'name',
                type: 'input',
                props: {
                  required: true,
                  label: 'Nom du deck',
                },
              },
            },
          ],
        }),
      ),
    ],
  },
] as Routes;
