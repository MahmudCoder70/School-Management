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
  selector: 'app-create-shift',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-shift.component.html',
  styleUrl: './create-shift.component.css'
})
export class CreateShiftComponent {

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  shiftForm: FormGroup = new FormGroup({
    shiftId: new FormControl(undefined, Validators.required),
    shiftName: new FormControl(undefined, Validators.required),
    startTime: new FormControl(undefined, Validators.required),
    endTime: new FormControl(undefined, Validators.required),
  });

  insertShift() {
    var formData = new FormData();
    formData.append('shiftName', this.shiftForm.get('shiftName')!.value);
    formData.append('startTime', this.shiftForm.get('startTime')!.value);
    formData.append('endTime', this.shiftForm.get('endTime')!.value);

    this.dataSvc.postShift(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewShift']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
