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
import { Shift } from '../../../Models/shift';

@Component({
  selector: 'app-edit-shift',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-shift.component.html',
  styleUrl: './edit-shift.component.css'
})
export class EditShiftComponent {

  Shift: Shift = {
    shiftId: undefined,
    shiftName: undefined,
    startTime: undefined,
    endTime: undefined,
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}

  shiftForm: FormGroup = new FormGroup({
    shiftId: new FormControl(undefined, Validators.required),
    shiftName: new FormControl(undefined, Validators.required),
    startTime: new FormControl(undefined, Validators.required),
    endTime: new FormControl(undefined, Validators.required),
  });

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getShiftById(id).subscribe((x) => {
      this.Shift = x;

      this.shiftForm.patchValue(this.Shift);
    });
  }

  updateShift() {
    var formData = new FormData();
    formData.append('shiftId', this.shiftForm.get('subjectId')!.value);
    formData.append('shiftFormName', this.shiftForm.get('subjectName')!.value);
    formData.append('startTime', this.shiftForm.get('startTime')!.value);
    formData.append('endTime', this.shiftForm.get('endTime')!.value);

    this.dataSvc.updateShift(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewShift']);
        this.notifySvc.success('Data updated successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
  }
}
