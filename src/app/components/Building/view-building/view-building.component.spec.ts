import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBuildingComponent } from './view-building.component';

describe('ViewBuildingComponent', () => {
  let component: ViewBuildingComponent;
  let fixture: ComponentFixture<ViewBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBuildingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
