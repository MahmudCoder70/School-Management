import { Component } from '@angular/core';
import { Class } from '../../../Models/class';
import { Curriculum } from '../../../Models/curriculum';
import { School } from '../../../Models/school';
import { Shift } from '../../../Models/shift';
import { Gender } from '../../../Models/gender';
import { DataService } from '../../../Services/data.service';
import { NotifyServiceService } from '../../../Services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampusClass } from '../../../Models/campus-class';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-campus',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-campus.component.html',
  styleUrl: './edit-campus.component.css'
})
export class EditCampusComponent {
  ClassList: Class[] = [];
  curriculum: Curriculum[] = [];
  school: School[] = [];
  shift: Shift[] = [];
  gender: Gender[] = [];

  campusClass: CampusClass = {
    campusId: undefined,
    name: undefined,
    curriculumId: undefined,
    schoolId: undefined,
    shiftId: undefined,
    genderId: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}
  campusForm: FormGroup = new FormGroup({
    campusId: new FormControl(undefined, Validators.required),
    name: new FormControl(undefined, Validators.required),
    curriculumId: new FormControl(undefined,Validators.required),
    schoolId: new FormControl(undefined, Validators.required),
    shiftId: new FormControl(undefined, Validators.required),
    genderId: new FormControl(undefined, Validators.required),
    classsList: new FormArray([]),
  });
  get classListArray() {
    return this.campusForm.controls['classsList'] as FormArray;
  }
  addClass(item?: Class) {
    if (item) {
      this.classListArray.push(
        new FormGroup({
          classId: new FormControl(item.classId, Validators.required),
        })
      );
    } else {
      this.classListArray.push(
        new FormGroup({
          classId: new FormControl(undefined, Validators.required),
        })
      );
    }
  }
  removeClassList(index: number) {
    if (this.classListArray.controls.length > 0)
      this.classListArray.removeAt(index);
  }
  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getcampusClassById(id).subscribe((x) => {
      this.campusClass = x;

      this.campusForm.patchValue(this.campusClass);


      this.campusClass.classList?.forEach((item) => {
        this.addClass(item);
      });
    });

    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });

    this.dataSvc.getClass().subscribe((result) => {
      this.ClassList = result;
    });
    this.dataSvc.getCurriculum().subscribe((result) => {
      this.curriculum = result;
    });
    this.dataSvc.getSchools().subscribe((result) => {
      this.school = result;
    });
    this.dataSvc.getShift().subscribe((result) => {
      this.shift = result;
    });
  }

  updateCampus() {
    var formData = new FormData();
    formData.append(
      'ClassStringify',
      JSON.stringify(this.campusForm.get('classsList')!.value)
    );
    formData.append('campusId', this.campusForm.get('campusId')!.value);
    formData.append('name', this.campusForm.get('name')!.value);
    formData.append('curriculumId', this.campusForm.get('curriculumId')!.value);
    formData.append('schoolId', this.campusForm.get('schoolId')!.value);
    formData.append('shiftId', this.campusForm.get('shiftId')!.value);
    formData.append('genderId', this.campusForm.get('genderId')!.value);
   
    this.dataSvc.updatecampusClass(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/getcampus']);
        this.notifySvc.success('Data update successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}
