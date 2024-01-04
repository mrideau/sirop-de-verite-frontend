import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckListComponent } from './deck-list.component';
import { Decks } from '@sirop-de-verite-shared';

fdescribe('DeckListComponent', () => {
  let component: DeckListComponent;
  let fixture: ComponentFixture<DeckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display decks in mat-chip-listbox', () => {
    const decks: Decks = [
      { id: 1, name: 'Deck 1' },
      { id: 2, name: 'Deck 2' },
      { id: 3, name: 'Deck 3' },
    ];

    component.decks = decks;

    fixture.detectChanges();

    const chipList = fixture.nativeElement.querySelectorAll('.mat-mdc-chip');
    expect(chipList.length).toBe(decks.length);

    chipList.forEach((chip: any, index: number) => {
      expect(chip.textContent).toContain(decks[index].name);
    });
  });
});
