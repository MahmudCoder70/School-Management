import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-configuration-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './configuration-list.component.html',
  styleUrl: './configuration-list.component.css',
})
export class ConfigurationListComponent implements OnInit {
  constructor(private http: HttpClient) {}

  route = inject(Router);
  ConfigerList: any[] = [];

  ngOnInit(): void {
    this.getConfiguration();
  }

  getConfiguration() {
    this.http.get('http://localhost:5028/api/RoutineConfigurations').subscribe({
      next: (data: any) => {
        this.ConfigerList = data;
        console.log(this.ConfigerList); // Optional: for debugging purposes
      },
      error: (err) => {
        console.error('Error fetching Configuration data:', err);
      },
    });
  }

  deleteConfiguration(id: any) {
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

  editConfiguration(id: number) {
    console.log(id);
    this.route.navigate(['Configuration/Edit'], { queryParams: { id: id } });
  }
}
