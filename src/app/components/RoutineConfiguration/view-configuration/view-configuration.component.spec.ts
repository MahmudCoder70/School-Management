import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigurationComponent } from './view-configuration.component';

describe('ViewConfigurationComponent', () => {
  let component: ViewConfigurationComponent;
  let fixture: ComponentFixture<ViewConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
