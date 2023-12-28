import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeckDialogComponent } from './delete-deck-dialog.component';

describe('DeleteDeckDialogComponent', () => {
  let component: DeleteDeckDialogComponent;
  let fixture: ComponentFixture<DeleteDeckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDeckDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDeckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
