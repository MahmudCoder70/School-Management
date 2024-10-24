import { Component } from '@angular/core';
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

@Component({
  selector: 'app-create-curriculum',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-curriculum.component.html',
  styleUrl: './create-curriculum.component.css'
})
export class CreateCurriculumComponent {

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  curriculumForm: FormGroup = new FormGroup({
    curriculumId: new FormControl(undefined, Validators.required),
    curriculumName: new FormControl(undefined, Validators.required),
    description: new FormControl(undefined, Validators.required),
  });

  
  insertCurriculum() {
    var formData = new FormData();
    formData.append('curriculumName', this.curriculumForm.get('curriculumName')!.value);
    formData.append('description', this.curriculumForm.get('description')!.value);
    
    this.dataSvc.postCurriculum(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewCurriculum']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}


