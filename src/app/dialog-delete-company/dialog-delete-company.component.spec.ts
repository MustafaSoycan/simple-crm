import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteCompanyComponent } from './dialog-delete-company.component';

describe('DialogDeleteCompanyComponent', () => {
  let component: DialogDeleteCompanyComponent;
  let fixture: ComponentFixture<DialogDeleteCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteCompanyComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
