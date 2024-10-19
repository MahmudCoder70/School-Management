import { Component } from '@angular/core';
import { Building } from '../../../Models/building';
import { DataService } from '../../../Services/data.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { BuildingRoom } from '../../../Models/building-room';


@Component({
  selector: 'app-create-building-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-building-room.component.html',
  styleUrl: './create-building-room.component.css'
})
export class CreateBuildingRoomComponent {
  building: Building[] = [];



  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService
  ) {}
  buildingRoomForm: FormGroup = new FormGroup({
    buildingRoomId: new FormControl(undefined, Validators.required),
    roomNumber: new FormControl(undefined, Validators.required),
    buildingId: new FormControl(undefined),
  });
  

  
 
  ngOnInit() {
    this.dataSvc.getBuilding().subscribe((result) => {
      this.building = result;
      console.log(result);
    });
   
    

   
  }
  
  insertBuildingRoom() {
    var formData = new FormData();
    formData.append('roomNumber', this.buildingRoomForm.get('roomNumber')!.value);
    formData.append('buildingId', this.buildingRoomForm.get('buildingId')!.value);

    
    
    this.dataSvc.postBuildingRoom(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewBuildingRoom']);
        this.notifySvc.success('Data inserted successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data inserted failed!!', 'DISMISS');
      },
    });
  }
}
