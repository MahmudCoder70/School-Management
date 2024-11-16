import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-configuration.component.html',
  styleUrl: './edit-configuration.component.css',
})
export class EditConfigurationComponent implements OnInit {
  ConfigId!: number; // Holds the ID of the configuration to edit
  ConfigName: string = '';
  ConfigValue: any;
  Campuses: any[] = [];
  Shifts: any[] = [];
  selectedCampusId: any;
  selectedShiftId: any;

  constructor(
    private http: HttpClient,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Retrieve the configuration ID from the route parameters
    this.route.queryParams.subscribe((params) => {
      this.ConfigId = +params['id']; // Convert to number
      this.loadConfiguration(this.ConfigId);
    });

    // Load campuses and shifts
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

  // Fetch shifts from the backend
  loadShifts() {
    this.http.get('http://localhost:5028/api/Shifts').subscribe({
      next: (data: any) => {
        this.Shifts = data; // Assuming the API returns a list of shifts
      },
      error: (err) => {
        console.error('Error loading shifts:', err);
      },
    });
  }

  // Load the configuration details from the API
  loadConfiguration(configId: number) {
    this.http
      .get(`http://localhost:5028/api/RoutineConfigurations/${configId}`)
      .subscribe({
        next: (data: any) => {
          // Map API response to component properties
          this.ConfigName = data.configName;
          this.ConfigValue = data.cinfigValue;
          this.selectedCampusId = data.campusId;
          this.selectedShiftId = data.shiftId;
        },
        error: (err) => {
          console.error('Error loading Configuration:', err);
        },
      });
  }

  // Update the configuration
  updateConfig() {
    const updatedData = {
      RoutineConfigurationId: this.ConfigId,
      configName: this.ConfigName,
      configValue: this.ConfigValue,
      campusId: this.selectedCampusId,
      shiftId: this.selectedShiftId,
    };

    this.http
      .put(
        `http://localhost:5028/api/RoutineConfigurations/${this.ConfigId}`,
        updatedData
      )
      .subscribe({
        next: (data) => {
          console.log('Configuration updated:', data);
          this.router.navigate(['Configuration/List']);
        },
        error: (err) => {
          console.error('Error updating Configuration:', err);
        },
      });
  }
}
