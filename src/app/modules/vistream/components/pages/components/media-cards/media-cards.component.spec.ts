import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCardsComponent } from './media-cards.component';

describe('MediaCardsComponent', () => {
  let component: MediaCardsComponent;
  let fixture: ComponentFixture<MediaCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
