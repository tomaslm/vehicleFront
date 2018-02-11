import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeDialogComponent } from './vehicle-type-dialog.component';

describe('VehicleTypeDialogComponent', () => {
  let component: VehicleTypeDialogComponent;
  let fixture: ComponentFixture<VehicleTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
