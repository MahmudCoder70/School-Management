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
import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Curriculum } from '../../../Models/curriculum';

@Component({
  selector: 'app-edit-curriculum',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-curriculum.component.html',
  styleUrl: './edit-curriculum.component.css'
})


export class EditCurriculumComponent {
 

  Curriculum: Curriculum = {
    curriculumId: undefined,
    curriculumName: undefined,
    description: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}

  curriculumForm: FormGroup = new FormGroup({
    curriculumId: new FormControl(undefined, Validators.required),
    curriculumName: new FormControl(undefined, Validators.required),
    description: new FormControl(undefined, Validators.required)
  });

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getCurriculumById(id).subscribe((x) => {
      this.Curriculum = x;

      this.curriculumForm.patchValue(this.Curriculum);
    });
  
  }

  updateCurriculum() {
    var formData = new FormData();
    formData.append('curriculumId', this.curriculumForm.get('curriculumId')!.value);
    formData.append('curriculumName', this.curriculumForm.get('curriculumName')!.value);
    formData.append('description', this.curriculumForm.get('description')!.value);

    this.dataSvc.updateCurriculum(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewCurriculum']);
        this.notifySvc.success('Data updated successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}

