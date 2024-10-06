import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-shift',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-shift.component.html',
  styleUrl: './view-shift.component.css'
})
export class ViewShiftComponent implements OnInit {
  constructor(private http: HttpClient) {}
  route = inject(Router);
  shiftList: any [] = [];
  ngOnInit(): void {
    this.getShift();
  }

  getShift() {
    this.http
      .get('http://localhost:5028/api/Shifts')
      .subscribe((data: any) => {
        this.shiftList = data;

        console.log(this.shiftList);
      });
  }

  // deleteShift(id: number | string) {
  //   this.http.delete('/dfd/' + id).subscribe(() => {
  //     this.getShift();
  //   });
  // }

  // editShift(id: any) {
  //   this.route.navigate(['shift/edit'], { queryParams: { id: id } });
  // }
  deleteShift(id: number) {
    this.http.delete(`http://localhost:5028/api/Shifts/${id}`).subscribe(() => {
      this.getShift(); // Refresh the student list after deletion
    });
  }

  editShift(id: number) {
    this.route.navigate(['shift/edit'], { queryParams: { id: id } });
  }
}
