import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeDataTableComponent } from './vehicle-type-data-table.component';

describe('VehicleTypeDataTableComponent', () => {
  let component: VehicleTypeDataTableComponent;
  let fixture: ComponentFixture<VehicleTypeDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
