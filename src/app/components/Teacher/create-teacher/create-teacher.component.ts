import { Component } from '@angular/core';
import { Subject } from '../../../Models/subject';
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
import { Gender } from '../../../Models/gender';
import { Campus } from '../../../Models/campus';
import { Section } from '../../../Models/section';
import { AcademicYear } from '../../../Models/academicYear';
import { Class } from '../../../Models/class';

@Component({
  selector: 'app-create-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.css',
})
export class CreateTeacherComponent {
  subjectList: Subject[] = [];
  classList:Class[]=[];
  gender: Gender[] = [];
  campus:Campus[]=[];
  section:Section[]=[];
  academicYear:AcademicYear[]=[];
  teacherImage: File = null!;
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  teacherForm: FormGroup = new FormGroup({
    teacherId: new FormControl(undefined, Validators.required),
    teacherName: new FormControl(undefined, Validators.required),
    dateOfBirth: new FormControl(undefined),
    phone: new FormControl(undefined, Validators.required),
    qualification: new FormControl(undefined, Validators.required),
    joinDate: new FormControl(undefined, Validators.required),
    genderId: new FormControl(undefined),
    campusId:new FormControl(undefined),
    sectionId:new FormControl(undefined),
    academicYearId:new FormControl(undefined),

    clslist:new FormArray([]),
    subList: new FormArray([]),
    
  });
  get subListArray() {
    return this.teacherForm.controls['subList'] as FormArray;
  }
  get clsListArray() {
    return this.teacherForm.controls['clslist'] as FormArray;
  }
  addSub() {
    this.subListArray.push(
      new FormGroup({
        subjectId: new FormControl(undefined, Validators.required),
      })
    );
  }
  addclass() {
    this.clsListArray.push(
      new FormGroup({
        classId: new FormControl(undefined, Validators.required),
      })
    );
  }
  removeSubList(index: number) {
    if (this.subListArray.controls.length > 0)
      this.subListArray.removeAt(index);
  }
  removeclsList(index: number) {
    if (this.clsListArray.controls.length > 0)
      this.clsListArray.removeAt(index);
  }
  ngOnInit() {
    this.dataSvc.getSubjectList().subscribe((result) => {
      this.subjectList = result;
      console.log(result);
    });
    this.dataSvc.getAcademicYear().subscribe((result) => {
      this.academicYear = result;
      console.log(result);
    });
    this.dataSvc.getClass().subscribe((result) => {
      this.classList = result;
      console.log(result);
    });
    this.dataSvc.getSections().subscribe((result) => {
      this.section = result;
      console.log(result);
    });
    this.dataSvc.getCampus().subscribe((result) => {
      this.campus = result;
      console.log(result);
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });

    this.addSub();
    this.addclass();

  }
  onFileSelected(event: any) {
    this.teacherImage = event.target.files[0];
  }
  insertTeacher() {
    var formData = new FormData();
    formData.append(
      'SubjectStringify',
      JSON.stringify(this.teacherForm.get('subList')!.value)
    );
    formData.append(
      'classStringify',
      JSON.stringify(this.teacherForm.get('clslist')!.value)
    );
    formData.append('teacherName', this.teacherForm.get('teacherName')!.value);
    formData.append('dateOfBirth', this.teacherForm.get('dateOfBirth')!.value);
    formData.append('phone', this.teacherForm.get('phone')!.value);
    formData.append(
      'qualification',
      this.teacherForm.get('qualification')!.value
    );
    formData.append('joinDate', this.teacherForm.get('joinDate')!.value);
    formData.append('genderId', this.teacherForm.get('genderId')!.value);
    formData.append('sectionId', this.teacherForm.get('sectionId')!.value);
    formData.append('campusId', this.teacherForm.get('campusId')!.value);
    formData.append('academicYearId', this.teacherForm.get('academicYearId')!.value);

    formData.append('imagePath', this.teacherImage, this.teacherImage.name);

    this.dataSvc.postTeacherSubject(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewTeacher']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
