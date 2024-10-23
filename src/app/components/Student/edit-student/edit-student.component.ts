import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  studentId: any;

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

  selectedCampusId: string = '';
  selectedClassId: string = '';
  selectedSectionId: string = '';

  studentdata: any;

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.studentId = params.get('id');

      this.http
        .get('http://localhost:5028/api/Students/' + this.studentId)
        .subscribe((data) => {
          this.studentdata = data;

          console.log(this.studentdata);
          this.fName = this.studentdata.studentFName;
          this.lName = this.studentdata.studentLName;

          this.fatherName = this.studentdata.fatherName;
          this.motherName = this.studentdata.motherName;
          this.dob = this.studentdata.dateOfBirth;

          this.gender = this.studentdata.genderId;
          this.image = this.studentdata.image;
          // this.imagePath = this.studentdata.address;
          this.address = this.studentdata.address;
          this.birthCert = this.studentdata.birthCertificateNumber;
          this.selectedCampusId = this.studentdata.address;

          this.selectedClassId = this.studentdata.address;
          this.selectedSectionId = this.studentdata.address;
        });
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

  editStudent() {
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
