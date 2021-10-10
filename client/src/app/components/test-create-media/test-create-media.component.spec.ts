import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCreateMediaComponent } from './test-create-media.component';

describe('TestCreateMediaComponent', () => {
  let component: TestCreateMediaComponent;
  let fixture: ComponentFixture<TestCreateMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCreateMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCreateMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
