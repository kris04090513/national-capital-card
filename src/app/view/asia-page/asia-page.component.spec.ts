import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsiaPageComponent } from './asia-page.component';

describe('AsiaPageComponent', () => {
  let component: AsiaPageComponent;
  let fixture: ComponentFixture<AsiaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsiaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsiaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
