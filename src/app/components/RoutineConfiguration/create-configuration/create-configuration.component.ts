import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-configuration.component.html',
  styleUrl: './create-configuration.component.css',
})
export class CreateConfigurationComponent implements OnInit {
  // ConfigName: string = '';
  // ConfigValue: any;
  // Campuses: any[] = [];
  // Shifts: any[] = [];
  // selectedCampusId: any;
  // selectedShiftId: any;

  // constructor(private http: HttpClient, private router: Router) {}

  // ngOnInit() {
  //   this.loadCampuses();
  //   this.loadShifts();
  // }

  // // Fetch campuses from the backend
  // loadCampuses() {
  //   this.http.get('http://localhost:5028/api/Campus/GetCampus').subscribe({
  //     next: (data: any) => {
  //       this.Campuses = data; // Assuming the API returns a list of campuses
  //     },
  //     error: (err) => {
  //       console.error('Error loading campuses:', err);
  //     },
  //   });
  // }

  // loadShifts() {
  //   this.http.get('http://localhost:5028/api/Shifts').subscribe({
  //     next: (data: any) => {
  //       this.Shifts = data;
  //     },
  //     error: (err) => {
  //       console.error('Error loading shifts:', err);
  //     },
  //   });
  // }

  // createConfig() {
  //   const formData = {
  //     configName: this.ConfigName,
  //     configValue: this.ConfigValue,
  //     shiftId: this.selectedShiftId,
  //     campusId: this.selectedCampusId,
  //   };

  //   this.http
  //     .post('http://localhost:5028/api/RoutineConfigurations', formData)
  //     .subscribe({
  //       next: (data) => {
  //         console.log('Configuration created:', data);
  //         this.router.navigate(['Configuration/List']);
  //       },
  //       error: (err) => {
  //         console.error('Error creating Configuration:', err);
  //       },
  //     });
  // }

  createConfigForm!: FormGroup;
  campuses: any[] = [];
  shifts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCampuses();
    this.loadShifts();
  }

  // Initialize form
  initializeForm() {
    this.createConfigForm = this.fb.group({
      configName: ['', Validators.required],
      configValue: ['', Validators.required],
      campusId: [null, Validators.required],
      shiftId: [null, Validators.required],
    });
  }

  // Load campuses
  loadCampuses() {
    this.http.get('http://localhost:5028/api/Campus/GetCampus').subscribe({
      next: (data: any) => {
        this.campuses = data;
      },
      error: (err) => {
        console.error('Error loading campuses:', err);
      },
    });
  }

  // Load shifts
  loadShifts() {
    this.http.get('http://localhost:5028/api/Shifts').subscribe({
      next: (data: any) => {
        this.shifts = data;
      },
      error: (err) => {
        console.error('Error loading shifts:', err);
      },
    });
  }

  // Create routine configuration
  createConfiguration() {
    if (this.createConfigForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = this.createConfigForm.value;

    this.http
      .post('http://localhost:5028/api/RoutineConfigurations', formData)
      .subscribe({
        next: (response) => {
          console.log('Configuration created:', response);
          this.router.navigate(['/Configuration/List']); // Navigate to list page after success
        },
        error: (err) => {
          console.error('Error creating configuration:', err);
        },
      });
  }
}
