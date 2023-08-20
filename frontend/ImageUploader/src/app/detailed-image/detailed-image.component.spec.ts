import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedImageComponent } from './detailed-image.component';

describe('DetailedImageComponent', () => {
  let component: DetailedImageComponent;
  let fixture: ComponentFixture<DetailedImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedImageComponent]
    });
    fixture = TestBed.createComponent(DetailedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
