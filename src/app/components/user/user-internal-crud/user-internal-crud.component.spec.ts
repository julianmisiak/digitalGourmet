import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInternalCrudComponent } from './user-internal-crud.component';

describe('UserInternalCrudComponent', () => {
  let component: UserInternalCrudComponent;
  let fixture: ComponentFixture<UserInternalCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInternalCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInternalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
