import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingRoomComponent } from './create-building-room.component';

describe('CreateBuildingRoomComponent', () => {
  let component: CreateBuildingRoomComponent;
  let fixture: ComponentFixture<CreateBuildingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBuildingRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBuildingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
