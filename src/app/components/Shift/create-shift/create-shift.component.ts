import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-shift',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-shift.component.html',
  styleUrl: './create-shift.component.css'
})
export class CreateShiftComponent {


constructor(private http: HttpClient) {}
  // route = inject(Router);
  shiftName: string = '';
  startTime: string = '';
  endTime: string = '';
  

  async createShift() {
    console.log(this.shiftName);
    let formData: any =new FormData();
    formData.append("shiftName",this.shiftName)
    formData.append("startTime",this.startTime)
    formData.append("endTime",this.endTime)

  
    this.http.post('http://localhost:5028/api/Shifts/', formData).subscribe((data) => {
      console.log(data);
    });
  }

}

