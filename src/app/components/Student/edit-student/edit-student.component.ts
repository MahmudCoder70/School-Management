import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css',
})
export class EditStudentComponent {
  route = inject(Router);
  selectedCampusId: string = '';
  selectedClassId: string = '';
  selectedSectionId: string = '';

  campuses: { campusId: string, name: string }[] = [];
  classes: { classId: string, className: string }[] = [];
  sections: { sectionId: string, sectionName: string }[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
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
        .get('http://localhost:5028/api/Students/' + id)
        .subscribe((data: any) => {
          console.log(data);

          this.fName = data.studentFName;
          this.lName = data.studentLName;
          console.log(this.fName,this.lName);
          this.fatherName = data.fatherName;
          this.motherName = data.motherName;
          this.dob = data.dateOfBirth;
          this.image = data.image;
          this.birthCert = data.birthCertificateNumber;
          this.address = data.address;
          this.gender = data.genderId;
          this.campuses=data.campusId;
          this.classes=data.classId;
          this.sections=data.sectionId;
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
  imagePath: any;
  address: string = '';
  birthCert: string = '';
  name:string='';
  className: string='';
  campusName:string='';

  updateFile(event: Event){  
    //@ts-ignore  
    const file = event.target.files[0];  
    console.log(file); 
    this.imagePath=file;                 
     }
  
  async editStudent() {
    let formData: any = new FormData(); 
      formData.append("studentId",this.studentId)
      formData.append("studentFname", this.fName)
      formData.append("studentLName", this.lName)
      formData.append("fatherName", this.fatherName)
      formData.append("motherName", this.motherName)
      formData.append("dateOfBirth", this.dob)
      formData.append("image", null);
      formData.append("imagePath", this.imagePath)
      formData.append("birthCertificateNumber", this.birthCert)
      formData.append("address", this.address)
      formData.append("genderId", this.gender)
      formData.append('campusId', this.selectedCampusId)
      formData.append('classId', this.selectedClassId)
      formData.append('sectionId', this.selectedSectionId)
    
    this.http
      .put('http://localhost:5028/api/Students/' + this.studentId,formData)
      .subscribe((data) => {
        console.log(data);

        this.route.navigate(['student/list']);
      });
  }

}
