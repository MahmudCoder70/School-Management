import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfigurationComponent } from './create-configuration.component';

describe('CreateConfigurationComponent', () => {
  let component: CreateConfigurationComponent;
  let fixture: ComponentFixture<CreateConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
