import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeneraldataTabComponent } from './user-generaldata-tab.component';

describe('UserGeneraldataTabComponent', () => {
  let component: UserGeneraldataTabComponent;
  let fixture: ComponentFixture<UserGeneraldataTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGeneraldataTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGeneraldataTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
