import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
})
export class CreateStudentComponent {
  constructor(private http: HttpClient) {}
  // route = inject(Router);
  fName: string = '';
  lName: string = '';
  fatherName: string = '';
  motherName: string = '';
  dob: Date = new Date();
  gender: string = '';
  image: string = '';
  address: string = '';
  birthCert: string = '';

  async createStudent() {
    console.log(this.fName);

    const studentModel = {
      studentFname: this.fName,
      studentLName: this.lName,
      fatherName: this.fatherName,
      motherName: this.motherName,
      dateOfBirth: this.dob,
      image: null,
      imagePath: this.image,
      birthCertificateNumber: this.birthCert,
      address: this.address,
      genderId: this.gender,
    };

    this.http.post('http://localhost:5028/api/Students', studentModel).subscribe((data) => {
      console.log(data);
    });
  }



}