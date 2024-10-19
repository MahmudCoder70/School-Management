import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Building } from '../../../Models/building';
import { NotifyServiceService } from '../../../Services/notify.service';
import { School } from '../../../Models/school';

@Component({
  selector: 'app-edit-building',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-building.component.html',
  styleUrl: './edit-building.component.css'
})
export class EditBuildingComponent {

  school: School[] = [];


  building: Building = {
    buildingId: undefined,
    buildingName: undefined,
    schoolId: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}
  buildingForm: FormGroup = new FormGroup({
    buildingId: new FormControl(undefined, Validators.required),
    buildingName: new FormControl(undefined, Validators.required),

  schoolId: new FormControl(undefined, Validators.required),
 
  });
 
  

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getBuildingById(id).subscribe((x) => {
      this.building = x;

      this.buildingForm.patchValue(this.building);

      

      
    });
    this.dataSvc.getSchools().subscribe((result) => {
      this.school = result;
      console.log(result);
    });

 


  }


    updateBuilding() {
    var formData = new FormData();
  
    formData.append('buildingId', this.buildingForm.get('buildingId')!.value);
    formData.append('buildingName', this.buildingForm.get('buildingName')!.value);
    formData.append('schoolId', this.buildingForm.get('schoolId')!.value);

    

    this.dataSvc.updateBuilding(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewBuilding']);
        this.notifySvc.success('Data update successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}

