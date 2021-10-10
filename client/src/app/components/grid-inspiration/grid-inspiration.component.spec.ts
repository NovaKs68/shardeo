import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridInspirationComponent } from './grid-inspiration.component';

describe('GridInspirationComponent', () => {
  let component: GridInspirationComponent;
  let fixture: ComponentFixture<GridInspirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridInspirationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
