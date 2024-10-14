

import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-section',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edit-section.component.html',
  styleUrl: './edit-section.component.css'
})
export class EditSectionComponent {
  route = inject(Router);
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.getSection();
  }

  sectionId: number = 0;

  getSection() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      const id = params['id'];
      this.sectionId = id;

      this.http
        .get('http://localhost:5028/api/Sections' + id)
        .subscribe((data: any) => {
          console.log(data);

          this.sectionName = data.sectionName;
          console.log(this.sectionName);

        
        });
    });
  }

  sectionName: string = '';
 

  
  
  async editSection() {
    let formData: any = new FormData(); 
    formData.append("sectionId",this.sectionId)
    formData.append("sectionName",this.sectionName)

     
      
    
    this.http
      .put('http://localhost:5028/api/Sections/' + this.sectionId,formData)
      .subscribe((data) => {
        console.log(data);

        this.route.navigate(['section/View']);
      });
  }

}



