import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css',
})
export class EditStudentComponent {
  route = inject(Router);
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  studentId: number = 0;

  getStudent() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      const id = params['id'];
      this.studentId = id;

      this.http
        .get('https://jsonplaceholder.typicode.com/posts/' + id)
        .subscribe((data: any) => {
          console.log(data);

          this.fName = data.title;
          // console.log(this.fName)
          // this.fName = data.fName;
          // this.fName = data.fName;
          // this.fName = data.fName;
          // this.fName = data.fName;
          // this.fName = data.fName;
          // this.fName = data.fName;
          // this.fName = data.fName;
          // this.fName = data.fName;
        });
    });
  }

  fName: string = '';
  lName: string = '';
  fatherName: string = '';
  motherName: string = '';
  dob: Date = new Date();
  gender: string = '';
  image: string = '';
  address: string = '';
  birthCert: string = '';

  async editStudent() {
    const editModel = {
      studentFname: this.fName,
      studentLName: this.lName,
      // studentFname: this.fName,
      // studentFname: this.fName,
      // studentFname: this.fName,
      // studentFname: this.fName,
      // studentFname: this.fName,
      // studentFname: this.fName,
    };

    this.http
      .post('/hfjfjmdjf/' + this.studentId, editModel)
      .subscribe((data) => {
        console.log(data);

        this.route.navigate(['student/list']);
      });
  }
}
