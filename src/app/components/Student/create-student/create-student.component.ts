import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent {
  selectedCampusId: string = '';
  selectedClassId: string = '';
  selectedSectionId: string = '';

  campuses: { campusId: string; name: string }[] = [];
  classes: { classId: string; className: string }[] = [];
  sections: { sectionId: string; sectionName: string }[] = [];

  fName: string = '';
  lName: string = '';
  fatherName: string = '';
  motherName: string = '';
  dob: string = '';
  gender: string = '';
  image: File | null = null;
  imagePath: string | ArrayBuffer | null = null;
  address: string = '';
  birthCert: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.fetchCampuses();
    this.fetchClasses();
    this.fetchSections();
  }

  fetchCampuses() {
    this.http
      .get<{ campusId: string; name: string }[]>(
        'http://localhost:5028/api/Campus'
      )
      .subscribe({
        next: (data) => {
          this.campuses = data;
        },
        error: (err) => {
          console.error('Error fetching campuses:', err);
        },
      });
  }

  fetchClasses() {
    this.http
      .get<{ classId: string; className: string }[]>(
        'http://localhost:5028/api/Classes'
      )
      .subscribe({
        next: (data) => {
          this.classes = data;
        },
        error: (err) => {
          console.error('Error fetching classes:', err);
        },
      });
  }

  fetchSections() {
    this.http
      .get<{ sectionId: string; sectionName: string }[]>(
        'http://localhost:5028/api/Sections'
      )
      .subscribe({
        next: (data) => {
          this.sections = data;
        },
        error: (err) => {
          console.error('Error fetching sections:', err);
        },
      });
  }

  updateFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.image = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePath = reader.result;
      };

      reader.readAsDataURL(this.image);
    } else {
      this.image = null;
      this.imagePath = null;
    }
  }

  createStudent() {
    const formData = new FormData();
    formData.append('studentFName', this.fName);
    formData.append('studentLName', this.lName);
    formData.append('fatherName', this.fatherName);
    formData.append('motherName', this.motherName);
    formData.append('dateOfBirth', this.dob);
    if (this.image) {
      formData.append('imagePath', this.image);
    }
    formData.append('birthCertificateNumber', this.birthCert);
    formData.append('address', this.address);
    formData.append('genderId', this.gender);
    formData.append('CampusId', this.selectedCampusId);
    formData.append('classId', this.selectedClassId);
    formData.append('sectionId', this.selectedSectionId);

    this.http.post('http://localhost:5028/api/Students', formData).subscribe({
      next: (data) => {
        console.log('Student created:', data);
        this.router.navigate(['student/list']);
      },
      error: (err) => {
        console.error('Error creating student:', err);
      },
    });
  }
}
