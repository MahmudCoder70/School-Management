import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-configuration.component.html',
  styleUrl: './create-configuration.component.css',
})
export class CreateConfigurationComponent {
  ConfigName: string = '';
  ConfigValue: any;
  Campuses: any[] = [];
  Shifts: any[] = [];
  selectedCampusId: any;
  selectedShiftId: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCampuses();
    this.loadShifts();
  }

  // Fetch campuses from the backend
  loadCampuses() {
    this.http.get('http://localhost:5028/api/Campus/GetCampus').subscribe({
      next: (data: any) => {
        this.Campuses = data; // Assuming the API returns a list of campuses
      },
      error: (err) => {
        console.error('Error loading campuses:', err);
      },
    });
  }

  loadShifts() {
    this.http.get('http://localhost:5028/api/Shifts').subscribe({
      next: (data: any) => {
        this.Shifts = data;
      },
      error: (err) => {
        console.error('Error loading shifts:', err);
      },
    });
  }

  createConfig() {
    const formData = {
      configName: this.ConfigName,
      cinfigValue: this.ConfigValue,
      shiftId: this.selectedShiftId,
      campusId: this.selectedCampusId,
    };

    this.http
      .post('http://localhost:5028/api/RoutineConfigurations', formData)
      .subscribe({
        next: (data) => {
          console.log('Configuration created:', data);
          this.router.navigate(['Configuration/List']);
        },
        error: (err) => {
          console.error('Error creating Configuration:', err);
        },
      });
  }
}
