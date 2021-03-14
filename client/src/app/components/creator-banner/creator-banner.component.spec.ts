import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorBannerComponent } from './creator-banner.component';

describe('CreatorBannerComponent', () => {
  let component: CreatorBannerComponent;
  let fixture: ComponentFixture<CreatorBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
