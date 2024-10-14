import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from '../../../Models/subject';
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from '../../../Models/class';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Curriculum } from '../../../Models/curriculum';

@Component({
  selector: 'app-edit-subject',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.css',
})
export class EditSubjectComponent {
  class: Class[] = [];
  curriculum: Curriculum[] = [];

  Subject: Subject = {
    subjectId: undefined,
    subjectName: undefined,
    classId: undefined,
    curriculumId: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}

  subjectForm: FormGroup = new FormGroup({
    subjectId: new FormControl(undefined, Validators.required),
    subjectName: new FormControl(undefined, Validators.required),
    curriculumId: new FormControl(undefined, Validators.required),
    classId: new FormControl(undefined, Validators.required),
  });

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getSubjectById(id).subscribe((x) => {
      this.Subject = x;

      this.subjectForm.patchValue(this.Subject);
    });
    this.dataSvc.getClass().subscribe((result) => {
      this.class = result;
      console.log(result);
    });

    this.dataSvc.getCurriculum().subscribe((result) => {
      this.curriculum = result;
      console.log(result);
    });
  }

  updateSubject() {
    var formData = new FormData();
    formData.append('subjectId', this.subjectForm.get('subjectId')!.value);
    formData.append('subjectName', this.subjectForm.get('subjectName')!.value);
    formData.append('classId', this.subjectForm.get('classId')!.value);
    formData.append(
      'curriculumId',
      this.subjectForm.get('curriculumId')!.value
    );

    this.dataSvc.updateSubject(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewSubject']);
        this.notifySvc.success('Data updated successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}
