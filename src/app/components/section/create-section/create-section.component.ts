import { CommonModule, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css'], // Fixed typo here
})
export class CreateSectionComponent {
  constructor(private http: HttpClient, router: Router) {}
  sectionName: string = '';

  async createSection() {
    console.log(this.sectionName);
    let formData: any = new FormData();
    formData.append('sectionName', this.sectionName);

    this.http
      .post('http://localhost:5028/api/Sections', formData)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
