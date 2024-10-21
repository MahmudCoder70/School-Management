import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { School } from '../../../Models/school';
import { CommonModule } from '@angular/common'; 
import { SchoolType } from '../../../Models/school-type';
import { NotifyServiceService } from '../../../Services/notify.service';
import { DataService } from '../../../Services/data.service';

@Component({
  selector: 'app-school-edit',
  standalone: true, 
  imports: [FormsModule,ReactiveFormsModule,CommonModule], 
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.css']
})
export class SchoolEditComponent {
  schoolType: SchoolType[] = [];


  School: School = {
    schoolId: undefined,
    schoolName: undefined,
    schoolLocation: undefined,
    email: undefined,
    establishedYear: undefined,
    schoolTypeId: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
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
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getSchoolbyId(id).subscribe((x) => {
      this.School = x;

      this.schoolForm.patchValue(this.School);
    });
    this.dataSvc.getAllSchoolTypes().subscribe((result) => {
      this.schoolType = result;
      console.log(result);
    });

  }

  editSchool() {
    var formData = new FormData();
    formData.append('schoolId', this.schoolForm.get('schoolId')!.value);
    formData.append('schoolName', this.schoolForm.get('schoolName')!.value);
    formData.append('schoolLocation', this.schoolForm.get('schoolLocation')!.value);
    formData.append('email', this.schoolForm.get('email')!.value);
    formData.append('establishedYear', this.schoolForm.get('establishedYear')!.value);
    formData.append('schoolTypeId', this.schoolForm.get('schoolTypeId')!.value);
  
    this.dataSvc.updateSchool(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/schoolView']);
        this.notifySvc.success('Data updated successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}
