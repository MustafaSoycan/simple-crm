import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCompanyComponent } from './dialog-edit-company.component';

describe('DialogEditCompanyComponent', () => {
  let component: DialogEditCompanyComponent;
  let fixture: ComponentFixture<DialogEditCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditCompanyComponent]
    });
    fixture = TestBed.createComponent(DialogEditCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
