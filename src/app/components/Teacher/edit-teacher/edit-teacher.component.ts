import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from '../../../Models/subject';
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherSubject } from '../../../Models/teacher-subject';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Gender } from '../../../Models/gender';
import { Campus } from '../../../Models/campus';
import { Section } from '../../../Models/section';
import { AcademicYear } from '../../../Models/academicYear';
import { Class } from '../../../Models/class';

@Component({
  selector: 'app-edit-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-teacher.component.html',
  styleUrl: './edit-teacher.component.css',
})
export class EditTeacherComponent {
  subjectList: Subject[] = [];
  classList:Class[]=[];
  gender: Gender[] = [];
  campus:Campus[]=[];
  section:Section[]=[];
  academicYear:AcademicYear[]=[];
  teacherImage: File = null!;

  teacherSubject: TeacherSubject = {
    teacherId: undefined,
    teacherName: undefined,
    dateOfBirth: undefined,
    phone: undefined,
    teacherImage: undefined,
    qualification: undefined,
    genderId: undefined,
    joinDate: undefined,
    sectionId:undefined,
    campusId:undefined,
    academicYearId:undefined
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}
  teacherForm: FormGroup = new FormGroup({
    teacherId: new FormControl(undefined, Validators.required),
    teacherName: new FormControl(undefined, Validators.required),
    dateOfBirth: new FormControl(undefined),
    phone: new FormControl(undefined, Validators.required),
    qualification: new FormControl(undefined, Validators.required),
    genderId: new FormControl(undefined, Validators.required),
    joinDate: new FormControl(undefined, Validators.required),
    sectionId: new FormControl(undefined, Validators.required),
    campusId: new FormControl(undefined, Validators.required),
    academicYearId: new FormControl(undefined, Validators.required),

    subList: new FormArray([]),
    clslist:new FormArray([])
  });
  get subListArray() {
    return this.teacherForm.controls['subList'] as FormArray;
  }
  get clsListArray() {
    return this.teacherForm.controls['clslist'] as FormArray;
  }
  addSub(item?: Subject) {
    if (item) {
      this.subListArray.push(
        new FormGroup({
          subjectId: new FormControl(item.subjectId, Validators.required),
        })
      );
    } else {
      this.subListArray.push(
        new FormGroup({
          subjectId: new FormControl(undefined, Validators.required),
        })
      );
    }
  }
  addclass(item?: Class) {
    if (item) {
      this.clsListArray.push(
        new FormGroup({
          classId: new FormControl(item.classId, Validators.required),
        })
      );
    } else {
      this.clsListArray.push(
        new FormGroup({
          classId: new FormControl(undefined, Validators.required),
        })
      );
    }
  }
  removeSubList(index: number) {
    if (this.subListArray.controls.length > 0)
      this.subListArray.removeAt(index);
  }
  removeClsList(index: number) {
    if (this.clsListArray.controls.length > 0)
      this.clsListArray.removeAt(index);
  }
  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getTeacherSubjectById(id).subscribe((x) => {
      this.teacherSubject = x;

      this.teacherForm.patchValue(this.teacherSubject);

      if (x.dateOfBirth) {
        const dateOfBirth = new Date(x.dateOfBirth);
        const formattedDateOfBirth = dateOfBirth.toISOString().substring(0, 10);

        this.teacherForm.patchValue({
          dateOfBirth: formattedDateOfBirth,
        });
      }

      this.teacherSubject.subjectsList?.forEach((item) => {
        this.addSub(item);
      });
      this.teacherSubject.classList?.forEach((item) => {
        this.addclass(item);
      });
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });
    this.dataSvc.getCampus().subscribe((result) => {
      this.campus = result;
      console.log(result);
    });
    this.dataSvc.getSections().subscribe((result) => {
      this.section = result;
      console.log(result);
    });
    this.dataSvc.getAcademicYear().subscribe((result) => {
      this.academicYear = result;
      console.log(result);
    });

    this.dataSvc.getSubjectList().subscribe((result) => {
      this.subjectList = result;
    });
    this.dataSvc.getClass().subscribe((result) => {
      this.classList = result;
    });
  }
  onFileSelected(event: any) {
    this.teacherImage = event.target.files[0];
  }
  updateTeacher() {
    var formData = new FormData();
    formData.append(
      'subjectStringify',
      JSON.stringify(this.teacherForm.get('subList')!.value)
    );
    formData.append(
      'classStringify',
      JSON.stringify(this.teacherForm.get('clslist')!.value)
    );
    formData.append('teacherId', this.teacherForm.get('teacherId')!.value);
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
    if (this.teacherImage) {
      formData.append('imagePath', this.teacherImage, this.teacherImage.name);
    }
    this.dataSvc.updateTeacherSubject(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewTeacher']);
        this.notifySvc.success('Data update successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}
