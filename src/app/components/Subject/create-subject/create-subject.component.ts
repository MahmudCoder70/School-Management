import { Component } from '@angular/core';
import { Class } from '../../../Models/class';
import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Curriculum } from '../../../Models/curriculum';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css',
})
export class CreateSubjectComponent {
  class: Class[] = [];
  curriculum: Curriculum[] = [];

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  subjectForm: FormGroup = new FormGroup({
    subjectId: new FormControl(undefined, Validators.required),
    subjectName: new FormControl(undefined, Validators.required),
    curriculumId: new FormControl(undefined),
    classId: new FormControl(undefined),
  });

  ngOnInit() {
    this.dataSvc.getCurriculum().subscribe((result) => {
      this.curriculum = result;
      console.log(result);
    });
    this.dataSvc.getClass().subscribe((result) => {
      this.class = result;
      console.log(result);
    });
  }

  insertSubject() {
    var formData = new FormData();
    formData.append('subjectName', this.subjectForm.get('subjectName')!.value);
    formData.append('classId', this.subjectForm.get('classId')!.value);
    formData.append(
      'curriculumId',
      this.subjectForm.get('curriculumId')!.value
    );

    this.dataSvc.postSubject(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewSubject']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
