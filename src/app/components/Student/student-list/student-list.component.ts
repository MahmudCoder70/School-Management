import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  constructor(private http: HttpClient) {}
  route = inject(Router);
  studentList: any = [];
  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    this.http
      .get('http://localhost:5028/api/Students')
      .subscribe((data) => {
        this.studentList = data;

        console.log(this.studentList);
      });
  }

  deleteStudent(id: number | string) {
    this.http.delete('http://localhost:5028/api/Students/' + id).subscribe(() => {
      this.getStudent();
    });
  }

  editStudent(id: any) {
    this.route.navigate(['student/edit'], { queryParams: { id: id } });
  }
}