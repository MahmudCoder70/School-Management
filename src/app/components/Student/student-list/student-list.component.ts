import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  constructor(private http: HttpClient) {}

  route = inject(Router);
  studentList: any[] = [];

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    this.http.get('http://localhost:5028/api/Students').subscribe({
      next: (data: any) => {
        this.studentList = data;
        console.log(this.studentList); // Optional: for debugging purposes
      },
      error: (err) => {
        console.error('Error fetching student data:', err);
      },
    });
  }

  deleteStudent(id: any) {
    this.http.delete('http://localhost:5028/api/Students/' + id).subscribe({
      next: () => {
        this.getStudent(); // Refresh the list after deletion
      },
      error: (err) => {
        console.error('Error deleting student:', err);
      },
    });
  }

  editStudent(id: number) {
    this.route.navigate(['student/edit'], { queryParams: { id: id } });
  }
}
