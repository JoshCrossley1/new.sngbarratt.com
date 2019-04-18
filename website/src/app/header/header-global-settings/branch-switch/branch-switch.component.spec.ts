import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSwitchComponent } from './branch-switch.component';

describe('BranchSwitchComponent', () => {
  let component: BranchSwitchComponent;
  let fixture: ComponentFixture<BranchSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
