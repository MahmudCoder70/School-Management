import { Component } from '@angular/core';

import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { School } from '../../../Models/school';

@Component({
  selector: 'app-create-building',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-building.component.html',
  styleUrl: './create-building.component.css',
})
export class CreateBuildingComponent {
 
  school: School[] = [];

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  buildingForm: FormGroup = new FormGroup({
    buildingId: new FormControl(undefined, Validators.required),
    buildingName: new FormControl(undefined, Validators.required),
    schoolId: new FormControl(undefined),

  });

  ngOnInit() {
    this.dataSvc.getSchools().subscribe((result) => {
      this.school = result;
      console.log(result);
    });

  }
  
  insertBuilding() {
    var formData = new FormData();
  
    formData.append('buildingName', this.buildingForm.get('buildingName')!.value);
    formData.append('schoolId', this.buildingForm.get('schoolId')!.value);

    this.dataSvc.PostBuilding(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewBuilding']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
