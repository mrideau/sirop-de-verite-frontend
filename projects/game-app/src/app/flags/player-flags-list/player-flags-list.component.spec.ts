import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFlagsListComponent } from './player-flags-list.component';

describe('PlayerFlagsListComponent', () => {
  let component: PlayerFlagsListComponent;
  let fixture: ComponentFixture<PlayerFlagsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerFlagsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerFlagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
