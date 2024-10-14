import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Class } from '../../../Models/class';
import { Curriculum } from '../../../Models/curriculum';
import { School } from '../../../Models/school';
import { Shift } from '../../../Models/shift';
import { Gender } from '../../../Models/gender';
import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import { NotifyServiceService } from '../../../Services/notify.service';

@Component({
  selector: 'app-create-campus',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-campus.component.html',
  styleUrl: './create-campus.component.css'
})
export class CreateCampusComponent {
  ClassList: Class[] = [];
  curriculum: Curriculum[] = [];
  school: School[] = [];
  shift: Shift[] = [];
  gender: Gender[] = [];
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  campusForm: FormGroup = new FormGroup({
    campusId: new FormControl(undefined, Validators.required),
    name: new FormControl(undefined, Validators.required),
    curriculumId: new FormControl(undefined),
    schoolId: new FormControl(undefined, Validators.required),
    shiftId: new FormControl(undefined, Validators.required),
    genderId: new FormControl(undefined, Validators.required),

    classsList: new FormArray([]),
  });
  get classListArray() {
    return this.campusForm.controls['classsList'] as FormArray;
  }
  addClass() {
    this.classListArray.push(
      new FormGroup({
        classId: new FormControl(undefined, Validators.required),
      })
    );
  }
  removeClassList(index: number) {
    if (this.classListArray.controls.length > 0)
      this.classListArray.removeAt(index);
  }
  ngOnInit() {
    this.dataSvc.getClass().subscribe((result) => {
      this.ClassList = result;
      console.log(result);
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });
    this.dataSvc.getCurriculum().subscribe((result) => {
      this.curriculum = result;
      console.log(result);
    });
    this.dataSvc.getSchools().subscribe((result) => {
      this.school = result;
      console.log(result);
    });
    this.dataSvc.getShift().subscribe((result) => {
      this.shift = result;
      console.log(result);
    });

    this.addClass();
  }

  insertCampus() {
    var formData = new FormData();
    formData.append(
      'ClassStringify',
      JSON.stringify(this.campusForm.get('classsList')!.value)
    );
    formData.append('name', this.campusForm.get('name')!.value);
    formData.append('curriculumId', this.campusForm.get('curriculumId')!.value);
    formData.append('schoolId', this.campusForm.get('schoolId')!.value);
    formData.append('shiftId', this.campusForm.get('shiftId')!.value);
    formData.append('genderId', this.campusForm.get('genderId')!.value);


    this.dataSvc.postcampusClass(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/getcampus']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
