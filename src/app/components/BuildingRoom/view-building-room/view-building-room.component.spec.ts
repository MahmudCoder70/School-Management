import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBuildingRoomComponent } from './view-building-room.component';

describe('ViewBuildingRoomComponent', () => {
  let component: ViewBuildingRoomComponent;
  let fixture: ComponentFixture<ViewBuildingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBuildingRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBuildingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
