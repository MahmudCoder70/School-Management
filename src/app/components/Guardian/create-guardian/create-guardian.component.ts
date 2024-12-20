// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import {
//   FormArray,
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { Student } from '../../../Models/student';
// import { DataService } from '../../../Services/data.service';

// import { NotifyServiceService } from '../../../Services/notify.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-create-guardian',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './create-guardian.component.html',
//   styleUrl: './create-guardian.component.css',
// })
// export class CreateGuardianComponent {
//   studentist: Student[] = [];

//   constructor(
//     public dataSvc: DataService,
//     private router: Router,
//     private notifySvc: NotifyServiceService
//   ) {}
//   guardianForm: FormGroup = new FormGroup({
//     guardianId: new FormControl(undefined, Validators.required),
//     guardianName: new FormControl(undefined, Validators.required),

//     phone: new FormControl(undefined, Validators.required),
//     email: new FormControl(undefined, Validators.required),
//     nidNumber: new FormControl(undefined, Validators.required),

//     studList: new FormArray([]),
//   });
//   get studListArray() {
//     return this.guardianForm.controls['studList'] as FormArray;
//   }
//   addStud() {
//     this.studListArray.push(
//       new FormGroup({
//         studentId: new FormControl(undefined, Validators.required),
//       })
//     );
//   }
//   removeStudList(index: number) {
//     if (this.studListArray.controls.length > 0)
//       this.studListArray.removeAt(index);
//   }

//   ngOnInit() {
//     this.dataSvc.getStudentList().subscribe((result) => {
//       this.studentist = result;
//       console.log(result);
//     });

//     this.addStud();
//   }

//   insertGuardian() {
//     var formData = new FormData();
//     formData.append(
//       'studentStringify',
//       JSON.stringify(this.guardianForm.get('studList')!.value)
//     );
//     formData.append(
//       'guardianName',
//       this.guardianForm.get('guardianName')!.value
//     );

//     formData.append('phone', this.guardianForm.get('phone')!.value);
//     formData.append('nidNumber', this.guardianForm.get('nidNumber')!.value);
//     formData.append('email', this.guardianForm.get('email')!.value);

//     this.dataSvc.postStudentGuardian(formData).subscribe({
//       next: (r) => {
//         console.log(r);
//         this.router.navigate(['/viewGuardian']);
//         this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
//       },
//       error: (err) => {
//         console.log(err);
//         this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
//       },
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Student } from '../../../Models/student';
import { DataService } from '../../../Services/data.service';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-guardian',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-guardian.component.html',
  styleUrls: ['./create-guardian.component.css'],
})
export class CreateGuardianComponent implements OnInit {
  studentList: Student[] = []; // Ensure it's an array for multiple students

  guardianForm: FormGroup = new FormGroup({
    guardianId: new FormControl(undefined, Validators.required),
    guardianName: new FormControl(undefined, Validators.required),
    phone: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, [Validators.required, Validators.email]),
    nidNumber: new FormControl(undefined, Validators.required),
    studList: new FormArray([]),
  });

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}

  ngOnInit() {
    // Fetch students list for dropdown
    this.dataSvc.getStudentList().subscribe({
      next: (result) => {
        this.studentList = result;
        console.log('Fetched student list:', this.studentList); // Debugging log
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      },
    });

    // Add initial student field
    this.addStud();
  }

  get studListArray() {
    return this.guardianForm.controls['studList'] as FormArray;
  }

  addStud() {
    this.studListArray.push(
      new FormGroup({
        studentId: new FormControl(undefined, Validators.required),
      })
    );
  }

  removeStudList(index: number) {
    if (this.studListArray.length > 0) {
      this.studListArray.removeAt(index);
    }
  }

  insertGuardian() {
    const formData = new FormData();
    formData.append(
      'studentStringify',
      JSON.stringify(this.guardianForm.get('studList')!.value)
    );
    formData.append(
      'guardianName',
      this.guardianForm.get('guardianName')!.value
    );
    formData.append('phone', this.guardianForm.get('phone')!.value);
    formData.append('nidNumber', this.guardianForm.get('nidNumber')!.value);
    formData.append('email', this.guardianForm.get('email')!.value);

    this.dataSvc.postStudentGuardian(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/viewGuardian']);
        this.notifySvc.success('Data inserted successfully!', 'DISMISS');
      },
      error: (err) => {
        console.error('Error inserting guardian:', err);
        this.notifySvc.fail('Data insertion failed!', 'DISMISS');
      },
    });
  }
}
