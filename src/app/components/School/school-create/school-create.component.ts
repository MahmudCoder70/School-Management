import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import { NotifyServiceService } from '../../../Services/notify.service';
import { SchoolType } from '../../../Models/school-type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-school-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './school-create.component.html',
  styleUrl: './school-create.component.css'
})
export class SchoolCreateComponent {
  schoolType: SchoolType[] = [];

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
  
  ) {}
  schoolForm: FormGroup = new FormGroup({
    schoolId: new FormControl(undefined, Validators.required),
    schoolName: new FormControl(undefined, Validators.required),
    schoolLocation: new FormControl(undefined),
    email: new FormControl(undefined),
    establishedYear: new FormControl(undefined),
    schoolTypeId: new FormControl(undefined),
  });

  ngOnInit() {
    this.dataSvc.getAllSchoolTypes().subscribe((result) => {
      this.schoolType = result;
      console.log(result);
    }); 
  }

  insertSchool() {
    var formData = new FormData();
    formData.append('schoolName', this.schoolForm.get('schoolName')!.value);
    formData.append('schoolLocation', this.schoolForm.get('schoolLocation')!.value);
    formData.append('email', this.schoolForm.get('email')!.value);
    formData.append('establishedYear', this.schoolForm.get('establishedYear')!.value);
    formData.append('schoolTypeId', this.schoolForm.get('schoolTypeId')!.value);
    
    this.dataSvc.createSchool(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/schoolView']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
