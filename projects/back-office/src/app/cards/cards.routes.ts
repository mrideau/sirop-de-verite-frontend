import { Routes } from '@angular/router';
import { CardsComponent } from './cards.component';
import { importProvidersFrom } from '@angular/core';
import { FORMLY_CONFIG, FormlyModule } from '@ngx-formly/core';
import { CardDeckPresetProvider } from './card-deck.preset-provider';
import { DecksService } from '../decks/decks.service';

export default [
  {
    path: '',
    component: CardsComponent,
    providers: [
      importProvidersFrom(
        FormlyModule.forChild({
          presets: [
            {
              name: 'card-name',
              config: {
                key: 'name',
                type: 'input',
                props: {
                  required: true,
                  type: 'text',
                  label: 'Nom de la carte',
                },
              },
            },
            {
              name: 'card-content',
              config: {
                key: 'content',
                type: 'input',
                props: {
                  required: true,
                  label: 'Contenu de la carte',
                },
              },
            },
            {
              name: 'card-alcohol',
              config: {
                key: 'no_alcohol',
                type: 'select',
                defaultValue: false,
                props: {
                  required: true,
                  label: 'Alcool',
                  options: [
                    { value: true, label: 'Avec alcool' },
                    { value: false, label: 'Sans alcool' },
                  ],
                },
              },
            },
            {
              name: 'card-flags',
              config: {
                key: 'flags',
                type: 'select',
                defaultValue: [],
                props: {
                  label: 'Drapeaux',
                  multiple: true,
                  options: [{ value: 'AL', label: 'Alcool' }],
                },
              },
            },
          ],
        }),
      ),
      {
        provide: FORMLY_CONFIG,
        useFactory: () => {
          return {
            presets: [
              {
                name: 'card-deck',
                config: new CardDeckPresetProvider(),
              },
            ],
          };
        },
        deps: [DecksService],
        multi: true,
      },
    ],
  },
] as Routes;
