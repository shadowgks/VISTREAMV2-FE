import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTvSerieComponent } from './details-tv-serie.component';

describe('DetailsTvSerieComponent', () => {
  let component: DetailsTvSerieComponent;
  let fixture: ComponentFixture<DetailsTvSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsTvSerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsTvSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
