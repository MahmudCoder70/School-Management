import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-shift',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-shift.component.html',
  styleUrl: './edit-shift.component.css'
})
export class EditShiftComponent {
  route = inject(Router);
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.getShift();
  }

  shiftId: number = 0;

  getShift() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      const id = params['id'];
      this.shiftId = id;

      this.http
        .get('http://localhost:5028/api/Shifts' + id)
        .subscribe((data: any) => {
          console.log(data);

          this.shiftName = data.shiftName;
          this.startTime = data.startTime;
          this.endTime=data.endTime;
          console.log(this.shiftName,this.startTime,this.endTime);
          //this.shiftName = data.shiftName;
          //this.startTime = data.startTime;
          //this.endTime=data.endTime;

        
        });
    });
  }

  shiftName: string = '';
  startTime: string = '';
  endTime: string = '';
 

  
  
  async editShift() {
    let formData: any = new FormData(); 
    formData.append("shiftId",this.shiftId)
    formData.append("shiftName",this.shiftName)


      formData.append("startTime", this.startTime)
      formData.append("endTime", this.endTime)
     
      
    
    this.http
      .put('http://localhost:5028/api/Shifts/' + this.shiftId,formData)
      .subscribe((data) => {
        console.log(data);

        this.route.navigate(['shift/list']);
      });
  }

}

