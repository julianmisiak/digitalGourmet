import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressTabComponent } from './user-address-tab.component';

describe('UserAddressTabComponent', () => {
  let component: UserAddressTabComponent;
  let fixture: ComponentFixture<UserAddressTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddressTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
