import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaMoviesComponent } from './media-movies.component';

describe('MediaMoviesComponent', () => {
  let component: MediaMoviesComponent;
  let fixture: ComponentFixture<MediaMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
