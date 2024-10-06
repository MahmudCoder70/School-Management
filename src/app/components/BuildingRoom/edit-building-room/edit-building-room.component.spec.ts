import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildingRoomComponent } from './edit-building-room.component';

describe('EditBuildingRoomComponent', () => {
  let component: EditBuildingRoomComponent;
  let fixture: ComponentFixture<EditBuildingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBuildingRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBuildingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
