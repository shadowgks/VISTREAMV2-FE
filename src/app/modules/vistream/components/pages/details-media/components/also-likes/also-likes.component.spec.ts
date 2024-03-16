import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsoLikesComponent } from './also-likes.component';

describe('AlsoLikesComponent', () => {
  let component: AlsoLikesComponent;
  let fixture: ComponentFixture<AlsoLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlsoLikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlsoLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
