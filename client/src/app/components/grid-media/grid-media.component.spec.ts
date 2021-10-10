import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMediaComponent } from './grid-media.component';

describe('GridMediaComponent', () => {
  let component: GridMediaComponent;
  let fixture: ComponentFixture<GridMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
