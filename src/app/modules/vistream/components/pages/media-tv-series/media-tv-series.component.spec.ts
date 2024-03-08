import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTvSeriesComponent } from './media-tv-series.component';

describe('MediaTvSeriesComponent', () => {
  let component: MediaTvSeriesComponent;
  let fixture: ComponentFixture<MediaTvSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTvSeriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaTvSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
