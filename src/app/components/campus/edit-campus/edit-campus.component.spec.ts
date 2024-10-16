import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampusComponent } from './edit-campus.component';

describe('EditCampusComponent', () => {
  let component: EditCampusComponent;
  let fixture: ComponentFixture<EditCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCampusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
