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

  campuses: { campusId: string, name: string }[] = [];
  classes: { classId: string, className: string }[] = [];
  sections: { sectionId: string, sectionName: string }[] = [];
  constructor(private http: HttpClient, private router: Router) {

    this.fetchCampuses();  
    this.fetchClasses();    
    this.fetchSections();
  }

  fetchCampuses() {
    this.http.get<{ campusId: string, name: string }[]>('http://localhost:5028/api/Campus').subscribe({
      next: (data) => {
        this.campuses = data;
      },
      error: (err) => {
        console.error('Error fetching campuses:', err);
      }
    });
  }

  // Method to fetch classes
  fetchClasses() {
    this.http.get<{ classId: string, className: string }[]>('http://localhost:5028/api/Classes').subscribe({
      next: (data) => {
        console.log(data)
        this.classes = data;
      },
      error: (err) => {
        console.error('Error fetching classes:', err);
      }
    });
  }

  // Method to fetch sections
  fetchSections() {
    this.http.get<{ sectionId: string, sectionName: string }[]>('http://localhost:5028/api/Sections/GetSections').subscribe({
      next: (data) => {
        console.log(data)
        this.sections = data;
      },
      error: (err) => {
        console.error('Error fetching sections:', err);
      }
    });
  }

  fName: string = '';
  lName: string = '';
  fatherName: string = '';
  motherName: string = '';
  dob: string = '';  // Binding with input[type="date"]
  gender: string = '';
  image: File | null = null;  // Storing the image file
  imagePath: string | ArrayBuffer | null = null;  // Image preview
  address: string = '';
  birthCert: string = '';
  name:string='';
  className: string='';
  campusName:string='';

  // Method to handle file selection and preview
  updateFile(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files[0]) {
      this.image = input.files[0];  // Store the selected file
      const reader = new FileReader();
  
      // Once the file is loaded, assign the result to `imagePath` for preview
      reader.onload = () => {
        this.imagePath = reader.result;
      };
      
      reader.readAsDataURL(this.image);  // Convert file to base64 URL
    } else {
      // In case of no file selected or reset
      this.image = null;
      this.imagePath = null;
    }
  }
  

  // Method to create a student
  createStudent() {
    const formData = new FormData();
  
    // Append all the form fields to FormData
    formData.append('studentFname', this.fName);
    formData.append('studentLName', this.lName);
    formData.append('fatherName', this.fatherName);
    formData.append('motherName', this.motherName);
    formData.append('dateOfBirth', this.dob);
    
    // Ensure the image is appended only if selected
    if (this.image) {
      formData.append('imagePath', this.image);  // Append file with key matching the backend (ImagePath)
    } else {
      console.log('No image selected');
    }
  
    formData.append('birthCertificateNumber', this.birthCert);
    formData.append('address', this.address);
    formData.append('genderId', this.gender);
    formData.append('campusId', this.selectedCampusId);
    formData.append('classId', this.selectedClassId);
    formData.append('sectionId', this.selectedSectionId);
  
    console.log(this.selectedCampusId,this.selectedClassId)
    // Make POST request with FormData
    this.http.post('http://localhost:5028/api/Students', formData).subscribe({
      next: (data) => {
        console.log('Student created:', data);
      },
      error: (err) => {
        console.error('Error creating student:', err);
      }
    });

    this.router.navigate(['student/list']);
  }
  
  
}
