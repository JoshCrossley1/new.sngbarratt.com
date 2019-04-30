import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTypeComponent } from './part-type.component';

describe('PartTypeComponent', () => {
  let component: PartTypeComponent;
  let fixture: ComponentFixture<PartTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
