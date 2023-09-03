import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMaterialRelationComponent } from './supplier-material-relation.component';

describe('SupplierMaterialRelationComponent', () => {
  let component: SupplierMaterialRelationComponent;
  let fixture: ComponentFixture<SupplierMaterialRelationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierMaterialRelationComponent]
    });
    fixture = TestBed.createComponent(SupplierMaterialRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
