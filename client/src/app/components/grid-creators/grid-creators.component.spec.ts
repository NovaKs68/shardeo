import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCreatorsComponent } from './grid-creators.component';

describe('GridCreatorsComponent', () => {
  let component: GridCreatorsComponent;
  let fixture: ComponentFixture<GridCreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCreatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
