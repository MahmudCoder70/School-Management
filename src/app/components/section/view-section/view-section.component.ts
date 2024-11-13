import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-section.component.html',
  styleUrl: './view-section.component.css'
})
export class ViewSectionComponent implements OnInit  {
  constructor(private http: HttpClient) {}
  route = inject(Router);
  sectionList: any [] = [];
  ngOnInit(): void {
    this.getSection();
  }

  getSection() {
    this.http
      .get('http://localhost:5028/api/Sections/GetSections')
      .subscribe((data: any) => {
        this.sectionList = data;

        console.log(this.sectionList);
      });
  }




  deleteSection(id: any) {
    this.http.delete('http://localhost:5028/api/Sections/' + id).subscribe((id:any) => {
      this.getSection();
    });
  }

  editSection(id: number) {
    this.route.navigate(['section/edit'], { queryParams: { id: id } });
  }
}