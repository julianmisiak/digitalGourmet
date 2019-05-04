import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalCrudComponent } from './internal-crud.component';

describe('InternalCrudComponent', () => {
  let component: InternalCrudComponent;
  let fixture: ComponentFixture<InternalCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
