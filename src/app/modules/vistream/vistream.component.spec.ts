import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistreamComponent } from './vistream.component';

describe('VistreamComponent', () => {
  let component: VistreamComponent;
  let fixture: ComponentFixture<VistreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
