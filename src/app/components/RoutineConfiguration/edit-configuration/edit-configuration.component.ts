import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-configuration.component.html',
  styleUrl: './edit-configuration.component.css',
})
export class EditConfigurationComponent {
  ConfigName: string = '';
  ConfigValue: string = '';
  Campus: any = '';
  RoutineConfigurationId: string | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  updateConfig() {
    const formData = new FormData();
    formData.append('ConfigName', this.ConfigName);
    formData.append('ConfigValue', this.ConfigValue);
    formData.append('CampusId', this.Campus);

    if (this.RoutineConfigurationId) {
      this.http
        .put(
          `http://localhost:5028/api/RoutineConfigurations/${this.RoutineConfigurationId}`,
          formData
        )
        .subscribe({
          next: (data) => {
            console.log('Configuration updated:', data);
            this.router.navigate(['ViewConfiguration']);
          },
          error: (err) => {
            console.error('Error updating Configuration:', err);
          },
        });
    }
  }
}
