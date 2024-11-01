import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
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

  studentId: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.studentId = this.route.snapshot.queryParams['id'];
    if (this.studentId) {
      this.fetchStudentById(this.studentId);
    }
    this.fetchCampuses();
    this.fetchClasses();
    this.fetchSections();
  }

  fetchStudentById(id: string) {
    this.http.get<any>(`http://localhost:5028/api/Students/${id}`).subscribe({
      next: (student) => {
        this.fName = student.studentFName;
        this.lName = student.studentLName;
        this.fatherName = student.fatherName;
        this.motherName = student.motherName;
        this.dob = student.dateOfBirth;
        this.gender = student.genderId;
        this.selectedCampusId = student.campusId;
        this.selectedClassId = student.classId;
        this.selectedSectionId = student.sectionId;
        this.birthCert = student.birthCertificateNumber;
        this.address = student.address;
        this.imagePath = student.imagePath; // Load image preview if available
      },
      error: (err) => {
        console.error('Error fetching student data:', err);
      },
    });
  }

  fetchCampuses() {
    this.http
      .get<{ campusId: string; name: string }[]>(
        'http://localhost:5028/api/Campus'
      )
      .subscribe({
        next: (data) => (this.campuses = data),
        error: (err) => console.error('Error fetching campuses:', err),
      });
  }

  fetchClasses() {
    this.http
      .get<{ classId: string; className: string }[]>(
        'http://localhost:5028/api/Classes'
      )
      .subscribe({
        next: (data) => (this.classes = data),
        error: (err) => console.error('Error fetching classes:', err),
      });
  }

  fetchSections() {
    this.http
      .get<{ sectionId: string; sectionName: string }[]>(
        'http://localhost:5028/api/Sections/GetSections'
      )
      .subscribe({
        next: (data) => (this.sections = data),
        error: (err) => console.error('Error fetching sections:', err),
      });
  }

  updateFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.image = input.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imagePath = reader.result);
      reader.readAsDataURL(this.image);
    } else {
      this.image = null;
      this.imagePath = null;
    }
  }

  updateStudent() {
    const formData = new FormData();
    formData.append('studentFName', this.fName);
    formData.append('studentLName', this.lName);
    formData.append('fatherName', this.fatherName);
    formData.append('motherName', this.motherName);
    formData.append('dateOfBirth', this.dob);
    if (this.image) formData.append('imagePath', this.image);
    formData.append('birthCertificateNumber', this.birthCert);
    formData.append('address', this.address);
    formData.append('genderId', this.gender);
    formData.append('CampusId', this.selectedCampusId);
    formData.append('classId', this.selectedClassId);
    formData.append('sectionId', this.selectedSectionId);

    if (this.studentId) {
      this.http
        .put(`http://localhost:5028/api/Students/${this.studentId}`, formData)
        .subscribe({
          next: (data) => {
            console.log('Student updated:', data);
            this.router.navigate(['student/list']);
          },
          error: (err) => {
            console.error('Error updating student:', err);
          },
        });
    }
  }
}
