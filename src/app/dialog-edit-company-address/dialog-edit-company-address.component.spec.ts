import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCompanyAddressComponent } from './dialog-edit-company-address.component';

describe('DialogEditCompanyAddressComponent', () => {
  let component: DialogEditCompanyAddressComponent;
  let fixture: ComponentFixture<DialogEditCompanyAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditCompanyAddressComponent]
    });
    fixture = TestBed.createComponent(DialogEditCompanyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
