// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-create-configuration',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, FormsModule],
//   templateUrl: './create-configuration.component.html',
//   styleUrl: './create-configuration.component.css',
// })
// export class CreateConfigurationComponent {
//   ConfigName: string = '';
//   ConfigValue: string = '';
//   Campus: any = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   AddConfiguration() {
//     const formData = new FormData();
//     formData.append('ConfigName', this.ConfigName);
//     formData.append('ConfigValue', this.ConfigValue);
//     formData.append('CampusId', this.Campus);

//     this.http
//       .post('http://localhost:5028/api/RoutineConfigurations', formData)
//       .subscribe({
//         next: (data) => {
//           this.router.navigate(['ViewConfiguration']);
//         },
//         error: (err) => {
//           console.error('Error creating Configuration:', err);
//         },
//       });
//   }
// }

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-configuration.component.html',
  styleUrl: './create-configuration.component.css',
})
export class CreateConfigurationComponent implements OnInit {
  ConfigName: string = '';
  ConfigValue: string = '';
  Campus: any[] = []; // Updated to hold an array of campuses
  selectedCampus: string = ''; // To hold selected campus ID

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch campus data when component loads
    this.http.get<any[]>('http://localhost:5028/api/Campus').subscribe({
      next: (data) => {
        this.Campus = data; // Assign data to Campus array
      },
      error: (err) => {
        console.error('Error loading campuses:', err);
      },
    });
  }

  AddConfiguration() {
    const formData = new FormData();
    formData.append('ConfigName', this.ConfigName);
    formData.append('ConfigValue', this.ConfigValue);
    formData.append('CampusId', this.selectedCampus);

    this.http
      .post('http://localhost:5028/api/RoutineConfigurations', formData)
      .subscribe({
        next: (data) => {
          this.router.navigate(['ViewConfiguration']);
        },
        error: (err) => {
          console.error('Error creating Configuration:', err);
        },
      });
  }
}
