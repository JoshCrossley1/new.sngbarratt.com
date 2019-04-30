import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartResultComponent } from './part-result.component';

describe('PartResultComponent', () => {
  let component: PartResultComponent;
  let fixture: ComponentFixture<PartResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
