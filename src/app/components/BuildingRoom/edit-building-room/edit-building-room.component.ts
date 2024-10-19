import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DataService } from '../../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingRoom } from '../../../Models/building-room';
import { NotifyServiceService } from '../../../Services/notify.service';
import { Building } from '../../../Models/building';

@Component({
  selector: 'app-edit-building-room',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-building-room.component.html',
  styleUrl: './edit-building-room.component.css'
})
export class EditBuildingRoomComponent {

  building: Building[] = [];
 

  buildingRoom: BuildingRoom = {
    buildingRoomId: undefined,
    roomNumber: undefined,
    buildingId: undefined,
   
  };
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc: NotifyServiceService
  ) {}
  buildingRoomForm: FormGroup = new FormGroup({
    buildingRoomId: new FormControl(undefined, Validators.required),
    roomNumber:new FormControl(undefined, Validators.required),
    buildingId: new FormControl(undefined, Validators.required),
  
  });

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getbuildingRoomById(id).subscribe((x) => {
      this.buildingRoom = x;

      this.buildingRoomForm.patchValue(this.buildingRoom);

    });
    this.dataSvc.getBuilding().subscribe((result) => {
      this.building = result;
      
    });

   
  }
 
  editBuildingRoom() {
    var formData = new FormData();
   
    formData.append('buildingRoomId', this.buildingRoomForm.get('buildingRoomId')!.value);
    formData.append('roomNumber', this.buildingRoomForm.get('roomNumber')!.value);

    formData.append('buildingId', this.buildingRoomForm.get('buildingId')!.value);
    this.dataSvc.editBuildingRoom(formData).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/viewbuildingRoom']);
        this.notifySvc.success('Data update successfully!!', 'DISMISS');
      },
      error: (err) => {
        console.log(err);
        this.notifySvc.fail('Data Update failed!!', 'DISMISS');
      },
    });
   
    }
    
  }


