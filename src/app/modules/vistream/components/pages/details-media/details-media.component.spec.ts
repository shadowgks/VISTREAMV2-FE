import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMediaComponent } from './details-media.component';

describe('DetailsMediaComponent', () => {
  let component: DetailsMediaComponent;
  let fixture: ComponentFixture<DetailsMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
