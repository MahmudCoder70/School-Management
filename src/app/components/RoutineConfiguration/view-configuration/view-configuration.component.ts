import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-configuration',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-configuration.component.html',
  styleUrl: './view-configuration.component.css',
})
export class ViewConfigurationComponent {
  constructor(private http: HttpClient) {}
  route = inject(Router);
  ViewConfig: any[] = [];

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration() {
    this.http.get('http://localhost:5028/api/RoutineConfigurations').subscribe({
      next: (data: any) => {
        this.ViewConfig = data;
        console.log(this.ViewConfig); // Optional: for debugging purposes
      },
      error: (err) => {
        console.error('Error fetching Configuration data:', err);
      },
    });
  }

  deleteConfig(id: any) {
    this.http
      .delete('http://localhost:5028/api/RoutineConfigurations/' + id)
      .subscribe({
        next: () => {
          this.getConfiguration(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting Configuration:', err);
        },
      });
  }

  editConfig(id: number) {
    this.route.navigate(['Configuration-edit'], { queryParams: { id: id } });
  }
}
