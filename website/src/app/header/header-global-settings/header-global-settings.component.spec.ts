import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGlobalSettingsComponent } from './header-global-settings.component';

describe('HeaderGlobalSettingsComponent', () => {
  let component: HeaderGlobalSettingsComponent;
  let fixture: ComponentFixture<HeaderGlobalSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderGlobalSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGlobalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
